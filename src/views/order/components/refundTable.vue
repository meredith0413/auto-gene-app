<template>
  <div class="table-box">
    <el-table :data="tbdata" @selection-change="handleSelectionChange" :header-cell-style="tableHeadCellClass"
      :cell-style="cellClass" style="height: 70vh">
      <el-table-column prop="createDate" label="申请退款时间" width="200" />
      <el-table-column prop="returnId" label="退单号" width="200" />
      <el-table-column prop="orderId" label="订单编号" width="200" />
      
      <!-- <el-table-column prop="customerName" label="卖家名称" width="220" /> -->
      <el-table-column prop="commodityCount" label="商品数量" width="180" />
      <el-table-column prop="commodityTotalCharge" label="商品总金额" width="180"></el-table-column>
      <el-table-column prop="reasonType" label="退款原因" width="200">
        <template #default="scope">
          <span v-if="scope.row.reasonType == 65" class="vm">7天无理由退货</span>
          <span v-else-if="scope.row.reasonType == 66" class="vm">质量不好，假货</span>
          <span v-else-if="scope.row.reasonType == 67" class="vm">买错了，多买了</span>
          <span v-else-if="scope.row.reasonType == 68" class="vm">少发、漏发、错发</span>
          <span v-else-if="scope.row.reasonType == 69" class="vm">发票问题</span>
          <span v-else-if="scope.row.reasonType == 70" class="vm">外包装破损</span>
        </template>
      </el-table-column>

      <el-table-column label="退款状态" width="180">
        <template #default="scope">
          <!-- <img :src="stateImagesbox[scope.row.status - 1]" class="state-block vm mgr-5"/> -->
          <span v-if="scope.row.status == 1" class="vm">审核中</span>
          <span v-else-if="scope.row.status == 3" class="vm">待退货</span>
          <span v-else-if="scope.row.status == 5" class="vm">待供应商收货</span>
          <span v-else-if="scope.row.status == 6" class="vm">拒绝收货</span>
          <span v-else-if="scope.row.status == 9" class="vm">退款中</span>
          <span v-else-if="scope.row.status == 2" class="vm">运营端审批未通过</span>
          <span v-else-if="scope.row.status == 19" class="vm">已完成</span>
          <span v-else-if="scope.row.status == 20" class="vm">退款失败</span>
          <span v-else-if="scope.row.status == 4" class="vm">申请驳回</span>
          <span v-else-if="scope.row.status == 18" class="vm">已撤回</span>
          <!-- <span>{{scope.row.status}}</span> -->
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="250">
        <template #default="scope">
          <div class="btn-div">
            <div class="op-btn" @click="toDetails(scope.row, 'false')">查看</div>
            <div v-if="scope.row.status == 1" class="op-btn" @click="toDetails(scope.row, 'true')">审核</div>
            <div v-else-if="scope.row.status == 5" class="op-btn" @click="submit(scope.row.returnId, 9)">确认收货</div>
            <div v-if="scope.row.status == 5" class="op-btn" @click="submit(scope.row.returnId, 6)">拒绝收货</div>
          </div>
        </template>
      </el-table-column>
    </el-table>


    <!-- <div class="page-op-div">
      <el-pagination
        v-model:currentPage="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[20, 50, 70, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNum"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div> -->
    <div class="page-op-div">
      <el-pagination v-model:currentPage="page.currentPage" v-model:page-size="page.pageSize"
        :page-sizes="[10, 20, 50, 70, 100]" layout="total, sizes, prev, pager, next, jumper" :total="page.totalNum"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>

    <el-dialog v-model="isShowInventoryNumDialog" title="编辑库存">
      <div class="editnum-dialog">
        <el-table :data="inventoryNumDialogData">
          <el-table-column label="规格名称" prop="title" width="180" />
          <el-table-column label="规格" prop="title" width="180" />
          <el-table-column label="商品单价" prop="price" width="180" />
          <el-table-column label="库存数量" width="180">
            <template #default="scope">
              <el-input-number v-model="scope.row.inventoryNum" :min="0" :max="10000" controls-position="right"
                size="large" />
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="dialog-btn-div">
        <el-button class="btn" @click="isShowInventoryNumDialog = false">
          取消
        </el-button>
        <el-button class="btn query" @click="isShowInventoryNumDialog = false">
          提交
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { onMounted, reactive, toRefs, ref } from 'vue';
import { ArrowRightBold, ArrowDownBold } from '@element-plus/icons-vue';
import { ElTable, ElMessage } from 'element-plus';
import { updateRefund } from '@/api/oms/order'

