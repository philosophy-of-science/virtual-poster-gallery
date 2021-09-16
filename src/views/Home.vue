<template>
  <main class="container">
    <header>
      <h2>Philosophy of Science Association</h2>
      <p>2021 Virtual Poster Gallery</p>
    </header>
    <div class="grid">
      <Card
        v-for="(card, i) in data"
        :key="i"
        :name="card.name"
        :title="card.title"
        :img="card.img"
        :topic="card.topic"
        :id="card.id"
      />
    </div>
  </main>
</template>

<script>
// @ is an alias to /src
import Card from '@/components/Card.vue';
import data from '@/testData.json';

export default {
  components: {
    Card,
  },

  data() {
    return {
      data,
    };
  },
};
</script>

<style lang="scss" scoped>
header {
  margin: 1rem 0 3rem;
}
</style>

<style lang="scss">
.grid {
  margin: 0 auto;
  display: grid;
  column-gap: 6rem;
  row-gap: 3rem;
  grid-template-columns: repeat(auto-fit, minmax(20.65rem, 1fr));
  justify-content: center;
}

.link {
  color: inherit;
}
</style>
