<template>
  <div class="container">
    <header><h2>Profile</h2></header>
    <section>
      <h3>Info</h3>
      <p class="label">Email</p>
      <p>{{ user.email }}</p>
    </section>
    <section>
      <h3>likes</h3>
    </section>
    <section>
      <h3>My Poster</h3>
      <p v-if="!poster">No poster yet...</p>

      <Card
        class="profile__card"
        v-else
        :poster_id="poster.id"
        :name="poster.authors"
        :topic="poster.topic"
        :title="poster.title"
        :img="poster.image"
      />
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import supabase from '@/db';
import Card from '@/components/Card.vue';

export default {
  components: {
    Card,
  },

  data() {
    return {
      poster: null,
    };
  },

  computed: mapState(['user']),

  async created() {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select(
          `*,
          posters (*)`,
        )
        .eq('id', this.user.id);
      if (error) throw error;

      const poster = data[0].posters;
      this.poster = poster;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style lang="scss" scoped>
h3 {
  margin: 1rem 0;
  text-transform: uppercase;
  color: var(--dark);
}

.label {
  padding-left: 0;
}

.profile__card {
  max-width: 450px;
}
</style>
