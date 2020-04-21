<template>
  <div class="bg">
    <div class="content">
      <!-- <div class="box" id="map">
        <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true"
                data-projection="EPSG:4326" style="height: 400px">
          <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation"></vl-view>

          <vl-geoloc @update:position="geolocPosition = $event">
            <template slot-scope="geoloc">
              <vl-feature v-if="geoloc.position" id="position-feature">
                <vl-geom-point :coordinates="geoloc.position"></vl-geom-point>
                <vl-style-box>
                  <vl-style-icon src="_media/marker.png" :scale="0.4" :anchor="[0.5, 1]"></vl-style-icon>
                </vl-style-box>
              </vl-feature>
              <vl-feature>
                <vl-geom-circle :coordinates="[parseFloat(locations[0].Longitude), parseFloat(locations[0].Latitude)]" :radius="100"></vl-geom-circle>
              </vl-feature>
            </template>
          </vl-geoloc>

          <vl-layer-tile id="osm">
            <vl-source-osm></vl-source-osm>
          </vl-layer-tile>
        </vl-map>
      </div> -->

      <v-row class="d-flex justify-content-center w-100">
        <div class=" d-flex flex-column justify-content-center m-5 p-3 box" style="width: 300px; height: 500px">
          <!-- Identity Block -->
          <div class="m-2 d-flex justify-content-center">
            <h3>Profil Korban</h3>
          </div>
          <div class="d-flex justify-content-center m-2 h-75">
            <img style="max-width: 100%; max-height:100%; display:block" v-bind:src="'data:image/png;base64,' +detail.Photo">
          </div>
          <div class="mb-2 d-flex justify-content-center">
            <h5>{{detail.Name}}</h5>
          </div>
          <div class="mh-50"> 
            <div>
              <div class="font-weight-bold">NIK</div> <div class="mb-3">{{detail.NIK}}</div>
            </div>
            <div>
              <div class="font-weight-bold">NOKK</div> <div class="mb-3">{{detail.NOKK}}</div>
            </div>
            <div>
              <div class="font-weight-bold">Umur</div> <div class="mb-3">{{detail.Age}}</div>
            </div>
          </div>
        </div>
      </v-row>

      <v-row>
        <v-col class=" m-3 p-3 d-flex flex-column justify-content-center box">
          <!-- Location Block -->
          <div class="m-2 mb-0 d-flex justify-content-center">
            <h3 class="mb-1">Riwayat Posko</h3>
          </div>
          <div class="text-center mb-2">
            <small>Klik pada nama posko untuk melihat detil posko</small>
          </div>
          <v-row>
              <table class="table">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">Posko</th>
                    <th scope="col">Waktu</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(location, index) in locations" :key="index">
                    <td>{{location.Name}}</td>
                    <td>{{location.Timestamp | moment}}</td>
                  </tr>
                </tbody>
              </table>
          </v-row>
          <v-row class="d-flex justify-content-center align-items-end">
            <v-btn class="w-25" @click="showLocationModal">
                    Tambah
            </v-btn>
          </v-row>
        </v-col>

        <v-col class=" m-3 p-3 d-flex flex-column justify-content-center box">
          <!-- Condition Block -->
          <div class="m-2 d-flex justify-content-center">
            <h3>Riwayat Kondisi</h3>
          </div>
          <v-row>
              <table class="table">
                <thead class="thead-dark">  
                  <tr>
                    <th scope="col">Kondisi</th>
                    <th scope="col">Deskripsi</th>
                    <th scope="col">Status</th>
                    <th scope="col">Waktu</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="table-light" v-for="(condition, index) in conditions" :key="index">
                    <td>{{condition.Name}}</td>
                    <td>{{condition.Desc}}</td>
                    <td>{{condition.Status}}</td>
                    <td>{{condition.Timestamp | moment}}</td>
                  </tr>
                </tbody>
              </table>
          </v-row>
          <v-row class="d-flex justify-content-center align-items-end">
            <v-btn class="w-25" @click="showConditionModal">
                    Tambah
            </v-btn>
          </v-row>
        </v-col>

        <v-col class=" m-3 p-3 d-flex flex-column justify-content-center box">
          <!-- Need Block -->
          <div class="m-2 d-flex justify-content-center">
            <h3>Riwayat Kebutuhan</h3>
          </div>
          <v-row>
              <table class="table">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">Kebutuhan</th>
                    <th scope="col">Waktu</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(need, index) in needs" :key="index">
                    <td>{{need.Needs}}</td>
                    <td>{{need.Timestamp | moment}}</td>
                  </tr>
                </tbody>
              </table>
          </v-row>
          <v-row class="d-flex justify-content-center align-items-end">
            <v-btn class="w-25" @click="showNeedsModal">
                    Tambah
            </v-btn>
          </v-row>
        </v-col>
      </v-row>

    </div>
    <modalLocation v-show="locationModalVisible" @close="closeLocationModal"/>
    <modalCondition v-show="conditionModalVisible" @close="closeConditionModal"/>
    <modalNeeds v-show="needsModalVisible" @close="closeNeedsModal"/>
  </div>
