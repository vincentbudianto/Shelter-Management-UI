<template>
  <div class="container d-flex justify-content-center">
    <div class="col-md-12 disaster-list-container">
      <v-col v-if="!inputMode">
        <v-row><h4>Daftar Bencana</h4></v-row>
        <v-row><v-btn v-if="!inputMode" v-on:click="addDisasterClick">Tambah Bencana</v-btn></v-row>
        <div>
          <v-row class="row disaster-list-item my-4 p-3" v-for="disaster in disasterList" v-bind:key="disaster.DisasterID">
            <v-col cols="10">
              <a>
                <b>Nama</b>: {{disaster.Name}}<br/>
                <b>Skala</b>: {{disaster.Scale}}<br/>
                <b>Status</b>: {{disaster.Status ? "Sedang terjadi - Active" : "Sudah Berakhir - Inactive"}}<br/>
                <b>Kondisi</b>: [{{disaster.ConditionTitle || "Belum diupdate"}}] {{disaster.ConditionDesc}}<br/>
                <b>Koordinat</b>: {{disaster.Latitude.toFixed(2) + ", " + disaster.Longitude.toFixed(2)}}<br/>
                <b>Terakhir diupdate</b>: {{disaster.Timestamp | moment}}
              </a>
            </v-col>
            <v-col class="d-flex justify-content-end align-items-end p-1" cols="2">
              <v-btn v-on:click="showModal(disaster)">Ubah</v-btn>
            </v-col>
          </v-row>
        </div>
      </v-col >
      <v-col v-if="inputMode">
        <div>
          <h4>Masukan Data Bencana</h4>
        </div>
        <div style="color: white">
          <v-form
            ref="form"
            v-model="valid"
          >
            <v-text-field
              v-model="inputNamaBencana"
              label="Nama Bencana"
              :rules="nameRules"
              required
              dark
            ></v-text-field>
            <v-select
              :items="scaleItems"
              :rules="scaleRules"
              v-model="inputSkalaBencana"
              label="Skala Bencana"
              required
              dark
            ></v-select>
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
          <div class="m-4 ml-0">
            <v-btn
              v-on:click="submitAddDisasterClick"
              :disabled="!valid"
              light
            >Tambahkan</v-btn>
          </div>
        </div>
      </v-col>
      <modal v-if="isModalVisible" @close="closeModal" v-bind:disaster="selectedDisaster"/>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding-top: 0rem;
  padding-bottom: 0rem;
}
.disaster-list-container {
  padding: 3%;
  background:#232322;
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);
  color: #d9d9d9;
}
.row {
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 10px;
  padding-bottom: 20px;
}
.disaster-list-item {
  border-radius: 0.2rem;
  background: white;
  color: black;
}
</style>

<script>
  import modal from './UpdateDisaster.vue';
  import axios from 'axios';
  import moment from 'moment';

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
        disasterList: [],
        errors: [],
        scaleItems: ['Small', 'Medium', 'Large'],
        valid: true,
        nameRules: [ v => !!v || 'Nama Bencana tidak boleh kosong' ],
        scaleRules: [ v => !!v || 'Skala Bencana tidak boleh kosong' ]
      }
    },
    mounted: function () {
      //get disaster list
      this.getDisasterList()
    },
    methods: {
      getDisasterList() {
        axios.get(process.env.API_ROUTE+'/disaster')
        .then(response => {
          this.disasterList = response.data.data
        })
        .catch(e => {
          this.errors.push(e)
        })
      },
      showModal(disaster) {
        this.selectedDisaster = disaster;
        this.isModalVisible = true;
      },
      closeModal() {
        this.selectedDisaster = undefined;
        this.isModalVisible = false;
        this.getDisasterList();
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
          this.inputMode = false
          this.getDisasterList()
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
    },
    beforeMount() {
      this.validateUser();
    },
    filters:{
      moment: function(date){
        if (moment(date).isValid())
          return moment(date).format('HH:mm:ss DD-MM-YYYY');
        else
          return '-'
      }
    }
  }
</script>