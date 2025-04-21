<template>
  <div class="table-box">
    <el-table
      :data="tablest"
      @selection-change="handleSelectionChange"
      :header-cell-style="tableHeadCellClass"
      :cell-style="cellClass"
    >
      <el-table-column type="index" />
      <!-- <el-table-column prop="skuId" label="SKU编号" /> -->
      <el-table-column prop="commodityName" label="商品名称" />
      <el-table-column prop="specValueDesc" label="规格" />
      <el-table-column prop="instancePrice" label="单价（元）" />
      <el-table-column prop="commodityNum" label="数量" />
      <el-table-column prop="billCharge" label="金额小计（元）" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, toRefs, ref } from 'vue';
import { ElTable } from 'element-plus';

type Props = {
  tablest: any
  // page: any
}

defineProps<Props>()
const state = reactive({
  searchParam: {},
  tableData: [],
});

const { tableData } = toRefs(state);

onMounted(() => {
  // console.log(table)
  loadData();
});

// 模拟传入table参数
function loadData() {
  // state.tableData = table;
}

//多选操作
const multipleSelection = ref([]);
const handleSelectionChange = (val: []) => {
  multipleSelection.value = val;
};

// table样式函数
function tableHeadCellClass() {
  return {
    backgroundColor: '#F7F9FA',
    borderLeft: 'none',
    borderRight: 'none',
    paddingTop: '8px',
    paddingBottom: '8px'
  }
}
function cellClass() {
  return {
    borderLeft: 'none',
    borderRight: 'none',
    paddingTop: '8px',
    paddingBottom: '8px'
  }
}

</script>

<style lang="scss" scoped>
.flex-v {
  display: flex;
  align-items: center;
}
.table-box {
  margin: 20px;
}
.btn-div {
  display: flex;
  align-items: center;
}
.op-btn {
  height: 30px;
  // line-height: 30px;
  padding: 5px 10px;
  color: #fe8e44;
  background: transparent;
  border: none;
  cursor: pointer;
}

.sku-tag-div {
  display: flex;
  align-items: center;
  background: #f7f7f7;
  margin-right: 200px;
  border: 1px #f7f7f7 solid;
}
.sku-tag-item {
  width: 100px;
  height: 35px;
  line-height: 35px;
  text-align: center;
  font-size: 13px;
}

.item-table {
  margin: 10px 0;
  border-radius: 5px;
  box-shadow: 1px 1px 2px 0 rgba(82, 90, 102, 0.04),
    2px 2px 8px 0 rgba(82, 90, 102, 0.08);
}

.pic-div {
  display: flex;
  align-items: center;
}

:deep .item-table tr {
  width: 100%;
  background: #fff !important;
}
:deep .item-table th {
  width: 100%;
  background: #f7f7f7 !important;
}
:deep .el-table .warning-row {
  background: #f7f7f7;
}

.state-block{
  width: 8px;
  height: 8px;
}


</style>
