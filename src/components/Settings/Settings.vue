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
                <v-switch></v-switch>
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
    export default {
        name: 'settings',
        components: {
            addDisasterModal,
            addShelterModal,
        },

        data (){
            return {
                addDisasterVisible : false,
                addShelterVisible : false,
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
            }
        }
    }
</script>