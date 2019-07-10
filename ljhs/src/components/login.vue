<template>
  <div class="contain">
    <div class="d1">
      <div @click="yklogo">游客登录</div>
    </div>
    <div class="logo">
      <img src="../assets/images/logo.png" alt />
    </div>
    <ul class="d2">
      <li class="animated fadeInLeft  delay-3s">
        <span>账号：</span>
        <input type="text" class="t1" placeholder="输入账号" v-model="name" />
      </li>
      <li class="animated fadeInLeft delay-4s">
        <span>密码：</span>
        <input type="password" class="t1" placeholder="输入密码" v-model="password" />
      </li>
    </ul>
    <div class="btn" @click="logo" >确认登录</div>
  </div>
</template>

<script>
import { Toast, Button, Notify } from "vant";
import 'vue2-animate/dist/vue2-animate.min.css';
export default {
  data() {
    return {
      name: "",
      password: "",
      token: ""
    };
  },
  mounted() {

  },
  components: {
    Toast
  },
  methods: {
    yklogo() {
      this.$router.push("index");
      window.sessionStorage.setItem("youke", 3);
    },
    logo() {
      if (this.name == "" || this.password == "") {
        Toast("用户名或密码不能为空！");
        return;
      }
      this.postRequest({
        cmd: "login",
        name: this.name,
        password: this.password,
        token: ""
      }).then(res => {
        console.log(res);
        Toast.success("登陆成功！");
        setTimeout(() => {
          this.$router.push("index");
        }, 1000);
        window.sessionStorage.setItem("youke", "");
        window.sessionStorage.setItem("uid", res.data.uid);
        this.$store.commit("setuid", res.data.uid);
      });
    }
  }
};
</script>

<style scoped="scoped">
.contain {
  width: 100%;
  box-sizing: border-box;
  height: 100vh;
  background: #fff;
}
.d1 {
  width: 100%;
  display: flex;
  flex-flow: row;
  justify-content: flex-end;
  padding: 0.4rem 0.3rem 0;
}
.d1 div {
  width: 1.97rem;
  height: 30px;
  background: #f9f9f9;
  font-size: 0.35rem;
  line-height: 0.8rem;
  border-radius: 15px;
  text-align: center;
  cursor: pointer;
}
.logo {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}
.logo img {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
}
.d2 {
  width: 100%;
  margin-top: 1.5rem;
}
.d2 li {
  width: 8.34rem;
  height: 1.17rem;
  border-radius: 0.586rem;
  margin: 0.45rem auto 0;
  background: #f9f9f9;
  line-height: 1.17rem;
  padding-left: 0.5rem;
  box-sizing: border-box;
  display: flex;
  flex-flow: row;
  align-content: center;
}
.d2 span {
  font-size: 0.4rem;
  color: #333;
}
.t1 {
  width: 5.9rem;
  height: 99%;
  background: transparent;
  font-size: 0.374rem;
  margin-left: 0.5rem;
}
/* .btn{display: block;width: 2.5rem;height: .63rem;line-height: .63rem;text-align: center;border-radius: .3rem;margin: 0 auto;margin-top: .9rem;font-size: .3rem;
	background: linear-gradient(180deg,rgba(115, 200, 255, 1), rgba(49, 146, 255, 1));box-shadow: 0px 10px 24px 0px rgba(55, 151, 255, 0.3); color: #fff;} */
.btn {
  display: block;
  width: 4.56rem;
  height: 1.17rem;
  line-height: 1.17rem;
  text-align: center;
  border-radius: 0.586rem;
  margin: 0 auto;
  margin-top: 0.9rem;
  font-size: 0.43rem;
  background: #157fca;
  color: #fff;
}
</style>
