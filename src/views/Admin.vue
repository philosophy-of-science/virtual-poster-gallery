<template>
  <div class="container">
    <h2>Admin</h2>
    <div class="entry header">
      <p>id</p>
      <p><v-icon name="address-card" /></p>
      <p>Author(s)</p>
      <p>Title</p>
      <p>Topic</p>
      <p>Edit</p>
      <p>Approve</p>
      <p>Status</p>
    </div>
    <div class="entry" v-for="(entry, i) in data" :key="i">
      <p>{{ i + 1 }}</p>
      <div>
        <img :src="entry.img" alt="" />
      </div>
      <p>
        {{ entry.name }}
      </p>

      <p>{{ entry.title }}</p>
      <p>{{ entry.topic }}</p>
      <Button type="outline"><button @click="edit">Edit</button></Button>
      <Button type="color"
        ><button @click="toggleApproval">Approve</button></Button
      >
      <p>Approved</p>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button.vue';

export default {
  components: {
    Button,
  },

  methods: {
    edit(e) {
      console.log(e);
    },

    toggleApproval(e) {
      console.log(e);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: var(--laptop);
  margin: 0 auto;
}

h2 {
  margin: 1rem 0 3rem;
}

.entry {
  font-size: 0.8rem;
  display: grid;
  grid-template-columns: 2rem 50px 1fr 1fr 1fr 1fr 1fr 1fr;
  border-bottom: 1px solid var(--border-color);
  border-left: 1px solid var(--border-color);
  overflow: hidden;
  background-color: var(--darkest);
  color: var(--lightest);

  &.header {
    background: var(--dark);
    color: var(--light);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-top-left-radius: var(--radius);
    border-top-right-radius: var(--radius);
    overflow: hidden;

    & > *:not(:last-child) {
      padding: 0.25rem;

      border-color: var(--dark);
    }
  }

  &:first-of-type {
    border-top: 1px solid var(--border-color);
  }

  &:last-of-type {
    border-bottom-left-radius: var(--radius);
    border-bottom-right-radius: var(--radius);
  }

  & > * {
    padding: 0.25rem;
    border-right: 1px solid var(--border-color);
  }

  img {
    height: 40px;
    width: 40px;
    object-fit: cover;
  }

  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
