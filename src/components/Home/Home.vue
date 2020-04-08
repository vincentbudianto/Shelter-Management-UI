<template>
  <div class="bg">
    <div class="content">
      <h1 id="dashboard-title">Disaster Dashboard</h1>

      <v-row>
        <v-col id="selection-and-overview">
          <!-- Selection Section  -->
          <v-col align="left">
            <v-row>
              <v-select
                :items="shelterDisasterNames"
                v-model="selectedShelterDisasterName"
                placeholder="Pilih bencana"
              ></v-select>
            </v-row>
            <v-btn v-on:click="btnClickLihatBencana">Lihat Bencana</v-btn>
          </v-col>
          <v-col align="left" v-if="selectedShelterDisasterName">
            <v-row>
              <v-select
                :items="shelterNames"
                v-model="selectedShelterName"
                placeholder="Pilih posko"
              ></v-select>
            </v-row>  
            <v-btn v-on:click="btnClickLihatPosko">Lihat Posko</v-btn>
          </v-col>

          <!-- Overview Section -->
          <div>
            <div v-if="currentDashboardScope == 'Pada bencana'">
              <a>{{selectedShelterDisasterName}}</a>
              <a>Skala:{{selectedShelterDisasterScale}}</a>
            </div>
            <div v-if="currentDashboardScope == 'Pada posko'">
              <a>{{selectedShelterName}}</a>
            </div>
            <div>
              <a>Jumlah Korban</a>
              <a>{{countVictimInCurrentScope}}</a>
              <a>orang</a>
              <a>{{currentDashboardScope}}</a>
            </div>
          </div>
        </v-col>
        
        <v-col>
          <!-- Map Section-->
          <div>
            <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true" data-projection="EPSG:4326" style="height: 400px">
              <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation"></vl-view>

              <vl-layer-tile>
                <vl-source-osm></vl-source-osm>
              </vl-layer-tile>

              <!-- Render points and information per disaster -->
                <vl-feature v-for="coordinate in renderedCoordinates" v-bind:key="coordinate.ID">
                  <vl-geom-point
                    :coordinates="[parseFloat(coordinate.Longitude), parseFloat(coordinate.Latitude)]"
                  ></vl-geom-point>
                  <vl-style-box>
                    <vl-style-circle :radius="20">
                      <vl-style-fill color="red"></vl-style-fill>
                      <vl-style-stroke color="white"></vl-style-stroke>
                    </vl-style-circle>
                  </vl-style-box>

                  <vl-overlay :position="[parseFloat(coordinate.Longitude), parseFloat(coordinate.Latitude)]">
                    <div class="overlay-content" v-if="currentDashboardScope == 'Pada seluruh bencana' || currentDashboardScope == 'Pada bencana'">
                      {{disasterData[coordinate.ID - 1].Name}}
                    </div>
                    <div class="overlay-content" v-if="currentDashboardScope == 'Pada posko'">
                      {{shelterData[coordinate.ID - 1].Name}}
                    </div>
                  </vl-overlay>
                </vl-feature>

            </vl-map>
          </div>
        </v-col>
      </v-row>

      <!-- chart section -->
      <!-- <canvas id="victim-by-gender"></canvas> -->
      <canvas id="victim-by-age"></canvas>
      <!-- <canvas id="victim-by-condition"></canvas> -->
    </div>
  </div>
</template>

<style scoped>
  @import "~leaflet/dist/leaflet.css";
  #dashboard-title {
    margin-left: 1%;
  }
  #selection-and-overview {
    max-width: 25%;
    margin-left: 1%;
  }
  .bg {
    background-color: #d9d9d9;
  }
  .content {
    max-width: 90%;
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


export default {

  data () {
    return {

      //general data
      dashboardData: [],
      disasterData: [],
      renderedDashboardData: [],
      shelterData: [],
      renderScope: "",

      //selection section
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
        this.shelterNames = this.shelterData.filter(function(obj){
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
      this.renderedCoordinates = [{"ID":selectedData.DisasterID, "Latitude":selectedData.Latitude, "Longitude":selectedData.Longitude}]
      this.center = [parseFloat(selectedData.Longitude), parseFloat(selectedData.Latitude)]
      this.countVictimInCurrentScope = this.countVictimInScope(selectedData.DisasterID, 'disaster')
      this.renderedDashboardData = this.searchSelectedDashboardData(selectedData.DisasterID)
      this.currentDashboardScope = "Pada bencana"
    },

    btnClickLihatPosko (event) {
      var selectedData = this.searchSelectedShelterData(this.selectedShelterName)[0]
      this.selectedShelterDisasterScale = ""
      this.renderedCoordinates = [{"ID":selectedData.ShelterID, "Latitude":selectedData.Latitude, "Longitude":selectedData.Longitude}]
      this.center = [parseFloat(selectedData.Longitude), parseFloat(selectedData.Latitude)]
      this.countVictimInCurrentScope = this.countVictimInScope(selectedData.ShelterID, 'shelter')
      this.renderedDashboardData = this.searchSelectedDashboardData(selectedData.ShelterID)
      console.log(this.renderedCoordinates)
      this.currentDashboardScope = "Pada posko"
    }, 
    
    searchSelectedDisasterData (selectedShelterDisasterName) {
      return (
        this.disasterData.filter(function (disaster) {
          return disaster.Name == selectedShelterDisasterName
        })
      )
    },

    searchSelectedShelterData (selectedShelterName){
      return (
        this.shelterData.filter(function (shelter) {
          return shelter.Name == selectedShelterName
        })
      )
    }, 

    searchSelectedDashboardData (ID, scope) {
      if (scope == 'disaster'){
        return (
          this.dashboardData.filter(function (data) {
            return data.DisasterID == ID
          })
        )
      }
      else{
        return (
          this.dashboardData.filter(function (data) {
            return data.ShelterID == ID
          })
        )
      }
    },

    countVictimInScope (ID, scope) {
      if (scope == 'disaster') {
        return (
          this.dashboardData.filter(function (victimData) {
            return victimData.DisasterID == ID
          }).length
        )
      }
      else {
        return (
          this.dashboardData.filter(function (victimData) {
            return victimData.ShelterID == ID
          }).length
        )
      }
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
        this.shelterData = response[0].data.data
        this.disasterData = response[1].data.data
        this.dashboardData = response[2].data.data

        this.shelterDisasterNames = this.disasterData.map(x=>x.Name)
        this.renderedCoordinates = this.disasterData.map(x=>({"ID":x.DisasterID, "Latitude":parseFloat(x.Latitude), "Longitude":parseFloat(x.Longitude)}))
        
        this.renderedDashboardData = this.dashboardData
        console.log("Rendered coordinates:", this.renderedCoordinates)
        this.countVictimInCurrentScope = this.dashboardData.length

        // this.createChart('victim-by-gender'); //gaada data gender. Anyway gender gapenting juga kayaknya. ntar liat lagi
        this.createChart('victim-by-age');
        // this.createChart('victim-by-condition');
      })
      .catch(error => {
        console.log(error)
      })
  }
}

</script>

