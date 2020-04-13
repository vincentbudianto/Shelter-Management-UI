<template>
  <div class="assign-staff-container">
        <div class="assign-staff-box">
            <h4>
                Assign Staff
            </h4>
            <form @submit="formSubmit" enctype="multipart/form-data">
                <div>
                    <span>Staff ID*</span><br>
                    <input list="abrowsers" id="staffid" name="staffid" v-model="staffid">
                    <datalist id="abrowsers">
                        <option v-for="account in accounts" :value="account.AccountID">{{  account.AccountID  }}
                            | {{  account.Username  }} | {{  account.Name  }}</option>
                    </datalist>
                    <br>
                    <span class="error-message" id="staffid_error"></span><br>
                </div>
                <div>
                    <span>Shelter ID*</span><br>
                    <input list="browsers" id="shelterid" name="shelterid" v-model="shelterid">
                    <datalist id="browsers">
                        <option v-for="shelter in shelters" :value="shelter.ShelterID">{{  shelter.ShelterID  }} | {{  shelter.Name  }}</option>
                    </datalist>
                    <br>
                    <span class="error-message" id="shelterid_error"></span><br>
                </div>
                <br>
                <p id="success_message"></p>
                <input class="button" id="submit_button" type="submit" value="Assign">
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

#success_message {
    font-family: Quattrocento;
    color: black;
    font-size: medium;
}

.assign-staff-container{
    max-width: 960px;
    margin: auto;
    background-color: white;
    padding-top: 8px;
}

.assign-staff-box{
    padding: 24px;
}

.assign-staff-box h4{
    text-align: center; 
    font-weight: 600;
}
.assign-staff-box input{
    padding: 8px 12px;
    margin: 4px 0px;
    width: 90%;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.1);
}

.assign-staff-box input:focus{
    outline: 0;
}

.assign-staff-box span{
    font-size: 0.8em;
    font-weight: bold;
    color: grey;
}

.assign-staff-box .button{
    font-size: 0.8em;
    font-weight: bold;
    color: white;
    background-color: gray;
    border: 0.5px;
    width: 100%;
}

.assign-staff-box .button:active{
    font-size: 0.8em;
    font-weight: bold;
    color: white;
    background-color: gray;
    border: 0.5px;
    width: 100%;
}

.assign-staff-box p{
    font-size: 0.7em;
    font-weight: 700;
    text-align: center;
    padding: 8px 32px;
}

.assign-staff-box a{
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
              accounts: [],

              output: ''

            };

        },

        methods: {

            formSubmit(e) {

                e.preventDefault();

                let currentObj = this;

                if(this.shelterid != undefined && this.staffid != undefined){

                    document.getElementById("shelterid_error").innerHTML = "";
                    document.getElementById("staffid_error").innerHTML = ""

                    axios.post('http://localhost:3000/account',
                    {
                        accountid: this.staffid,
                        shelterid: this.shelterid
                    })

                    .then(function (response) {

                        currentObj.output = response.data;
                        document.getElementById("success_message").innerHTML = "Staff dengan ID " + currentObj.staffid +
                        " telah ditugaskan di Shelter dengan ID " + currentObj.shelterid;

                    })

                    .catch(function (error) {

                        currentObj.output = error;

                    });
                } else {
                    if (this.shelterid == undefined) {
                        document.getElementById("shelterid_error").innerHTML = "Tidak boleh kosong";
                    }
                    if (this.staffid == undefined) {
                        document.getElementById("staffid_error").innerHTML = "Tidak boleh kosong";
                    }
                }

            }, getShelters(){
                axios.get('http://localhost:3000/sheltername')
                .then(response => {
                    // JSON responses are automatically parsed.
                    this.shelters = response.data.data
                })
                .catch(e => {
                    this.errors.push(e)
                })
            }, getAccounts(){
                axios.get('http://localhost:3000/account')
                .then(response => {
                    // JSON responses are automatically parsed.
                    this.accounts = response.data.data
                })
                .catch(e => {
                    this.errors.push(e)
                })
            }

        },
        beforeMount(){
            this.getShelters();
            this.getAccounts();
        }

    }
</script>