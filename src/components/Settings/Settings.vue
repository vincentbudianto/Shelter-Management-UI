<template>
  <div class="bg">
    <div class="content m-3 p-5 tile-box">
        <v-row>
                <v-col>
                    Add Disaster
                </v-col>
                    <v-btn @click="openAddDisaster">Open</v-btn>
        </v-row>
        <v-divider/>
        <v-row>
                <v-col>
                    Add Shelter
                </v-col>
                    <v-btn @click="openAddShelter">Open</v-btn>
        </v-row>
        <v-divider/>
        <v-row>
                <v-col>
                    Assign Staff
                </v-col>
                    <v-btn @click="openAssignStaff">Open</v-btn>
        </v-row>
        <v-divider/>
        <v-row>
                <v-col>
                    Search Filter by NoKK
                </v-col>
                <v-switch v-model="filterState" inset/>
        </v-row>
    </div>
    <add-disaster-modal v-show="addDisasterVisible" @close="closeAddDisaster"/>
    <add-shelter-modal v-show="addShelterVisible" @close="closeAddShelter"/>
    <assign-staff-modal v-show="assignStaffVisible" @close="closeAssignStaff"/>
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
    import addShelterModal from './AddShelter.vue';
    import assignStaffModal from './AssignStaff.vue';
    import axios from 'axios';
    export default {
        name: 'settings',
        components: {
            addDisasterModal,
            addShelterModal,
            assignStaffModal,
        },
        mounted : function(){
        axios.get(process.env.API_ROUTE+'/configs/filter')
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
                assignStaffVisible: false,
                filterState: undefined,
            }
        },
        watch: {
            filterState(newValue){
                var filterStatePost = {
                    'SearchFilter' : this.filterState,
                };
                axios.post(process.env.API_ROUTE+'/configs/filter', filterStatePost)
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
            openAssignStaff(){
                this.assignStaffVisible = true;
            },
            closeAssignStaff(){
                this.assignStaffVisible = false;
            },
            validateUser(){
                var aid = this.$cookies.get('AccountID');
                let currentObj = this;
                axios.get(process.env.API_ROUTE+'/check/admin?id=' + aid)
                .then(response => {
                    // JSON responses are automatically parsed.
                    if(response.data.data.isAdmin == false){
                        currentObj.$router.push('/login');
                    }
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