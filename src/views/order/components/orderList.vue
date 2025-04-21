<template>
  <div class="table-box">
    <div class="flex flexb tabletitle mgt-l">
      <!-- <el-checkbox v-model="checked" style="width:5%"></el-checkbox> -->
      <div class="color-999 fs-14" style="width:30%">
        商品信息
      </div>
      <div class="color-999 fs-14" style="width:20%">
        收货人
      </div>
      <div class="color-999 fs-14" style="width:20%">
        商品金额
      </div>
      <div class="color-999 fs-14" style="width:10%">
        交易模式
      </div>
      <!-- <div class="color-999 fs-14" style="width:10%">
        物流方式
      </div> -->
      <div class="color-999 fs-14" style="width:10%">
        订单状态
      </div>
      <div class="color-999 fs-14" style="width:10%">
        操作
      </div>
    </div>

    <!-- tableData -->
    <div class="table mgt-m" v-for="item, index in tbdata" :key="index">
      <div class="thead flex">
        <div style="width:300px" class="too-long">订单号：{{ item.orderId }}</div>
        <div style="width:300px" class="color-999 too-long">下单时间：{{ item.createTime }}</div>
        <div style="width:300px" class="color-999 too-long">订单完成时间：{{ item.closeTime }}</div>
        <div style="width:300px" class="color-999 too-long">订单金额：{{ item.billCharge / 100 }}元</div>
        <!-- <div class="color-999" v-if="item.isSplit==='1'">订单状态：已拆分</div>
        <div class="color-999" v-if="item.isSplit==='0'">订单状态：未拆分</div> -->
      </div>

      <div class="" v-for="i, index in item.malltOrderItem" :key="index">
        <div class="flex flexb alignc  pd-l" style="border: 1px solid #F0F0F6;">
          <!-- <el-checkbox v-model="i.checked" style="width:5%"></el-checkbox> -->
          <div class=" fs-14 " style="width:30%;display:flex;">
            <!-- <div class="mgt-m flex" v-for="t,index in i.childrenlist" :key="index"> -->
            <img :src="'/emall/commodityPic/' + i.minPictureUrl" alt="" style="width:102px;height:102px;">
            <div class="mgl-m">
              <div class="fwb fs-14">
                {{ i.commodityName }}
                <!--商品名称-->
              </div>
              <div class="mgt-s flex alignc">
                <div class="numbox">
                  {{ i.commodityNum }}

                </div>
                <div class="color-999 fs-12 mgl-m">件</div>

              </div>
              <div class="mgt-m fs-12">
                ￥{{ i.price / 100 }}
              </div>

            </div>
            <!-- </div> -->
          </div>
          <div class=" fs-14" style="width:20%;">
            <!-- <div class="" style="height:102px" v-for="t,index in i.malltOrderItem" :key="index"> -->
            <!-- <div class="fs-14 mgt-m">
              {{item.customerId}} <i class="el-icon-copy-document pointer"></i>
            </div> -->
            <!-- <div class="mgt-m color-999 fs-12">
              {{item.shopPersonName }}
            </div> -->
            <div class="mgt-s color-999 fs-12">
              {{ item.postInfo.receiver }}
            </div>
            <!-- </div> -->
          </div>
          <div class=" fs-20 color-orange fwb" style="width:20%">
            ￥{{ i.charge / 100 }}
          </div>
          <div class=" fs-14" v-if="i.salesModel == '1'" style="width:10%">
            平台模式
          </div>
          <div class=" fs-14" v-if="i.salesModel == '2'" style="width:10%">
            贸易模式
          </div>
          <!-- <div class=" fs-14" style="width:10%">
            <div>{{i.receiveType}}</div>
            <div class="mgt-m color-999" v-if="i.name8=='自提'">
              {{i.name9}}
            </div>
          </div> -->

          <div class=" fs-14" v-if="item.status === '2'" style="width:10%">
            待付款
          </div>
          <div class=" fs-14" v-if="item.status === '4'" style="width:10%">
            待发货
          </div>
          <div class=" fs-14" v-if="item.status === '12'" style="width:10%">
            待收货
          </div>
          <div class=" fs-14" v-if="item.status === '22'" style="width:10%">
            已收货
          </div>
          <div class=" fs-14" v-if="item.status === '10'" style="width:10%">
            已完成
          </div>
          <div class=" fs-14" v-if="item.status === '41'" style="width:10%">
            超时订单
          </div>
          <div class=" fs-14" v-if="item.status === '3'" style="width:10%">
            已取消
          </div>
          <div class=" fs-14" v-if="item.status === '11'" style="width:10%">
            订单关闭
          </div>



          <div class="color-orange fs-14 pointer" style="width:10%">
            <div @click="toDetails(item.orderId)">查看详情</div>
            <div class="mgt-m" v-if="item.status === '4'" @click="toLogic(item.orderId, '1')">发货</div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-op-div">
      <el-pagination v-model:currentPage="page.currentPage" v-model:page-size="page.pageSize"
        :page-sizes="[10, 20, 50, 70, 100]" layout="total, sizes, prev, pager, next, jumper" :total="page.totalNum"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
  </div>
