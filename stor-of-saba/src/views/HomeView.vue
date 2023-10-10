<template>
  <div>
    <el-image :src="logo" fit="cover" class="img"></el-image>
    <VMenu class="ME"></VMenu>
    <product></product>
  </div>
</template>
<script>
import VMenu from "@/components/menuComp.vue";
import product from "@/components/productComp.vue";
import logo from "@/assets/logo.png";
export default {
  components: { VMenu, product },
  data() {
    return {
      logo,
    };
  },
  mounted() {},
  updated() {},

  methods: {},
};
</script>
<style scoped>
.img {
  border-bottom: 2px solid black;
  width: 100%;
  height: 150px;
  margin-top: 0px;
}
</style>
<style>
body {
  margin-top: 0px;
}
</style>
