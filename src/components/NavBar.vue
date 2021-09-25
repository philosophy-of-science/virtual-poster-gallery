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
            <router-link to="/topics" exact-active-class="active">
              Topics
            </router-link>
          </li>
          <li v-if="user">
            <router-link to="/form" exact-active-class="active"
              >Submit your poster</router-link
            >
          </li>
        </ul>
      </div>
      <div class="right" v-if="!user">
        <Button type="outline">
          <router-link to="/sign-in">Sign in</router-link>
        </Button>
        <Button type="color" class="sign-up">
          <router-link to="/sign-up" class="link">Sign up</router-link>
        </Button>
      </div>
      <div class="right" v-else>
        <Button type="outline">
          <button @click="logout">Log out</button>
        </Button>
        <Button type="color">
          <router-link to="/profile" class="link">Profile</router-link>
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

        if (!this.$route.path === '/') this.$router.push('/');
      } catch (error) {
        this.launchToast({
          type: 'error',
          show: true,
          content: error.message,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.bg {
  background-image: linear-gradient(to bottom, var(--dark), var(--darker));
  margin-bottom: 2rem;
  box-shadow: 0 1px 0.15em rgba(0 0 0 / 0.25), 0 5px 0.75em rgba(0 0 0 / 0.15);
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

.right div:last-child {
  margin-left: 1em;
}
</style>
