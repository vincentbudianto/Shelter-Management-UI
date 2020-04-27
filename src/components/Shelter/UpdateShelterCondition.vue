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
            <p class="h4 text-center py-4">Update shelter {{shelter.Name}} condition</p>
            <v-form
              ref="form"
              v-model="valid"
            >
              <v-text-field
                v-model="inputTitle"
                :rules="titleRules"
                label="Title"
                required
              ></v-text-field>
              <v-text-field
                v-model="inputDescription"
                label="Description"
              ></v-text-field>
              <v-btn 
                :disabled="!valid"
                v-on:click="submitUpdateShelterConditionClick"
              >Update</v-btn>
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
    name: 'conditionmodal',
    props: ['shelter'],
    data () {
      var data = {
        inputId: "",
        inputTitle: "",
        inputDescription: "",
        valid: true,
        titleRules: [ v => !!v || 'Title is required' ]
      }

      return data;
    },
    watch: {
      shelter: {
        handler() {
          this.inputId = this.shelter.ShelterID;
        }
      }
    },
    methods: {
      close() {
        this.$emit('close');
      },
      submitUpdateShelterConditionClick: function (event) {
        var inputShelterPostData = {
          "id": this.shelter.ShelterID,
          "shelterTitle": this.inputTitle,
          "shelterDesc": this.inputDescription || '-',
          "updated": this.$cookies.get("AccountID")
        }

        axios.post(process.env.API_ROUTE+'/shelter/history/condition', inputShelterPostData)
        .then(response => {
          this.inputTitle = "";
          this.inputDescription = "";
          this.$refs.form.reset();
          this.close()
        })
        .catch(e => {
          this.errors.push(e)
        })
      }
    }
  };
</script>