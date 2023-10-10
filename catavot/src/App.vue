<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: "",
    };
  },
  mounted() {
    this.$eventB.$on("busID", (ids) => {
      // alert(ids);
      this.id = ids;
    });
    // alert(this.id);
    // console.log("bulian", this.$route.path === `/favorite/` + this.id);
    // console.log("path", this.$route.path);
    // console.log("hashavti", `/favorite/${this.id}`);
    // console.log("hashavti2", `/favorite/` + this.id);
    if (this.$route.path !== "/befor") {
      if (this.$route.path !== `/favorite/${this.id}`) {
        this.$router.push({ path: "/befor" });
      }
    }
    //      this.$route.path !== `/favorite/${this.id}`
  },
};
</script>
