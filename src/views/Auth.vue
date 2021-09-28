<template>
  <section class="container">
    <div class="grid">
      <div class="left">
        <header v-show="type === 'signUp'">
          <h2>Sign Up</h2>
          <p class="description">Sign up is required to submit your poster.</p>
        </header>
        <header v-show="type === 'signIn'">
          <h2>Sign In</h2>
        </header>
        <header v-show="type === 'reset'">
          <h2>Reset Your Password</h2>
        </header>
        <header v-show="type === 'newPassword'">
          <h2>Enter a New Password</h2>
        </header>

        <form @submit.prevent="onSubmit">
          <label for="email" v-if="type !== 'newPassword'">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            v-model="email"
            required
            ref="email"
            v-if="type !== 'newPassword'"
          />
          <div v-if="type !== 'reset'" class="mt">
            <label for="password"
              >Password<span
                v-show="passwordIsEightCharacters === false"
                class="badge helper--error"
                ><v-icon name="exclamation-circle" class="mr" scale=".75" />
                Password must be at least 8 characters
              </span></label
            >
            <div class="show-password__container">
              <input
                :type="showPw"
                name="password"
                id="password"
                autocomplete="new-password"
                minlength="8"
                required
                v-model="password"
                @input="
                  validatePassword();
                  doPasswordsMatch();
                "
              />
              <button
                v-show="!passwordVisible"
                @click.stop.prevent="passwordVisible = true"
                class="show-password__button"
                aria-label="show password"
              >
                <v-icon name="eye" scale="1.5" />
              </button>
              <button
                v-show="passwordVisible"
                @click.stop.prevent="passwordVisible = false"
                class="show-password__button"
                aria-label="show password"
              >
                <v-icon name="eye-slash" scale="1.5" />
              </button>
            </div>
          </div>

          <div v-if="type === 'signUp' || type === 'newPassword'" class="mt">
            <label for="confirm"
              >Confirm Password
              <span
                v-show="passwordsMatch === false"
                class="badge helper--error"
              >
                <v-icon name="exclamation-circle" class="mr" scale=".75" />
                Passwords don't match
              </span>
              <span
                v-show="passwordsMatch === true"
                class="badge helper--success"
              >
                <v-icon name="check-circle" class="mr" scale=".75" />Passwords
                match
              </span></label
            >
            <input
              :type="showPw"
              autocomplete="new-passwowrd"
              minlength="8"
              id="confirm"
              required
              v-model="confirm"
              @input="doPasswordsMatch"
            />
          </div>
          <Button type="color">
            <button type="submit">{{ btnTxt }}</button>
          </Button>
          <span v-show="loading" class="badge helper--loading">
            <v-icon name="spinner" pulse></v-icon>
          </span>
          <span v-show="error" class="badge helper--error">
            <v-icon name="exclamation-circle" class="mr" scale=".75" />
            {{ errorMsg }}
          </span>
          <span v-show="success" class="badge helper--success">
            <v-icon name="check-circle" class="mr" scale=".75" />
            {{ successMsg }}
          </span>
          <p
            v-show="type !== 'reset' && type !== 'newPassword'"
            class="forgot-password"
          >
            <router-link class="link" to="/reset"
              >Forgot your password?</router-link
            >
          </p>
        </form>
      </div>
      <div class="right">
        <img
          v-show="type === 'signIn'"
          src="@/assets/signin.svg"
          alt="Sign in"
        />
        <img
          v-show="type === 'signUp'"
          src="@/assets/signup.svg"
          alt="Sign up"
        />
        <img
          v-show="type === 'reset'"
          src="@/assets/reset.svg"
          alt="Reset password"
        />
        <img
          v-show="type === 'newPassword'"
          src="@/assets/new-password.svg"
          alt="New password"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import Button from '@/components/Button.vue';
import supabase from '@/db';

