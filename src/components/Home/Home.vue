<template>
</template>

<script>
import Search from '../Search/Search.vue'
import Shelter from '../Shelter/Shelter.vue'
import Dashboard from '../Dashboard/Dashboard.vue'

export default {
    mounted () {
        if(this.$cookies.get("Type") == "Admin"){
            // window.location.replace(process.env.APP_BASE_URL+"/dashboard")
            this.$router.push('/dashboard')    
        }
        else if(this.$cookies.get("Type") == "Staff"){
            // window.location.replace(process.env.APP_BASE_URL+"/shelter")
            this.$router.push('/shelter')    
        }
        else{
            // window.location.replace(process.env.APP_BASE_URL+"/search")
            this.$router.push('/search')    
        }
    },
}
</script>>