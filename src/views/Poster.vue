<template>
  <div class="container">
    <article class="">
      <header class="image-container" :class="{ expanded: expand }">
        <img :src="posterInfo.img" :alt="posterInfo.title" />
        <button @click="expand = !expand">
          <v-icon name="expand" scale="2" />
        </button>
      </header>
      <div>
        <p class="topic">
          <v-icon name="hashtag" scale=".75" class="mr" />{{ posterInfo.topic }}
        </p>
        <h2>
          {{ posterInfo.title }}
        </h2>
        <p class="author">{{ posterInfo.name }}</p>
        <small>Abstract</small>
        <p>{{ posterInfo.abstract }}</p>
        <p>{{ posterInfo.topic }}</p>
      </div>
    </article>
  </div>
</template>

<script>
import testData from '@/testData.json';

export default {
  data() {
    return {
      expand: false,
    };
  },

  computed: {
    posterInfo() {
      const data = testData;
      const result = data.find((poster) => {
        console.log(poster.id, this.$route.params.id);
        return poster.id === +this.$route.params.id;
      });
      console.log(result);
      return result;
    },
  },
};
</script>

<style lang="scss" scoped>
.topic {
  margin-top: 2rem;
  font-size: 0.8rem;
  border-radius: var(--radius);
  background-color: var(--dark);
  color: var(--light);
  display: inline-flex;
  align-items: center;
  padding: 0 0.15rem;
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
  padding: 1rem;
  background: var(--lighter);
  border-radius: var(--radius);
}

.expanded {
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  transition: height 0.2s;

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
  width: 100%;
  height: auto;
  box-shadow: var(--shadow-on-bg);
}

small {
  text-transform: uppercase;
  color: var(--dark);
}

button {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0 0 0 / 0.5);
  backdrop-filter: blur(2px);
  color: var(--lightest);
  cursor: pointer;
  border: none;

  height: 2rem;
  width: 2rem;
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
}
</style>
