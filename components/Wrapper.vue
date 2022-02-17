<template>
  <div class="Wrapper">
    <Header :app="app" :use-h1="useH1" />
    <slot />
    <Footer :app="app" />
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
