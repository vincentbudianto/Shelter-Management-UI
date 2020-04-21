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
            <h4>Masukan Data Shelter</h4>
            <v-select 
              label="Nama Bencana" 
              :items="disasters" 
              item-text="Name" 
              item-value="DisasterID"
              v-model="inputDisasterID"/>
            <v-form ref="form">
                <v-text-field
                v-model="inputNamaShelter"
                label="Nama Shelter"
                ></v-text-field>
            </v-form>
            <v-form ref="form">
                <v-text-field
                v-model="inputNamaWilayah"
                label="Wilayah"
                ></v-text-field>
            </v-form>
            <v-form ref="form">
                <v-text-field
                v-model="inputNamaKota"
                label="Kota"
                ></v-text-field>
            </v-form>
            <v-form ref="form">
                <v-text-field
                v-model="inputNamaProvinsi"
                label="Provinsi"
                ></v-text-field>
            </v-form>
            <v-form ref="form">
                <v-text-field
                v-model="inputNamaCountry"
                label="Negara"
                ></v-text-field>
            </v-form>
            <v-form ref="form">
                <v-text-field
                v-model="inputLatitude"
                label="Koordinat tempat bencana (Garis Lintang/Latitude)"
                ></v-text-field>
            </v-form>
            <v-form ref="form">
                <v-text-field
                v-model="inputLongitude"
                label="Koordinat tempat bencana (Garis Bujur/Longitude)"
                ></v-text-field>
            </v-form>
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
    methods:{
        close(){
            this.$emit('close');
        },
        submitAddShelterClick(){
          var addShelterPostData = {
            'disasterID' : this.inputDisasterID,
            'name' : this.inputNamaShelter,
            'district': this.inputNamaWilayah,
            'city' : this.inputNamaKota,
            'province' : this.inputNamaProvinsi,
            'country' : this.inputNamaCountry,
            'longitude' : this.inputLongitude,
            'latitude' : this.inputLatitude,
          }
          axios.post(process.env.API_ROUTE+'/shelter', addShelterPostData)
          .then(response => {
            console.log(response)
          })
          .catch(e => {
            this.errors.push(e)
          })
          this.$emit('close');
        },
    },
    data () {
      var data = {
        inputDisasterID: "",
        inputNamaShelter: "",
        inputNamaWilayah: "",
        inputNamaKota: "",
        inputNamaProvinsi: "",
        inputNamaCountry: "",
        inputLongitude: "",
        inputLatitude: "",
        disasters: [],
      }

      return data;
    }
}
</script>