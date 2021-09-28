<template>
  <div class="buffer">
    <article>
      <header>
        <h2>{{ title }}</h2>
        <p class="author">
          {{ authors }}
        </p>
      </header>

      <div class="image-container">
        <img v-if="img" :src="img" :alt="title" />
        <div v-else class="placeholder"></div>
      </div>

      <footer>
        <Button type="outline" v-show="!isPreview">
          <router-link :to="`/poster/${poster_id}`"
            ><v-icon name="address-card" scale="1.5" class="mr"></v-icon>See the
            Poster &rarr;</router-link
          >
        </Button>
      </footer>

      <span class="detail"></span>
      <div class="tag-container">
        <router-link :to="`/topic/${topicSlug}`"
          ><v-icon name="hashtag" /> {{ topic }}</router-link
        >
      </div>
    </article>
  </div>
</template>

<script>
import Button from '@/components/Button.vue';

export default {
  components: {
    Button,
  },

  props: {
    poster_id: Number,
    title: String,
    authors: String,
    abstract: String,
    img: String,
    topic: String,
    topicSlug: String,
    isPreview: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@mixin padding {
  padding: 0.75rem 1rem;

  @media (min-width: 1200px) {
    padding: 1.5rem 2rem;
  }
}

.buffer {
  max-width: 30rem;
  padding: 1rem;
}

article {
  position: relative;
  width: 100%;
  height: auto;
  color: var(--lightest);
  background: var(--dark);
  border-radius: var(--radius);
  box-shadow: var(--shadow-on-bg);
}

header {
  @include padding;
  height: 10rem;
}

.image-container {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  width: calc(100% - 1rem);
  height: 30rem;
  padding: 1rem;
  background-color: var(--lightest);
  border-radius: var(--radius);
  box-shadow: var(--shadow-on-dark);
  transform: translateX(-1rem);
}

img,
.placeholder {
  display: block;
  width: 100%;

  height: 100%;
  margin: 0 auto;
  object-fit: contain;
  filter: drop-shadow(3px 3px 1em #0b201d1c);
}

.placeholder {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--teal);
  &::before {
    display: block;
    width: 80%;
    height: calc(25% - 2rem);
    margin: 1rem auto;
    content: '';
    background-image: linear-gradient(
      to bottom,
      var(--light) 50%,
      transparent 50%
    );
    background-repeat: space;
    background-position: 0 0;
    background-size: 100% 15%;
    opacity: 0.8;
  }
  &::after {
    display: block;
    width: 80%;
    height: calc(25% - 2rem);
    margin: 1rem auto;
    content: '';
    background-image: linear-gradient(
      to bottom,
      var(--light) 50%,
      transparent 50%
    );
    background-repeat: space;
    background-position: 0 50%;
    background-size: 80% 15%;
    opacity: 0.8;
  }
}

h2 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 1.2rem;
  font-weight: normal;
  line-height: 1.3;
}

.author {
  display: -webkit-box;
  margin-top: 0.5rem;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.3;
  color: var(--lighter);
  text-overflow: ellipsis;
}

.detail {
  position: absolute;
  right: 0;
  bottom: 9rem;
  z-index: 0;
  width: 100%;
  height: 2px;
  background: var(--teal);
  opacity: 0.75;

  &::after,
  &::before {
    position: absolute;
    bottom: 5px;
    width: 100%;
    height: 2px;
    content: '';
    background: var(--teal);
    opacity: 0.75;
  }

  &::before {
    bottom: -5px;
  }
}

.tag-container {
  position: absolute;
  right: 0;
  bottom: 6rem;
  padding: 0.25rem 0.5rem;
  background: var(--teal);
  border-radius: var(--radius);
  box-shadow: var(--shadow-on-dark);
  transform: rotate(90deg);
  transform-origin: right;
  a {
    display: block;
    font-size: 85%;
    color: var(--lightest);
    text-decoration: none;
    text-transform: lowercase;
  }
}

footer {
  @include padding;
}
</style>
