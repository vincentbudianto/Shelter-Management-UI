<template>
  <div class="bg">
    <v-container fluid class="content">
      <div class="box" id="map">
        <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true"
             data-projection="EPSG:4326">
          <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation"></vl-view>
          <vl-feature v-for="shelter in shelters" v-bind:key="shelter.ShelterID">
            <vl-overlay :position="[parseFloat(shelter.Longitude),parseFloat(shelter.Latitude)]">
                <div class="overlay-content" v-on:click="changeShelter(shelter)">
                  {{shelter.Name}}<br>
                </div>
            </vl-overlay>
          </vl-feature>
          <vl-feature v-for="shelter in shelters" v-bind:key="shelter.ShelterID">
            <vl-geom-circle :coordinates="[parseFloat(shelter.Longitude),parseFloat(shelter.Latitude)]" :radius="100"></vl-geom-circle>
          </vl-feature>
          <vl-layer-tile id="osm">
            <vl-source-osm></vl-source-osm>
          </vl-layer-tile>
        </vl-map>
      </div>
      <div class="details">
        <v-col>
          <a>Nama Posko: {{shelterName}}</a><br>
          <a>Lokasi Posko: {{shelterLocation}}</a><br>
          <a>Koordinat: [{{longitude}}, {{latitude}}]</a><br>
          <a>Total Korban pada posko: {{countShelterVictims}}</a><br>
        </v-col>
      </div>
    </v-container>
  </div>
</template>

<style scoped>
h1 {
  color: green
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
}
.overlay-content{
  background-color:#FFFFFF;
  padding: 10px;
  width:auto;
  height: auto;
}
.details{
  background-color: #E5E5E5;
  height: auto;
  width: 30%;
  margin: 1%;
}

#map{
  width: 60%;
  height: 600px;
  margin: 1%;
}
</style>

<script>
<<<<<<< HEAD
||||||| merged common ancestors
export default {
    data () {
      return {
        items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
        bencana: "",
        shelter: "",
        showDetail: false,
        shelterName: "",
        shelterLocation: "",
        countShelterVictims: "",
      }
    },

    methods: {
      btnClick: function(event){
        this.showDetail= true;
      }
    }
  }
=======
import axios from 'axios';
export default {
    data () {
      return {
        shelterName: "Cisitu A",
        shelterLocation: "Bandung",
        countShelterVictims: null,
        longitude : null,
        latitude : null,
        shelters:[],
        zoom: 14,
        center: [107.612163,-6.878664],
        rotation: 0,
        geolocPosition: undefined,
        victims: []
      }
    },
    mounted(){
      this.getShelterList();
    },
    methods: {
      getShelterList: function(){
        axios.get('http://localhost:3000/shelter')
        .then(response =>{
          this.shelters = response.data.data;
          this.center[0] = parseFloat(this.shelters[0].Longitude);
          this.center[1] = parseFloat(this.shelters[0].Latitude);
          this.changeShelter(this.shelters[0]);
        })
        .catch(e=>{
          this.errors.push(e)
        })
      },
      changeShelter:function(shelter){
        axios.get('http://localhost:3000/victim/search/shelter?id='+shelter.ShelterID)
        .then(response =>{
          this.victims = response.data.data;
          this.shelterName = shelter.Name;
          this.shelterLocation = shelter.City;
          this.longitude = shelter.Longitude;
          this.latitude = shelter.Latitude;
          this.countShelterVictims = this.victims.length;
        })
        .catch(e=>{
          this.errors.push(e)
        })
      }
    }
  }
>>>>>>> staging
</script>