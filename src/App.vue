<template>
  <!-- <el-config-provider :locale="locale" > -->
    <div style="width: auto;">
      <router-view class="width:100%" style="width: auto;" />

    </div>
  <!-- </el-config-provider> -->
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElConfigProvider } from 'element-plus';




const locale = ref();


</script>
