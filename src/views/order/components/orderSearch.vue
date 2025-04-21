<template>
  <div class="content-box">
    <el-form ref="formRef" :inline="true" :model="searchParam" class="form-inline">
      <el-row :gutter="20">
        <el-col :xl="6" :lg="12" :md="12" :sm="12" :xs="12">
          <el-form-item label="订单号" prop="goodsName">
            <el-input v-model="searchParam.orderId" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <!-- <el-col :xl="6" :lg="12" :md="12" :sm="12" :xs="12">
          <el-form-item label="买家账号" prop="goodsNo">
            <el-input v-model="searchParam.loginName" placeholder="请输入" />
          </el-form-item>
        </el-col> -->
        <!-- <el-col :xl="6" :lg="12" :md="12" :sm="12" :xs="12">
          <el-form-item label="供应商">
            <el-input v-model="searchParam.agentsName" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col> -->
        <el-col :xl="6" :lg="12" :md="12" :sm="12" :xs="12">
          <el-form-item label="订单来源">
            <el-select v-model="searchParam.channels" placeholder="请选择" style="width:205px">
              <el-option label="触屏H5" value="4"></el-option>
              <el-option label="微信小程序" value="7"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        
      </el-row>
      <el-row :gutter="20" v-if="isOpen">
        <el-col :xl="10" :lg="24" :md="24" :sm="24" :xs="24">
          <el-form-item label="下单时间" prop="status">
            <el-date-picker v-model="searchParam.createTimeBegin"  type="daterange" value-format="YYYY-MM-DD HH:mm:ss"  range-separator="至"
              start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        
        <el-col :xl="10" :lg="24" :md="24" :sm="24" :xs="24">
          <el-form-item label="订单完成时间">
            <el-date-picker v-model="searchParam.finishCreateTime"  type="daterange" value-format="YYYY-MM-DD HH:mm:ss"  range-separator="至"
              start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <div class="bottom-div">
      <div class="btn-div">
        <el-button class="btn" @click="onResetInput">重置</el-button>
        <el-button class="btn query" @click="toQuery">查询</el-button>
        <div class="open-div" @click="changeOpenStatus">
          <span>{{ isOpen ? '收起' : '展开' }}</span>
          <el-icon size="16" color="#ccc">
            <ArrowUpBold v-if="isOpen" />
            <ArrowDownBold v-else />
          </el-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, toRefs, ref } from 'vue';
import { ArrowUpBold, ArrowDownBold } from '@element-plus/icons-vue';
import { ElForm } from 'element-plus';

//导入枚举值
import { OrderListData } from '@/types/api/oms/order';
import { GoodsShelvesStatus } from '@/utils/enum/goods';
import { GoodsListQueryParam } from '@/types/api/pms/goods';
//定义事件
const emit = defineEmits(['doSearch','doPost']);

const state = reactive({
  searchParam: {} as OrderListData,
 
  isOpen: false,
  GoodsShelvesStatus,
  brandList: [],
  kindList: []
});

const { searchParam, isOpen, brandList, kindList } = toRefs(state);

onMounted(() => {
});

const formRef = ref(ElForm);

//重置表单
function onResetInput( ) {
  formRef.value.resetFields();
  state.searchParam ={} as  OrderListData;
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
</style>
