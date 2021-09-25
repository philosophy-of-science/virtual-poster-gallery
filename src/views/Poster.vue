<template>
  <section class="container">
    <div v-if="loading">Loading...</div>
    <article v-else>
      <header class="image-container" :class="{ expanded: expand }">
        <button @click="expand = !expand" v-on:keyup.esc="onEsc">
          <img :src="poster.image" :alt="poster.title" />
          <span v-show="!expand">
            <v-icon name="expand-alt" scale="2" />
          </span>
        </button>
      </header>
      <div class="grid">
        <div class="left">
          <router-link :to="`/topic/${poster.topic_slug}`" class="topic">
            <v-icon name="hashtag" scale=".75" class="mr" />{{ poster.topic }}
          </router-link>
          <h2>
            {{ poster.title }}
          </h2>
          <p class="author">{{ poster.authors }}</p>
        </div>
        <div class="abstract">
          <p>{{ poster.abstract }}</p>
        </div>
      </div>
    </article>
  </section>
</template>

<script>
import supabase from '@/db';

export default {
  data() {
    return {
      expand: false,
      poster: null,
      loading: true,
    };
  },

  methods: {
    onEsc() {
      this.expand = false;
    },
  },

  async created() {
    try {
      const { data: posters, error } = await supabase
        .from('posters')
        .select('*')
        .eq('id', this.$route.params.id);

      if (error) throw error;
      [this.poster] = posters;
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style lang="scss" scoped>
.grid {
  margin-top: 3rem;
}

.topic {
  font-size: 0.8rem;
  border-radius: var(--radius);
  background-color: var(--dark);
  color: var(--light);
  display: inline-flex;
  align-items: center;
  padding: 0 0.15rem;
  text-decoration: none;
  display: inline-block;
}

h2 {
  font-size: 2rem;
}

.author {
  color: var(--dark);
  text-transform: uppercase;
  margin-bottom: 2rem;
}

.image-container {
  position: relative;
  background: var(--lighter);
  border-radius: var(--radius);

  span {
    position: absolute;
    height: 3rem;
    width: 3rem;
    bottom: 50%;
    right: 0;
    transform: translate(50%, 50%);
    background: var(--teal);
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 0.5em;
    border-radius: 50%;
  }
}

.expanded {
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  transition: height 0.2s;
  z-index: 10;

  button {
    cursor: zoom-out;
  }

  img {
    display: block;
    margin: 0 auto;
    width: auto;
    height: auto;
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
  }
}

img {
  width: auto;
  height: auto;
  max-height: 50vh;
  max-width: 100%;
  object-fit: contain;
  display: block;
  margin: 0 auto;
  box-shadow: var(--shadow-on-bg);
}

button {
  padding: 1rem;
  border: none;
  background: none;
  display: block;
  height: 100%;
  width: 100%;
  cursor: zoom-in;
}

.abstract {
  margin-top: 1.25rem;
  position: relative;
  background-color: var(--lightest);
  border-radius: var(--radius);
  border: 1px solid;

  p {
    position: relative;
    border-radius: var(--radius);
    background-color: var(--lightest);
    padding: 0.5rem 0.75rem;
  }

  &::before {
    font-size: 0.75rem;
    letter-spacing: 1px;
    content: 'ABSTRACT';
    position: absolute;
    // background: var(--dark);
    text-transform: uppercase;
    color: var(--dark);
    border: 1px solid;
    padding: 0.25em;
    border-radius: var(--radius);
    left: 0.75rem;
    top: -1.35rem;
  }
}
</style>
