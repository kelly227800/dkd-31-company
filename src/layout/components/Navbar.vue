<template>
  <div class="navbar">
    <img src="@/assets/images/home-logo.png" alt="" width="88" />
    <div class="right-menu">
      <img
        :src="$store.state.user.userInfo.image + '1'"
        class="user-avatar"
        v-imgError="defaultImg"
      />
      <div class="menu-text">
        欢迎您， {{ $store.state.user.userInfo.userName }}
      </div>
      <div class="menu_logout">
        <span @click="logout">退出</span>
        <i class="el-icon-caret-bottom" />
      </div>
    </div>
  </div>
</template>

<script>
import defaultImg from "@/assets/images/head.jpg";
export default {
  data() {
    return {
      defaultImg,
    };
  },
  methods: {
    // 退出按钮
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1999;
  background-image: url("~@/assets/images/home-navbar-bgi.png");

  img {
    margin: 6px 0 0 15px;
  }
  .right-menu {
    margin-right: 30px;
    line-height: 50px;
    display: flex;
    align-items: center;
    color: #fff;

    .user-avatar {
      cursor: pointer;
      width: 40px;
      height: 40px;
      border-radius: 10px;
    }

    .menu-text {
      width: 140px;
      height: 100%;
      margin-left: 10px;
    }

    .menu_logout {
      cursor: pointer;
    }
  }
}
</style>
