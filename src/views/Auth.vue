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

        <form @submit.prevent="onSubmit">
          <label for="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            v-model="email"
            required
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
                autocomplete="new-passwowrd"
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
              >
                <v-icon name="eye" scale="1.5" />
              </button>
              <button
                v-show="passwordVisible"
                @click.stop.prevent="passwordVisible = false"
                class="show-password__button"
              >
                <v-icon name="eye-slash" scale="1.5" />
              </button>
            </div>
          </div>

          <div v-if="type === 'signUp'" class="mt">
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
          <p v-show="type !== 'reset'">
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

        default:
          return 'Reset Your Password';
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
            const { error } = await supabase.auth.signUp({
              email: this.email,
              password: this.password,
            });

            if (!error) {
              this.launchToast({
                type: 'success',
                show: true,
                content: 'Check your email to confirm your account.',
              });
              // this.success = true;
              // this.successMsg =
              //   'Success. Check your email to confirm your account.';
            } else {
              this.launchToast({
                type: 'error',
                show: true,
                content: error.message,
              });
              // this.error = true;
              // this.errorMsg = error.message;
            }
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

            if (!error) {
              console.log(user);
              this.setUser(user).then(() => {
                this.launchToast({
                  type: 'success',
                  show: true,
                  content: 'Successfully signed in.',
                });
                this.$router.push('/profile');
                // this.success = true;
                // this.successMsg = 'Successfully signed in.';
              });
            } else {
              // this.error = true;
              // this.errorMsg = error.message;
              this.launchToast({
                type: 'error',
                show: true,
                content: error.message,
              });
            }
          } catch (error) {
            // this.error = true;
            // this.errorMsg = error;
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
            const { error } = supabase.auth.api.resetPasswordForEmail(
              this.email,
            );
            if (!error) {
              // this.success = true;
              // this.successMsg = 'Reset link sent. Check your email.';
              this.launchToast({
                type: 'success',
                show: true,
                content: 'Reset link sent. Check your email.',
              });
              this.$router.push('/');
            } else {
              // this.error = true;
              // this.errorMsg = error.message;
              this.launchToast({
                type: 'error',
                show: true,
                content: error.message,
              });
            }
          } catch (error) {
            // this.error = true;
            // this.errorMsg = error;
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
};
</script>

<style lang="scss" scoped>
section {
  margin-top: 3rem;
}

header {
  margin-bottom: 1rem;
}

.helper {
  margin-left: 0.25rem;

  background: none;
  border: 1px solid;
  display: inline-flex;
  align-items: center;

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
  margin-top: 1rem;
}

.show-password {
  &__container {
    position: relative;
  }

  &__button {
    cursor: pointer;
    width: 40px;
    height: 40px;
    margin: 0;
    background: none;
    border: none;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 20px;
  }
}

.right {
  padding: 1rem;
  img {
    max-width: 100%;
  }
}

.link {
  font-size: 0.8rem;
  margin-top: 0.25em;

  &:hover {
    color: var(--dark);
  }
}
</style>
