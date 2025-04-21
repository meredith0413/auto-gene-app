<template>
  <div class="app-container">
    <!-- <orderSearch @doSearch="doSearch"></orderSearch> -->

    <div class="content-box">
      <ModelTitleLayout title="订单列表">
        <div class="op-container">
          <div class="op-div">

            <el-button :icon="Upload" @click="expert">导出</el-button>
          </div>
          <div class="refresh-div">
            <el-icon size="130" color="#606266">
              <RefreshRight />
            </el-icon>
            <span class="txt" @click="loadData">刷新</span>
          </div>
        </div>
      </ModelTitleLayout>
    
      <ModelTabsLayout   :tagList="tagList" @change-tab="changeListTab"></ModelTabsLayout>
  
      <!-- <div style="width: 100%">
        <orderList :page="page" :tbdata="tbdata" @reload="loadData" v-loading="loading" @doPage="doPage"></orderList>
      </div> -->

    </div>
  </div>
</template>
  
<script setup lang="ts">
import { onMounted, reactive, toRefs } from 'vue';
// import orderSearch from './components/orderSearch.vue';
import ModelTitleLayout from '@/components/ModelTitleLayout/ModelTitleLayout.vue';
import ModelTabsLayout from '@/components/ModelTabsLayout/ModelTabsLayout.vue';
// import orderList from './components/orderList.vue';
import { RefreshRight, Upload } from '@element-plus/icons-vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

// API依赖

import { getListData, exportList } from '@/api/oms/order'
//type依赖
import { OrderReq, OrderListData, OrderDetailData, TradeReq, TradeData, LogisticsUpdate, LogisticsQuery } from '@/types/api/oms/order';
import { log } from 'console';
import axios from 'axios';
import { request } from 'http';
// import func from 'vue-temp/vue-editor-bridge';

const state = reactive({
  loading:false,
  tbdata: [],
  resdata: [],
  status: "",
  page: {
    totalNum: null,
    currentPage: 1,
    pageSize: 10
  },
  searchParam: {
    orderId: '',
    createTimeBegin: '',
    createTimeEnd: '',
    loginName: '',
    channels: '',
    agentsName: '',
    agentsId: '',
    finishCreateTime: '',
    finishCloseTime: '',
  },
  orderListRequest: {} as OrderReq,
  orderListData: {} as OrderListData,
  tagList: [
    { title: '全部订单', value: '' },
    { title: '待付款', value: '2' },
    { title: '待发货', value: '4' },
    { title: '待收货', value: '12' },
    { title: '已收货', value: '22' },
    { title: '已完成', value: '10' },
    { title: '超时订单', value: '41' },
    { title: '已取消', value: '3' },
  ]
});

const { searchParam, tagList, tbdata, page,loading } = toRefs(state);

//执行搜索接口
function doSearch(data: OrderListData) {
  // console.log(data);
  state.searchParam = {
    ...data
  };
  console.log(state.searchParam);

  loadData();
}

