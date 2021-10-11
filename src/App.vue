<template>
  <div id="app">
    <nav-bar />
    <router-view />
    <Toast />
    <Footer />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import Toast from '@/components/Toast.vue';
import Footer from './components/Footer.vue';

export default {
  components: { NavBar, Toast, Footer },
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

  --laptop: 1200px;
}

:link,
:visited {
  color: currentColor;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html {
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 1rem;
  font-size: clamp(1rem, 0.9558823529411765rem + 0.2352941176470588vw, 1.25rem);
  line-height: 1.5;
  color: var(--darkest);
  background: hsl(170, 25%, 85%);
}

main {
  min-height: 100vh;
}

.container {
  max-width: var(--laptop);
  padding: 1rem;
  margin: 0 auto;

  @media (min-width: 576px) {
    padding: 1rem 3rem;
  }
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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(19rem, 1fr));
  gap: 3rem;
  margin: 0 auto;
}

.link {
  color: inherit;
}

ul,
ol {
  padding-left: 2rem;
}

blockquote {
  padding-left: 1rem;
  margin: 1rem 0;
  border-left: 3px solid var(--teal);
}

strong,
b {
  font-weight: 700;
}

em,
i {
  font-style: italic;
}

label,
.label {
  display: block;
  padding-left: 0.75rem;
  margin-bottom: 0.25em;
  font-size: max(0.8rem, 14px);
  font-weight: 700;
  text-transform: uppercase;

  & ~ label {
    margin-top: 1rem;
  }
}

input,
textarea,
select,
.editor {
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-family: inherit;
  font-size: inherit;
  color: var(--darkest);
  background: var(--lightest);
  border: 2px solid transparent;
  border-radius: var(--radius);
  transition: border 0.2s, background 0.2s;

  &:focus,
  &.focus {
    background: var(--lighter);
    border: 2px solid var(--teal);
    outline: none;
  }
}

textarea {
  height: 25ch;
}

.badge {
  display: inline-block;
  padding: 0 0.25rem;
  font-size: 0.8em;
  font-weight: normal;
  letter-spacing: 0.5px;
  vertical-align: middle;
  border-radius: var(--radius);
  transform: translateY(-2px);
}

.submit-button {
  margin-top: 1rem;
  button {
    &:disabled {
      cursor: not-allowed;
      opacity: 0.75;
    }
  }
}

.loading {
  margin-left: 0.5em;
}

.helper {
  padding-left: 0.75rem;
  margin-top: 0.25em;
  font-size: 0.8rem;
}

.poster-instructions {
  display: grid;
  grid-auto-flow: row;
  gap: 1rem;
  padding: 1rem;
  margin: 1rem 0;
  background-color: var(--lighter);
  border-radius: var(--radius);

  @media (min-width: 1200px) {
    grid-auto-flow: column;
  }

  .mockup {
    div {
      position: relative;
      width: 10rem;
      max-width: 100%;
      height: 10rem * 1.5;
      margin: 0 auto;
      border: 1px dashed;
      border-radius: var(--radius);
    }

    span:first-child {
      position: absolute;
      top: 5%;
      left: 0;
      display: block;
      width: 100%;
      text-align: center;
    }

    span:last-child {
      position: absolute;
      bottom: 0;
      left: 5%;
      display: block;
      width: 100%;
      text-align: center;
      transform: rotate(-90deg);
      transform-origin: top left;
    }
  }
}
</style>
