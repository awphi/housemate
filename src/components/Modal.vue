<template>
  <teleport to="#modals">
    <TransitionRoot
      :show="isOpen"
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      class="modal-base"
      as="div"
      @click="onExit"
    >
      <slot></slot>
    </TransitionRoot>
  </teleport>
</template>

<script>
import { TransitionRoot } from "@headlessui/vue";

export default {
  methods: {
    onExit(e) {
      if (e.target === e.currentTarget) {
        this.$emit("update:isOpen", false);
      }
    },
  },
  emits: ["update:isOpen"],
  props: {
    isOpen: Boolean,
  },
  components: { TransitionRoot },
};
</script>
