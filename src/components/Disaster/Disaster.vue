<template>
  <div>
    <h1>Disaster</h1>

    <button type="button" class="btn" @click="showModal">Update Disaster</button>

    <modal v-show="isModalVisible" @close="closeModal"/>
  </div>
</template>

<style scoped>
h1 {
  color: red
}
</style>

<script>
  import modal from './UpdateDisaster.vue';

  export default {
    name: 'app',
    components: {
      modal,
    },
    data () {
      return {
        isModalVisible: false,
      };
    },
    methods: {
      showModal() {
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
      }
    },
  };
</script>