</template>

<style scoped>
h1 {
  color: white;
}
table{
  background-color: white;
  padding: 20%;
  margin-left: 1%;
  margin-right: 1%;
  width: 100%
}
td{
  padding: 2%;
}
img{
  align-self: center;
  max-width: 25%;
  margin: 2%;
}

.bg{
  /* background-color: #E5E5E5; */
}
.content{
  max-width: 90%;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.box{
  /* width: 45%;
  height: 40%; */
  /* background-color: #C4C4C4; */
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);
  /* padding: 2%;
  margin: 2%; */
  
}
.btn{
  margin: 1%;
  width: 48%;
  border-radius: 5px;
  border: 1px solid black;
}

#map{
  width: 60%;
}

#condAndNeeds{
  width: 93%;
  height: 100%;
}
#conditions{
  height: 50%;
  width: 48%
}
#details{
  width: 70%;
}
</style>

<script>
import axios from 'axios';
import moment from 'moment';
import modalLocation from './ModalLocation.vue';
import modalCondition from './ModalCondition.vue';
import modalNeeds from './ModalNeeds.vue';

export default {
  data() {
    return {
      detail: null,
      conditions: [],
      needs : [],
      locations:[],
      errors: [],
      locationModalVisible: false,
      conditionModalVisible: false,
      needsModalVisible: false,
      zoom: 15,
      center: [0, 0],
      rotation: 0,
      geolocPosition: undefined
    }
  },
  components: {
    modalLocation,
    modalCondition,
    modalNeeds
  },

  mounted(){  
    this.getIdentityAndValidateUserAccess();
    this.getLocationHistory();
    this.getConditionHistory();
    this.getNeedHistory();
  },
  // Fetches posts when the component is created.
  methods: {
    getIdentityAndValidateUserAccess: function() {
      axios.get(process.env.API_ROUTE+'/victim/detail?id=' + this.$route.params.id)
      .then(response => {
        var userID = this.$cookies.get("AccountID")
        var detail = response.data.data
        var victimShelterID = detail.ShelterID

        return axios.all([
          axios.get(`http://localhost:3000/check/admin?id=${userID}`),
          axios.get(`http://localhost:3000/check/staff?id=${userID}`)
        ])
        .then(response => {
          if(!response[0].data.data.isAdmin && !response[1].data.data.isStaff){
            window.location.replace(process.env.APP_BASE_URL+'/search')
          }
          else{
            this.detail = detail
          }
        })
        .catch(error => {
          console.log("Validation Error:", error)
        })
      })
      .catch(e => {
        this.errors.push(e)
        console.log(e)
      })
    },
    getConditionHistory: function(){
      axios.get(process.env.API_ROUTE+'/victim/history/condition?id='+ this.$route.params.id)
      .then(response =>{
        this.conditions = response.data.data;
        console.log(response.data.data)
      })
      .catch(e=>{
        this.errors.push(e)
      })
    },
    getNeedHistory: function(){
      axios.get(process.env.API_ROUTE+'/victim/history/need?id=' + this.$route.params.id)
      .then(response =>{
        this.needs = response.data.data;
        console.log(response.data.data)
      })
      .catch(e =>{
        this.errors.push(e)
      })
    },
    getLocationHistory:function(){
      axios.get(process.env.API_ROUTE+'/victim/history/shelter?id=' + this.$route.params.id)
      .then(response =>{
        this.locations = response.data.data;
        this.center[1] = parseFloat(this.locations[0].Latitude);
        this.center[0] = parseFloat(this.locations[0].Longitude);
      })
      .catch(e =>{
        this.errors.push(e)
      })
    },

    showLocationModal(){
      this.locationModalVisible = true
    },
    closeLocationModal(){
      this.locationModalVisible = false
    },

    showConditionModal(){
      this.conditionModalVisible = true
    },
    closeConditionModal(){
      this.conditionModalVisible = false
    },

    showNeedsModal(){
      this.needsModalVisible = true
    },
    closeNeedsModal(){
      this.needsModalVisible = false
    },
  },

  filters:{
    moment: function(date){
      return moment(date).format('HH:mm:ss DD-MM-YYYY');
    }
  },
}
</script>