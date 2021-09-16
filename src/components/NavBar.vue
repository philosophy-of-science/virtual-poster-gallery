<template>
  <div class="bg">
    <nav class="container">
      <div class="left">
        <router-link to="/" class="brand">
          <img
            src="../assets/logo.png"
            alt="Philosophy of Science Association logo"
          />
          <p>Virtual Poster Gallery</p>
        </router-link>
      </div>
      <div class="center">
        <ul>
          <li>
            <router-link to="/" exact-active-class="active"> Home </router-link>
          </li>
          <li>
            <router-link to="/form" exact-active-class="active"
              >Submit your poster</router-link
            >
          </li>
        </ul>
      </div>
      <div class="right">
        <Button type="outline">
          <router-link to="/sign-in">Sign in</router-link>
        </Button>
        <Button type="color" class="sign-up">
          <router-link to="/sign-up" class="link">Sign up</router-link>
        </Button>
      </div>
    </nav>
  </div>
</template>

<script>
import Button from '@/components/Button.vue';

export default {
  components: {
    Button,
  },

  data() {
    return {
      active: 'Home',
    };
  },
};
</script>

<style lang="scss" scoped>
.bg {
  background-image: linear-gradient(to bottom, var(--dark), var(--darker));
}

nav {
  max-width: var(--laptop);
  margin: 0 auto;
  padding: 0.5rem 0.5rem;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr;
  font-size: 0.8rem;
  color: var(--lightest);
}

.center {
  justify-self: center;
}
.right {
  justify-self: end;
}
.brand {
  display: flex;
  align-items: center;
  text-transform: none;

  img {
    height: 40px;
    width: 40px;
    margin-right: 0.5em;
  }
}

ul {
  list-style-type: none;
}

li {
  display: inline-block;
  & + li {
    margin-left: 1rem;
  }
}

a {
  position: relative;
  color: inherit;
  text-decoration: none;
  transition: color 0.2s;
  text-transform: uppercase;
  font-size: 90%;

  &:hover {
    color: var(--light);
  }
}

.active {
  &::after {
    position: absolute;
    content: '';
    right: -5epx;
    top: 0;
    height: 0.25em;
    width: 0.25em;
    border-radius: 50%;
    background-color: var(--teal-light);
  }
}

.sign-up {
  margin-left: 1em;
}
</style>
