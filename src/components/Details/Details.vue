<template>
  <div class="bg">
    <div class="content">
      <div class="box" id="identity">
        <img v-bind:src="'data:image/png;base64,' +detail.Photo">
        <table class="details">
          <col width="10%">
          <col width="5%">
          <tr><td>NIK</td><td>:</td><td>{{detail.NIK}}</td></tr>
          <tr><td>NOKK</td><td>:</td><td>{{detail.NoKK}}</td></tr>
          <tr><td>Name</td><td>:</td><td>{{detail.Name}}</td></tr>
          <tr><td>Age</td><td>:</td><td>{{detail.Age}}</td></tr>
        </table>
      </div>
      <div class="box" id="location">
        <table class="details">
          <col width="35%">
          <tr>
            <td>Name</td>
            <td>Latitude</td>
            <td>Longitude</td>
            <td>Time</td>
          </tr>
          <tr v-for="location in locations">
            <td>{{location.Name}}</td>
            <td>{{location.Latitude}}</td>
            <td>{{location.Longitude}}</td>
            <td>{{location.Timestamp | moment}}</td>
          </tr>
        </table>
      </div>
      <div class="box" id="condAndNeeds">
        <table class="details" id="conditions">
          <col width="20%">
          <col width="60%">
          <tr>
            <td>Condition</td>
            <td>Description</td>
            <td>Time</td>
          </tr>
          <tr v-for="condition in conditions">
            <td>{{condition.Name}}</td>
            <td>{{condition.Desc}}</td>

            <td>{{condition.Timestamp | moment}}</td>
          </tr>
        </table>
        <table class="details" id="conditions">
          <col width="70%">
          <tr>
            <td>Needs</td>
            <td>Time</td>
          </tr>
          <tr v-for="need in needs">
            <td>{{need.Needs}}</td>
            <td>{{need.Timestamp | moment}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  color: white;
}
table{
  background-color: white;
  padding: 20px;
  margin-left: 20px;
  margin-right: 20px;
  border-radius: 25px;
  width: 100%
}
td{
  padding: 10px;
  font-family: Quattrocento;
}
img{
  align-self: center;
  max-width: 170px;
}

.bg{
  background-color: #E5E5E5;
}
.content{
  max-width: 90%;
  margin: auto;
  background-color: #6C6C6C;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.box{
  width: 45%;
  height: 40%;
  background-color: #C4C4C4;
  border-radius: 25px;
  padding: 25px;
  margin: 20px;
  display: flex;
}

#condAndNeeds{
  width: 92%;
  height: 100%;
}
#conditions{
  height: 50%;
}
</style>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
  data() {
    return {
      detail: null,
      conditions: [],
      needs : [],
      locations:[],
      errors: []
    }
  },

  mounted(){
    this.getIdentity();
    this.getConditionHistory();
    this.getNeedHistory();
    this.getLocationHistory();
  },
  // Fetches posts when the component is created.
  methods: {
    getIdentity: function() {
      axios.get('http://localhost:3000/victim/detail?id=' + this.$route.params.id)
      .then(response => {
        // JSON responses are automatically parsed.
        this.detail = response.data.data;
        console.log(response.data.data)
      })
      .catch(e => {
        this.errors.push(e)
      })
    },
    getConditionHistory: function(){
      axios.get('http://localhost:3000/victim/history/condition?id='+ this.$route.params.id)
      .then(response =>{
        this.conditions = response.data.data;
        console.log(response.data.data)
      })
      .catch(e=>{
        this.errors.push(e)
      })
    },
    getNeedHistory: function(){
      axios.get('http://localhost:3000/victim/history/need?id=' + this.$route.params.id)
      .then(response =>{
        this.needs = response.data.data;
        console.log(response.data.data)
      })
      .catch(e =>{
        this.errors.push(e)
      })
    },
    getLocationHistory:function(){
      axios.get('http://localhost:3000/victim/history/shelter?id=' + this.$route.params.id)
      .then(response =>{
        this.locations = response.data.data;
        console.log(response.data.data)
      })
      .catch(e =>{
        this.errors.push(e)
      })
    },
  },
  filters:{
    moment: function(date){
      return moment(date).format('HH:mm:ss DD-MM-YYYY');
    }
  }
}
</script>