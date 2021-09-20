<template>
  <div :class="{ color: type === 'color', outline: type === 'outline' }">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    type: String,
  },
};
</script>

<style lang="scss" scoped>
div {
  display: inline-block;

  a,
  button {
    display: inline-flex;
    align-items: center;
    padding: 0.25em 0.5em;
    border: 1px solid;
    border-radius: var(--radius);
    text-decoration: none;
    transition: color 0.2s, background-color 0.2s;
    font-weight: 700;
    font-size: inherit;
    font-family: inherit;
    line-height: inherit;
    background: none;
    cursor: pointer;
    box-shadow: var(--shadow-on-dark);
  }

  // & ~ div {
  //   margin-left: 0.5em;
  // }
}

.color {
  a,
  button {
    background-color: var(--light);
    color: var(--dark);

    &:hover {
      background-color: var(--lighter);
      color: var(--dark);
    }
  }
}

.outline {
  a,
  button {
    color: var(--light);

    &:hover {
      background-color: var(--light);
      color: var(--dark);
    }
  }
}
</style>
