<template>
  <div class="register-container">
        <div class="register-box">
            <h4>
                Daftar Akun
            </h4>
            <form @submit="formSubmit" enctype="multipart/form-data">
                <span>Username*</span><br>
                <input type="text" id="username_placeholder" name="username" value="" v-model="username" @keyup="checkUsername()">
                <br>
                <span class="error-message" id="username_error"></span><br>
                <span>NIK</span><br>
                <input type="text" id="nik_placeholder" name="nik" value="" v-model="nik">
                <br>
                <span class="error-message" id="nik_error"></span><br>
                <span>No KK</span><br>
                <input type="text" id="nokk_placeholder" name="nokk" value="" v-model="nokk">
                <span class="error-message" id="nokk_error"></span><br>
                <span>Nama</span><br>
                <input type="text" id="name_placeholder" name="name" value="" v-model="name">
                <span class="error-message" id="name_error"></span><br>
                <span>Umur</span><br>
                <input type="text" id="age_placeholder" name="age" value="" v-model="age">
                <span class="error-message" id="name_error"></span><br>
                <div>
                <span>Shelter ID</span><br>
                <input list="browsers" id="shelterid" name="shelterid" v-model="shelterid">
                <datalist id="browsers">
                    <option v-for="shelter in shelters" :value="shelter.ShelterID">{{ shelter.Name }}</option>
                </datalist>
                <span class="error-message" id="shelterid_error"></span><br>
                </div>
                <span>Password*</span><br>
                <input type="password" id="password_placeholder" name="password" value="" v-model="password">
                <br>
                <span class="error-message" id="password_error"></span><br>
                <span>Konfirmasi Password*</span><br>
                <input type="password" id="cpassword_placeholder" name="confirm_password" value="" v-model="confirm_password">
                <br>
                <span class="error-message" id="cpassword_error"></span><br>
                <span>Foto</span><br>
                <div class="upload-btn-wrapper">
                    <input type="file" id="real-upload-button" name="profile-picture" ref="file" v-on:change="handleFileUpload()"/>
                </div>
                <br><br>
                <input class="button" id="submit_button" type="submit" value="Register">
            </form> 

            <p>Sudah punya akun? <a :href="'/login'">Login disini</a> </p>

        </div>
    </div>
</template>

<style scoped>
body {
    margin : 0;
    padding: 0;
    font-family: Quattrocento;
}

/* Login Page */

.register-container{
    max-width: 960px;
    margin: auto;
    background-color: white;
    padding-top: 8px;
}

.register-box{
    box-shadow: 0px 0px 5px 5px rgba(146, 69, 69, 0.2);
    padding: 24px;
}

.register-box h4{
    text-align: center; 
    font-weight: 600;
}
.register-box input{
    padding: 8px 12px;
    margin: 4px 0px;
    width: 90%;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.1);
}

.register-box input:focus{
    outline: 0;
}

.register-box span{
    font-size: 0.8em;
    font-weight: bold;
    color: grey;
}

.register-box .button{
    font-size: 0.8em;
    font-weight: bold;
    color: white;
    background-color: gray;
    border: 0.5px;
    width: 100%;
}

.register-box .button:active{
    font-size: 0.8em;
    font-weight: bold;
    color: white;
    background-color: gray;
    border: 0.5px;
    width: 100%;
}

.register-box p{
    font-size: 0.7em;
    font-weight: 700;
    text-align: center;
    padding: 8px 32px;
}

.register-box a{
    text-decoration: none;
    color : gray;
}

.upload-btn-wrapper{
    display: flex;
    font-family: Quattrocento;
}

.error-message{
    color: red!important;
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

              shelters: [],

              output: ''

            };

        },

        methods: {

            formSubmit(e) {

                e.preventDefault();

                let formData = new FormData();

                formData.append('username', this.username);
                formData.append('nik', this.nik);
                formData.append('nokk', this.nokk);
                /*if (this.$cookies.get('Type') != 'admin') {
                    formData.append('shelterid', '0');
                } else {
                    formData.append('shelterid', this.shelterid);
                }*/
                formData.append('shelterid', this.shelterid);
                formData.append('name', this.name);
                formData.append('age', this.age);
                formData.append('password', this.password);
                formData.append('photo', this.file);
                
                let usernameErrorMessage = document.getElementById("username_error").innerHTML

                let currentObj = this;

                if (this.password == this.confirm_password && this.username != undefined && this.password != null && usernameErrorMessage == "") {
                    document.getElementById("password_error").innerHTML = "";
                    document.getElementById("cpassword_error").innerHTML = "";
                    document.getElementById("username_error").innerHTML = "";
                    axios.post(process.env.API_ROUTE+'/register', formData, 
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })

                    .then(function (response) {
                        
                        currentObj.output = response.data;
                        currentObj.$router.push('/login');

                    })

                    .catch(function (error) {

                        currentObj.output = error;

                    });
                } else {
                    if (this.password != this.confirm_password) {
                        document.getElementById("password_error").innerHTML = "Password tidak cocok";
                        document.getElementById("cpassword_error").innerHTML = "Password tidak cocok";
                    }
                    if (this.username == undefined) {
                        document.getElementById("username_error").innerHTML = "Username tidak boleh kosong";
                    }
                    if (this.password == null) {
                        document.getElementById("password_error").innerHTML = "Password tidak boleh kosong";
                    }
                }

            }, handleFileUpload(){
                this.file = this.$refs.file.files[0];
            }, getShelters(){
                axios.get(process.env.API_ROUTE+'/sheltername')
                .then(response => {
                    // JSON responses are automatically parsed.
                    this.shelters = response.data.data
                })
                .catch(e => {
                    this.errors.push(e)
                })
            }, checkUsername(){
                axios.post(process.env.API_ROUTE+'/username',
                {
                    username: this.username
                })
                .then(function (response) {

                    if (response.data.data.length > 0) {
                        document.getElementById("username_error").innerHTML = "Username tidak tersedia";
                    } else {
                        document.getElementById("username_error").innerHTML = "";
                    }

                })

                .catch(function (error) {

                    currentObj.output = error;

                });
            }, validateUser() {
                if(this.$cookies.get('Type') == 'Admin' || this.$cookies.get('Type') == 'Staff') {
                    this.$router.push('/');
                }
            }

        },
        beforeMount(){
            this.validateUser()
            this.getShelters()
        }

    }

</script>