export default {
  components: {
    Button,
  },

  props: {
    type: String,
  },

  data() {
    return {
      email: '',
      password: '',
      confirm: '',
      passwordIsEightCharacters: null,
      passwordsMatch: null,
      passwordVisible: false,
      loading: false,
      error: false,
      errorMsg: '',
      success: false,
      successMsg: '',
    };
  },

  computed: {
    showPw() {
      if (this.passwordVisible) return 'text';
      return 'password';
    },

    btnTxt() {
      switch (this.$props.type) {
        case 'signUp':
          return 'Sign Up';

        case 'signIn':
          return 'Sign In';

        case 'reset':
          return 'Reset Your Password';

        default:
          return 'Update Your Password';
      }
    },
  },

  methods: {
    ...mapActions(['setUser', 'launchToast']),
    validatePassword() {
      if (this.password.length < 8) {
        this.passwordIsEightCharacters = false;
      } else this.passwordIsEightCharacters = true;
    },

    doPasswordsMatch() {
      if (this.confirm !== this.password) {
        this.passwordsMatch = false;
      } else this.passwordsMatch = true;
    },

    async onSubmit() {
      this.loading = true;

      switch (this.$props.type) {
        case 'signUp':
          try {
            const { user, error } = await supabase.auth.signUp({
              email: this.email,
              password: this.password,
            });

            if (error) throw error;

            this.launchToast({
              type: 'success',
              show: true,
              content: 'Check your email to confirm your account.',
            });
            supabase
              .from('profiles')
              .insert([{ id: user.id }], { upsert: true });
            this.$router.push('/');
          } catch (error) {
            this.launchToast({
              type: 'error',
              show: true,
              content: error.message,
            });
          } finally {
            this.loading = false;
          }
          break;
        case 'signIn':
          try {
            const { user, error } = await supabase.auth.signIn({
              email: this.email,
              password: this.password,
            });

            if (error) throw error;

            this.setUser(user).then(() => {
              this.launchToast({
                type: 'success',
                show: true,
                content: 'Successfully signed in.',
              });
              this.$router.push('/profile');
            });
          } catch (error) {
            this.launchToast({
              type: 'error',
              show: true,
              content: error.message,
            });
          } finally {
            this.loading = false;
          }
          break;
        case 'reset':
          try {
            const { error } = supabase.auth.api.resetPasswordForEmail(
              this.email,
            );

            if (error) throw error;

            this.launchToast({
              type: 'success',
              show: true,
              content: 'Reset link sent. Check your email.',
            });

            this.$router.push('/');
          } catch (error) {
            this.launchToast({
              type: 'error',
              show: true,
              content: error.message,
            });
          } finally {
            this.loading = false;
          }
          break;
        default:
          try {
            this.loading = true;
            const { accessToken } = this.$route.query;

            const { error, data } = await supabase.auth.api.updateUser(
              accessToken,
              { password: this.password },
            );

            if (error) throw error;

            this.launchToast({
              type: 'success',
              show: true,
              content: 'Password successfully updated. Logging you in...',
            });

            this.setUser(data);

            this.$router.push('/profile');
          } catch (error) {
            this.launchToast({
              type: 'error',
              show: true,
              content: error.message,
            });
          } finally {
            this.loading = false;
          }
      }
    },
  },

  mounted() {
    const firstInput = document.querySelector('input');
    firstInput.focus();
  },
};
</script>

<style lang="scss" scoped>
header {
  margin: 1rem 0;
}

.helper {
  display: inline-flex;
  align-items: center;
  margin-left: 0.25rem;
  background: none;
  border: 1px solid;

  &--error {
    @extend .helper;
    color: var(--red);
  }

  &--success {
    @extend .helper;
    color: var(--green);
  }

  &--loading {
    @extend .helper;
    color: currentColor;
    border: none;
  }
}

Button {
  margin-top: 2rem;
}

.show-password {
  &__container {
    position: relative;
  }

  &__button {
    position: absolute;
    top: 50%;
    right: 20px;
    width: 40px;
    height: 40px;
    margin: 0;
    cursor: pointer;
    background: none;
    border: none;
    transform: translateY(-50%);
  }
}

.right {
  padding: 1rem;
  img {
    max-width: 100%;
  }
}

.link {
  margin-top: 0.25em;
  font-size: 0.8rem;

  &:hover {
    color: var(--dark);
  }
}

.forgot-password {
  margin-top: 0.25rem;
}
</style>
