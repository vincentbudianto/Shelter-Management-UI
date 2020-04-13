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
            <h4>Masukan Data Bencana</h4>
            <v-form ref="form">
                <v-text-field
                v-model="inputNamaBencana"
                label="Nama Bencana"
                ></v-text-field>
            </v-form>
            <v-form ref="form">
                <v-text-field
                v-model="inputSkalaBencana"
                label="Skala Bencana"
                ></v-text-field>
            </v-form>
            <v-form ref="form">
                <v-text-field
                v-model="inputLatitude"
                label="Koordinat tempat bencana (Garis Lintang/Latitude)"
                ></v-text-field>
            </v-form>
            <v-form ref="form">
                <v-text-field
                v-model="inputLongitude"
                label="Koordinat tempat bencana (Garis Bujur/Longitude)"
                ></v-text-field>
            </v-form>
            <v-row>
                <v-btn v-on:click="submitAddDisasterClick">Tambahkan</v-btn>
                <v-btn v-on:click="close">Kembali</v-btn>
            </v-row>
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
export default {
    name: 'addDisasterModal',
    methods:{
        close(){
            this.$emit('close');
        }
    }
}
</script>