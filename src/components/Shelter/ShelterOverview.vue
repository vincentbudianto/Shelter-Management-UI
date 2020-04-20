<template>
<div class="container shelter-detail-container d-flex justify-content-center">
    <div class="col-md-12 shelter-detail-content-container">
        <h3>Shelter Detail</h3>
        <h4>{{details.Name}} - #{{details.ShelterID}}</h4>
        <div class="mapContainer">
          <vl-map
              :load-tiles-while-animating="true"
              :load-tiles-while-interacting="true"
              data-projection="EPSG:4326" >
            <vl-view ref="centerController" :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation"></vl-view>
            <vl-feature>
              <vl-geom-circle
                  :coordinates="currCenter"
                  :radius="100">
              </vl-geom-circle>
            </vl-feature>
            <vl-layer-tile id="osm">
              <vl-source-osm></vl-source-osm>
            </vl-layer-tile>
          </vl-map>
        </div>
        <v-row no-gutters>
          <template>
            <v-col>
              <v-card class="pa-1 small-expand-container" >
                <v-expansion-panels multiple>
                  <v-expansion-panel>
                    <v-expansion-panel-header>Details</v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <table class="table">
                        <tbody>
                          <tr>
                            <th scope="row">Bencana</th>
                            <td>{{details.DisasterName}} {{details.DisasterID}}</td>
                          </tr>
                          <tr>
                            <th scope="row">Skala</th>
                            <td>{{details.Scale}}</td>
                          </tr>
                          <tr>
                            <th scope="row">District</th>
                            <td>{{details.District}}</td>
                          </tr>
                          <tr>
                            <th scope="row">City</th>
                            <td>{{details.City}}</td>
                          </tr>
                          <tr>
                            <th scope="row">Province</th>
                            <td>{{details.Province}}</td>
                          </tr>
                          <tr>
                            <th scope="row">Country</th>
                            <td>{{details.Country}}</td>
                          </tr>
                        </tbody>
                      </table>
                    </v-expansion-panel-content>
                  </v-expansion-panel>

                  <v-expansion-panel>
                    <v-expansion-panel-header>
                      Stock
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <div class="table-responsive">
                        <table class="table table-fixed">
                          <thead>
                            <tr>
                              <th scope="col" class="col-1">#</th>
                              <th scope="col" class="col-8">Name</th>
                              <th scope="col" class="col-3">Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(stock, index) in stocks">
                              <th scope="row" class="col-1">{{index + 1}}</th>
                              <td class="col-8">{{stock.Name}}</td>
                              <td class="col-3">{{stock.Amount}}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </v-expansion-panel-content>
                  </v-expansion-panel>

                  <v-expansion-panel>
                    <v-expansion-panel-header>
                      Needs History
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <div class="button-container">
                        <v-btn class="ma-2 float-right" tile outlined color="success" @click="showNeedsModal">
                          Add New Data<v-icon right>mdi-plus-box</v-icon>
                        </v-btn>
                      </div>
                      <div class="table-responsive">
                        <table class="table table-fixed">
                          <thead>
                            <tr>
                              <th scope="col" class="col-1">#</th>
                              <th scope="col" class="col-8">Description</th>
                              <th scope="col" class="col-3">Timestamp</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(need, index) in needHist">
                              <th scope="row" class="col-1">{{index + 1}}</th>
                              <td class="col-8">{{need.Description}}</td>
                              <td class="col-3">{{need.Timestamp | moment}}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-card>
            </v-col>
            <v-col>
              <v-card class="pa-1 small-expand-container" >
                <v-expansion-panels multiple>
                  <v-expansion-panel>
                    <v-expansion-panel-header>Victim List</v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <div class="table-responsive">
                        <table class="table table-fixed">
                          <thead>
                            <tr>
                              <th scope="col" class="col-1">#</th>
                              <th scope="col" class="col-5">NIK</th>
                              <th scope="col" class="col-4">Name</th>
                              <th scope="col" class="col-2">Status</th>
                            </tr>
                          </thead>
                          <tbody style="max-height:300px">
                            <tr class="cursor-pointer" v-for="(victim, index) in victimList" v-on:click="goToVictimDetails(victim)">
                              <th scope="row" class="col-1">{{index + 1}}</th>
                              <td class="col-5">{{victim.NIK}}</td>
                              <td class="col-4">{{victim.Name}}</td>
                              <td class="col-2">{{victim.Status && 'Alive' || 'Dead'}}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </v-expansion-panel-content>
                  </v-expansion-panel>

                  <v-expansion-panel>
                    <v-expansion-panel-header>
                      Conditions History
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <div class="button-container">
                        <v-btn class="ma-2 float-right" tile outlined color="success" @click="showConditionModal">
                          Add New Data<v-icon right>mdi-plus-box</v-icon>
                        </v-btn>
                      </div>
                      <div class="table-responsive">
                        <table class="table table-fixed">
                          <thead>
                            <tr>
                              <th scope="col" class="col-3">#</th>
                              <th scope="col" class="col-3">Title</th>
                              <th scope="col" class="col-3">Description</th>
                              <th scope="col" class="col-3">Timestamp</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(condition, index) in conditionHist">
                              <th scope="row" class="col-3">{{index + 1}}</th>
                              <td class="col-3">{{condition.Title}}</td>
                              <td class="col-3">{{condition.Description}}</td>
                              <td class="col-3">{{condition.Timestamp | moment}}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-card>
            </v-col>
            <v-responsive width="100%" ></v-responsive>
          </template>
        </v-row>
    </div>
    <updateShelterConditionModal :shelter="details" v-show="conditionModalVisible" @close="closeConditionModal"/>
    <updateShelterNeedsModal :shelter="details" v-show="needsModalVisible" @close="closeNeedsModal"/>
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
  margin-bottom: 0.5rem;
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

