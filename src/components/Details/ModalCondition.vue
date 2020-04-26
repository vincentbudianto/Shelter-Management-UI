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
            <p class="h4 text-center">Update victim condition</p>
            <v-form ref="form">
              <v-text-field
                v-model="condition"
                label="Kondisi Korban"
              ></v-text-field>
            </v-form>
            <v-form ref="form">
              <v-text-field
                v-model="desc"
                label="Deskripsi Kondisi Korban"
              ></v-text-field>
            </v-form>
            <!-- <v-form ref="form">
              <v-text-field
                v-model="status"
                label="Victim Condition Status"
              ></v-text-field>
            </v-form> -->
            <div class="text-center py-4">
              <v-btn v-on:click="sendVictimCondition">Simpan</v-btn>
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
    width: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    width: 50%;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
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
    name: 'modalCondition',
    data(){
      return{
        condition:"",
        desc:"",
        status:null,
        updated:""
      }
    },
    methods: {
      close() {
        this.$emit('close');
      },
      isValidUpdate: function (){
        return (
          this.condition != "" &&
          this.desc != ""        
        )
      },
      sendVictimCondition: function(){
        if (this.isValidUpdate()) {
          axios.post(process.env.API_ROUTE+'/victim/history/condition',
          {
            id:this.$route.params.id,
            conditionName:this.condition,
            conditionDesc:this.desc,
            conditionStatus:1,
            updated:this.$cookies.get("AccountID")
          })
          .then(response =>{
            console.log(response)
          })
          .catch(e=>{
            this.errors.push(e)
          });
          this.$emit('close');
        }
      },
    },
  };
</script>