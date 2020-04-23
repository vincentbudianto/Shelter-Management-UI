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
            <v-form ref="form">
              <v-text-field
                v-model="inputDescription"
                label="Disaster Description"
              ></v-text-field>
            </v-form>
            <v-form ref="form">
              <v-text-field
                v-model="inputStatus"
                label="Disaster Status"
              ></v-text-field>
            </v-form>
            <div class="text-center py-4 mt-3">
              <v-btn v-on:click="submitUpdateDisasterClick">Update</v-btn>
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
        inputStatus: ""
      }

      return data;
    },
    watch: {
      disaster: {
        handler() {
          this.inputId = this.disaster.DisasterID;
          this.inputTitle = this.disaster.Name;
        }
      }
    },
    methods: {
      close() {
        this.$emit('close');
      },
      submitUpdateDisasterClick: function (event) {
        var inputDisasterPostData = {
          "id": this.inputId,
          "disasterTitle": this.inputTitle,
          "disasterDesc": this.inputDescription,
          "disasterStatus": this.inputStatus
        }

        axios.post(process.env.API_ROUTE+'/disaster/history/condition', inputDisasterPostData)
        .then(response => {
          console.log(response)
        })
        .catch(e => {
          this.errors.push(e)
        })
      }
    }
  };
</script>