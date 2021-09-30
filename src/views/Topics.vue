<template>
  <main class="container">
    <header>
      <h2>Poster Topics</h2>
    </header>
    <div class="grid">
      <router-link
        class="topic"
        :to="`/topic/${topic.topic_slug}`"
        v-for="topic in countedPosters"
        :key="topic.topic_slug"
        ><span><v-icon name="hashtag" />{{ topic.topic }}</span>
        <span>{{ topic.count }}</span></router-link
      >
    </div>
  </main>
</template>

<script>
import supabase from '@/db';

export default {
  data() {
    return {
      posters: [],
    };
  },

  computed: {
    countedPosters() {
      if (!this.posters.length) {
        return [];
      }

      const count = this.posters.reduce((prev, current) => {
        if (!prev[current.topic_slug]) {
          prev[current.topic_slug] = {
            topic: current.topic,
            topic_slug: current.topic_slug,
            count: 1,
          };
        } else {
          prev[current.topic_slug].count += 1;
        }

        return prev;
      }, {});

      return count;
    },
  },

  async created() {
    const { data: posters, error } = await supabase
      .from('posters')
      .select('topic,topic_slug')
      .order('topic', { ascending: true });

    if (!error) {
      this.posters = posters;
    }
  },
};
</script>

<style lang="scss" scoped>
header {
  margin: 1rem 0 3rem;
}

.topic {
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  color: var(--light);
  text-decoration: none;
  text-transform: lowercase;
  background-color: var(--darkest);
  border-radius: var(--radius);
  box-shadow: var(--shadow-on-bg);
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--dark);

    span:last-child {
      background-color: var(--lighter);
    }
  }

  span:first-child {
    padding: 1rem 0 1rem 2rem;
  }

  span:last-child {
    padding: 1rem 2rem 1rem 2rem;
    font-size: 2em;
    font-weight: 700;
    color: var(--darkest);
    background-color: var(--light);
    transition: background-color 0.2s;
  }
}
</style>
