<template>
  <div class="bg">
    <div class="content">
      <div class="box" id="map">
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
      </div>
      <div class="box" id="identity">
        <img v-bind:src="'data:image/png;base64,' +detail.Photo">
        <table class="details" id="details">
          <col width="10%">
          <col width="5%">
          <tr><td>NIK</td><td>:</td><td>{{detail.NIK}}</td></tr>
          <tr><td>NOKK</td><td>:</td><td>{{detail.NoKK}}</td></tr>
          <tr><td>Name</td><td>:</td><td>{{detail.Name}}</td></tr>
          <tr><td>Age</td><td>:</td><td>{{detail.Age}}</td></tr>
        </table>
      </div>
      <div class="box" id="location">
        <table class="details">
          <col width="35%">
          <tr>
            <td>Name</td>
            <td>Latitude</td>
            <td>Longitude</td>
            <td>Time</td>
          </tr>
          <tr v-for="location in locations">
            <td>{{location.Name}}</td>
            <td>{{location.Latitude}}</td>
            <td>{{location.Longitude}}</td>
            <td>{{location.Timestamp | moment}}</td>
          </tr>
        </table>
        <button type="button" class="btn" @click="showLocationModal">
                Change
        </button>
      </div>
      <div class="box" id="condAndNeeds">
        <table class="details" id="conditions">
          <col width="20%">
          <col width="45%">
          <tr>
            <td>Condition</td>
            <td>Description</td>
            <td>Status</td>
            <td>Time</td>
          </tr>
          <tr v-for="condition in conditions">
            <td>{{condition.Name}}</td>
            <td>{{condition.Desc}}</td>
            <td>{{condition.Status}}</td>
            <td>{{condition.Timestamp | moment}}</td>
          </tr>
        </table>
        <table class="details" id="conditions">
          <col width="70%">
          <tr>
            <td>Needs</td>
            <td>Time</td>
          </tr>
          <tr v-for="need in needs">
            <td>{{need.Needs}}</td>
            <td>{{need.Timestamp | moment}}</td>
          </tr>
        </table>
        <button type="button" class="btn" @click="showConditionModal">
                Change
        </button>
        <button type="button" class="btn" @click="showNeedsModal">
                Change
        </button>
      </div>
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
  border-radius: 25px;
  width: 100%
}
td{
  padding: 2%;
  font-family: Quattrocento;
}
img{
  align-self: center;
  max-width: 25%;
  margin: 2%;
}

.bg{
  background-color: #E5E5E5;
}
.content{
  max-width: 90%;
  margin: auto;
  background-color: #6C6C6C;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.box{
  width: 45%;
  height: 40%;
  background-color: #C4C4C4;
  border-radius: 25px;
  padding: 2%;
  margin: 2%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.btn{
  margin: 1%;
  width: 48%;
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
    this.getLocationHistory();
    this.getIdentity();
    this.getConditionHistory();
    this.getNeedHistory();
  },
  // Fetches posts when the component is created.
  methods: {
    getIdentity: function() {
      axios.get('http://localhost:3000/victim/detail?id=' + this.$route.params.id)
      .then(response => {
        // JSON responses are automatically parsed.
        this.detail = response.data.data;
      })
      .catch(e => {
        this.errors.push(e)
      })
    },
    getConditionHistory: function(){
      axios.get('http://localhost:3000/victim/history/condition?id='+ this.$route.params.id)
      .then(response =>{
        this.conditions = response.data.data;
      })
      .catch(e=>{
        this.errors.push(e)
      })
    },
    getNeedHistory: function(){
      axios.get('http://localhost:3000/victim/history/need?id=' + this.$route.params.id)
      .then(response =>{
        this.needs = response.data.data;
      })
      .catch(e =>{
        this.errors.push(e)
      })
    },
    getLocationHistory:function(){
      axios.get('http://localhost:3000/victim/history/shelter?id=' + this.$route.params.id)
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
    }

  },
  filters:{
    moment: function(date){
      return moment(date).format('HH:mm:ss DD-MM-YYYY');
    }
  }
}
</script>