<template>
  <div class="Wrapper">
    <Header :title="title" :icon="icon" :use-h1="useH1" />
    <slot />
    <Footer :title="title" :icon="icon" />
    <Badge />
  </div>
</template>

<script>
export default {
  props: {
    app: {
      type: Object,
      default: null,
    },
    useH1: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    title() {
      return (this.app && this.app.name) || 'Updates'
    },
    icon() {
      return (this.app && this.app.icon && this.app.icon.value) || '📣'
    },
  },
}
</script>

<style>
.Wrapper {
  min-height: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
}
@media all and (-ms-high-contrast: none) {
  *::-ms-backdrop,
  .Wrapper {
    height: 100%;
  } /* IE11 */
}
</style>
