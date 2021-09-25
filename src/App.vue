<template>
  <div id="app">
    <nav-bar />
    <router-view />
    <Toast />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import Toast from '@/components/Toast.vue';

export default {
  components: { NavBar, Toast },
};
</script>

<style lang="scss">
:root {
  --radius: 0.25em;
  --charcoal: #3a3a3a;

  --teal: #17b097;
  --teal-light: hsl(170, 97%, 53%);
  --dark: #20312f;
  --darker: #141d1b;
  --darkest: #181a19;
  --light: #b6fdf1;
  --lighter: #dafcf6;
  --lightest: #f0fcfa;
  --red: hsl(358, 70%, 40%);
  --red-light: hsl(358, 70%, 60%);
  --green: #0d550a;
  --green-light: #8afc47;
  --border-color: #b6fdf186;

  --bg: rgb(207, 226, 223);

  --shadow-on-bg: 0 1px 1px #0b201d1c, 0 2px 2px #0b201d1c, 0 4px 4px #0b201d1c,
    0 8px 8px #0b201d1c, 0 16px 16px #0b201d1c, 0 32px 32px #0b201d1c;

  --shadow-dark: 0 1px 1px #01030375, 0 2px 2px #01030375, 0 4px 4px #01030375,
    0 8px 8px #01030375, 0 16px 16px #01030375, 0 32px 32px #01030375;

  --shadow-sm: 0 2px 2px rgba(0 0 0 / 0.3);

  // test

  // --teal: #fa4242;
  // --dark: #1b1d2e;
  // --darker: #12152e;
  // --darkest: #121216;

  // --light: #cacceb;
  // --lighter: #d2d4f1;
  // --lightest: #e4e6ff;

  --laptop: 1200px;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 1rem;
  font-size: clamp(1rem, 0.9558823529411765rem + 0.2352941176470588vw, 1.25rem);
  line-height: 1.5;
  background: hsl(170, 25%, 85%);
  color: var(--darkest);
}

.container {
  max-width: var(--laptop);
  padding: 1rem;
  margin: 0 auto;
}

.mr {
  margin-right: 0.25em;
}

.ml {
  margin-left: 0.25em;
}

.mb {
  margin-bottom: 1rem;
}

.mt {
  margin-top: 1rem;
}

.grid {
  margin: 0 auto;
  display: grid;
  column-gap: 6rem;
  row-gap: 3rem;
  grid-template-columns: repeat(auto-fit, minmax(20.65rem, 24rem));
}

.link {
  color: inherit;
}
</style>
