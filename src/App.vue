<template>
  <div id="app">
    <Weather />
  </div>
</template>

<script>
import Weather from './components/Weather.vue';

export default {
  name: 'app',
  components: {
    Weather,
  }
};
</script>

<style>
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.blue-text {
  color:#209cee;
}

.gray-text {
  color:rgb(165, 165, 165);
}

.light-weight {
  font-weight: lighter;
}

</style>
