<template>
<div class="container placement-container d-flex justify-content-center">
    <div class="col-md-12 recommendation-table-container">
        <h3>Placement Recommendation</h3>
        <table class="table table-striped">
          <thead class="thead-light">
            <tr>
              <th scope="col">No.</th>
              <th scope="col">NIK</th>
              <th scope="col">Name</th>
              <th scope="col">Status</th>
              <th scope="col">Current Shelter</th>
              <th scope="col">Recommended Shelter</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(placement, index) in sortedPlacement" :key="placement.NIK">
              <th v-if="placement.Urgency == 0" class="table-not-urgent" scope="row">{{index+1}}</th>
              <td v-if="placement.Urgency == 0" class="table-not-urgent"><a :href="'?#/details/'+placement.VictimID">{{placement.NIK}}</a></td>
              <td v-if="placement.Urgency == 0" class="table-not-urgent"><a :href="'?#/details/'+placement.VictimID">{{placement.Name}}</a></td>
              <td v-if="placement.Urgency == 0" class="table-not-urgent">{{placement.NeedDesc}}</td>
              <td v-if="placement.Urgency == 0" class="table-not-urgent"><a :href="'?#/shelter/'+placement.CurrentShelterID">{{placement.CurrentShelterName}}</a></td>
              <td v-if="placement.Urgency == 0" class="table-not-urgent"><a :href="'?#/shelter/'+placement.RecommendedShelterID">{{placement.RecommendedShelterName}}</a></td>

              <th v-if="placement.Urgency == 1" class="table-warning" scope="row">{{index+1}}</th>
              <td v-if="placement.Urgency == 1" class="table-warning"><a :href="'?#/details/'+placement.VictimID">{{placement.NIK}}</a></td>
              <td v-if="placement.Urgency == 1" class="table-warning"><a :href="'?#/details/'+placement.VictimID">{{placement.Name}}</a></td>
              <td v-if="placement.Urgency == 1" class="table-warning">{{placement.NeedDesc}}</td>
              <td v-if="placement.Urgency == 1" class="table-warning"><a :href="'?#/shelter/'+placement.CurrentShelterID">{{placement.CurrentShelterName}}</a></td>
              <td v-if="placement.Urgency == 1" class="table-warning"><a :href="'?#/shelter/'+placement.RecommendedShelterID">{{placement.RecommendedShelterName}}</a></td>

              <th v-if="placement.Urgency == 2" class="table-danger" scope="row">{{index+1}}</th>
              <td v-if="placement.Urgency == 2" class="table-danger"><a :href="'?#/details/'+placement.VictimID">{{placement.NIK}}</a></td>
              <td v-if="placement.Urgency == 2" class="table-danger"><a :href="'?#/details/'+placement.VictimID">{{placement.Name}}</a></td>
              <td v-if="placement.Urgency == 2" class="table-danger">{{placement.NeedDesc}}</td>
              <td v-if="placement.Urgency == 2" class="table-danger"><a :href="'?#/shelter/'+placement.CurrentShelterID">{{placement.CurrentShelterName}}</a></td>
              <td v-if="placement.Urgency == 2" class="table-danger"><a :href="'?#/shelter/'+placement.RecommendedShelterID">{{placement.RecommendedShelterName}}</a></td>
            </tr>
          </tbody>
        </table>
    </div>
</div>
</template>

<style scoped>
.placement-container{
    margin-bottom: 5%;
    margin-top: -3%;
    padding-top: 3%;
}
.recommendation-table-container{
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
.table-danger {
  background-color: #b7141f;
  color: #efefef;
  font-weight: bolder;
}
.table-danger * {
  background-color: #b7141f;
  color: #efefef;
  font-weight: bolder;
}
.table-warning {
  background-color: #f6981e;
  color: #212121;
  font-weight: bold;
}
.table-warning * {
  background-color: #f6981e;
  color: #212121;
  font-weight: bold;
}
.table-not-urgent {
  color: #d9d9d9;
}
.table-not-urgent * {
  color: #d9d9d9;
}
</style>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      placements: []
    }
  },
  computed: {
    sortedPlacement: function() {
      function compare(a, b) {
        if (a.Urgency > b.Urgency)
          return -1;
        if (a.Urgency < b.Urgency)
          return 1;
        return 0;
      }

      return this.placements.sort(compare);
    }
  },
  methods: {
    get_placement: function() {
      axios.get('http://localhost:3000/recommendation')
      .then(response => {
        // JSON responses are automatically parsed.
        this.placements = response.data.data
      })
      .catch(e => {
        this.errors.push(e)
      })
    }
  },
  beforeMount(){
    this.get_placement()
  },
}
</script>