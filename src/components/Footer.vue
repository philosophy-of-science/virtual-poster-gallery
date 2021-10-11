<template>
  <footer>
    <div class="container">
      <p>&copy; <a href="https://philsci.org">Philosophy of Science Association</a>
        {{ new Date().getFullYear() }}
      </p>
      <p>With support from the<br><a href="https://www.lps.uci.edu/">UCI Department of Logic and Philosophy of Science</a></p>
      <p>Designed + Built by <a href="https://ryanfeigenbaum.com">Ryan Feigenbaum</a></p>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
footer {
  margin-top: 3rem;
  background-image: linear-gradient(to top, var(--dark), var(--darker));
}
div {
  p {
    font-size: 14px;
    color: var(--light);
    &:not(:last-child) {margin-bottom: 1em;}
  }
}
</style>
