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
            <p class="h4 text-center">Pindahkan Posko Korban</p>
            <v-form
              ref="form"
              v-model="valid"
            >
              <v-select
                :items="shelters"
                :rules="shelterRules"
                item-text='Name'
                item-value='ShelterID'
                v-model="shelterId"
                label="Shelter Name"
                outlined
                required
              ></v-select>
              <v-btn
                :disabled="!valid"
                v-on:click="sendVictimShelter"
              >Save Changes</v-btn>
            </v-form>
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
    width: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    position: relative;
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    width: 50%;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    overflow: auto;
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

  .shelterList {
    border: 1px solid #232322;
    border-radius: 10px;
    width: 100%;
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }
</style>

<script>
  import axios from 'axios';
  export default {
    name: 'modalLocation',
    beforeMount() {
      this.getShelterList();
    },
    data() {
      return{
        shelterId:"",
        shelters:[],
        valid: true,
        shelterRules: [ v => !!v || 'Shelter is required' ]
      }
    },

    watch: {
      shelterId: function (val) {
      }
    },

    methods: {
      close() {
        this.$emit('close');
      },
      getShelterList: function() {
        axios.get(process.env.API_ROUTE+'/shelter/all')
        .then(response => {
          this.shelters = response.data.data;
        })
        .catch(e => {
          this.errors.push(e)
        })
      },
      sendVictimShelter: function() {
        axios.post(process.env.API_ROUTE+'/victim/history/shelter',
        {
          id:this.$route.params.id,
          shelterId:this.shelterId,
        })
        .then(response => {
          this.shelterId = "";
          this.$refs.form.reset();
          this.$emit('close');
        })
        .catch(e => {
          this.errors.push(e)
        });
      },
    },
  };
</script>