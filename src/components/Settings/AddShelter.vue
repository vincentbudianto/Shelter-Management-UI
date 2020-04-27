<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <header class="modal-header" id="modalTitle">
          <slot name="header">
            <h4>Masukan Data Shelter</h4>
            <button type="button" class="btn-close" @click="close" aria-label="Close modal">
              x
            </button>
          </slot>
        </header>
        <section class="modal-body" id="modalDescription">
          <slot name="body">
            <v-row>
              <v-col>
                <v-select 
                  label="Nama Bencana" 
                  :items="disasters" 
                  item-text="Name" 
                  item-value="DisasterID"
                  v-model="inputDisasterID"/>
                <span class="error-message" id="bencana_error"></span><br>
                <v-form ref="form">
                    <v-text-field
                    v-model="inputNamaShelter"
                    label="Nama Shelter"
                    ></v-text-field>
                </v-form>
                <span class="error-message" id="shelter_error"></span><br>
                <v-form ref="form">
                    <v-text-field
                    v-model="inputNamaWilayah"
                    label="Wilayah"
                    ></v-text-field>
                </v-form>
                <span class="error-message" id="wilayah_error"></span><br>
              </v-col>
              <v-col>
                <v-form ref="form">
                    <v-text-field
                    v-model="inputNamaKota"
                    label="Kota"
                    ></v-text-field>
                </v-form>
                <span class="error-message" id="kota_error"></span><br>
                <v-form ref="form">
                    <v-text-field
                    v-model="inputNamaProvinsi"
                    label="Provinsi"
                    ></v-text-field>
                </v-form>
                <span class="error-message" id="provinsi_error"></span><br>
                <v-form ref="form">
                    <v-text-field
                    v-model="inputNamaNegara"
                    label="Negara"
                    ></v-text-field>
                </v-form>
                <span class="error-message" id="negara_error"></span><br>
              </v-col>
            </v-row>
            <div>
              <div class="h5 mb-0">Masukkan Koordinat Bencana</div>
              <div><small>Geser peta untuk menggerakkan titik ke lokasi bencana</small></div>
              <div class="h6 mb-0 mt-2">Koordinat Terpilih : <small>Lat: {{center[1].toFixed(2)}}, Long: {{center[0].toFixed(2)}}</small></div>
              <vl-map ref="map" :load-tiles-while-animating="true" :load-tiles-while-interacting="true" data-projection="EPSG:4326" style="height: 300px; max-width: 400px">
                <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation" ></vl-view>
                <vl-layer-tile>
                  <vl-source-osm></vl-source-osm>
                </vl-layer-tile>
                <vl-interaction-select>
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
                </vl-interaction-select>
              </vl-map>
            </div>
            <v-row>
                <v-btn v-on:click="submitAddShelterClick">Tambahkan</v-btn>
                <v-btn v-on:click="close">Kembali</v-btn>
            </v-row>
          </slot>
        </section>
      </div>
    </div>
  </transition>
</template>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    margin: 5% 5% 5% 5%;
    overflow: auto;
  }

  .modal-header {
    padding: 10px;
    display: flex;
    border-bottom: 1px solid #232322;
    justify-content: space-between;
  }

  .modal-body {
    position: relative;
    padding-left: 20px;
    padding-right: 20px;
  }

  .btn-close {
    border: none;
    font-size: 20px;
	  padding-right: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #B7141F;
    background: transparent;
  }

  .error-message{
    color: red!important;
    font-size: 0.6em!important;
}
</style>
<script>
import axios from 'axios';
export default {
    name: 'addShelterModal',
    mounted : function(){
      axios.get(process.env.API_ROUTE+'/disaster')
        .then(response => {
          this.disasters = response.data.data
        })
        .catch(e => {
          this.errors.push(e)
        });
    },
    created() {
      this.interval = setInterval(this.checkRefreshMap, 2000)
    },
    methods:{
        close(){
            this.$emit('close');
        },
        submitAddShelterClick(){
          if (
            this.inputDisasterID != "" &&
            this.inputNamaShelter != "" &&
            this.inputNamaWilayah != "" &&
            this.inputNamaKota != "" &&
            this.inputNamaProvinsi != "" &&
            this.inputNamaNegara != ""
          ){
            var addShelterPostData = {
              'disasterID' : this.inputDisasterID,
              'name' : this.inputNamaShelter,
              'district': this.inputNamaWilayah,
              'city' : this.inputNamaKota,
              'province' : this.inputNamaProvinsi,
              'country' : this.inputNamaNegara,
              'longitude' : this.center[0].toFixed(6),
              'latitude' : this.center[1].toFixed(6),
            }
            axios.post(process.env.API_ROUTE+'/shelter', addShelterPostData)
            .then(response => {
              console.log(response)
            })
            .catch(e => {
              this.errors.push(e)
            })
            this.$emit('close');
          }
          else{
            if (this.inputDisasterID == "") {
              document.getElementById("bencana_error").innerHTML = "Tidak boleh kosong";
            }
            else{
              document.getElementById("bencana_error").innerHTML = "";
            }

            if (this.inputNamaShelter == "") {
              document.getElementById("shelter_error").innerHTML = "Tidak boleh kosong";
            }
            else{
              document.getElementById("shelter_error").innerHTML = "";
            }

            if (this.inputNamaWilayah == "") {
              document.getElementById("wilayah_error").innerHTML = "Tidak boleh kosong";
            }
            else{
              document.getElementById("wilayah_error").innerHTML = "";
            }

            if (this.inputNamaKota == "") {
              document.getElementById("kota_error").innerHTML = "Tidak boleh kosong";
            }
            else{
              document.getElementById("kota_error").innerHTML = "";
            }

            if (this.inputNamaProvinsi == "") {
              document.getElementById("provinsi_error").innerHTML = "Tidak boleh kosong";
            }
            else{
              document.getElementById("provinsi_error").innerHTML = "";
            }

            if (this.inputNamaNegara == "") {
              document.getElementById("negara_error").innerHTML = "Tidak boleh kosong";
            }
            else{
              document.getElementById("negara_error").innerHTML = "";
            }
          }
        },
        checkRefreshMap() {
          this.$refs.map.refresh();
        }
    },
    data () {
      var data = {
        inputDisasterID: "",
        inputNamaShelter: "",
        inputNamaWilayah: "",
        inputNamaKota: "",
        inputNamaProvinsi: "",
        inputNamaNegara: "",
        center: [106.0, -6.0],
        zoom: 6,
        rotation: 0,
        geolocPosition: undefined,
        disasters: [],
      }

      return data;
    }
}
</script>