<template>
    <transition name="modal-fade">
        <div class="modal-backdrop">
            <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
                <header class="modal-header" id="modalTitle">
                    <slot name="header">
                        <h4>Penugasan Staf</h4>
                        <button type="button" class="btn-close" @click="close" aria-label="Close modal">
                        x
                        </button>
                    </slot>
                </header>
                <div class="modal-body" id="modalDescription">
                    <div>
                        <v-select 
                        label="Nama Staf" 
                        :items="accounts" 
                        item-text="Username" 
                        item-value="AccountID"
                        v-model="staffid">
                            <template slot="item" slot-scope="data">
                                        {{  data.item.AccountID  }} <br> {{  data.item.Username  }} | {{  data.item.Name  }}
                            </template>
                        </v-select>
                        <span class="error-message" id="staffid_error"></span><br>
                    </div>
                    <div>
                        <v-select 
                        label="Shelter" 
                        :items="shelters" 
                        item-text="Name" 
                        item-value="ShelterID"
                        v-model="shelterid">
                            <template slot="item" slot-scope="data">
                                        {{  data.item.ShelterID  }} <br> {{  data.item.Name  }}
                            </template>
                        </v-select>
                        <span class="error-message" id="shelterid_error"></span><br>
                    </div>
                </div>
                <div>
                    <v-btn class="footer-btn" v-on:click="formSubmit">Tambahkan</v-btn>
                    <v-btn class="footer-btn" v-on:click="close">Kembali</v-btn>
                </div>
            </div>
        </div>
    </transition>
</template>

<style scoped>
.modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    display: flex;
    flex-direction: column;
    padding-bottom: 15px;
    margin: 5% 5% 5% 5%;
    overflow: auto;
  }

  .modal-header {
    padding: 10px;
    display: flex;
    border-bottom: 1px solid #232322;
    justify-content: space-between;
  }

  .modal-body {
    position: relative;
    padding-left: 20px;
    padding-right: 20px;
  }

  .btn-close {
    border: none;
    font-size: 20px;
	  padding-right: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #B7141F;
    background: transparent;
  }

  .footer-btn{
      margin: 10px;
  }

  .error-message{
    color: red!important;
    font-size: 0.6em!important;
}
</style>

<script>
import axios from 'axios';
    export default {
        name: 'assignStaffModal',

        data() {
            return {
              shelterid: -1,
              staffid: -1,
              shelters: [],
              accounts: [],
              output: ''

            };

        },

        methods: {

            formSubmit() {
                let currentObj = this;
                if(this.shelterid != -1 && this.staffid != -1){

                    document.getElementById("shelterid_error").innerHTML = "";
                    document.getElementById("staffid_error").innerHTML = "";

                    axios.post(process.env.API_ROUTE+'/account',
                    {
                        accountid: this.staffid,
                        shelterid: this.shelterid
                    })

                    .then(function (response) {
                        currentObj.output = response.data;
                    })

                    .catch(function (error) {
                        currentObj.output = error;
                    });
                    this.$emit('close');
                } else {
                    if (this.shelterid == -1) {
                        document.getElementById("shelterid_error").innerHTML = "Tidak boleh kosong";
                    }
                    else{
                        document.getElementById("shelterid_error").innerHTML = "";
                    }
                    if (this.staffid == -1) {
                        document.getElementById("staffid_error").innerHTML = "Tidak boleh kosong";
                    }
                    else{
                        document.getElementById("staffid_error").innerHTML = "";
                    }
                }

            }, getShelters(){
                axios.get(process.env.API_ROUTE+'/sheltername')
                .then(response => {
                    // JSON responses are automatically parsed.
                    this.shelters = response.data.data
                })
                .catch(e => {
                    this.errors.push(e)
                })
            }, getAccounts(){
                axios.get(process.env.API_ROUTE+'/account')
                .then(response => {
                    // JSON responses are automatically parsed.
                    this.accounts = response.data.data
                })
                .catch(e => {
                    this.errors.push(e)
                })
            }, validateUser(){
                var aid = this.$cookies.get('AccountID');
                let currentObj = this;
                axios.get(process.env.API_ROUTE+'/check/admin?id=' + aid)
                .then(response => {
                    // JSON responses are automatically parsed.
                    if(response.data.data.isAdmin == false){
                         currentObj.$router.push('/login');
                    }
                })
                .catch(e => {
                    this.errors.push(e)
                })
            },
            close(){
            this.$emit('close');
            },
        },
        beforeMount(){
            this.validateUser();
            this.getShelters();
            this.getAccounts();
        }

    }
</script>