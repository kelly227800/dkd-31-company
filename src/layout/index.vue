<template>
  <div class="app-wrapper">
    <sidebar class="sidebar-container" />
    <navbar />
    <div class="main-container">
      <app-main />
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from "./components";

export default {
  name: "Layout",
  components: {
    Navbar,
    Sidebar,
    AppMain,
  },
};
</script>

<style lang="scss" scoped></style>
