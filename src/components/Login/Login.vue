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
h1 {
  color: black
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
                        currentObj.$cookies.set("AccountID", currentObj.data[0].AccountID, "43200s")
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