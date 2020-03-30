<script>
  import axios from 'axios';
  export default {
    name: 'modalCondition',
    data(){
      return{
        condition:"",
        desc:"",
        status:null
      }
    },
    methods: {
      close() {
        this.$emit('close');
      },
      sendVictimCondition: function(){
        axios.post('http://localhost:3000/victim/history/condition', 
        {
          id:this.$route.params.id,
          conditionName:this.condition,
          conditionDesc:this.desc,
          conditionStatus:this.status
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
            Change Condition

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
            <form id="conditionForm">
              <label for="condition">Condition :</label><br>
              <input type="text" id="condition" name="condition" v-model="condition"><br>
              <label for="description">Description :</label><br>
              <textarea type="text"  name="description" cols="50" rows="5" form="conditionForm" v-model="desc">
              </textarea><br>
              <label for="status">Status :</label><br>
              <input type="number" id="status" name="status" v-model="status"><br>
            </form>
          </slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
            <button
              type="submit"
              class="btn-green"
              @click="sendVictimCondition"
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
</style>