</template>

<script setup lang="ts">

import { useRoute, useRouter } from 'vue-router';
import { onMounted, reactive, toRefs, ref } from 'vue';
import { ArrowRightBold, ArrowDownBold } from '@element-plus/icons-vue';
import { ElTable, ElTooltip } from 'element-plus';
// import {useRoute, useRouter} from 'vue-router'


type Props = {
  tbdata: any,
  page: any
}
const props = defineProps<Props>()
//路由

const router = useRouter();
const route = useRoute();

const state = reactive({
  searchParam: {},
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
  tableData: [
    {
      issplit: false,
      name1: '1407152266150014977',
      name2: '2021-06-28 11:11:43',
      name3: '',
      name4: '¥232',
      listdata: [
        {
          issplit: false,
          name1: '1407152266150014977',
          name2: '2021-06-28 11:11:43',
          name3: '',
          name4: '¥232',
          title1: '',
          title2: '',
          title3: '',
          title4: '',

          checked: false,
          childrenlist: [
            {
              name1: '4',
              name2: '￥58',
              name3: '138dc15784819001',
              name4: '王玉新',
              name5: '18537106856',
              img: new URL('../../../../assets/img/goodimg1.png', import.meta.url).href,
              title: '科尔沁超干手撕风干牛肉干68g原味',


            },

          ],

          name6: '￥153.05',
          name7: '黔云通',
          name8: '自提',
          name9: '门店2',
          name10: '待付款'


        }

      ]

    },
    {
      name1: '1407152266150014977',
      name2: '2021-06-28 11:11:43',
      name3: '',
      name4: '¥232',
      issplit: true,

      listdata: [
        {
          issplit: true,
          name1: '1407152266150014977',
          name2: '2021-06-28 11:11:43',
          name3: '',
          name4: '¥232',
          title1: '',
          title2: '',
          title3: '',
          title4: '',

          checked: false,
          childrenlist: [
            {
              name1: '4',
              name2: '￥58',
              name3: '138dc15784819001',
              name4: '王玉新',
              name5: '18537106856',
              img: new URL('../../../../assets/img/goodimg1.png', import.meta.url).href,
              title: '科尔沁超干手撕风干牛肉干68g原味',


            },
            {
              name1: '4',
              name2: '￥58',
              name3: '138dc15784819001',
              name4: '王玉新',
              name5: '18537106856',
              img: new URL('../../../../assets/img/goodimg1.png', import.meta.url).href,
              title: '科尔沁超干手撕风干牛肉干68g原味',


            }
          ],

          name6: '￥153.05',
          name7: '黔云通',
          name8: '自提',
          name9: '门店2',
          name10: '待发货'


        },
        {
          issplit: true,
          name1: '1407152266150014977',
          name2: '2021-06-28 11:11:43',
          name3: '',
          name4: '¥232',

          checked: false,
          childrenlist: [
            {
              name1: '4',
              name2: '￥58',
              name3: '138dc15784819001',
              name4: '王玉新',
              name5: '18537106856',
              img: new URL('../../../../assets/img/goodimg1.png', import.meta.url).href,
              title: '科尔沁超干手撕风干牛肉干68g原味',


            },
            {
              name1: '4',
              name2: '￥58',
              name3: '138dc15784819001',
              name4: '王玉新',
              name5: '18537106856',
              img: new URL('../../../../assets/img/goodimg1.png', import.meta.url).href,
              title: '科尔沁超干手撕风干牛肉干68g原味',


            }
          ],

          name6: '￥153.05',
          name7: '黔云通',
          name8: '自提',
          name9: '门店2',
          name10: '已取消'


        }


      ]

    }

  ],
  checked: false,

});


