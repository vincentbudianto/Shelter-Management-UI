<template>
<div class="container login-container d-flex justify-content-center">
    <div class="col-md-6 login-form-1">
        <h3 id="title">Logout?</h3>
        <div>
            <span class="form-group">
                <button class="btnSubmit" v-on:click="logout">Yes</button>
            </span>
            <br />>
            <span class="form-group">
                <button class="btnSubmit" v-on:click="back">Back</button>
            </span>
        </div>
    </div>
</div>
</template>

<style scoped>
.login-container{
    margin-top: 5%;
    margin-bottom: 5%;
}
.login-logo{
    position: relative;
    margin-left: -41.5%;
}
.login-logo img{
    position: absolute;
    width: 20%;
    margin-top: 19%;
    background: #282726;
    border-radius: 4.5rem;
    padding: 5%;
}
.login-form-1{
    padding: 9%;
    background:#282726;
    box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);
}
.login-form-1 h3{
    text-align: center;
    margin-bottom:12%;
    color:#fff;
}
.btnSubmit{
    font-weight: 600;
    width: 100%;
    color: #282726;
    background-color: #fff;
    border: none;
    border-radius: 1.5rem;
    padding:2%;
}
.btnForgetPwd{
    color: #fff;
    font-weight: 600;
    text-decoration: none;
}
.btnForgetPwd:hover{
    text-decoration:none;
    color:#fff;
}
.error-message{
    color: white!important;
    font-size: 0.6em!important;
}
</style>

<script>
    export default {
        mounted() {
            console.log('Component mounted.')
        },

        methods: {

            logout() {

                this.$cookies.set("AccountID", "null")
                this.$cookies.set("Type", "Guest")
                this.$router.go('/')

            },
            back() {
                this.$router.push('/')
            },
            validateUser() {
                if(this.$cookies.get('Type') == 'Guest' || this.$cookies.get('Type') == null) {
                    this.$router.push('/');
                }
            }
        },
        beforeMount() {
            this.validateUser();
        }
    }
</script>