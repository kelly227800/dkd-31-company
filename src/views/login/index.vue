<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div>
        <img src="@/assets/images/logo.png" alt="" class="login-logo" />
      </div>

      <!-- 表单区域 -->
      <!-- 账号 -->
      <el-form-item prop="loginName">
        <i class="svg-container el-icon-mobile-phone"> </i>
        <el-input
          v-model="loginForm.loginName"
          placeholder="请输入账号"
        ></el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item prop="password">
        <i class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </i>
        <el-input
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
        ></el-input>
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>
      <!-- 验证码 -->
      <el-form-item prop="code">
        <el-row>
          <el-col :span="17">
            <i class="svg-container el-icon-circle-check"></i>
            <el-input
              v-model="loginForm.code"
              placeholder="请输入验证码"
            ></el-input>
          </el-col>
          <el-col :span="7">
            <img
              :src="$store.state.user.imgUrl"
              alt=""
              @click="clickCode"
              class="code-img"
            />
          </el-col>
        </el-row>
      </el-form-item>

      <el-button
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        :loading="isLogin"
        @click="login"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        loginName: "admin",
        password: "admin",
        code: "",
        clientToken: this.getRandom(0, 10000),
        loginType: 0,
      },
      passwordType: "password",
      loginRules: {
        loginName: [{ required: true, trigger: "blur", message: "请输入账号" }],
        password: [{ required: true, trigger: "blur", message: "请输入密码" }],
        code: [{ required: true, trigger: "blur", message: "请输入验证码" }],
      },
      isLogin:false,
    };
  },
  created() {
    this.clickCode();
  },
  methods: {
    getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min //含最大值，含最小值
      },
    // 点击图片验证码
    clickCode() {
      this.loginForm.clientToken=this.getRandom(0, 10000)
      this.$store.dispatch("user/getCode", this.loginForm.clientToken);
    },
    // 密码框的显示和隐藏
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    // 点击登录效果
    async login() {
      this.isLogin=true
      try{
        await this.$refs.loginForm.validate();
        await this.$store.dispatch("user/getToken", this.loginForm);
        this.$router.push('/')
        this.$message.success('登录成功')
      }finally{
        this.isLogin=false
      }
    },
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #999;
$cursor: #999;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;
      width: 200px;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-image: url(~@/assets/images/background.png);
  background-repeat: no-repeat;
  background-size: cover;

  .login-logo {
    position: absolute;
    width: 96px;
    height: 96px;
    top: -46px;
    left: 50%;
    margin-left: -48px;
  }
  .login-form {
    position: absolute;
    width: 518px;
    height: 388px;
    top: 50%;
    left: 50%;
    margin-top: -194px;
    margin-left: -259px;
    padding: 76px 35px 0;
    background: #fff;
    -webkit-box-shadow: 0 3px 70px 0 rgb(30 111 72 / 35%);
    box-shadow: 0 3px 70px 0 rgb(30 111 72 / 35%);
    border-radius: 10px;
  }
  .el-form-item {
    width: 100%;
    height: 52px;
    // margin-bottom: 24px;
    background: #fff;
    border: 1px solid #e2e2e2;
    border-radius: 4px;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .el-button--primary {
    width: 100%;
    height: 52px;
    background: linear-gradient(262deg, #2e50e1, #6878f0);
    opacity: 0.91;
    border-radius: 8px;
    color: #fff;
    text-shadow: 0 7px 22px #cfcfcf;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .code-img {
    height: 50px;
  }
  .el-col {
    height: 50px;
  }
}
</style>
