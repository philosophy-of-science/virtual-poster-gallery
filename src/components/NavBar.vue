<template>
  <div class="bg" @keyup.esc="closeByEsc">
    <nav class="container">
      <div class="left">
        <router-link to="/" class="brand">
          <img
            src="../assets/logo.png"
            alt="Philosophy of Science Association logo"
          />
          <h1>Virtual Poster Gallery</h1>
        </router-link>
      </div>
      <div class="bar" :class="{ show: showMenu }" @click="toggleMenu">
        <div class="center">
          <ul>
            <li>
              <router-link to="/" exact-active-class="active">
                Home
              </router-link>
            </li>
            <li>
              <router-link to="/topics" exact-active-class="active">
                Topics
              </router-link>
            </li>
            <li>
              <router-link to="/form" exact-active-class="active"
                >Submit your poster</router-link
              >
            </li>
          </ul>
        </div>
        <div class="right" v-show="!user">
          <Button type="outline">
            <router-link to="/sign-in">Sign in</router-link>
          </Button>
          <Button type="color" class="sign-up">
            <router-link to="/sign-up" class="link">Sign up</router-link>
          </Button>
        </div>
        <div class="right" v-show="user">
          <Button type="outline">
            <button @click="logout">Log out</button>
          </Button>
          <Button type="color">
            <router-link to="/profile" class="link">Profile</router-link>
          </Button>
        </div>
      </div>
      <div class="button">
        <Button type="outline">
          <button @click="showMenu = !showMenu" aria-label="Menu">
            <v-icon v-show="!showMenu" scale="1.5" name="bars" />
            <v-icon v-show="showMenu" scale="1.5" name="times" />
          </button>
        </Button>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import supabase from '@/db';
import Button from '@/components/Button.vue';

export default {
  components: {
    Button,
  },

  data() {
    return {
      active: 'Home',
      showMenu: false,
    };
  },

  computed: mapState(['user']),

  methods: {
    ...mapActions(['setUser', 'launchToast']),

    async logout() {
      try {
        const { error } = await supabase.auth.signOut();

        if (error) throw error;

        this.launchToast({
          type: 'success',
          show: true,
          content: 'Successfully logged out.',
        });

        this.setUser(null);

        this.$router.push('/');
      } catch (error) {
        this.launchToast({
          type: 'error',
          show: true,
          content: error.message,
        });
      }
    },

    toggleMenu() {
      if (document.documentElement.clientWidth < 900) {
        this.showMenu = false;
      }
    },

    closeByEsc() {
      if (this.showMenu) this.showMenu = false;
    },
  },
};
</script>

<style lang="scss" scoped>
$break: 900px;

.bg {
  margin-bottom: 1rem;
  background-image: linear-gradient(to bottom, var(--dark), var(--darker));
  box-shadow: 0 1px 0.15em rgba(0 0 0 / 0.25), 0 5px 0.75em rgba(0 0 0 / 0.15);
}

nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--laptop);
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  margin: 0 auto;
  font-size: 0.8rem;
  color: var(--lightest);
}

.brand {
  display: flex;
  flex-grow: 0 0 0;
  align-items: center;
  margin-right: 2rem;
  text-transform: none;

  img {
    width: 40px;
    height: 40px;
    margin-right: 0.5em;
  }
}

ul {
  padding-left: 0;
  list-style-type: none;
}

li {
  display: block;
  margin-bottom: 1rem;

  @media (min-width: $break) {
    display: inline-block;
    margin-bottom: 0;

    & + li {
      margin-left: 1rem;
    }
  }
}

a {
  position: relative;
  font-size: 90%;
  color: inherit;
  text-decoration: none;
  text-transform: uppercase;
  transition: color 0.2s;

  &:hover {
    color: var(--light);
  }
}

.active {
  &::after {
    position: absolute;
    top: 0;
    right: -5px;
    width: 0.25em;
    height: 0.25em;
    content: '';
    background-color: var(--teal-light);
    border-radius: 50%;
  }
}

.right {
  div {
    display: block;
    margin-top: 1rem;
  }

  @media (min-width: $break) {
    div {
      display: inline-block;
      margin-top: 0;
    }

    div:last-child {
      margin-left: 1em;
    }
  }
}

.bar {
  position: absolute;
  top: 57px;
  right: 0;
  z-index: 1000;
  display: none;
  width: 100%;
  padding: 2rem;
  font-size: 1.3em;
  text-align: center;
  background-color: var(--darker);
  box-shadow: var(--shadow-on-bg);

  &.show {
    display: block;
  }

  @media (min-width: $break) {
    position: initial;
    top: initial;
    right: initial;
    display: flex;
    flex: 1 1 0;
    align-items: center;
    justify-content: space-between;
    width: auto;
    padding: initial;
    font-size: initial;
    text-align: initial;
    background: none;
    box-shadow: none;
  }
}

.button {
  display: none;
  @media (max-width: $break) {
    display: flex;
  }
}
</style>
