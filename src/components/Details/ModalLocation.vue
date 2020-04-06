<script>
  import axios from 'axios';
  export default {
    name: 'modalLocation',
    mounted(){
      this.getShelterList();
    },
    data(){
      return{
        shelterId:"",
        shelters:[]
      }
    },
    methods: {
      close() {
        this.$emit('close');
      },
      getShelterList: function(){
        axios.get('http://localhost:3000/shelter')
        .then(response =>{
          this.shelters = response.data.data;
        })
        .catch(e=>{
          this.errors.push(e)
        })
      },
      sendVictimShelter: function(){
        axios.post('http://localhost:3000/victim/history/shelter', 
        {
          id:this.$route.params.id,
          shelterId:this.shelterId,
        })
        .then(response =>{
          console.log(response)
        })
        .catch(e=>{
          this.errors.push(e)
        });
        this.$emit('close');
      },
    },
  };
</script>
<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header
          class="modal-header"
          id="modalTitle"
        >
          <slot name="header">
            Change Location

            <button
              type="button"
              class="btn-close"
              @click="close"
              aria-label="Close modal"
            >
              x
            </button>
          </slot>
        </header>
        <section
          class="modal-body"
          id="modalDescription"
        >
          <slot name="body">
            <form>
              <label for="shelterName">Shelter Name :</label><br>
              <select v-model="shelterId">
                <option v-for="shelter in shelters" v-bind:value="shelter.ShelterID">
                  {{shelter.Name}}
                </option>
              </select>
            </form>
          </slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
            <button
              type="button"
              class="btn-green"
              @click="sendVictimShelter"
              aria-label="Close modal"
            >
              Save Changes
            </button>
          </slot>
        </footer>
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
    width: 30%;
    /* height: 30%; */
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }

  .modal-header,
  .modal-footer {
    padding: 2%;
    display: flex;
  }

  .modal-header {
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    border: none;
    font-size: 20px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
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