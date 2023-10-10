<template>
  <div>
    <el-menu
      :default-active="activeI"
      class="menu"
      mode="horizontal"
      background-color="#C63D2F"
      text-color="#E25E3E"
      active-text-color="#FFBB5C"
      ref="itemM"
    >
      <!-- background-color="#545c64" -->
      <el-menu-item index="1" class="item-default">miahu</el-menu-item>
      <el-menu-item index="2" class="item-default">miasdfhu</el-menu-item>
      <el-menu-item index="3" class="item-default">mias234242dfhu</el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: "StorOfSabaMenu",

  data() {
    return {
      activeI: "1",
    };
  },

  mounted() {
    let chil = this.$refs.itemM.$el.children;
    let widtos = 100 / chil.length;
    Array.from(chil).forEach((element) => {
      element.style.width = `${widtos}%`;
    });
  },

  methods: {},
};
</script>
<style scoped>
.item-default {
  /* width: 20%; */
  font-size: 40px;
  text-align: center;
}
.menu {
  margin: 0px;
  position: relative;
  bottom: 10px;
}
body {
  background: rgb(209, 145, 247);
}
</style>
