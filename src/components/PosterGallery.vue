<template>
  <div>
    <header>
      <h2>{{ title }}</h2>
      <p>{{ subtitle }}</p>
    </header>
    <div class="grid">
      <Card
        v-for="(card, i) in posters"
        :key="i"
        :name="card.authors"
        :title="card.title"
        :img="card.image"
        :topic="card.topic"
        :topicSlug="card.topic_slug"
        :poster_id="card.id"
      />
    </div>
  </div>
</template>

<script>
import supabase from '@/db';
import Card from '@/components/Card.vue';

export default {
  components: {
    Card,
  },

  data() {
    return {
      posters: Array,
      title: '',
      subtitle: '',
    };
  },

  methods: {
    generateSubtitle(topic, totalPosters) {
      const plural = totalPosters > 1 ? 'posters' : 'poster';

      return `${totalPosters} ${plural} about ${topic}`;
    },
  },

  async created() {
    // Grab data from db
    // const filter = this.$router.params.id || '';
    // if no filter, get all. otherwise filter.

    if (!this.$route.params.topicId) {
      this.title = 'Philosophy of Science Association';
      this.subtitle = '2021 Virtual Poster Gallery';
      const { data: posters, error } = await supabase
        .from('posters')
        .select('*');
      if (!error) {
        this.posters = posters;
      }
    } else {
      const { data: posters, error } = await supabase
        .from('posters')
        .select('*')
        .eq('topic_slug', this.$route.params.topicId);
      if (!error) {
        this.posters = posters;
        const [card] = posters;

        this.title = card.topic;
        this.subtitle = this.generateSubtitle(card.topic, posters.length);
      }
    }
  },
};
</script>

<style lang="scss" scoped>
header {
  margin: 1rem 0 3rem;
}
</style>
