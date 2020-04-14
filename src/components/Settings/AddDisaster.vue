<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <header class="modal-header" id="modalTitle">
          <slot name="header">
            <button type="button" class="btn-close" @click="close" aria-label="Close modal">
              x
            </button>
          </slot>
        </header>
        <section class="modal-body" id="modalDescription">
          <slot name="body">
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
              <div class="h6 mb-0 mt-2">Koordinat Terpilih</div>
              <div><small>Lat: {{center[1].toFixed(2)}}, Long: {{center[0].toFixed(2)}}</small></div>
              <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true" data-projection="EPSG:4326" style="height: 300px; max-width: 400px">
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
            <div>
                <v-btn v-on:click="submitAddDisasterClick">Tambahkan</v-btn>
                <v-btn v-on:click="close">Kembali</v-btn>
            </div>
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
  }

  .modal-header {
    padding: 10px;
    display: flex;
    border-bottom: 1px solid #232322;
    justify-content: flex-end;
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
</style>
<script>
import axios from 'axios';
export default {
    name: 'addDisasterModal',
    methods:{
        close(){
          this.$emit('close');
        },
        submitAddDisasterClick(){
          var addDisasterPostData = {
            'name' : this.inputNamaBencana,
            'scale' : this.inputSkalaBencana,
            'latitude' : this.center[1],
            'longitude' : this.center[0]
          }
          console.log(addDisasterPostData);
          axios.post('http://localhost:3000/disaster', addDisasterPostData)
          .then(response => {
            console.log(response)
          })
          .catch(e => {
            this.errors.push(e)
          })
          this.$emit('close');
        }
    },
    data () {
      var data = {
        inputNamaBencana: "",
        inputSkalaBencana: "",
        center: [106.0, -6.0],
        zoom: 6,
        rotation: 0,
        geolocPosition: undefined,
      }

      return data;
    }
}
</script>