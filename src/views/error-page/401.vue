<!-- setup 无法设置组件名称，组件名称keepAlive必须 -->
<script lang="ts">
export default {
  name: 'Page401'
};
</script>

<script setup lang="ts">
import {onMounted, reactive, toRefs} from 'vue';
import { useRouter } from 'vue-router';

const state = reactive({
  errGif: new URL(`../../assets/401_images/401.gif`).href,

  ewizardClap:
    'https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646',
  dialogVisible: false
});

const { errGif, ewizardClap, dialogVisible } = toRefs(state);

const router = useRouter();

function back() {
  router.back();
}

</script>

<template>
  <div class="errPage-container">
<!--    <h1>登录已失效即将跳转登录页</h1>-->
    <h1>页面地址不存在或未配置！</h1>
    <el-button icon="el-icon-arrow-left" class="pan-back-btn" @click="back">
      返回
    </el-button>
    <el-row>
      <el-col :span="12">
        <h1 class="text-jumbo text-ginormous">Oops!</h1>
<!--        gif来源<a href="https://zh.airbnb.com/" target="_blank">airbnb</a> 页面-->
        <h2>请联系管理员配置页面地址</h2>

        <ul class="list-unstyled">
          <li>或者你可以操作:</li>
          <li class="link-type">
            <router-link to="/dashboard"> 回首页 </router-link>
          </li>
          <li>
            <a href="#" @click.prevent="dialogVisible = true">点我看图</a>
          </li>
        </ul>
      </el-col>
      <el-col :span="12">
        <img
          :src="errGif"
          width="313"
          height="428"
          alt="Girl has dropped her ice cream."
        />
      </el-col>
    </el-row>
    <el-dialog v-model="dialogVisible" title="随便看">
      <img :src="ewizardClap" class="pan-img" />
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.errPage-container {
  width: 800px;
  max-width: 100%;
  margin: 100px auto;

  .pan-back-btn {
    background: #008489;
    color: #fff;
    border: none !important;
  }

  .pan-gif {
    margin: 0 auto;
    display: block;
  }

  .pan-img {
    display: block;
    margin: 0 auto;
    width: 100%;
  }

  .text-jumbo {
    font-size: 60px;
    font-weight: 700;
    color: #484848;
  }

  .list-unstyled {
    font-size: 14px;

    li {
      padding-bottom: 5px;
    }

    a {
      color: #008489;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
