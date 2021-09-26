<template>
  <div class="container">
    <header><h2>Profile</h2></header>
    <section class="grid">
      <div class="left">
        <h3>Info</h3>
        <p class="label">Email</p>
        <p>{{ user.email }}</p>
        <p class="label">Account Created</p>
        <p>{{ createdAt }}</p>
      </div>
      <div class="right">
        <h3>
          <span class="mr">My Poster</span>
          <router-link to="/form" class="edit" v-show="poster"
            ><v-icon name="edit" class="mr" />Edit</router-link
          >
        </h3>
        <p v-if="!poster">
          No poster yet...
          <router-link to="/form">Would you like to submit one?</router-link>
        </p>

        <Card
          class="profile__card"
          v-else
          :poster_id="poster.id"
          :authors="poster.authors"
          :topic="poster.topic"
          :topicSlug="poster.topic_slug"
          :title="poster.title"
          :img="poster.image"
        />
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
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

  computed: {
    ...mapState(['user']),

    createdAt() {
      return new Date(this.user.created_at).toLocaleString();
    },
  },

  methods: mapActions(['launchToast', 'setPoster']),

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

      if (!data.length) return;

      const poster = data[0].posters;
      this.setPoster(poster);
      this.poster = poster;
    } catch (error) {
      this.launchToast({
        type: 'error',
        show: true,
        content: error.message,
      });
    }
  },
};
</script>

<style lang="scss" scoped>
header {
  margin: 1rem 0 3rem;
}

h3 {
  display: inline-flex;
  align-items: center;
  margin: 1rem 0;
  color: var(--dark);
  text-transform: uppercase;
}

.label {
  padding-left: 0;

  & + p {
    margin-bottom: 1rem;
  }
}

.edit {
  padding: 0 0.5em;
  font-size: 0.75em;
  font-weight: 400;
  color: var(--lightest);
  text-decoration: none;
  background-color: var(--teal);
  border-radius: var(--radius);
}
</style>
