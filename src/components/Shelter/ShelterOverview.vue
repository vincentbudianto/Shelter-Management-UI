<template>
  <div class="bg">
    <v-container fluid class="content">
      <div class="box" id="map">
        <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true"
             data-projection="EPSG:4326">
          <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation"></vl-view>
          <vl-feature>
            <vl-overlay :position="[parseFloat(this.shelter.Longitude),parseFloat(this.shelter.Latitude)]">
                <div class="overlay-content">
                  {{shelter.Name}}<br>
                </div>
            </vl-overlay>
          </vl-feature>
          <vl-feature>
            <vl-geom-circle :coordinates="[parseFloat(shelter.Longitude),parseFloat(shelter.Latitude)]" :radius="100"></vl-geom-circle>
          </vl-feature>
          <vl-layer-tile id="osm">
            <vl-source-osm></vl-source-osm>
          </vl-layer-tile>
        </vl-map>
      </div>
      <div class="details">
        <v-col>
          <a>Nama Posko: {{shelter.Name}}</a><br>
          <a>Lokasi Posko: {{shelter.Location}}</a><br>
          <a>Koordinat: [{{shelter.Longitude}}, {{shelter.Latitude}}]</a><br>
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
import axios from 'axios';
export default {
    data () {
      return {
        countShelterVictims: null,
        shelter:null,
        zoom: 14,
        center: [107.612163,-6.878664],
        rotation: 0,
        victims: []
      }
    },
    mounted(){
      this.getShelterData();
    },
    methods: {
      getShelterData: function(){
        axios.get('http://localhost:3000/shelter/get?id=' + this.$route.params.id)
        .then(response =>{
          this.shelter = response.data.data[0];
          this.center[0] = parseFloat(this.shelter.Longitude);
          this.center[1] = parseFloat(this.shelter.Latitude);
          console.log(this.shelter);
        })
        .catch(e=>{
          this.errors.push(e)
        })
      }
    }
  }
</script>