.shelter-detail-container{
    margin-bottom: 5%;
    margin-top: -3%;
    padding-top: 3%;
}
.shelter-detail-content-container{
    padding: 3%;
    background:#232322;
    box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);
    color: #d9d9d9;
}
.shelter-detail-content-container h4{
    margin-bottom: 1%;
}

.v-expansion-panel-header {
  font-size: 1rem;
  font-weight: bolder;
}

.small-expand-container {
  background-color: transparent;
}
.button-container {
  position: relative;
}
.cursor-pointer {
  cursor: pointer;
}

.table-fixed tbody {
    max-height: 300px;
    overflow-y: auto;
    width: 100%;
}

.table-fixed thead,
.table-fixed tbody,
.table-fixed tr,
.table-fixed td,
.table-fixed th {
    display: block;
}

.table-fixed tbody td,
.table-fixed tbody th,
.table-fixed thead > tr > th {
    float: left;
    position: relative;

    &::after {
        content: '';
        clear: both;
        display: block;
    }
}
</style>
<script src="extensions/sticky-header/bootstrap-table-sticky-header.js"></script>
<script>
import axios from 'axios';
import moment from 'moment';
import updateShelterConditionModal from './UpdateShelterCondition.vue';
import updateShelterNeedsModal from './UpdateShelterNeeds.vue';

export default {
    data () {
      return {
        details: {},
        victimList: [],
        stocks: [],
        conditionHist: [],
        needHist: [],
        zoom: 5,
        currCenter: [0,0],
        center: [0,0],
        rotation: 0,
        errors: [],
        conditionModalVisible: false,
        needsModalVisible: false
      }
    },
    components: {
      updateShelterConditionModal,
      updateShelterNeedsModal
    },
    mounted(){
      this.getShelterDetail();
      this.getShelterVictimList();
      this.getShelterStock();
      this.getShelterConditionHistory();
      this.getShelterNeedHistory();
    },
    methods: {
      getShelterDetail: function() {
        axios.get('http://localhost:3000/shelter?id=' + this.$route.params.id)
        .then(response => {
          const data = response.data.data;
          const newCenter = [parseFloat(data.Longitude), parseFloat(data.Latitude)];

          this.details = data;
          this.validateUser();
          this.currCenter = newCenter;
          this.$refs.centerController.animate({zoom: 17});
          this.$refs.centerController.animate({center: newCenter});
        })
        .catch(e => {
          this.errors.push(e);
        })
      },
      getShelterVictimList: function() {
        axios.get('http://localhost:3000/shelter/victimList?id=' + this.$route.params.id)
        .then(response => {
          this.victimList = response.data.data;
        })
        .catch(e => {
          this.errors.push(e);
        })
      },
      getShelterStock: function() {
        axios.get('http://localhost:3000/shelter/stock?id=' + this.$route.params.id)
        .then(response => {
          this.stocks = response.data.data;
        })
        .catch(e => {
          this.errors.push(e);
        })
      },
      getShelterConditionHistory: function() {
        axios.get('http://localhost:3000/shelter/conditions?id=' + this.$route.params.id)
        .then(response => {
          this.conditionHist = response.data.data;
        })
        .catch(e => {
          this.errors.push(e);
        })
      },
      getShelterNeedHistory: function() {
        axios.get('http://localhost:3000/shelter/needs?id=' + this.$route.params.id)
        .then(response => {
          this.needHist = response.data.data;
        })
        .catch(e => {
          this.errors.push(e);
        })
      },
      goToVictimDetails: function(victim) {
        window.location.href = '?#/details/' + victim.VictimID;
      },
      showConditionModal(){
        this.conditionModalVisible = true
      },
      closeConditionModal(){
        this.conditionModalVisible = false
        this.getShelterConditionHistory()
      },
      showNeedsModal(){
        this.needsModalVisible = true
      },
      closeNeedsModal(){
        this.needsModalVisible = false
        this.getShelterNeedHistory()
      }, validateUser(){
          var aid = this.$cookies.get('AccountID');
          let currentObj = this;
          axios.get('http://localhost:3000/check/shelter/staff?staffId=' + aid + '&shelterId=' + currentObj.details.ShelterID)
          .then(response => {
              // JSON responses are automatically parsed.
              if(response.data.data.isStaffShelter == false){
                   currentObj.$router.push('/shelter');
              }
          })
          .catch(e => {
              this.errors.push(e)
          })
      }
    },
    filters:{
      moment: function(date){
        return moment(date).format('HH:mm:ss DD-MM-YYYY');
      }
    }
  }
</script>