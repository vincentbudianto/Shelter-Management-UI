<template>
  <div class="p-4">
    <v-col v-if="!inputMode">
      <v-row><h4>Daftar Bencana</h4></v-row>
      <div class="px-5" style="max-width: 75%;">
        <v-row class="row disaster-list-item my-4 p-3" v-for="disaster in disasterList" v-bind:key="disaster.DisasterID">
          <v-col>
            <a>
              Nama Bencana: {{disaster.Name}}<br/>
              Skala Bencana: {{disaster.Scale}}<br/>
              Koordinat Bencana: {{disaster.Latitude.toFixed(2) + ", " + disaster.Longitude.toFixed(2)}}
            </a>
          </v-col>
          <v-col class="d-flex justify-content-end align-items-end p-1">
            <v-btn v-on:click="showModal(disaster)">Ubah</v-btn>
          </v-col>
        </v-row>
      </div>
      <v-row class="my-4"><v-btn v-if="!inputMode" v-on:click="addDisasterClick">Tambah Bencana</v-btn></v-row>
    </v-col >
    <v-col v-if="inputMode">
      <div>
        <h4>Masukan Data Bencana</h4>
      </div>
      <div>
        <v-form ref="form">
          <v-text-field
            v-model="inputNamaBencana"
            label="Nama Bencana"
          ></v-text-field>
        </v-form>
      </div>
      <div>
        <v-form ref="form">
          <v-text-field
            v-model="inputSkalaBencana"
            label="Skala Bencana"
          ></v-text-field>
        </v-form>
      </div>
      <div>
        <div class="h5 mb-0">Masukkan Koordinat Bencana</div>
        <div><small>Geser peta untuk menggerakkan titik ke lokasi bencana</small></div>
        <div class="h6 mb-0 mt-2">Koordinat Terpiih</div>
        <div><small>Lat: {{center[1].toFixed(2)}}, Long: {{center[0].toFixed(2)}}</small></div>
        <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true" data-projection="EPSG:4326" style="height: 400px">
          <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation"></vl-view>
          <vl-layer-tile>
            <vl-source-osm></vl-source-osm>
          </vl-layer-tile>
            <vl-feature>
              <vl-geom-point
                :coordinates="center"
              ></vl-geom-point>
              <vl-style-box>
                <vl-style-circle :radius="15">
                  <vl-style-fill color="red"></vl-style-fill>
                </vl-style-circle>
              </vl-style-box>
            </vl-feature>
        </vl-map>
      </div>
      <div class="d-flex flex-row">
        <div class="m-4 ml-0"><v-btn v-on:click="cancelAddDisasterClick">Kembali</v-btn></div>
        <div class="m-4 ml-0"><v-btn v-on:click="submitAddDisasterClick">Tambahkan</v-btn></div>
      </div>
    </v-col>
    <modal v-if="isModalVisible" @close="closeModal" v-bind:disaster="selectedDisaster"/>
  </div>
</template>

<style scoped>
h1 {
  color: red
}
.row {
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 10px;
  padding-bottom: 20px;
}
.disaster-list-item {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>

<script>
  import modal from './UpdateDisaster.vue';
  import axios from 'axios';

  export default {
    name: 'app',
    components: {
      modal,
    },
    data : {
      currentDisaster: '',
    },
    data () {
      return {
        selectedDisaster: undefined,
        isModalVisible: false,
        inputMode: false,
        inputNamaBencana: "",
        inputSkalaBencana: "",
        zoom: 6,
        center: [106.0, -6.0], //for Indonesia
        rotation: 0,
        geolocPosition: undefined,
        disasterList: []
      }
    },
    mounted: function () {
      //get disaster list
      axios.get(process.env.API_ROUTE+'/disaster')
            .then(response => {
              // JSON responses are automatically parsed.
              this.disasterList = response.data.data
              console.log(this.disasterList)
            })
            .catch(e => {
              this.errors.push(e)
            })
    },
    methods: {
      showModal(disaster) {
        this.selectedDisaster = disaster;
        this.isModalVisible = true;
      },
      closeModal() {
        this.selectedDisaster = undefined;
        this.isModalVisible = false;
      },
      addDisasterClick: function (event) {
        this.inputMode = true
      },
      submitAddDisasterClick: function (event) {
        var inputDisasterPostData = {
          "name": this.inputNamaBencana,
          "scale": this.inputSkalaBencana,
          "latitude": this.center[1],
          "longitude": this.center[0]
        }

        axios.post(process.env.API_ROUTE+'/disaster', inputDisasterPostData)
        .then(response => {
          console.log(response)
        })
        .catch(e => {
          this.errors.push(e)
        })
      },
      cancelAddDisasterClick: function (event) {
        this.inputMode = false
      },
      validateUser(){
          var aid = this.$cookies.get('AccountID');
          let currentObj = this;
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
    }, beforeMount() {
      this.validateUser();
    },
  }
</script>