const { searchParam, tableData, skuTagsList, inventoryNumDialogData, checked } =
  toRefs(state);

onMounted(() => {
  loadData();
  // changePage();

});

//表格底部的页码控制
// const totalNum = ref(0);
// const currentPage = ref(1);
// const pageSize = ref(20);
const emit = defineEmits(['doPage']);
const handleSizeChange = (val: number) => {
      props.page.pageSize =val;
  // state.sonpage.pageSize = val;
  // emit('doPage', state.sonpage);
  emit('doPage')
};
const handleCurrentChange = (val: number) => {
      props.page.currentPage =val;
  // state.sonpage.currentPage = val;
  // emit('doPage', state.sonpage);
  emit('doPage')
};

// function changePage(){
//   console.log("welcome change List")
//   const isback = route.query.isBack;
//   if(isback=='1') {
//     console.log("welcome back",isback)
//     state.sonpage.currentPage=localStorage.getItem('currentPage')
//     state.sonpage.pageSize=localStorage.getItem('pageSize')
  
//   }
// }
function loadData() {



  for (let i = 0; i < 20; i++) {
    let tempInfo = {
      id: '125555555222' + i,
      goodsName: '科尔沁超干手撕风干牛肉干68g原味',
      kind: '肉类/牛肉类/牛肉干',
      brand: '贵天下',
      isOpen: false,
      pic: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      num: '120',
      price: '100',
      status: '已上架',
      releaseStatus: '已发布',
      btnStatus: '' + i,
      skuList: [
        {
          title: '盒装200克',
          code: '251252',
          skuNo: '3562666666666',
          inventoryNum: '1520',
          price: '120',
          pics: [
            'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
          ]
        }
      ]
    };

  }
}



function toDetails(arg: string) {
  localStorage.setItem('currentPage',props.page.currentPage );
  localStorage.setItem('pageSize',props.page.pageSize );
  router.push({
    path: 'order-details',
    query: {
      id: arg
    }
  });
} function toLogic(arg: string, arg1: string) {
  localStorage.setItem('currentPage',props.page.currentPage );
  localStorage.setItem('pageSize',props.page.pageSize );
  router.push({
    path: 'order-details',
    query: {
      id: arg,
      logic: arg1
    }
  });
}
</script>

<style lang="scss" scoped>
.too-long {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

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
  line-height: 30px;
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

.tabletitle {
  height: 40px;
  line-height: 40px;
  background: #F7F9FA;
  padding: 0 20px;
}

.thead {
  height: 36px;
  line-height: 36px;
  background: #FBFBFB;
  border: 1px solid #F0F0F6;
  padding: 0 20px;
  font-size: 14px;
}

.numbox {
  padding: 3px 10px;
  background: #F2F8FF;
  border-radius: 2px;
  border: 1px solid #DCE2F1;
  font-size: 12px;

}

::v-deep .el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #FE8E44;
  border-color: #FE8E44;
}

::v-deep .el-checkbox__input.is-checked+.el-checkbox__label {
  color: #FE8E44;
}

::v-deep .el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #FE8E44 !important;
  border-color: #FE8E44 !important;
}

.flex {
  display: flex;

}

.flexb {
  justify-content: space-between;
}

.flexc {
  justify-content: center;
}

.flexa {
  justify-content: space-around;
}

.alignc {
  align-items: center;
}

.pd-l {
  padding: 20px;
}

.fs-14 {
  font-size: 14px;
}

.mgl-m {
  margin-left: 10px;
}

.color-orange {
  color: #fe8e44;
}

.mgt-m {
  margin-top: 10px;
}

.pointer {
  cursor: pointer;
}
</style>
