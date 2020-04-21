<template>
</template>

<script>
import Search from '../Search/Search.vue'
import Shelter from '../Shelter/Shelter.vue'
import Dashboard from '../Dashboard/Dashboard.vue'

export default {
    mounted () {
        if(this.$cookies.get("Type") == "Admin"){
            // window.location.replace("http://localhost:8000/dashboard")
            this.$router.push('/dashboard')    
        }
        else if(this.$cookies.get("Type") == "Staff"){
            // window.location.replace("http://localhost:8000/shelter")
            this.$router.push('/shelter')    
        }
        else{
            // window.location.replace("http://localhost:8000/search")
            this.$router.push('/search')    
        }
    },
}
</script>>