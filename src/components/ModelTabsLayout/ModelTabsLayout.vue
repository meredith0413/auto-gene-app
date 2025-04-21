<template>
  <div class="tabs-container">
    <div class="tabs-div" v-for="(item, index) in props.tagList" :key="index">
      <div class="tabs-item" :class="current == index ? 'selected' : ''" @click="changeTabs(index)">
        {{ item && item.title }}
      </div>
      <div class="b-line" :class="current == index ? 'bg-o' : ''"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

//定义事件
const emit = defineEmits(['changeTab']);

const props = defineProps({
  tagList: {
    type: Array,
    default: null
  }
});

//当前选中值
const current = ref(0);

function resetTab() {
  current.value = 0;
}

function settleresetTab() {
  current.value = 0;
}

defineExpose({
  resetTab,
  settleresetTab
})

function changeTabs(index: any) {
  if (current.value != index) {
    current.value = index;
  }
  emit('changeTab', index);
}
</script>

<style scoped>
.tabs-container {
  width: 100%;
  display: flex;
  align-items: center;
  color: #333;
  font-size: 14px;
  padding: 10px 0 0 26px;
  background: #fef2e8;
}

.tabs-div {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.tabs-item {
  min-width: 80px;
  padding-left: 15px;
  padding-right: 15px;
  height: 35px;
  line-height: 35px;
  text-align: center;
  margin: 0 5px;
  cursor: pointer;
}

.selected {
  font-weight: bold;
  color: #fe8e44;
}

.b-line {
  width: 70px;
  height: 3px;
}

.bg-o {
  background: #fe8e44;
}
</style>
