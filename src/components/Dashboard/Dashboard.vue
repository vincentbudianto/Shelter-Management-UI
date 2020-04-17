<template v-if="userValidated">
  <div class="bg mx-3">
    <div class="content mx-3 pb-3">

      <v-row>
        <v-col>
          <!-- Map Section-->
          <div>
            <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true" data-projection="EPSG:4326" style="height: 400px">
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
                        Bencana: {{disasterData[coordinate.ID - 1].Name}}
                      </div>
                      <div v-if="coordinate.Type == 'Shelter'">  
                        Posko: {{shelterData[coordinate.ID - 1].Name}} <br/>
                        Bencana: {{disasterData[renderedCoordinates[0].ID - 1].Name}}
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

      <div>
        <!-- Overview Section -->
        <div>
          
        </div>
        <!-- Selection Section  -->
        <div class="tile-box m-3 px-5">
          <div class="m-3 p-5">
            <h3 v-if="currentDashboardScope == 'Seluruh Bencana'" style="color: red">
              Menampilkan {{currentDashboardScope}} 
            </h3>
            <div v-if="currentDashboardScope == 'Bencana'">
              <h6>Menampilkan {{currentDashboardScope}} </h6>
              <h5 class="display-1" style="color: red; font-weight: bold">{{displaySelectedShelterDisasterName}} </h5>
              <h6>Skala</h6>
              <h5 class="display-1" style="font-weight: bold">{{selectedShelterDisasterScale}}</h5>
            </div>
            <div v-if="currentDashboardScope == 'Posko'">
              <h6>Menampilkan {{currentDashboardScope}}</h6>
              <h5 class="display-1"  style="color: red; font-weight: bold">{{displaySelectedShelterName}}</h5>
            </div>
            <div>
              <h6>Jumlah Korban</h6>
              <h3 class="display-3 font-weight-bold" style="font-size: 5em; color: red">
                {{countVictimInCurrentScope}}
              </h3>
            </div>
          </div>
          <div class="m-3 p-5">
              <h5 class="mb-3">Pilih Cakupan</h5>
              <v-row>
                <v-col id="selection-dropdown" class="w-75 px-2 py-0">
                    <v-select 
                      id="selection-dropdown"
                      :items="shelterDisasterNames"
                      v-model="selectedShelterDisasterName"
                      placeholder="Pilih bencana"
                      ></v-select>
                </v-col>
                <v-col class="px-2 py-2">
                  <v-btn id="selection-button" v-on:click="btnClickLihatBencana">
                    <a style="font-size: .75em">Lihat Bencana</a>
                  </v-btn>
                </v-col>
              </v-row>
              <v-row v-if="selectedShelterDisasterName">
                <v-col id="selection-dropdown" class="w-75">
                  <v-select
                    :items="shelterNames"
                    v-model="selectedShelterName"
                    placeholder="Pilih posko"
                  ></v-select>
                </v-col>
                <v-col id="selection-button" class="mt-1">
                  <v-btn v-on:click="btnClickLihatPosko">
                    <a style="font-size: .75em">Lihat Posko</a>
                  </v-btn>
                </v-col>
              </v-row>  
              <v-row>
                <v-col>
                  <v-btn v-on:click="btnClickLihatSeluruhBencana">
                    <span style="white-space: normal;">
                      <a style="font-size: .75em">Lihat Seluruh Bencana</a>
                    </span>
                  </v-btn>
                </v-col>
              </v-row>
          </div>
        </div>
      </div>

      <!-- chart section -->
      <!-- <canvas id="victim-by-gender"></canvas> -->
      <div class="m-3 tile-box" style="position: relative; height:50vh; width:50vw">
        <canvas id="victim-by-age"></canvas>
      </div>
      <!-- <canvas id="victim-by-condition"></canvas> -->
    </div>
  </div>
</template>

<style scoped>
  @import "~leaflet/dist/leaflet.css";
  #dashboard-title {
    margin-left: 1%;
  }
  .tile-box {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    background-color: rgb(250, 250, 250);
  }
  .bg {
    background-color: white;
  }
  .content {
    background-color:#232322;
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
        axios.get("http://localhost:3000/shelter"),
        axios.get("http://localhost:3000/disaster"),
        axios.get("http://localhost:3000/dashboard"),
      ])
        .then(response => {
          console.log(this.$cookies.get("Type"), this.$cookies.get("AccountID"))
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
          window.location.replace('http://localhost:8000/#/login')
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
