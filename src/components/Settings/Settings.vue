<template>
  <div class="bg">
    <div class="content">
        <v-row class="m-3 p-5 tile-box">
                <v-col>
                    Add Disaster
                </v-col>
                    <v-btn @click="openAddDisaster">Open</v-btn>
        </v-row>
        <v-row class="m-3 p-5 tile-box">
                <v-col>
                    Add Shelter
                </v-col>
                    <v-btn @click="openAddShelter">Open</v-btn>
        </v-row>
        <v-row class="m-3 p-5 tile-box">
                <v-col>
                    Search Filter by NoKK
                </v-col>
                <v-switch v-model="filterState"/>
        </v-row>
    </div>
    <add-disaster-modal v-show="addDisasterVisible" @close="closeAddDisaster"/>
    <add-shelter-modal v-show="addShelterVisible" @close="closeAddShelter"/>
  </div>
</template>

<style scoped>
@import "~leaflet/dist/leaflet.css";
.tile-box {
     box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
     max-width: 30pc;
  }
</style>

<script>
    import addDisasterModal from './AddDisaster.vue';
    import addShelterModal from './AddShelter.vue'
    import axios from 'axios';
    export default {
        name: 'settings',
        components: {
            addDisasterModal,
            addShelterModal,
        },
        mounted : function(){
        axios.get('http://localhost:3000/configs/filter')
            .then(response => {
                this.filterState = response.data.data[0].SearchFilter;
                // console.log(this.filterState);
            })
            .catch(e => {
                this.errors.push(e)
            });
        },
        data (){
            return {
                addDisasterVisible : false,
                addShelterVisible : false,
                filterState: undefined,
            }
        },
        watch: {
            filterState(newValue){
                var filterStatePost = {
                    'SearchFilter' : this.filterState,
                };
                axios.post('http://localhost:3000/configs/filter', filterStatePost)
                .then(response => {
                    // console.log(response)
                })
                .catch(e => {
                    this.errors.push(e)
                });
            }
        },
        methods:{
            openAddDisaster(){
                this.addDisasterVisible = true;
            },
            closeAddDisaster(){
                this.addDisasterVisible = false;
            },
            openAddShelter(){
                this.addShelterVisible = true;
            },
            closeAddShelter(){
                this.addShelterVisible = false;
            },
            validateUser(){
                var aid = this.$cookies.get('AccountID');
                let currentObj = this;
                axios.get('http://localhost:3000/check/admin?id=' + aid)
                .then(response => {
                    // JSON responses are automatically parsed.
                   currentObj.$router.push('/login');
                })
                .catch(e => {
                    this.errors.push(e)
                })
            }
        }, beforeMount() {
            this.validateUser();
        }
    }
</script>