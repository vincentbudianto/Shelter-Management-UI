<template>
  <div class="container placement-container d-flex justify-content-center">
    <div class="col-md-12 search-table-container">
      <v-text-field v-if="!filterState" class="search" v-model="query" name="query" label="Search" clearable dark @keyup="search"/>
      <v-text-field v-if="filterState" class="search" v-model="query" name="query" label="Masukkan NoKK" clearable dark @keyup="filteredSearch"/>
      <div class="overflow-container">
        <table class="table table-striped">
          <thead class="thead-light">
            <th v-if="showSensitiveData" scope="col">NIK</th>
            <th scope="col">Nama</th>
            <th scope="col">Status</th>
            <th v-if="showSensitiveData" scope="col">Posko</th>
            <th scope="col">Lokasi</th>
          </thead>
          <tbody>
            <tr v-for="victim in victims" v-bind:key="victim.VictimID">
              <td v-if="showSensitiveData" class="result"><a :href="'/details/'+victim.VictimID">{{ victim.NIK || '-' }}</a></td>
              <td class="result"><a :href="showSensitiveData && '/details/'+victim.VictimID">{{ victim.Name }}</a></td>
              <td class="result">
                <a :href="showSensitiveData && '/details/'+victim.VictimID">
                  {{victim.Status ? 'Alive' : 'Deceased'}}
                </a>
              </td>
              <td v-if="showSensitiveData" class="result"><a :href="'/shelter/'+victim.ShelterID">{{ victim.ShelterName || '-' }}</a></td>
              <td class="result">{{ victim.location || '-' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <br />
    </div>
  </div>
</template>

<style scoped>
a{
  color: inherit;
}

.placement-container{
    margin-bottom: 5%;
    margin-top: -3%;
    padding-top: 3%;
}
.search-table-container{
    padding: 3%;
    background:#232322;
    box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);
    color: #d9d9d9;
}
.overflow-container {
    overflow: auto;
}
.recommendation-table-container h3{
    margin-bottom: 2%;
}
.thead-light * {
  font-weight: bolder;
}
.search{
  max-width: 300px;
}
.result {
  color: #d9d9d9;
}
</style>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      victims: [],
      errors: [],
      query: null,
      filterState: 0,
      showSensitiveData: false
    }
  },

  mounted:function(){
    axios.get(process.env.API_ROUTE+'/configs/filter')
    .then(response => {
      this.filterState = response.data.data[0].SearchFilter;
    })
    .catch(e => {
      this.errors.push(e)
    }),
    this.validateUserAccess()
  },
  // Fetches posts when the component is created.
  methods: {
    search: function() {
      if(this.query == ''){
        this.victims = [];
        return;
      }
      axios.get(process.env.API_ROUTE+'/victim/search/keyword?keyword=' + this.query)
      .then(response => {
        const data = response.data.data
        this.victims = data

        data.map((obj, i) => {
          let location = obj.City || ''
          location += obj.Province ? (', ' + obj.Province) : ''
          location += obj.Country ? (', ' + obj.Country) : ''
          this.victims[i].location = location
        })
      })
      .catch(e => {
        this.victims = [];
        this.errors.push(e)
      })
    },
    filteredSearch: function() {
      axios.get(process.env.API_ROUTE+'/victim/search/nokk?nokk=' + this.query)
      .then(response => {
        const data = response.data.data
        this.victims = data

        data.map((obj, i) => {
          let location = obj.City || ''
          location += obj.Province ? (', ' + obj.Province) : ''
          location += obj.Country ? (', ' + obj.Country) : ''
          this.victims[i].location = location
        })
      })
      .catch(e => {
        this.victims = [];
        this.errors.push(e)
      })
    },
    validateUserAccess: function() {
      var userID = this.$cookies.get("AccountID")

      if (userID && userID != "null") {
        return axios.all([
          axios.get(process.env.API_ROUTE+`/check/admin?id=${userID}`),
          axios.get(process.env.API_ROUTE+`/check/staff?id=${userID}`)
        ])
        .then(response => {
          if(!response[0].data.data.isAdmin && !response[1].data.data.isStaff){
            this.showSensitiveData = false
          }
          else{
            this.showSensitiveData = true
          }
        })
        .catch(error => {
          this.errors.push(error)
        })
      }
    },
  }
}
</script>