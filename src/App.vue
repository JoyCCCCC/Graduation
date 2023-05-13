<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  created() {
    if (localStorage.vuex) {
      this.list = JSON.parse(localStorage.vuex)
    }
  }
}
</script>