// 图片
import state_1 from '../images/state_1.png';
import state_2 from '../images/state_2.png';
import state_3 from '../images/state_3.png';
import state_4 from '../images/state_4.png';
import state_5 from '../images/state_5.png';
import state_6 from '../images/state_6.png';
import state_7 from '../images/state_7.png';

type Props = {
  tbdata: any,
  page: any
}

defineProps<Props>()
//路由
const router = useRouter();

const state = reactive({
  searchParam: {},
  tabdata: [],
  sonpage: {
    // totalNum: 100000000,
    currentPage: 1,
    pageSize: 10
  },
  skuTagsList: [
    '规格名称',
    '条形码',
    'SKU编码',
    '库存数量',
    '供货价(元)',
    '规格图片'
  ],
  inventoryNumDialogData: [],
  stateImagesbox: [state_1, state_2, state_3, state_4, state_5, state_6, state_7]
});

const { searchParam, tabdata, skuTagsList, inventoryNumDialogData, stateImagesbox } =
  toRefs(state);

onMounted(() => {
  // console.log(tbdata)
  // state.tabdata =tbdata
  loadData();
});

//表格底部的页码控制
// const totalNum = ref(0);
// const currentPage = ref(1);
// const pageSize = ref(20);
const emit = defineEmits(['doPage', 'doRefresh']);
const handleSizeChange = (val: number) => {

  state.sonpage.pageSize = val;
  emit('doPage', state.sonpage);
};
const handleCurrentChange = (val: number) => {

  state.sonpage.currentPage = val;
  emit('doPage', state.sonpage);
};

function loadData() {
  // state.tabdata =tbdata
  // state.tbdata =
  //   for (let i = 0; i < 10; i++) {
  //     let tempInfo = {
  //       refundTime: '2022-06-10',
  //       id: 'S00000' + i,
  //       customerName: 'XXX',
  //       amount: 'x1',
  //       totalPrice: '￥100.00',
  //       isOpen: false,
  //       refundReason: '买错了',
  //       refundState: 1
  //     };
  //     // state.tableData.push(tempInfo);

  //     totalNum.value = state.tableData.length;
  //   }
}

//多选操作
const multipleSelection = ref([]);
const handleSelectionChange = (val: []) => {
  multipleSelection.value = val;
};

const isShowInventoryNumDialog = ref(false);
//显示编辑库存弹窗
function showEditNumDialog(row: any) {
  state.inventoryNumDialogData = row;
  isShowInventoryNumDialog.value = true;
}

function toDetails(item: any, arg: any) {
  console.log(item)
  router.push({
    path: 'refundVerify',
    query: {
      id: item.returnId,
      names: item.status,
      type: item.orderRefuntStatus,
      isUp: arg
      // state : item.refundState
    }
  });
}

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
function submit(oid, arg) {
  const datate = {
    data: {
      returnId: null,
      status: arg
      // code: null

    }
  }
  datate.data.returnId = oid;
  console.log('切换状态', arg);
  updateRefund(datate).then(res => {
    // ElMessage.success(res.data.resultBody.resMsg);
    ElMessage({ message: '成功', type: 'success' });
    let timer: any
    clearTimeout(timer);  //清除延迟执行
    timer = setTimeout(() => {   //设置延迟执行
      emit('doRefresh', state.searchParam);
      // console.log('ok');
    }, 1500);

  })


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

.page-op-div {
  margin: 20px;
  display: flex;
  justify-content: flex-end;
}

.editnum-dialog {
  margin: 0 20px 20px 20px;
  border: 1px #f7f7f7 solid;
}

.dialog-btn-div {
  display: flex;
  justify-content: flex-end;
  padding-top: 20px;

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

:deep .editnum-dialog th {
  width: 100%;
  background: #f7f9fa !important;
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

.state-block {
  width: 8px;
  height: 8px;
}
</style>
