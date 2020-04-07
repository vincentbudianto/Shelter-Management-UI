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
        <v-btn v-on:click="btnClickLihatBencana">Lihat Bencana</v-btn>
      </v-col>
      <v-col align="center" v-if="selectedShelterDisasterName">
        <v-row>
          <h2>Pilih Posko</h2>  
        </v-row>
        <v-row>
          <v-select
            :items="shelterNames"
            v-model="selectedShelterName"
          ></v-select>
        </v-row>  
        <v-btn v-on:click="btnClickLihatPosko">Lihat Posko</v-btn>
      </v-col>

      <!-- Map Section-->
      <div>
        <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true" data-projection="EPSG:4326" style="height: 400px">
          <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation"></vl-view>

          <vl-layer-tile>
            <vl-source-osm></vl-source-osm>
          </vl-layer-tile>

            <!-- Render points and information per disaster -->
              <vl-feature v-for="coordinate in renderedCoordinates" v-bind:key="coordinate.DisasterID">
                <vl-geom-point
                  :coordinates="[coordinate.Longitude, coordinate.Latitude]"
                ></vl-geom-point>
                <vl-style-box>
                  <vl-style-circle :radius="20">
                    <vl-style-fill color="red"></vl-style-fill>
                    <vl-style-stroke color="white"></vl-style-stroke>
                  </vl-style-circle>
                </vl-style-box>

                <vl-overlay :position="[coordinate.Longitude, coordinate.Latitude]">
                  <div class="overlay-content">
                    {{disastersData[coordinate.DisasterID - 1].Name}}
                  </div>
                </vl-overlay>
              </vl-feature>

        </vl-map>
      </div>

      <!-- chart section -->
      <div>
        <div v-if="selectedShelterDisasterName">
          <a>{{selectedShelterDisasterName}}</a>
          <a>Skala:{{selectedShelterDisasterScale}}</a>
        </div>
        <div>
          <a>Jumlah Korban</a>
          <a>{{countVictimInCurrentScope}}</a>
          <a>orang</a>
          <a>{{currentDashboardScope}}</a>
        </div>
      </div>
      <!-- <canvas id="victim-by-gender"></canvas> -->
      <canvas id="victim-by-age"></canvas>
      <!-- <canvas id="victim-by-condition"></canvas> -->
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
  .overlay-content{
  background-color:#FFFFFF;
  padding: 10px;
  width:auto;
  height: auto;
}
</style>

<script>
  import axios from 'axios';

  const victimTemplateChart = {
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
  
  // victimData = {
  //   Gender: {
  //     title: "Gender",
  //     label: ["Laki-laki", "Perempuan"],
  //     count: [20, 40]
  //   },
  //   Age: {
  //     title: "Age",
  //     label: ["<10", "10-19", "20-39", "40-59", "60-79", ">79"],
  //     count: [10, 20, 40, 15, 20, 30, 10, 5]
  //   },
  //   Condition: {
  //     title: "Condition",
  //     label: ["Hidup", "Meninggal"],
  //     count: [55, 30]
  //   }
  // } 


export default {

  data () {
    return {

      //general data
      dashboardData: [],
      disastersData: [],
      renderedDashboardData: [],

      //selection section
      shelterList: [],
      shelterDisasterNames: [],
      selectedShelterDisasterName: "",
      selectedShelterDisasterScale: "",
      renderedCoordinates: [],
      selectedShelterName: "",
      shelterNames: [],

      //map section
      zoom: 5,
      // center: [106, -6], //for Indonesia
      center: [0, 0],
      rotation: 0,
      shelterDisasterCoordinates: [],

      //chart section
      countVictimInCurrentScope: "0",
      currentDashboardScope: "Pada seluruh bencana",
      victimTemplateChart,
      victimData: {
        Gender: {
          title: "Gender",
          label: ["Laki-laki", "Perempuan"],
          count: []
        },
        Age: {
          title: "Age",
          label: ["<10", "10-19", "20-39", "40-59", "60-79", ">79"],
          count: []
        },
        Condition: {
          title: "Condition",
          label: ["Hidup", "Meninggal"],
          count: []
        }
      },

      //setup
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

      renderedDashboardData: function () {
        this.createChart('victim-by-age');
      }
    },

  methods: {
    btnClickLihatBencana (event) {
      //filter data to current disaster only
      var selectedData = this.searchSelectedDisasterData(this.selectedShelterDisasterName)[0]
      this.selectedShelterDisasterScale = selectedData.Scale
      this.renderedCoordinates = [{"DisasterID":selectedData.DisasterID, "Latitude":selectedData.Latitude, "Longitude":selectedData.Longitude}]
      this.countVictimInCurrentScope = this.countVictimInDisasterScope(selectedData.DisasterID)
      this.renderedDashboardData = this.searchSelectedDashboardData(selectedData.DisasterID)
      console.log("current rendered data: ", this.renderedDashboardData)
    },

    btnClickLihatPosko (event) {
      console.log("button licked")
    }, 

    searchSelectedDisasterData (selectedShelterDisasterName) {
      return (
        this.disastersData.filter(function (disaster) {
          return disaster.Name == selectedShelterDisasterName
        })
      )
    },

    searchSelectedDashboardData (disasterID) {
      return (
        this.dashboardData.filter(function (data) {
          return data.DisasterID == disasterID
        })
      )
    },

    countVictimInDisasterScope (disasterID) {
      return (
        this.dashboardData.filter(function (victimData) {
          return victimData.DisasterID == disasterID
        }).length
      )
    },

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

    countAgeData () {
      var result = [0, 0, 0, 0, 0, 0]

      this.renderedDashboardData.forEach(data => {
        // bins: "<10", "10-19", "20-39", "40-59", "60-79", ">79"
        if(data.VictimAge < 10){
          result[0] += 1
          }
        else if(data.VictimAge >= 10 && data.VictimAge < 20){
          result[1] += 1
          }
        else if(data.VictimAge >= 20 && data.VictimAge < 40){
          result[2] += 1
          }
        else if(data.VictimAge >= 40 && data.VictimAge < 60){
          result[3] += 1
          }
        else if(data.VictimAge >= 60 && data.VictimAge < 80){
          result[4] += 1
          }
        else if(data.VictimAge > 79){
          result[5] += 1
        }
      });
      return result
    },

    fillData(idx){
      var result = this.victimTemplateChart
      
      result.data.labels = this.victimData[idx].label
      result.data.datasets[0].label = this.victimData[idx].title
      result.options.title.text = `Victim by ${idx}`
      result.data.datasets.backgroundColor = 'rgba(100,73,93,1)'

      if (idx == "Age") {
      result.data.datasets[0].data = this.countAgeData()
      }

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
        this.shelterDisasterCoordinates = this.disastersData.map(x=>({"DisasterID":x.DisasterID, "Latitude":x.Latitude, "Longitude":x.Longitude}))
        
        this.renderedDashboardData = this.dashboardData
        this.renderedCoordinates = this.shelterDisasterCoordinates
        this.countVictimInCurrentScope = this.dashboardData.length

        // this.createChart('victim-by-gender'); //gaada data gender. Anyway gender gapenting juga kayaknya. ntar liat lagi
        this.createChart('victim-by-age');
        // this.createChart('victim-by-condition');
      })
      .catch(error => {
        this.errors.push(error)
        console.log(error)
      })
  }
}

</script>

