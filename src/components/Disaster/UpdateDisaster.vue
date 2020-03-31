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
			<form>
				<p class="h4 text-center py-4">Update Disaster</p>

				<label for="defaultFormCardNameEx" class="grey-text font-weight-light">id</label>
				<input type="text" id="defaultFormCardNameEx" class="form-control">

				<br>

				<label for="defaultFormCardEmailEx" class="grey-text font-weight-light">Disaster Title</label>
				<input type="email" id="defaultFormCardEmailEx" class="form-control">

				<br>

				<label for="defaultFormCardEmailEx" class="grey-text font-weight-light">Disaster Description</label>
				<input type="email" id="defaultFormCardEmailEx" class="form-control">

				<br>

				<label for="defaultFormCardEmailEx" class="grey-text font-weight-light">Disaster Status</label>
				<input type="email" id="defaultFormCardEmailEx" class="form-control">

				<div class="text-center py-4 mt-3">
					<button class="btn btn-outline-purple" type="submit">Update<i class="far fa-paper-plane ml-2"></i></button>
				</div>
			</form>
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
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
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
    color: #4AAE9B;
    background: transparent;
  }
</style>

<script>
  export default {
    name: 'modal',
    methods: {
      close() {
        this.$emit('close');
      },
    },
  };
</script>