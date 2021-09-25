<template>
  <main class="container">
    <PosterGallery
      :title="$route.params.topicId"
      :subtitle="$route.params.topicId"
    />
  </main>
</template>

<script>
import PosterGallery from '@/components/PosterGallery.vue';

export default {
  components: {
    PosterGallery,
  },
};
</script>

<style lang="scss" scoped>
</style>
