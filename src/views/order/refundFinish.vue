<template>
  <div class="app-container refund-verify">
    <div class="refund-intro mgt-20">
      <p>退款状态，已完成</p>
      <div class="refund-desintro">卖家备注：商家备注文案文案文案文案商家备注文案文案文案文案</div>
    </div>

    <div class="custom-panel mgt-15">
      <div class="custom-panel_head pdl-15 bdr-gray">
        <div class="custom-panel_dot mgr-5"></div>
        <div class="custom-panel_title">退款订单详情</div>
      </div>

      <RefundSimpletb></RefundSimpletb>
      <div class="logisticsinfo-pricetotal pdl-20 pdr-20 pdb-20 bdr-gray">
        <div class="">
          <img :src="logisticsIcon" class="icon_logistics mgr-5 vm"/>
          <span class="logistics-text vm">实时物流信息</span>
        </div>
        <div class="price-total">
          <p class="mgt-0">
            <span class="vm color-999">合计金额</span>
            <span class="vm color-333 pdl-20">￥100.00</span>
          </p>
          <p>
            <span class="vm color-999">配送费用</span>
            <span class="vm color-333 pdl-20">￥0</span>
          </p>
        </div>
      </div>
      <div class="pdt-25 pdb-20 pdl-20 pdr-20">
        <el-row :gutter="30">
          <el-col :span="6">
            <el-descriptions :column="1" title="收货信息" class="custom-descriptions">
              <el-descriptions-item label="收货人">张三</el-descriptions-item>
              <el-descriptions-item label="联系方式">15123364589</el-descriptions-item>
              <el-descriptions-item label="收货地址">贵州省贵阳市南明区花果园社区服务中心半山小镇w2服务中心半山小镇w2</el-descriptions-item>
            </el-descriptions>
          </el-col>
          <el-col :span="8">
            <el-descriptions :column="1" title="退款原因" class="custom-descriptions">
              <el-descriptions-item label="退款原因">下错单</el-descriptions-item>
              <el-descriptions-item label="退款说明">XXXXXXXX</el-descriptions-item>
            </el-descriptions>
          </el-col>
          <el-col :span="10">
            <el-descriptions :column="1" title="审核信息" class="custom-descriptions">
              <el-descriptions-item label="审核结果">审核通过</el-descriptions-item>
              <el-descriptions-item label="审核时间">2022-07-27 23:41:58</el-descriptions-item>
              <el-descriptions-item label="退款时间">2022-07-28 09:41:58</el-descriptions-item>
              <el-descriptions-item label="审核意见">同意</el-descriptions-item>
            </el-descriptions>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, toRefs } from 'vue';
// API依赖
// import { apiGoodsList } from '@/api/pms/goods';
// import { GoodsListQueryParam } from '@/types/api/pms/goods';

// 图片
import logisticsIcon from './images/icon_logistics.png'

// 列表上tab切换
// const state = reactive({
//   tagList: [
//     { title: '全部', value: '1' },
//     { title: '审核中', value: '2' },
//     { title: '待退货', value: '3' },
//     { title: '待供货商收货', value: '4' },
//     { title: '拒接收货', value: '5' },
//     { title: '已完成', value: '6' },
//     { title: '申请驳回', value: '7' },
//     { title: '已撤回', value: '8' },
//   ]
// });

const form = reactive({
  verifyRes: '',
  verifyOpinion: ''
})

// const { tagList } = toRefs(state);

// function changeListTab(idx: any) {
//   console.log('切换状态', state.tagList[idx]);
// }

// 导出
function exportList() {
}
</script>

<script lang="ts">
// import { Refresh } from '@element-plus/icons-vue';
// import ModelTabsLayout from '@/components/ModelTabsLayout/ModelTabsLayout.vue';

import RefundSimpletb from './components/refundSimpletb.vue';

export default {
  components: {
    // Refresh,
    // ModelTabsLayout,
    RefundSimpletb
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
.color-999{
  color: #999;
}
.color-333{
  color: #333;
}
.custom-btn.export{
  color: #fff;
  background: #fe8e44;
}
.refund-intro{
  background-color: #FFFFFF;
  box-shadow: 2px 2px 8px 0px rgba(82,90,102,0.08);
  border-radius: 4px;
  padding: 24px 24px 16px 24px;
  p{
    height: 26px;
    line-height: 26px;
    margin: 0;
    margin-bottom: 10px;
    font-size: 20px;
    color: #31373D;
  }

  .refund-desintro{
    min-height: 12px;
    padding: 8px 16px;
    font-size: 12px;
    line-height: 17px;
    font-weight: 400;
    color: #FE8E44;
    // line-height: 17px;
    background-color: rgba(254,142,68,0.12);
    border: 1px dashed #FE8E44;
    border-radius: 2px;
  }
}

.custom-panel{
  background-color: #FFFFFF;
  box-shadow: 2px 2px 8px 0px rgba(82,90,102,0.08);
  border-radius: 4px;

  &_head{
    height: 40px;
    display: flex;
    align-items: center;

    font-size: 14px;
    color: #999999;
  }

  &_dot{
    width: 4px;
    height: 4px;
    background-color: #808080;
    border-radius: 50%;
  }
}

.bdr-gray{
  border-bottom: 1px solid #F2F2F2;
}

.icon_logistics{
  width: 16px;
  height: 16px;
}

.logistics-text{
  font-size: 14px;
  color: #007AFF;
  cursor: pointer;
}

.price-total{
  font-size: 14px;
}

.logisticsinfo-pricetotal{
  display: flex;
  justify-content: space-between;
}



.custom-btn{
  color: #fff;
  background-color: #fe8e44;
  border-color: #fe8e44;
}

.custom-btn.wt-theme{
  color: rgba(0,0,0,0.65);
  background: #fff;
  border-color: #D9D9D9;
}

</style>

