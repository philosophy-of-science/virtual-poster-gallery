<template>
  <transition name="slide-up">
    <div class="toast" v-if="toast.show" @click="eatToast">
      <aside class="toast-content" :class="toast.type">
        <v-icon
          name="check-circle"
          class="mr"
          v-show="toast.type === 'success'"
        />
        <v-icon
          name="exclamation-circle"
          class="mr"
          v-show="toast.type === 'error'"
        />
        <p>
          {{ toast.content }}
        </p>

        <v-icon name="times" class="ml" />
      </aside>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: mapState(['toast']),

  methods: {
    eatToast() {
      this.toast.show = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.toast {
  position: fixed;
  right: 10%;
  bottom: 2rem;
  z-index: 1000;
}

.mr {
  margin-right: 0.5em;
}

.ml {
  margin-left: 0.5em;
}

.toast-content {
  display: inline-flex;
  align-items: center;
  padding: 1rem 2rem;
  line-height: 1.2;
  border-radius: var(--radius);
  box-shadow: var(--shadow-on-bg);
}

.error {
  color: var(--lightest);
  background-color: var(--red);
  border: 1px solid var(--red-light);
}

.success {
  color: var(--lightest);
  background-color: var(--green);
  border: 1px solid var(--green-light);
}

.info {
  color: var(--lightest);
  background-color: var(--darkest);
  border: 1px solid var(--dark);
}

.slide-up-enter-active {
  transition: transform 0.3s ease-out, opacity 0.3s;
}
.slide-up-leave-active {
  transition: transform 0.3s ease-in, opacity 0.3s;
}
.slide-up-enter,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(calc(100% + 2rem));
}
</style>
