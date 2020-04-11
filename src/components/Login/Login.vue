<template>
<div class="container login-container d-flex justify-content-center">
    <div class="col-md-6 login-form-1">
        <h3 id="title">Login</h3>
        <form @submit="formSubmit">
            <div class="form-group">
                <input type="text" class="form-control" placeholder="Username" value="" name="username" v-model="username"/>
            </div>
            <div class="form-group">
                <input type="password" class="form-control" placeholder="Password" value="" name="password" v-model="password"/>
            </div>
            <div class="form-group">
                <input type="submit" class="btnSubmit" value="Login" />
            </div>
        </form>
        <span class="error-message" id="login_failed"></span><br>
        <div class="form-group">
            <a href="#" class="btnForgetPwd">Lupa Password?</a>
        </div>
        <div class="form-group">
            <a href="#/register" class="btnForgetPwd">Daftar Akun</a>
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
    width: 50%;
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
import axios from 'axios';
    export default {

        mounted() {

            console.log('Component mounted.')

        },

        data() {

            return {

              AccountID: '',

              Username: '',

              Type: '',

              NIK: '',

              NoKK: '',

              Name: '',

              Age: '',

              Photo: '',

              CurrentShelterId: '',

              errormsg: ''

            };

        },

        methods: {

            formSubmit(e) {

                e.preventDefault();

                let currentObj = this;
                axios.post('http://localhost:3000/login',  
                {
                    username: this.username,
                    password: this.password
                })

                .then(function (response) {

                    currentObj.data = response.data.data;
                    if (currentObj.data.length > 0) {
                        currentObj.$cookies.set("AccountID", currentObj.data[0].AccountID, "43200")
                        currentObj.$cookies.set("Type", currentObj.data[0].Type, "43200s")
                        currentObj.$router.push('/');
                    } else {
                        document.getElementById("login_failed").innerHTML = "Login gagal"
                    }

                })

                .catch(function (error) {

                    currentObj.data.errormsg = error;

                });

            }

        }

    }

</script>