<template>
<div class="container shelter-list-container d-flex justify-content-center">
    <div class="col-md-12 shelter-list-content-container">
        <h3>Shelter List</h3>
        <v-expansion-panels
            multiple
            class="floatingList"
          >
          <v-expansion-panel>
            <v-expansion-panel-header>
              <b>Shelters</b>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div v-for="shelter in shelters" class="shelterItem" v-bind:key="'item-' + shelter.ShelterID">
                <div v-on:click="focusOnShelter(shelter)" class="shelterItemName">
                  {{shelter.Name}}
                </div>
                <div v-if="shelter.District && shelter.City" class="shelterItemLocation">
                  {{shelter.District}}, {{shelter.City}}
                </div>
                <div v-else-if="shelter.District || shelter.City" class="shelterItemLocation">
                  {{shelter.District || shelter.City}}
                </div>
              </div>
              <!-- <div v-for="Index in 100" class="shelterItem">
                <div>shelter.Name</div>
                <div>shelter.District, shelter.City</div>
              </div> -->
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <div class="mapContainer">
          <vl-map
              :load-tiles-while-animating="true"
              :load-tiles-while-interacting="true"
              data-projection="EPSG:4326" >
            <vl-view ref="centerController" :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation"></vl-view>
            <vl-feature
                v-for="shelter in shelters"
                v-bind:key="'name-' + shelter.ShelterID">
              <vl-overlay :position="[parseFloat(shelter.Longitude),parseFloat(shelter.Latitude)]">
                <div class="overlay-content" v-on:click="goToShelterDetail(shelter)">
                  {{shelter.Name}}
                </div>
              </vl-overlay>
            </vl-feature>
            <vl-feature v-for="shelter in shelters" v-bind:key="'coor-' + shelter.ShelterID">
              <vl-geom-circle
                  :coordinates="[parseFloat(shelter.Longitude),parseFloat(shelter.Latitude)]"
                  :radius="100">
              </vl-geom-circle>
            </vl-feature>
            <vl-layer-tile id="osm">
              <vl-source-osm></vl-source-osm>
            </vl-layer-tile>
          </vl-map>
        </div>
    </div>
</div>
</template>

<style scoped>
.overlay-content{
  background-color:#FFFFFF;
  color: black;
  font-weight: bold;
  padding: 10px;
  width:auto;
  height: auto;
  cursor: pointer;
}

.mapContainer{
  width: 100%;
  height: 600px;
}

.floatingList{
  position: absolute;
  z-index: 1;
  background-color: white;
  margin-top: 5rem;
  margin-left: 1rem;
  border-radius: 0.5rem;
  max-height: 30rem;
  min-width: 15rem;
  max-width: 20rem;
  overflow: auto;
  opacity: 0.9;
  color: black;
  font-weight: bold;
}

@media screen and (max-width: 800px) {
  .floatingList {
    position: absolute;
    z-index: 1;
    background-color: white;
    margin-top: 1rem;
    margin-left: 3.5rem;
    border-radius: 0.5rem;
    max-height: 30rem;
    min-width: 6rem;
    max-width: 13.2rem;
    overflow: auto;
    opacity: 0.9;
    color: black;
    font-weight: bold;
  }

  .mapContainer{
    width: 100%;
    height: 27rem;
  }
}

.shelterItem {
  padding-bottom: 0.5rem;
  margin-top: 0.5rem;
  border-bottom: black;
  border-bottom-style: double;
}
.shelterItemName {
  font-weight: bolder;
  cursor: pointer;
}

.shelterItemLocation {
  font-weight: normal;
}

.shelter-list-container{
    margin-bottom: 5%;
    margin-top: -3%;
    padding-top: 3%;
}
.shelter-list-content-container{
    padding: 3%;
    background:#232322;
    box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);
    color: #d9d9d9;
}
.shelter-list-content-container h3{
    margin-bottom: 2%;
}
</style>

<script>
import axios from 'axios';
export default {
    data () {
      return {
        shelters:[],
        zoom: 5,
        center: [0,0],
        rotation: 0,
        errors: []
      }
    },
    mounted(){
      this.getShelterList();
    },
    methods: {
      getShelterList: function(){
        axios.get(process.env.API_ROUTE+'/shelter/all')
        .then(response => {
          const data = response.data.data;
          const newCenter = [parseFloat(data[0].Longitude), parseFloat(data[0].Latitude)];

          this.shelters = data;
          this.$refs.centerController.animate({zoom: 14});
          this.$refs.centerController.animate({center: newCenter});
        })
        .catch(e => {
          this.errors.push(e);
        })
      },
      focusOnShelter: function(shelterDetail) {
        const newCenter = [parseFloat(shelterDetail.Longitude), parseFloat(shelterDetail.Latitude)];
        this.$refs.centerController.animate({zoom: 17});
        this.$refs.centerController.animate({center: newCenter});
      },
      goToShelterDetail: function(shelter) {
        window.location.href = '/shelter/' + shelter.ShelterID;
      }, validateUser(){
          var aid = this.$cookies.get('AccountID');
          let currentObj = this;
          axios.get(process.env.API_ROUTE+'/check/staff?id=' + aid)
          .then(response => {
              // JSON responses are automatically parsed.
              if(response.data.data.isStaff == false){
                  axios.get(process.env.API_ROUTE+'/check/admin?id=' + aid)
                  .then(response => {
                      // JSON responses are automatically parsed.
                      if(response.data.data.isAdmin == false){
                          currentObj.$router.push('/login');
                      }
                  })
                  .catch(e => {
                      this.errors.push(e)
                  })
              }
          })
          .catch(e => {
              this.errors.push(e)
          })
      }
    }, beforeMount() {
      this.validateUser();
    },
  }
</script>