<template>
  <div class="container placement-container d-flex justify-content-center">
    <div class="col-md-12 search-table-container">
      <v-text-field v-if="!filterState" class="search" v-model="query" name="query" label="Search" clearable dark @keyup="search"/>
      <v-text-field v-if="filterState" class="search" v-model="query" name="query" label="Masukkan NoKK" clearable dark @keyup="filteredSearch"/>
      <table class="table table-striped">
        <thead class="thead-light">
          <th scope="col" style="width: 40%">NIK</th>
          <th scope="col" style="width: 40%">Nama</th>
          <th scope="col">Status</th>
        </thead>
        <tbody>
          <tr v-for="victim in victims" v-bind:key="victim.VictimID">
            <td class="result"><a :href="'/details/'+victim.VictimID">{{ victim.NIK || 'unknown' }}</a></td>
            <td class="result"><a :href="'/details/'+victim.VictimID">{{ victim.Name }}</a></td>
            <td v-if="victim.ConditionStatus == 1" class="result"><a :href="'/details/'+victim.VictimID">Alive</a></td>
            <td v-else-if="victim.ConditionStatus == 0" class="result"><a :href="'/details/'+victim.VictimID">Deceased</a></td>
            <td v-else class="result"><a :href="'/details/'+victim.VictimID">unknown</a></td>
          </tr>
        </tbody>
      </table>
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
    }
  },

  mounted:function(){
    axios.get(process.env.API_ROUTE+'/configs/filter')
      .then(response => {
        this.filterState = response.data.data[0].SearchFilter;
        // console.log(this.filterState);
      })
      .catch(e => {
        this.errors.push(e)
      });
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
        // JSON responses are automatically parsed.
        this.victims = response.data.data
      })
      .catch(e => {
        this.victims = [];
        this.errors.push(e)
      })
    },
    filteredSearch: function() {
      axios.get(process.env.API_ROUTE+'/victim/search/nokk?nokk=' + this.query)
      .then(response => {
        // JSON responses are automatically parsed.
        this.victims = response.data.data
      })
      .catch(e => {
        this.victims = [];
        this.errors.push(e)
      })
    },
    displayResult(victim){
      return (victim.NIK || victim.Name || victim.ConditionStatus)
    }
  }
}
</script>