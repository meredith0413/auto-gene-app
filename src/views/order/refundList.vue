<template>
  <div class="app-container refund-list">
    <RefundSearch @do-search="doSearch"></RefundSearch>

    <div class="content-box">
      <ModelTitleLayout  title="退款列表">
        <el-button class="custom-btn export mgr-10" @click="exportList">导出</el-button>
        <!-- <span>
          <el-icon size="20" color="#606266" class="vm">
            <Refresh></Refresh>
          </el-icon>
          <span class="color-subtitle vm">刷新</span>
        </span> -->
      </ModelTitleLayout>

      <ModelTabsLayout
        :tagList="tagList"
        @change-tab="changeListTab"
      ></ModelTabsLayout>

      <div style="width: 100%">
        <RefundTable :page="page" :tbdata="tbdata" @doPage="doPage" @doRefresh ="doRefresh"></RefundTable>
        
        <!-- <orderList :page="page" :tbdata="tbdata" @doPage="doPage"></orderList> -->
     
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, toRefs } from 'vue';
// API依赖
import { apiGoodsList } from '@/api/pms/goods';
import { GoodsListQueryParam } from '@/types/api/pms/goods';
//
import { queryRefundList,exportRefundList,updateRefund } from '@/api/oms/order'
import { OrderReq,RefundList, OrderListData, OrderDetailData, TradeReq, TradeData, LogisticsUpdate, LogisticsQuery } from '@/types/api/oms/order';
// 列表上tab切换
const state = reactive({
  tbdata: [],
  resdata:[{} as RefundList] ,
  status: "",
  page: {
    totalNum: null,
    currentPage: 1,
    pageSize: 10
  },
  tagList: [
    { title: '全部', value: '' },
    { title: '审核中', value: '1' },
    { title: '待退货', value: '3' },
    { title: '待供货商收货', value: '5' },
    { title: '拒绝收货', value: '6' },
    { title: '退款中', value: '9' },
    { title: '已完成', value: '19' },
    { title: '申请驳回', value: '4' },
    { title: '已撤回', value: '18' },
  ],
  searchParam: {
    orderId: '',
    returnId:'',
    agentsId: '',
    returnApplyBegin:'',
    returnApplyEnd:'',
    reasonType:''
  },
});

const {searchParam, tagList, tbdata, page } = toRefs(state);

onMounted(() => {
  loadData();
});
function changeListTab(idx: any) {
  console.log('切换状态', state.tagList[idx]);
  state.status = state.tagList[idx].value;
  loadData();
}
function doRefresh(){
  console.log('调用刷新方法');
  loadData();
}


//执行搜索接口
function doSearch(param: any) {
  state.searchParam = {
    ...param
  };
  loadData();
}
function doPage(data: any) {
  // state.page = {
  //   ...data
  // }
  state.page.currentPage = data.currentPage
  state.page.pageSize = data.pageSize
  loadData()
}

function loadData() {
  const datate = {
    data: {
      orderId: state.searchParam.orderId,
      agentsId: localStorage.getItem('supplierId'),
      returnId: state.searchParam.returnId,
      // channels: state.searchParam.channels,
      returnApplyBegin: '',
      returnApplyEnd: '',
      reasonType: state.searchParam.reasonType,
    
      returnStatus: state.status,
      page: {
        currentPage: state.page.currentPage,
        pageSize: state.page.pageSize,
      }
    }
  }
  if (state.searchParam.returnApplyBegin) {
    datate.data.returnApplyBegin = state.searchParam.returnApplyBegin[0]
    datate.data.returnApplyEnd = state.searchParam.returnApplyBegin[1]
  }
  // if (state.searchParam.createTimeBegin) {
  //   datate.data.createTimeBegin = state.searchParam.createTimeBegin[0]
  //   datate.data.createTimeEnd = state.searchParam.createTimeBegin[1]
  // }
  queryRefundList(datate).then((res) => {
    console.log(res);
    let list =[];

    state.page = res.data.resultBody.busiResp.page;
    state.page.totalNum = res.data.resultBody.busiResp.page.totalCount;
    state.tbdata = res.data.resultBody.busiResp.busiDataResp;
    state.tbdata.forEach(x=>{
      x.commodityTotalCharge = x.commodityTotalCharge/100
      
      x.commodityTotalCharge = '￥'+x.commodityTotalCharge
      // if(x.status in ['1','3','5','6','9','19','18','4']){
      //   list.push(x)
      // }
      // if(x.reasonType==65) x.reasonType = '7天无理由退货'
      // if(x.reasonType==66) x.reasonType = '质量不好，假货'
      // if(x.reasonType==67) x.reasonType = '买错了，多买了'
      // if(x.reasonType==68) x.reasonType = '少发、漏发、错发'
      // if(x.reasonType==69) x.reasonType = '发票问题'
      // if(x.reasonType==70) x.reasonType = '外包装破损'
      // if(x.status==1) x.status = '审核中'
      // if(x.status==3) x.status = '待退货'
      // if(x.status==5) x.status = '待供应商收货'
      // if(x.status==6) x.status = '拒绝收货'
      // if(x.status==9) x.status = '退款中'
      // if(x.status==19) x.status = '已完成'
      // if(x.status==4) x.status = '申请驳回'
      // if(x.status==18) x.status = '已撤回'
    }) 
    // state.tbdata  =list;
    // console.log( 'fuzujian',state.tbdata);
    state.resdata = res.data.resultBody.busiResp.busiDataResp;


  })
}
function exportList() {
  const datate = {
    data: {
      orderId: state.searchParam.orderId,
      agentsId: localStorage.getItem('supplierId'),
      returnId: state.searchParam.returnId,
      // channels: state.searchParam.channels,
      returnApplyBegin: '',
      returnApplyEnd: '',
      reasonType: state.searchParam.reasonType,
    
      returnStatus: state.status,
      page: {
        currentPage: 1,
        pageSize: 10000,
      }
    }
  }
  if (state.searchParam.returnApplyBegin) {
    datate.data.returnApplyBegin = state.searchParam.returnApplyBegin[0]
    datate.data.returnApplyEnd = state.searchParam.returnApplyBegin[1]
  }

  exportRefundList(datate);
}

</script>

<script lang="ts">
import RefundSearch from './components/RefundSearch.vue';
import ModelTitleLayout from '@/components/ModelTitleLayout/ModelTitleLayout.vue';
import { Refresh } from '@element-plus/icons-vue';
import ModelTabsLayout from '@/components/ModelTabsLayout/ModelTabsLayout.vue';

import RefundTable from './components/refundTable.vue';

export default {
  components: {
    RefundSearch,
    ModelTitleLayout,
    Refresh,
    ModelTabsLayout,
    RefundTable
  }
}
</script>

<style lang="scss" scoped>
.color-subtitle{
  color: #606266;
}
.vm{
  vertical-align: middle;
}
.custom-btn.export{
  color: #fff;
  background: #fe8e44;
  border-color: #fe8e44;
}
</style>

