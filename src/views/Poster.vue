<template>
  <main class="container">
    <div v-if="loading">Loading...</div>
    <article v-else>
      <header class="image-container" :class="{ expanded: expand }">
        <button @click="expand = !expand" v-on:keyup.esc="onEsc">
          <img :src="poster.image" :alt="poster.title" />
          <span v-show="!expand">
            <v-icon name="expand-alt" scale="2" />
          </span>
          <span v-show="expand" class="close">
            <v-icon name="compress-alt" scale="2" />
          </span>
        </button>
        <p class="full-size">
          <a :href="poster.image" :alt="poster.title" target="_blank">
            <v-icon name="image" class="mr" /> See the full-size poster </a>
        </p>
      </header>
      <div class="text-container">
        <div class="left">
          <router-link :to="`/topic/${poster.topic_slug}`" class="topic">
            <v-icon name="hashtag" scale=".75" class="mr" />{{ poster.topic }}
          </router-link>
          <h2>
            {{ poster.title }}
          </h2>
          <p class="author">{{ poster.authors }}</p>
        </div>
        <p class="abstract__label">Abstract</p>
        <div class="abstract" v-html="poster.abstract"></div>
      </div>
    </article>
  </main>
</template>

<script>
import { mapActions } from 'vuex';
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
    ...mapActions(['launchToast']),
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
      this.launchToast({
        type: 'error',
        show: true,
        content: error.message,
      });
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style lang="scss" scoped>
.text-container {
  margin-top: 3rem;
}

.topic {
  display: inline-flex;
  align-items: center;
  padding: 0 0.15rem;
  font-size: 0.8rem;
  color: var(--light);
  text-decoration: none;
  text-transform: lowercase;
  background-color: var(--dark);
  border-radius: var(--radius);
}

h2 {
  font-size: 2rem;
  line-height: 1.3;
}

.author {
  color: var(--dark);
  text-transform: uppercase;
}

.image-container {
  position: relative;
  background: var(--lighter);
  border-radius: var(--radius);

  span {
    position: absolute;
    right: 50%;
    bottom: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    padding: 0.5em;
    background-color: rgba(255, 255, 255, 0.15);
    border: 1px solid;
    backdrop-filter: blur(5px);
    border-radius: 50%;
    box-shadow: var(--shadow-on-bg);
    transform: translate(50%, 50%);
  }
}

.expanded {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1001;
  width: 100vw;
  height: 100vh;
  height: -webkit-fill-available;
  border-radius: 0;

  .close {
    animation: fade-out 0.3s ease-in;
    animation-delay: 1s;
    animation-fill-mode: forwards;
  }

  button {
    cursor: zoom-out;
  }

  img {
    display: block;
    width: 100%;
    max-width: 100%;
    height: 100%;
    max-height: 100%;
    margin: 0 auto;
    object-fit: contain;
    filter: drop-shadow(3px 3px 1em #0b201d1c);
    box-shadow: none;
  }
}

img {
  display: block;
  width: auto;
  max-width: 100%;
  height: auto;
  max-height: 50vh;
  object-fit: contain;
  margin: 0 auto;
  box-shadow: var(--shadow-on-bg);
}

button {
  display: block;
  width: 100%;
  height: 100%;
  padding: 1rem;
  cursor: zoom-in;
  background: none;
  border: none;
}

.abstract {
  max-width: 66ch;
  &__label {
    margin: 1rem 0 0;
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--dark);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
}

@keyframes fade-out {
  to {
    opacity: 0;
  }
}

.full-size {
  padding: 1rem .5rem;
  font-size: .9rem;
  text-align: center;
}
</style>
