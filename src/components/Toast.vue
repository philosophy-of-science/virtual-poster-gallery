<template>
  <transition name="slide-up">
    <div class="toast" v-if="toast.show" @click="eatToast">
      <aside class="toast-content" :class="toast.type">
        <p>
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
          {{ toast.content }}
          <v-icon name="times" class="ml" />
        </p>
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
  bottom: 2rem;
  right: 5rem;
}

.toast-content {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  line-height: 1.2;
  border-radius: var(--radius);
  box-shadow: var(--shadow-on-bg);
}

.error {
  background-color: var(--red);
  border: 1px solid var(--red-light);
  color: var(--lightest);
}

.success {
  background-color: var(--teal);
  border: 1px solid var(--teal-light);
  color: var(--lightest);
}

.info {
  background-color: var(--darkest);
  border: 1px solid var(--dark);
  color: var(--lightest);
}

.slide-up-enter-active {
  transition: transform 0.3s ease-out, opacity 0.3s;
}
.slide-up-leave-active {
  transition: transform 0.3s ease-in, opacity 0.3s;
}
.slide-up-enter,
.slide-up-leave-to {
  transform: translateY(calc(100% + 2rem));
  opacity: 0;
}
</style>
