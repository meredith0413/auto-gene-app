<template>
  <div class="modeltitle-container">
    <div class="v-center">
      <div class="left-line"></div>
      <div class="title">{{ props.title || '' }}</div>
    </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: ''
  }
});
</script>

<style scoped>
.modeltitle-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #333;
  font-size: 14px;
  padding: 10px 15px;
  background: #fff;
}
.left-line {
  width: 4px;
  height: 20px;
  background: #fe8e44;
}
.title {
  font-size: 16px;
  margin-left: 10px;
}
.v-center {
  display: flex;
  align-items: center;
}
</style>
