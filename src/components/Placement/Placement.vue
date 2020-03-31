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
            <tr v-for="(placement, index) in placements" :key="placement.NIK">
              <th v-if="placement.urgency == 0" class="table-not-urgent" scope="row">{{index+1}}</th>
              <td v-if="placement.urgency == 0" class="table-not-urgent"><a :href="'?#/details/'+placement.victim_id">{{placement.nik}}</a></td>
              <td v-if="placement.urgency == 0" class="table-not-urgent"><a :href="'?#/details/'+placement.victim_id">{{placement.name}}</a></td>
              <td v-if="placement.urgency == 0" class="table-not-urgent">{{placement.status}}</td>
              <td v-if="placement.urgency == 0" class="table-not-urgent"><a :href="'?#/shelter/'+placement.current_shelter_id">{{placement.current_shelter}}</a></td>
              <td v-if="placement.urgency == 0" class="table-not-urgent"><a :href="'?#/shelter/'+placement.recommended_shelter_id">{{placement.recommended_shelter}}</a></td>

              <th v-if="placement.urgency == 1" class="table-warning" scope="row">{{index+1}}</th>
              <td v-if="placement.urgency == 1" class="table-warning"><a :href="'?#/details/'+placement.victimId">{{placement.nik}}</a></td>
              <td v-if="placement.urgency == 1" class="table-warning"><a :href="'?#/details/'+placement.victim_id">{{placement.name}}</a></td>
              <td v-if="placement.urgency == 1" class="table-warning">{{placement.status}}</td>
              <td v-if="placement.urgency == 1" class="table-warning"><a :href="'?#/shelter/'+placement.current_shelter_id">{{placement.current_shelter}}</a></td>
              <td v-if="placement.urgency == 1" class="table-warning"><a :href="'?#/shelter/'+placement.recommended_shelter_id">{{placement.recommended_shelter}}</a></td>

              <th v-if="placement.urgency == 2" class="table-danger" scope="row">{{index+1}}</th>
              <td v-if="placement.urgency == 2" class="table-danger"><a :href="'?#/details/'+placement.victimId">{{placement.nik}}</a></td>
              <td v-if="placement.urgency == 2" class="table-danger"><a :href="'?#/details/'+placement.victim_id">{{placement.name}}</a></td>
              <td v-if="placement.urgency == 2" class="table-danger">{{placement.status}}</td>
              <td v-if="placement.urgency == 2" class="table-danger"><a :href="'?#/shelter/'+placement.current_shelter_id">{{placement.current_shelter}}</a></td>
              <td v-if="placement.urgency == 2" class="table-danger"><a :href="'?#/shelter/'+placement.recommended_shelter_id">{{placement.recommended_shelter}}</a></td>
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
export default {
  data() {
    return {
      placements:[
        {
          victim_id: '0',
          nik: '1234567812345678',
          name: 'Budi',
          status: 'Patah Tulang',
          current_shelter: 'Cisitu Indah',
          current_shelter_id: 1,
          recommended_shelter: 'Borromeus',
          recommended_shelter_id: 2,
          urgency: 2
        },
        {
          victim_id: '1',
          nik: '5647382956473829',
          name: 'Andi',
          status: 'Butuh darah',
          current_shelter: 'Cisitu Lama',
          current_shelter_id: 3,
          recommended_shelter: 'Borromeus',
          recommended_shelter_id: 2,
          urgency: 2
        },
        {
          victim_id: '2',
          nik: '3425163734251637',
          name: 'Mimi',
          status: 'Kekurangan vitamin Z',
          current_shelter: 'Tamansari',
          current_shelter_id: 5,
          recommended_shelter: 'Juanda',
          recommended_shelter_id: 4,
          urgency: 1
        },
        {
          victim_id: '3',
          nik: '9876543598765435',
          name: 'Sunny',
          status: 'Keluarga banyak di Cisitu Lama',
          current_shelter: 'Cisitu Indah',
          current_shelter_id: 1,
          recommended_shelter: 'Cisitu Lama',
          recommended_shelter_id: 6,
          urgency: 0
        }
      ]
    }
  }
  // methods: {
  //   get_placement: function() {
  //     axios.get('http://localhost:3000/victim/search/keyword?keyword=' + this.query)
  //     .then(response => {
  //       // JSON responses are automatically parsed.
  //       this.victims = response.data.data
  //     })
  //     .catch(e => {
  //       this.errors.push(e)
  //     })
  //   }
  // }
}
</script>