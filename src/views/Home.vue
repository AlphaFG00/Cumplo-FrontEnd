<template>
  <div class="home columns is-centered mt-4">
        <img alt="Cumplo OK" src="../assets/cumplo_hand.png">
        <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>
<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
};
</script>
