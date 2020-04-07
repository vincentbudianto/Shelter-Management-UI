<template>
  <div class="input-victim-container">
        <div class="input-victim-box">
            <h4>
                Input Victim
            </h4>
            <form @submit="formSubmit" enctype="multipart/form-data">
                <span>NIK</span><br>
                <input type="text" id="nik_placeholder" name="nik" value="" v-model="nik">
                <br>
                <span>No. KK</span><br>
                <input type="text" id="nokk_placeholder" name="nokk" value="" v-model="nokk">
                <br>
                <span>name</span><br>
                <input type="text" id="name_placeholder" name="name" value="" v-model="name">
                <br>
                <span>age</span><br>
                <input type="text" id="age_placeholder" name="age" value="" v-model="age">
                <br>
                <span>ID Shelter</span><br>
                <input type="text" id="shelterid_placeholder" name="shelterid" value="" v-model="shelterid">
                <br>
                <span>photo</span><br>
                <div class="upload-btn-wrapper">
                    <input type="file" id="real-upload-button" name="photo" ref="file" v-on:change="handleFileUpload()"/>
                </div>
                <br><br>
                <input class="button" id="submit_button" type="submit" value="Submit">
            </form> 
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

.input-victim-container{
    max-width: 960px;
    margin: auto;
    background-color: white;
    padding-top: 8px;
}

.input-victim-box{
    padding: 24px;
}

.input-victim-box h4{
    text-align: center; 
    font-weight: 600;
}
.input-victim-box input{
    padding: 8px 12px;
    margin: 4px 0px;
    width: 90%;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.1);
}

.input-victim-box input:focus{
    outline: 0;
}

.input-victim-box span{
    font-size: 0.8em;
    font-weight: bold;
    color: grey;
}

.input-victim-box .button{
    font-size: 0.8em;
    font-weight: bold;
    color: white;
    background-color: gray;
    border: 0.5px;
    width: 100%;
}

.input-victim-box .button:active{
    font-size: 0.8em;
    font-weight: bold;
    color: white;
    background-color: gray;
    border: 0.5px;
    width: 100%;
}

.input-victim-box p{
    font-size: 0.7em;
    font-weight: 700;
    text-align: center;
    padding: 8px 32px;
}

.input-victim-box a{
    text-decoration: none;
    color : gray;
}

.upload-btn-wrapper{
    display: flex;
    font-family: Quattrocento;
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

              nik: '',

              nokk: '',

              name: '',

              age: '',

              shelterid: '',

              file: '',

              output: ''

            };

        },

        methods: {

            formSubmit(e) {

                e.preventDefault();

                let formData = new FormData();

                formData.append('nik', this.nik);
                formData.append('nokk', this.nokk);
                formData.append('name', this.name);
                formData.append('age', this.age);
                formData.append('shelterid', this.shelterid);
                formData.append('photo', this.file);

                let currentObj = this;

                axios.post('http://localhost:3000/victim', formData, 
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })

                .then(function (response) {

                    currentObj.output = response.data;

                })

                .catch(function (error) {

                    currentObj.output = error;

                });

            }, handleFileUpload(){
                this.file = this.$refs.file.files[0];
            }

        }

    }
</script>