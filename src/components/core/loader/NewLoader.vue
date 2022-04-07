<template>
  <div class="loading-new" id="loading-new">
    <div class="loader-container">
      <b-spinner
        variant="danger"
        label="Spinning"
        class="loading-center-new"
      ></b-spinner>
    </div>
  </div>
</template>

<style scoped>
.loading-new {
  background: #fff;
  height: 100%;
  width: 100%;
  background-size: 15%;
  position: fixed;
  margin-top: 0px;
  top: 0px;
  left: 0px;
  bottom: 0px;
  overflow: hidden !important;
  right: 0px;
  z-index: 999999;
}
.loading-center-new {
  width: 5rem !important;
  height: 5rem !important;
  margin: auto;
}
.loader-container {
  height: 100%;
  width: 100%;
  display: flex;
}
/* .loader {
  width: 5rem;
  height: 5rem;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  position: absolute;
} */
</style>
