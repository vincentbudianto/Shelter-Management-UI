<<<<<<< HEAD
<template>
  <div>
    <h1>Shelter</h1>
  </div>
</template>

<style scoped>
h1 {
  color: green
}
</style>

<script>
</script>
||||||| merged common ancestors
=======
<template>
   <v-container fluid>
      <v-col align="center">
        <v-row>
          <h2>Pilih Bencana</h2>  
        </v-row>
        <v-row>
          <v-select
            :items="items"
            v-model="bencana"
          ></v-select>
        </v-row>
      </v-col>
      <v-col align="center">
        <v-row>
          <h2>Pilih Posko</h2>  
        </v-row>
        <v-row>
          <v-select
            :items="items"
            v-model="shelter"
          ></v-select>
        </v-row>
      </v-col>
      <v-btn v-on:click="btnClick">Cari</v-btn>
      <template v-if="showDetail">
        <v-col>
          <a>Nama Posko: {{shelterName}}</a><br>
          <a>Lokasi Posko: {{shelterLocation}}</a><br>
          <a>Total Korban pada posko: {{countShelterVictims}}</a><br>
        </v-col>
      </template>
  </v-container>
</template>

<style scoped>
h1 {
  color: green
}
</style>

<script>
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
</script>
>>>>>>> 7e60827c2a37ef189f7db619eded123488353b43