function doPage(data: any) {
  
  // state.page.currentPage = data.currentPage
  // state.page.pageSize = data.pageSize
  loadData()
}
function expert() {
  const datate = {
    data: {
      orderId: state.searchParam.orderId,
      agentsId: localStorage.getItem('supplierId'),
      agentsName: state.searchParam.agentsName,
      channels: state.searchParam.channels,
      createTimeBegin: '',
      createTimeEnd: '',
      finishCreateTime: '',
      finishCloseTime: '',
      loginName: state.searchParam.loginName,
      status: state.status,
      page: {
        currentPage: state.page.currentPage,
        pageSize: 100000,
      }
    }
  }
  if (state.searchParam.finishCreateTime) {
    datate.data.finishCreateTime = state.searchParam.finishCreateTime[0]
    datate.data.finishCloseTime = state.searchParam.finishCreateTime[1]
  }
  if (state.searchParam.createTimeBegin) {
    datate.data.createTimeBegin = state.searchParam.createTimeBegin[0]
    datate.data.createTimeEnd = state.searchParam.createTimeBegin[1]
  }


  exportList(datate).then(res => {
    console.log("export", res);

    const blob = new Blob([res.data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    }); // for .xlsx files

    // 通过URL.createObjectURL生成文件路径
    const url = window.URL.createObjectURL(blob);

    // 创建a标签
    const ele = document.createElement('a');
    ele.style.display = 'none';

    // 设置href属性为文件路径，download属性可以设置文件名称
    ele.href = url;
    // ele.download = postData.name || '基础分析';
    // // const fileName = decodeURI(res.headers['content-disposition'].split(';')[1].split('filename=')[1]);

    const fileName = '订单明细表';
    ele.setAttribute('download', fileName);
    // 将a标签添加到页面并模拟点击
    document.querySelectorAll('body')[0].appendChild(ele);
    ele.click();

    // 移除a标签
    ele.remove();

  })

}
onMounted(() => {
  // doSearch(null);
  // doPage();
  loadData();
});
function changePage(){
  console.log("welcome change")
  const isback = localStorage.getItem("orderBack");
  // const isback = route.query.isBack;
  if(isback=='1') {
    console.log("welcome back",isback)
    state.page.currentPage=Number(localStorage.getItem('currentPage'))
    state.page.pageSize=Number(localStorage.getItem('pageSize'))
    localStorage.removeItem('currentPage');
    localStorage.removeItem('pageSize');
    // route.query.isBack=null;
    localStorage.removeItem('orderBack');
    console.log(route.query.isBack);
  }
}
function loadData() {
  changePage();
  // console.log(state.searchParam);
  // if (state.searchParam === null) {
  //   console.log("isnull");
  // }
  state.loading=true;
  const datate = {
    data: {
      orderId: state.searchParam.orderId,
      agentsId: localStorage.getItem('supplierId'),
      agentsName: state.searchParam.agentsName,
      channels: state.searchParam.channels,
      createTimeBegin: '',
      createTimeEnd: '',
      finishCreateTime: '',
      finishCloseTime: '',
      loginName: state.searchParam.loginName,
      status: state.status,
      page: {
        currentPage: state.page.currentPage,
        pageSize: state.page.pageSize,
      }
    }
  }
  if (state.searchParam.finishCreateTime) {
    datate.data.finishCreateTime = state.searchParam.finishCreateTime[0]
    datate.data.finishCloseTime = state.searchParam.finishCreateTime[1]
  }
  if (state.searchParam.createTimeBegin) {
    datate.data.createTimeBegin = state.searchParam.createTimeBegin[0]
    datate.data.createTimeEnd = state.searchParam.createTimeBegin[1]
  }


  getListData(datate).then((res) => {
    console.log(res);


    state.page = res.data.resultBody.busiResp.busiDataResp.page;
    state.page.totalNum = res.data.resultBody.busiResp.busiDataResp.page.totalCount;
    state.tbdata = res.data.resultBody.busiResp.busiDataResp.orderList;
    state.resdata = res.data.resultBody.busiResp.busiDataResp.orderList;
    state.loading = false

  })
}

function changeListTab(idx: any) {
  console.log('切换状态', state.tagList[idx].value);
  state.status = state.tagList[idx].value;
  loadData();
  //   let arr = state.resdata;
  //   state.tbdata = []
  //    arr.forEach(x => {
  //     if(state.tagList[idx].value === '0'){
  //       state.tbdata = arr;
  //     }else{
  //     if(x.status == state.tagList[idx].value ){
  //       state.tbdata.push(x);
  //       console.log(state.tbdata.length);

  //     }
  //   }
  //  });
}
</script>
  
<style lang="scss" scoped>
.op-container {
  display: flex;
  align-items: center;
}

.refresh-div {
  display: flex;
  align-items: center;
  color: #606266;
  margin-left: 15px;
  cursor: pointer;
}

.refresh-div .txt {
  font-size: 14px;
  margin-left: 3px;
}

.op-div {
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #888;
  border-radius: 5px;
  background-image: url('@/assets/pic/line_bg.png');
  background-size: 100% 100%;
  cursor: pointer;
}

.op-div div {
  width: 100px;
  height: 36px;
  line-height: 36px;
  text-align: center;
}

.op-div .line {
  width: 1px;
  height: 25px;
  background: #eee9e9;
}
</style>
  