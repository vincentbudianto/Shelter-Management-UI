<template>
  <div>
    <h1>Disaster</h1>

    <button type="button" class="btn" @click="showModal">Update Disaster</button>

    <modal v-show="isModalVisible" @close="closeModal"/>
    <v-col v-if="!inputMode">
      <h4>Disaster List</h4>
      <v-row v-for="disaster in disasterList" v-bind:key="disaster.DisasterID">
        <a>Nama Bencana: {{disaster.Name}}<br/>
        Skala Bencana: {{disaster.Scale}}<br/>
        Koordinat Bencana: {{disaster.Latitude + "," + disaster.Longitude}}<br/><br/></a>
      </v-row>
    </v-col >
    <v-btn v-if="!inputMode" v-on:click="addDisasterClick">Tambah Bencana</v-btn>
    <v-col v-if="inputMode">
      <h4>Masukan Data Bencana</h4>
      <v-form ref="form">
        <v-text-field
          v-model="inputNamaBencana"
          label="Nama Bencana"
        ></v-text-field>
      </v-form>
      <v-form ref="form">
        <v-text-field
          v-model="inputSkalaBencana"
          label="Skala Bencana"
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
        <v-btn v-on:click="submitAddDisasterClick">Tambahkan</v-btn>
        <v-btn v-on:click="cancelAddDisasterClick">Kembali</v-btn>
      </v-row>
    </v-col>
  </div>
</template>

<style scoped>
h1 {
  color: red
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
  data () {
    return {
      isModalVisible: false,
      inputMode: false,
      inputNamaBencana: "",
      inputSkalaBencana: "",
      inputLatitude: "",
      inputLongitude: "",
      disasterList: []
    }
  },

  mounted: function () {
    //get disaster list
    axios.get('http://localhost:3000/disaster')
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
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    addDisasterClick: function (event) {
      this.inputMode = true
    },
    submitAddDisasterClick: function (event) {
      var inputDisasterPostData = {
        "name": this.inputNamaBencana,
        "scale": this.inputSkalaBencana,
        "latitude": this.inputLatitude,
        "longitude": this.inputLongitude
      }

      axios.post('http://localhost:3000/disaster', inputDisasterPostData)
      .then(response => {
        console.log(response)
      })
      .catch(e => {
        this.errors.push(e)
      })
    },
    cancelAddDisasterClick: function (event) {
      this.inputMode = false
    }
  }
}
</script>