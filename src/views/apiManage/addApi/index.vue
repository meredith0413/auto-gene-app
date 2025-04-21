<template>
    <div class="common-layout">
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <el-table
            :data="tableData"
            style="width: 100%"
            border = "solid"
            stripe
            size="small"
            :style="{ width: '100%', height: '100%' }">
            <el-table-column
              prop="name"
              label="Name"
              width="180"
              sortable
              :filters="[{ text: 'John', value: 'John' }, { text: 'Jane', value: 'Jane' }]"
              :filter-method="(value, row) => row.name === value"
              :filter-placement="'bottom-end'"
              :filter-multiple="false"
              :filter-panel-class="'custom-filter-panel'"
              :filter-panel-width="200"
              />

        </el-table>

        </el-main>
      </el-container>
    </div>
  </template>
  <script setup lang="ts">
  import { ref } from 'vue';  
  const tableData = ref([
    { name: 'John', age: 30, address: 'New York' },
    { name: 'Jane', age: 25, address: 'London' },
    { name: 'Tom', age: 35, address: 'Paris' }
  ]);
  </script>

  