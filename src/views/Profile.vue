<template>
  <div class="container">
    <header><h2>Profile</h2></header>
    <section>
      <h3>Info</h3>
      <p>{{ user.email }}</p>
    </section>
    <section>
      <h3>likes</h3>
    </section>
    <section>
      <h3>my poster</h3>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: mapState(['user']),
};
</script>

<style lang="scss" scoped>
</style>
