<template>
</template>

<script>
import Search from '../Search/Search.vue'
import Shelter from '../Shelter/Shelter.vue'
import Dashboard from '../Dashboard/Dashboard.vue'

export default {
    mounted () {
        if(this.$cookies.get("Type") == "Admin"){
            this.$router.push('/dashboard')    
        }
        else if(this.$cookies.get("Type") == "Staff"){
            this.$router.push('/shelter')    
        }
        else{
            this.$router.push('/search')    
        }
    },
}
</script>>