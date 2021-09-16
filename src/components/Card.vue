<template>
  <article>
    <header>
      <h2>{{ title }}</h2>
      <p class="author">{{ name }}</p>
    </header>

    <div class="image-container">
      <img v-if="img" :src="img" :alt="title" />
      <div v-else class="placeholder"></div>
    </div>

    <footer>
      <Button type="outline">
        <router-link :to="`/poster/${id}`" :name="name"
          ><v-icon name="address-card" scale="1.5" class="mr"></v-icon>See the
          Poster &rarr;</router-link
        >
      </Button>
    </footer>

    <span class="detail"></span>
    <div class="tag-container">
      <router-link to="/"><v-icon name="hashtag" /> {{ topic }}</router-link>
    </div>
  </article>
</template>

<script>
import Button from '@/components/Button.vue';

export default {
  components: {
    Button,
  },

  props: {
    id: Number,
    name: String,
    title: String,
    abstract: String,
    img: String,
    topic: String,
  },
};
</script>

<style lang="scss" scoped>
article {
  position: relative;
  width: 100%;
  height: auto;
  border-radius: var(--radius);
  background: var(--dark);
  // overflow: hidden;
  color: var(--lightest);
  box-shadow: var(--shadow-on-bg);
}

header {
  padding: 1.5rem 2rem;
  height: calc(1rem + (1rem * 1.5) + (1.2rem * 3.3) + 3rem);
}

.image-container {
  position: relative;
  padding: 1.5rem 2rem;

  z-index: 1;
  background-color: var(--lightest);
  width: calc(100% - 1rem);
  height: 30rem;
  padding: 1rem;
  transform: translateX(-1rem);
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  box-shadow: var(--shadow-on-dark);
}

img,
.placeholder {
  display: block;
  max-width: 100%;
  height: auto;
  max-height: 100%;
  margin: 0 auto;
  object-fit: contain;
  box-shadow: var(--shadow-on-bg);
}

.placeholder {
  position: relative;
  height: 100%;
  width: 100%;
  background: var(--teal);
  &::before {
    content: '';
    height: calc(25% - 2rem);
    width: 80%;
    display: block;
    margin: 1rem auto;
    opacity: 0.8;
    background-image: linear-gradient(
      to bottom,
      var(--light) 50%,
      transparent 50%
    );
    background-size: 100% 15%;
    background-position: 0 0;
    background-repeat: space;
  }
  &::after {
    content: '';
    height: calc(25% - 2rem);
    width: 80%;
    display: block;
    margin: 1rem auto;
    opacity: 0.8;
    background-image: linear-gradient(
      to bottom,
      var(--light) 50%,
      transparent 50%
    );
    background-size: 80% 15%;
    background-position: 0 50%;
    background-repeat: space;
  }
}

h2 {
  line-height: 1.3;
  font-size: 1.2rem;
  font-weight: normal;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.author {
  margin-top: 0.5rem;
  color: var(--lighter);
}

.detail {
  position: absolute;
  z-index: 0;
  right: 0;
  bottom: 9rem;
  height: 2px;
  background: var(--teal);
  width: 100%;
  opacity: 0.75;

  &::after,
  &::before {
    position: absolute;
    height: 2px;
    background: var(--teal);
    width: 100%;
    opacity: 0.75;
    bottom: 5px;
    content: '';
  }

  &::before {
    bottom: -5px;
  }
}

.tag-container {
  position: absolute;
  right: 0;
  bottom: 6rem;
  background: var(--teal);
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius);
  transform: rotate(90deg);
  transform-origin: right;
  box-shadow: var(--shadow-on-dark);
  a {
    color: var(--lighter);
    font-size: 85%;
    display: block;
    text-decoration: none;
    text-transform: lowercase;
  }
}

footer {
  padding: 1.5rem 2rem;

  // a {
  //   display: inline-block;
  //   color: var(--light);
  //   padding: 0.25rem 0.5rem;
  //   border: 1px solid;
  //   border-radius: var(--radius);
  //   text-decoration: none;
  //   transition: color 0.2s, background-color 0.2s;
  //   font-weight: 700;
  //   &:hover {
  //     background-color: var(--light);
  //     color: var(--dark);
  //   }
  // }
}
</style>
