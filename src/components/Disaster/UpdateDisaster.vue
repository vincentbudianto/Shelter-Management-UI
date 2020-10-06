<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <header class="modal-header" id="modalTitle">
          <slot name="header">
            <button type="button" class="btn-close" @click="close" aria-label="Close modal">
              x
            </button>
          </slot>
        </header>

        <section class="modal-body" id="modalDescription">
          <slot name="body">
            <p class="h4 text-center py-4">Update disaster {{disaster.Name}}</p>
            <v-form ref="form" v-model="valid">
              <v-text-field
                v-model="inputTitle"
                label="Judul Kondisi Bencana"
                :rules="titleRules"
                :counter=25
                required
              ></v-text-field>
              <v-text-field
                v-model="inputDescription"
                label="Deskripsi Kondisi Bencana"
                :rules="descRules"
                required
              ></v-text-field>
              <v-select
                :items="statusItems"
                :rules="statusRules"
                item-text='Name'
                item-value='Value'
                v-model="selectedStatus"
                label="Status Bencana"
                outlined
                required
              ></v-select>
              <v-btn
                :disabled="!valid"
                v-on:click="submitUpdateDisasterClick"
              >Update</v-btn>
            </v-form>
            <div class="text-center py-4 mt-3">
              
            </div>
          </slot>
        </section>
      </div>
    </div>
  </transition>
</template>

<style>
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
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    margin: 5% 5% 5% 5%;
    overflow: auto;
    max-height: 90%;
  }

  .modal-header {
    padding: 10px;
    display: flex;
    border-bottom: 1px solid #232322;
    justify-content: flex-end;
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
</style>

<script>
  import axios from 'axios';

  export default {
    name: 'modal',
    props: ['disaster'],
    data () {
      var data = {
        inputId: "",
        inputTitle: "",
        inputDescription: "",
        inputStatus: "",
        statusItems: [
          { Name: 'Bencana masih berlangsung', Value: 1 },
          { Name: 'Bencana sudah berakhir', Value: 0}
        ],
        titleRules: [ v => !!v || 'Judul tidak boleh kosong',
          v => v.length <= 25 || 'Judul tidak boleh lebih dari 25 karakter', ],
        descRules: [ v => !!v || 'Deskripsi tidak boleh kosong' ],
        statusRules: [ v => !!v || v === 0 || 'Status bencana diperlukan' ],
        selectedStatus: 1,
        valid: true
      }

      return data;
    },
    methods: {
      close() {
        this.$emit('close');
      },
      submitUpdateDisasterClick: function (event) {
        var inputDisasterPostData = {
          "id": this.disaster.DisasterID,
          "disasterTitle": this.inputTitle,
          "disasterDesc": this.inputDescription,
          "disasterStatus": this.selectedStatus
        }

        axios.post(process.env.API_ROUTE+'/disaster/history/condition', inputDisasterPostData)
        .then(response => {
          this.close()
        })
        .catch(e => {
          this.errors.push(e)
        })
      }
    }
  };
</script>