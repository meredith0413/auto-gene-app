<template>
  <div class="content-box refund-search">
    <el-form
      ref="formRef"
      :inline="true"
      :model="searchParam"
      class="form-inline"
    >
      <el-row :gutter="24">
        <el-col :span="8">
          <el-form-item label="订单编号" prop="orderId">
            <el-input v-model="searchParam.orderId" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :xl="6" :lg="12" :md="12" :sm="12" :xs="12">
          <el-form-item label="退款原因">
            <el-select v-model="searchParam.reasonType" placeholder="请选择" style="width:205px">
              <el-option label="7天无理由退货" value="65"></el-option>
              <el-option label="质量不好，假货" value="66"></el-option>
              <el-option label="买错了，多买了" value="67"></el-option>
              <el-option label="少发、漏发、错发" value="68"></el-option>
              <el-option label="发票问题" value="69"></el-option>
              <el-option label="外包装破损" value="70"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="退单号" prop="returnId">
            <el-input v-model="searchParam.returnId" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="申请退款时间" prop="returnApplyBegin">
            <el-date-picker
              v-model="searchParam.returnApplyBegin"
              type="datetimerange"
              value-format="YYYY-MM-DD HH:mm:ss"
              range-separator="至"
              class="refund-range"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
            </el-form-item
        ></el-col>
      </el-row>

      <el-row :gutter="24" v-if="isOpen">
        <el-col :span="8">
        </el-col>
        <el-col :span="8">
        </el-col>
      </el-row>
    </el-form>

    <div class="bottom-div">
      <div class="btn-div">
        <el-button class="btn" @click="onResetInput">重置</el-button>
        <el-button class="btn query" @click="toQuery">查询</el-button>
        <!-- <div class="open-div" @click="changeOpenStatus">
          <span>{{ isOpen ? '收起' : '更多筛选条件' }}</span>
          <el-icon size="16" color="#ccc">
            <ArrowUpBold v-if="isOpen" />
            <ArrowDownBold v-else />
          </el-icon>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, toRefs, ref } from 'vue';
import { ArrowUpBold, ArrowDownBold } from '@element-plus/icons-vue';
import { ElForm } from 'element-plus';

//导入枚举值
// import { GoodsShelvesStatus } from '@/utils/enum/goods';
import { QueryRefundList } from '@/types/api/oms/order';
//定义事件
const emit = defineEmits(['doSearch']);

const state = reactive({
  searchParam: {} as QueryRefundList,
  isOpen: false,
  customerName: '',
  returnId:'',
  returnApplyBegin: ''
  // GoodsShelvesStatus,
  // brandList: []
});

const { searchParam, isOpen, customerName, returnApplyBegin,returnId } = toRefs(state);

// onMounted(() => {
//   state.brandList = {
//     1: '品牌1',
//     2: '品牌2',
//     3: '品牌3'
//   };
//   state.kindList = {
//     1: '分类1',
//     2: '分类2',
//     3: '分类3'
//   };
// });

const formRef = ref(ElForm);

//重置表单
function onResetInput() {
  formRef.value.resetFields();
  state.searchParam ={} as QueryRefundList;
  toQuery()
}

//执行搜索
function toQuery() {
  emit('doSearch', state.searchParam);
}


function changeOpenStatus() {
  state.isOpen = !state.isOpen;
}
</script>

<style lang="scss" scoped>
.form-inline {
  margin: 20px 30px 0 30px;
}
.bottom-div {
  width: 100%;
  margin-bottom: 10px;
}
.btn-div {
  display: flex;
  justify-content: center;
  padding-top: 20px;
  border-top: 2px #f5f5f5 solid;

  .btn {
    width: 80px;
    height: 32px;
    line-height: 32px;
  }
  .query {
    color: #fff;
    background: #fe8e44;
  }
}
.open-div {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35px;
  line-height: 35px;
  font-size: 14px;
  color: #999999;
  margin-left: 30px;
  text-align: center;
  cursor: pointer;

  span {
    margin-right: 5px;
  }
}

::v-deep .el-form-item--default .el-form-item__label {
  width: 100px;
}
::v-deep .el-input {
  width: 270px;
}

.refund-search ::v-deep .el-date-editor.el-input__wrapper{
  width: auto !important;
}

// .refund-range{
//   width: auto !important;
// }
</style>
