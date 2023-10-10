<template>
  <div>
    <div>
      <router-link to="/befor"
        ><el-button class="el-icon-back"></el-button
      ></router-link>
    </div>

    <h1>{{ catava ? catava.name : "loading..." }}</h1>
    <h4 v-show="!showtexto">
      {{ catava ? catava.description : "loading..." }}
    </h4>
    <span
      ><el-button
        type="primary"
        v-show="!showtexto"
        class="el-icon-edit"
        style="position: absolute"
        @click="chanos"
      ></el-button
      ><el-button
        type="success"
        style="position: absolute"
        class="el-icon-check"
        v-show="showtexto"
        @click="editDiscrip"
      ></el-button
    ></span>
    <br />
    <el-input
      v-show="showtexto"
      class="inp"
      type="textarea"
      :rows="15"
      autosize
      width="50%"
      placeholder="Please input"
      v-model="textarea"
    >
    </el-input>

    <div class="a">
      <a :href="catava.url">To the full article</a>
    </div>
  </div>
</template>
<script>
import { URLSERVERA } from "@/URLS/url";
import { URL } from "../URLS/url";
import axios from "axios";
export default {
  data() {
    return {
      id: "",
      catava: "",
      shogen: false,
      data: "",
      showtexto: false,
      textarea: "",
    };
  },
  beforeRouteEnter(to, from, next) {
    next();
    axios.get(URLSERVERA).then((res) => {
      axios.post(URL + "req", res.data.sources).then((res) => {
        console.log(res.data);
      });
    });
  },
  methods: {
    editDiscrip() {
      this.showtexto = !this.showtexto;
      if (this.textarea !== "") {
        this.catava.description = this.textarea;
      }
    },
    routechange() {
      alert("hey");
    },
    chanos() {
      this.showtexto = !this.showtexto;
      this.textarea = this.catava.description;
    },
  },
  mounted() {
    this.id = this.$route.params.id;
    this.$ax
      .get(URL + this.id)
      .then((res) => {
        // console.log("res data of home", res.data);
        this.catava = res.data.catava[0];
        console.log(this.catava);
        this.shogen = true;
      })
      .catch((e) => console.log("e of home", e));
    document.body.style.height = "330px";
    document.body.style.width = "1140px";
    document.body.style.background = "rgb(255, 241, 222)";
  },
};
</script>
<style scoped>
h1 {
  position: relative;
  left: 620px;
  width: 200px;
  margin-right: 0px;
}
.a {
  position: absolute;
  left: 550px;
  top: 340px;
  font-size: 50px;
}
h4 {
  text-align: center;
}
.el-icon-edit {
  top: 160px;
  left: 1170px;
}
.inp {
  position: absolute;
  width: 30%;
  height: auto;
  left: 480px;
}
.el-icon-check {
  left: 1000px;
}
</style>
