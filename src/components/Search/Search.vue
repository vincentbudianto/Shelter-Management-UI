<template>
  <div class="bg">
    <div class="content">
      <form v-on:submit="search">
        <input v-model="query" name="query" placeholder="Search">
        <button type="submit">🔎</button>
      </form>
      <table class="table-of-victims">
        <tr>
          <th><p>NIK</p></th>
          <th><p>Nama</p></th>
          <th><p>Status</p></th>
        </tr>
        <tr v-for="victim in victims" v-bind:key="victim.VictimID">
          <td><a :href="'?#/details/'+victim.VictimID"><p>{{ victim.NIK || 'unknown' }}</p></a></td>
          <td><a :href="'?#/details/'+victim.VictimID"><p>{{ victim.Name }}</p></a></td>
          <td><a :href="'?#/details/'+victim.VictimID"><p>{{ victim.ConditionStatus || 'unknown'}}</p></a></td>
        </tr>
      </table>
      <br />
    </div>
  </div>
</template>

<style scoped>
.bg {
  background-color: #d9d9d9;
}
.content {
  max-width: 960px;
  margin: auto;
  background-color: white;
}
p {
  font-family: Quattrocento;
  color: gray;
  padding-left: 32px;
  padding-right: 32px;
}
td a {
  display: block;
  text-decoration: none;
}
tr {
  border: none;
}
table {
  margin: auto;
  border-collapse: collapse;
  width: 100%;
}
th {
  border: solid 2px gray;
  background-color: #eaeaea;
}
td {
  border-right: solid 1px gray; 
  border-left: solid 1px gray;
}
tr:last-child {
  border-bottom: solid 1px gray;
}
</style>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      victims: [],
      errors: [],
      query: null
    }
  },

  // Fetches posts when the component is created.
  methods: {
    search: function() {
      axios.get('http://localhost:3000/victim/search/keyword?keyword=' + this.query)
      .then(response => {
        // JSON responses are automatically parsed.
        this.victims = response.data.data
      })
      .catch(e => {
        this.errors.push(e)
      })
    }
  }
}
</script>