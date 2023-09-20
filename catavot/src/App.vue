<template>
  <div id="app">
    <el-button @click="del" class="el-icon-delete"></el-button>
    <table style="width: 100%; height: 100%; font-size: 40px">
      <tr>
        <th colspan="100%">All-news</th>
      </tr>
      <div class="All-news">
        <tr>
          <td>
            <el-button></el-button>
          </td>
        </tr>
      </div>
    </table>
    <!-- <tr>
      <td>
        <el-button class="title">
          <strong>
            {{ data && data[1] ? data[1].name : "loading..." }}
          </strong></el-button
        >
      </td>
    </tr> -->
  </div>
</template>
<script>
import { URLSERVERA } from "@/URLS/url";
import { URL } from "@/URLS/url";
export default {
  data() {
    return {
      data: "",
    };
  },
  mounted() {
    this.$ax
      .get(URLSERVERA)
      .then((res) => {
        console.log("res data", res.data.sources);
        this.data = res.data.sources;
        console.log("res.data.sources", res.data.sources);
        this.$ax
          .post(URL + "req", res.data.sources)
          .then((res) => {
            console.log("res data", res.data);
          })
          .catch((e) => console.log("error:", e));
      })
      .catch((e) => console.log(e));
  },
  methods: {
    alo() {
      this.$message.success("חכה בסבלנות");
    },
    del() {
      this.$ax.delete(URL + "del").then((res) => {
        this.$message("נמחק");
      });
    },
  },
};
</script>
<style scoped>
.title {
  padding: 0px;
  height: 70px;
  inline-size: 230px;
  /* width: ; */
}
.data-title {
  inline-size: 400px;
  position: relative;
  left: 400px;
}
th {
  border-bottom: 3px solid black;
}
</style>
<style>
body {
  background: rgb(255, 31, 98);
}
</style>
