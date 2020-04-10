<template>
  <div class="bg">
    <div class="content">
        <v-row class="m-3 p-5 tile-box">
                <v-col>
                    Add Disaster
                </v-col>
                <v-col>
                    <v-btn>Open</v-btn>
                </v-col>
        </v-row>
        <v-row class="m-3 p-5 tile-box">
                <v-col>
                    Add Shelter
                </v-col>
                <v-col>
                    <v-btn>Open</v-btn>
                </v-col>
        </v-row>
        <v-row class="m-3 p-5 tile-box">
                <v-col>
                    Search Filter by NoKK
                </v-col>
                <v-col>
                    <v-btn>Open</v-btn>
                </v-col>
        </v-row>
    </div>
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

</script>