<template>
  <div class="bg">
    <div class="content">
      <h1>Home</h1>

      <!-- Selection Section  -->
       <v-col align="center">
        <v-row>
          <h2>Pilih Bencana</h2>  
        </v-row>
        <v-row>
          <v-select
            :items="shelterDisasterNames"
            v-model="selectedShelterDisasterName"
          ></v-select>
        </v-row>
      </v-col>
      <v-col align="center">
        <v-row>
          <h2>Pilih Posko</h2>  
        </v-row>
        <v-row>
          <v-select
            :items="shelterNames"
            v-model="selectedShelterName"
          ></v-select>
        </v-row>
      </v-col>
      <v-btn v-on:click="btnClickLihat">Lihat</v-btn>

      <!-- Map Section-->
      <div>
        <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true" data-projection="EPSG:4326" style="height: 400px">
          <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation"></vl-view>

          <vl-layer-tile>
            <vl-source-osm></vl-source-osm>
          </vl-layer-tile>

          <vl-layer-vector>
            <vl-feature>

              <vl-geom-point
                :coordinates="[12.492442,41.890170]"
              ></vl-geom-point>
              <!-- <vl-style-box>
                <vl-style-circle :radius="20">
                  <vl-style-fill color="white"></vl-style-fill>
                  <vl-style-stroke color="red"></vl-style-stroke>
                </vl-style-circle>
              </vl-style-box> -->

              <vl-geom-point
                :coordinates="[-1,2]"
              ></vl-geom-point>
              <vl-style-box>
                <vl-style-circle :radius="20">
                  <vl-style-fill color="red"></vl-style-fill>
                  <vl-style-stroke color="white"></vl-style-stroke>
                </vl-style-circle>
              </vl-style-box>

            </vl-feature>

            <vl-feature>

              <vl-geom-point
                :coordinates="[12.492442,41.890170]"
              ></vl-geom-point>
              <!-- <vl-style-box>
                <vl-style-circle :radius="20">
                  <vl-style-fill color="white"></vl-style-fill>
                  <vl-style-stroke color="red"></vl-style-stroke>
                </vl-style-circle>
              </vl-style-box> -->

              <!-- <vl-geom-point
                :coordinates="[-1,2]"
              ></vl-geom-point> -->
              <vl-style-box>
                <vl-style-circle :radius="20">
                  <vl-style-fill color="red"></vl-style-fill>
                  <vl-style-stroke color="white"></vl-style-stroke>
                </vl-style-circle>
              </vl-style-box>

            </vl-feature>
          </vl-layer-vector>
        </vl-map>
      </div>


      <canvas id="victim-by-gender"></canvas>
      <canvas id="victim-by-age"></canvas>
      <canvas id="victim-by-condition"></canvas>
    </div>
  </div>
</template>

<style scoped>
  @import "~leaflet/dist/leaflet.css";
  h1 {
    color: blue
  }
  .bg {
    background-color: #d9d9d9;
  }
  .content {
    max-width: 960px;
    margin: auto;
    background-color: white;
  }
</style>

<script>
  import axios from 'axios';

  var victimTemplateChart = {
    type: 'horizontalBar',
    data: {
      labels: [],
      datasets: [
        { 
          label: '',
          data: [],
          backgroundColor: [],
          borderWidth: 1.5
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "",
        fontSize: 16
      },
      responsive: true,
      lineTension: 1,
      scales: {
        xAxes: [{
          ticks: {
            beginAtZero: true,
            padding: 25,
          }
        }]
      }
    }
  }

  const victimData = {
    Gender: {
      title: "Gender",
      label: ["Laki-laki", "Perempuan"],
      count: [20, 40]
    },
    Age: {
      title: "Age",
      label: ["<10", "10-20", "20-30", "30-40", "40-50", "50-60", "60-70", ">70"],
      count: [10, 20, 40, 15, 20, 30, 10, 5]
    },
    Condition: {
      title: "Condition",
      label: ["Hidup", "Meninggal"],
      count: [55, 30]
    }
  } 


export default {

  data () {
    return {
      victimTemplateChart,
      victimData,

      //general data
      dashboardData: [],
      disastersData: [],

      //selection section
      shelterList: [],
      shelterDisasterNames: [],
      selectedShelterDisasterName: "",
      selectedShelterName: "",
      shelterNames: [],
      shelterDisasterCoordinates: null,

      //map section
      zoom: 15,
      center: [12.492442,41.890170],
      rotation: 0,

      mapOptions: {
        attributionControl: false
      },
      currentStrokeColor: '3d3213'
    }
  },

  watch: {
      selectedShelterDisasterName: function (val) {
        this.shelterNames = this.shelterList.filter(function(obj){
          return obj.DisasterName == val
          }).map(x=>x.Name)
      },
    },

  methods: {
    createChart(chartId) {
      const ctx = document.getElementById(chartId);
      
      if (chartId == 'victim-by-gender') { 
        var chartData = this.fillData("Gender")
      }
      else if (chartId == 'victim-by-age') {
        var chartData = this.fillData("Age")
      }
      else if (chartId == 'victim-by-condition') {
        var chartData = this.fillData("Condition")
      }

      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options,
      });
    },

    btnClickLihat (event) {
      console.log("Button CLicked")
    },


    fillData(idx){
      let label = this.victimData[idx].label
      let count = this.victimData[idx].count
      let title = this.victimData[idx].title

      var result = this.victimTemplateChart
      result.data.labels = label
      result.data.datasets[0].data = count
      result.data.datasets[0].label = title
      result.options.title.text = `Victim by ${title}`
      var dataColor = 'rgba(54,73,93,.5)'
      // for(let i = 0; i < label.length; i++) { 
      //   dataColor.push('#8b0000') 
      //   }
      result.data.datasets.backgroundColor = dataColor
      return result
    },
  },

  mounted () {
    axios.all([
      axios.get("http://localhost:3000/shelter"),
      axios.get("http://localhost:3000/disaster"),
      axios.get("http://localhost:3000/dashboard"),
    ])
      .then(response => {
        this.shelterList = response[0].data.data
        this.disastersData = response[1].data.data
        this.dashboardData = response[2].data.data

        this.shelterDisasterNames = this.disastersData.map(x=>x.Name)
        this.shelterDisasterCoordinates = this.disastersData.map(x=>[x.Latitude, x.Longitude])
      })
      .catch(error => {
        this.errors.push(error)
        console.log(error)
      })

    this.createChart('victim-by-gender');
    this.createChart('victim-by-age');
    this.createChart('victim-by-condition');
  }
}

</script>

