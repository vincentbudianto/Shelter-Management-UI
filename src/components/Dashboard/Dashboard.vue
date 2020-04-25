<template v-if="userValidated">
  <div class="bg">
    <div class="content">
    
      <div class="p-5">
        <h3 class="heading-font">Dashboard</h3>
      </div>

      <v-row class="map-container">
        <v-col class="pt-0">
          <!-- Map Section-->
          <div>
            <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true" data-projection="EPSG:4326" style="height:40rem">
              <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation"></vl-view>

              <vl-layer-tile>
                <vl-source-osm></vl-source-osm>
              </vl-layer-tile>

              <!-- Render points and information per disaster -->
                <vl-feature v-for="(coordinate, index) in renderedCoordinates" :key="index">
                  <vl-geom-point
                    :coordinates="[parseFloat(coordinate.Longitude), parseFloat(coordinate.Latitude)]"
                  ></vl-geom-point>
                  <vl-style-box>
                    <vl-style-circle :radius="15">
                      <vl-style-fill v-if="coordinate.Type == 'Disaster'" color="red"></vl-style-fill>
                      <vl-style-fill v-if="coordinate.Type == 'Shelter'" color="rgb(246, 152, 30)"></vl-style-fill>
                    </vl-style-circle>
                  </vl-style-box>

                  <vl-overlay :position="[parseFloat(coordinate.Longitude)+0.25, parseFloat(coordinate.Latitude)+0.25]">
                    <div class="overlay-content" v-if="currentDashboardScope == 'Seluruh Bencana' || currentDashboardScope == 'Bencana'">
                      <div v-if="coordinate.Type == 'Disaster'">  
                        Bencana: <b>{{disasterData[coordinate.ID - 1].Name}}</b>
                      </div>
                      <div v-if="coordinate.Type == 'Shelter'">  
                        Posko: <b>{{shelterData[coordinate.ID - 1].Name}}</b> <br/>
                        Bencana: <b>{{disasterData[renderedCoordinates[0].ID - 1].Name}}</b>
                      </div>
                    </div>
                    <div class="overlay-content" v-if="currentDashboardScope == 'Posko'">
                      {{shelterData[coordinate.ID - 1].Name}}
                    </div>
                  </vl-overlay>
                </vl-feature>
            </vl-map>
          </div>
        </v-col>
      </v-row>

      <v-row class="d-flex flex-wrap p-5">
        <v-col class="tile-box m-2 py-3 px-5 d-flex flex-row justify-content-between">
          <!-- Overview Section -->
            <v-col>
              <v-row class="d-flex flex-column" v-if="currentDashboardScope == 'Seluruh Bencana'" >
                  <h3  style="color: red">
                    Menampilkan {{currentDashboardScope}} 
                  </h3>
                  <h5>Jumlah Bencana</h5>
                  <h1 class="display-4 font-weight-bold" style="font-size: 5em; color: red">
                    {{disasterData.length}}
                  </h1>
              </v-row>
              <v-row class="d-flex flex-column" v-if="currentDashboardScope == 'Bencana'">
                <h5>Menampilkan {{currentDashboardScope}} </h5>
                <h3 class="display-1" style="color: red; font-weight: bold">{{displaySelectedShelterDisasterName}} </h3>
                <h5>Skala</h5>
                <h5 class="display-1" style="font-weight: bold">{{selectedShelterDisasterScale}}</h5>
              </v-row>
              <v-row class="d-flex flex-column" v-if="currentDashboardScope == 'Posko'">
                <h5>Menampilkan {{currentDashboardScope}}</h5>
                <h5 class="display-1"  style="color: red; font-weight: bold">{{displaySelectedShelterName}}</h5>
              </v-row>
              <v-row class="d-flex flex-column">
                <h5>Jumlah Korban</h5>
                <h1 class="display-4 font-weight-bold" style="font-size: 5em; color: red">
                  {{countVictimInCurrentScope}}
                </h1>
              </v-row>
            </v-col>
        </v-col>
        <v-col class="tile-box m-2 px-3 py-5 d-flex flex-column">
          <!-- Selection Section  -->
            <h4 class="my-5">Pilih Cakupan</h4>
            <div class="d-flex flex-wrap">
              <div id="selection-dropdown" class="flex-grow-1 w-100 px-2 py-0">
                  <v-select 
                    id="selection-dropdown"
                    :items="shelterDisasterNames"
                    v-model="selectedShelterDisasterName"
                    placeholder="Pilih bencana"
                    ></v-select>
              </div>
              <div class="px-2 py-2">
                <v-btn id="selection-button" v-on:click="btnClickLihatBencana">
                  <a style="font-size: .75em">Lihat Bencana</a>
                </v-btn>
              </div>
            </div>
            <div v-if="selectedShelterDisasterName" class="d-flex flex-wrap">
              <div id="selection-dropdown" class="flex-grow-1 w-100 px-2 py-0">
                <v-select
                  :items="shelterNames"
                  v-model="selectedShelterName"
                  placeholder="Pilih posko"
                ></v-select>
              </div>
              <div id="selection-button" class="mt-1 px-2 py-2">
                <v-btn v-on:click="btnClickLihatPosko">
                  <a style="font-size: .75em">Lihat Posko</a>
                </v-btn>
              </div>
            </div>  
            <div class="px-2 py-2 flex-grow-1 d-flex flex-row align-items-end">
              <v-btn v-on:click="btnClickLihatSeluruhBencana">
                <span style="white-space: normal;">
                  <a style="font-size: .75em">Lihat Seluruh Bencana</a>
                </span>
              </v-btn>
            </div>
        </v-col>
        <v-col class="m-2 px-3 py-5 tile-box dashboard-container">
            <canvas id="victim-by-age"></canvas>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<style scoped>
  @import "~leaflet/dist/leaflet.css";
  .heading-font {
    color: #d9d9d9;
  }
  #dashboard-title {
    margin-left: 1%;
  }
  .tile-box {
    background-color: rgb(250, 250, 250);
    border-radius: .5rem;
  }
  .bg {
    background-color:white;
  }
  .content {
    margin: 0rem 4rem 4rem 4rem;
    padding: 0rem 1.5rem 0rem;
    box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);
    background-color: #232322;
  }
  .dashboard-container {
    position: relative;
  }
  .map-container {
    padding: 0rem 3rem 0rem;
  }
  @media screen and (max-width: 800px){
    .content {
      margin: 0rem;
      padding: 0rem .25rem 0rem;
      box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);
      background-color: #232322;
    }
    .map-container {
    padding: 0rem .5rem 0rem;
  }
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
      userValidated: false,
      dashboardData: [],
      disasterData: [],
      renderedDashboardData: [],
      shelterData: [],
      renderScope: "",

      //overview section
      displaySelectedShelterDisasterName: "",
      displaySelectedShelterName: "",

      //selection section
      shelterDisasterNames: [],
      selectedShelterDisasterName: "",
      selectedShelterDisasterScale: "",
      renderedCoordinates: [],
      selectedShelterName: "",
      shelterNames: [],

      //map section
      zoom: 6,
      // center: [106, -6], //for Indonesia
      center: [0, 0],
      rotation: 0,

      //chart section
      countVictimInCurrentScope: "0",
      currentDashboardScope: "Seluruh Bencana",
      victimTemplateChart,
      victimData: {
        Gender: {
          title: "Gender",
          label: ["Laki-laki", "Perempuan"],
          count: []
        },
        Age: {
          title: "Umur",
          label: ["<10", "10-19", "20-39", "40-59", "60-79", ">79"],
          count: []
        },
        Condition: {
          title: "Kondisi",
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
        var disasterData = this.disasterData

        this.shelterNames = this.shelterData.filter(function(obj){
          let selectedShelterDisasterID = disasterData.filter(function(objDisaster){
            return objDisaster.Name == val 
          })[0].DisasterID

          console.log("print selected", selectedShelterDisasterID)
          return obj.DisasterID == selectedShelterDisasterID
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
      this.renderedCoordinates = [{
        "ID":selectedData.DisasterID, 
        "Latitude":selectedData.Latitude, 
        "Longitude":selectedData.Longitude, 
        "Type":"Disaster"}]
      this.renderedCoordinates = this.renderedCoordinates.concat(this.getDisasterShelterCoordinates(selectedData.Name))
      this.center = [parseFloat(selectedData.Longitude), parseFloat(selectedData.Latitude)]
      this.countVictimInCurrentScope = this.countVictimInScope(selectedData.DisasterID, 'disaster')
      this.renderedDashboardData = this.searchSelectedDashboardData(selectedData.DisasterID)
      this.currentDashboardScope = "Bencana"
      this.displaySelectedShelterDisasterName = this.selectedShelterDisasterName
    },

    btnClickLihatPosko (event) {
      var selectedData = this.searchSelectedShelterData(this.selectedShelterName)[0]
      this.selectedShelterDisasterScale = ""
      this.renderedCoordinates = [{
        "idx":0,
        "ID":selectedData.ShelterID, 
        "Latitude":selectedData.Latitude, 
        "Longitude":selectedData.Longitude, 
        "Type":"Shelter"}]
      this.center = [parseFloat(selectedData.Longitude), parseFloat(selectedData.Latitude)]
      this.countVictimInCurrentScope = this.countVictimInScope(selectedData.ShelterID, 'shelter')
      this.renderedDashboardData = this.searchSelectedDashboardData(selectedData.ShelterID)
      this.currentDashboardScope = "Posko"
      this.displaySelectedShelterName = this.selectedShelterName
    }, 

    btnClickLihatSeluruhBencana (event) {
      this.renderedCoordinates = this.disasterData.map((x, idx)=>({
          "idx": idx,
          "ID":x.DisasterID, 
          "Latitude":parseFloat(x.Latitude), 
          "Longitude":parseFloat(x.Longitude), 
          "Type":"Disaster"}))
        
        this.center = [this.disasterData[0].Longitude, this.disasterData[0].Latitude]
        this.renderedDashboardData = this.dashboardData
        this.countVictimInCurrentScope = this.dashboardData.length
        this.currentDashboardScope = "Seluruh Bencana"
        this.selectedShelterDisasterName = ""
        this.selectedShelterName = ""
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

    getDisasterShelterCoordinates (val) {
      return this.shelterData.filter(function(obj){
          return obj.DisasterName == val
          })
          .map(x=>({
              "ID":x.ShelterID,
              "Latitude":x.Latitude,
              "Longitude":x.Longitude,
              "Type":"Shelter"
                }))
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
        
        var bgColor = []
        for(let i = 0; i < chartData.data.datasets[0].data.length; i++){
        bgColor.push('red')
        }
        chartData.data.datasets[0].backgroundColor = bgColor

        chartData.options.maintainAspectRatio = false
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
      result.options.title.text = `Distribusi ${this.victimData[idx].title} Korban`
      result.data.datasets.backgroundColor = 'rgba(100,73,93,1)'

      if (idx == "Age") {
      result.data.datasets[0].data = this.countAgeData()
      }

      return result
    },

    getAllDashboardData () {
      axios.all([
        axios.get(process.env.API_ROUTE+"/shelter/all"),
        axios.get(process.env.API_ROUTE+"/disaster"),
        axios.get(process.env.API_ROUTE+"/dashboard"),
      ])
        .then(response => {
          
          this.shelterData = response[0].data.data
          this.disasterData = response[1].data.data
          this.dashboardData = response[2].data.data

          this.shelterDisasterNames = this.disasterData.map(x=>x.Name)
          this.renderedCoordinates = this.disasterData.map((x, idx)=>({
            "idx": idx,
            "ID":x.DisasterID, 
            "Latitude":parseFloat(x.Latitude), 
            "Longitude":parseFloat(x.Longitude), 
            "Type":"Disaster"}))
          
          this.renderedDashboardData = this.dashboardData
          this.countVictimInCurrentScope = this.dashboardData.length

          // this.createChart('victim-by-gender'); //gaada data gender. Anyway gender gapenting juga kayaknya. ntar liat lagi
          this.createChart('victim-by-age');
          // this.createChart('victim-by-condition');
        })
        .catch(error => {
          console.log(error)
        })
    },

    validateUserAccess () {
      var userID = this.$cookies.get("AccountID")

      axios.get(`http://localhost:3000/check/admin?id=${userID}`)
      .then(response => {
        console.log(response)
        if(response.data.data.isAdmin){
          this.userValidated = true
          this.getAllDashboardData()
        }
        else{
          window.location.href = '/login'
        }
      })
      .catch(error => {
        console.log("Validation Error:", error)
      })
    },
  },

  mounted () {
    this.validateUserAccess()
  }
}

</script>
