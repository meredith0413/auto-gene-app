<template>
  <div class="app-container refund-verify">
    <div class="refund-intro mgt-20">
      <p v-if="statu==1">退款状态:待审核</p>
      <p v-if="statu==3">退款状态:待退货</p>
      <p v-if="statu==5">退款状态:待供应商收货</p>
      <p v-if="statu==6">退款状态:供应商拒绝收货</p>
      <p v-if="statu==19">退款状态:已完成</p>
      <p v-if="statu==9">退款状态:退款中</p>
      <p v-if="statu==4">退款状态:申请驳回</p>
      <p v-if="statu==20">退款状态:退款失败</p>
      <p v-if="statu==18">退款状态:已撤回</p>
      <!-- <div class="refund-desintro">卖家备注：商家备注文案文案文案文案商家备注文案文案文案文案</div> -->
    </div>

    <div class="custom-panel mgt-15">
      <div class="custom-panel_head pdl-15 bdr-gray">
        <div class="custom-panel_dot mgr-5"></div>
        <div class="custom-panel_title">退款订单详情</div>
      </div>

      <!-- <RefundSimpletb :tablest = "table"></RefundSimpletb> -->
      <div class="table-box">
    <el-table
      :data="table"
  
    >
      <el-table-column type="index" />
      <el-table-column prop="skuId" label="SKU编号" />
      <el-table-column prop="commodityName" label="商品名称" />
      <el-table-column prop="specValueDesc" label="规格" />
      <el-table-column prop="instancePrice" label="单价（元）" />
      <el-table-column prop="commodityNum" label="数量" />
      <el-table-column prop="billCharge" label="金额小计（元）" />
    </el-table>
  </div>
      <div class="logisticsinfo-pricetotal pdl-20 pdr-20 pdb-20 bdr-gray">
        <div class="">
          <!-- <img :src="logisticsIcon" class="icon_logistics mgr-5 vm"/>
          <span class="logistics-text vm">实时物流信息</span> -->
        </div>
        <div class="price-total">
          <p class="mgt-0">
            <span class="vm color-999">总应退金额</span>
            <span class="vm color-333 pdl-20">￥{{info.refundCharge}}</span>
          </p>
          <p>
            <span class="vm color-999">配送费用</span>
            <span class="vm color-333 pdl-20">￥{{info.freight}}</span>
          </p>
        </div>
      </div>
      <div class="pdt-25 pdb-20 pdl-20 pdr-20">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-descriptions :column="1" title="收货信息" class="custom-descriptions">
              <el-descriptions-item label="收货人">{{info.receiver}}</el-descriptions-item>
              <el-descriptions-item label="联系方式">{{info.mobile}}</el-descriptions-item>
              <el-descriptions-item label="收货地址">{{info.province+info.city+info.country+info.detailAddr}}</el-descriptions-item>
            </el-descriptions>
          </el-col>
          <el-col :span="12">
            <el-descriptions :column="1" title="退款原因" class="custom-descriptions">
              <el-descriptions-item label="退款原因">
                
                
                <span v-if="info.reasonType == 65" class="vm">7天无理由退货</span>
          <span v-else-if="info.reasonType == 66" class="vm">质量不好，假货</span>
          <span v-else-if="info.reasonType == 67" class="vm">买错了，多买了</span>
          <span v-else-if="info.reasonType == 68" class="vm">少发、漏发、错发</span>
          <span v-else-if="info.reasonType== 69" class="vm">发票问题</span>
          <span v-else-if="info.reasonType == 70" class="vm">外包装破损</span>
              </el-descriptions-item>
              <el-descriptions-item label="退款说明">{{info.memo}}</el-descriptions-item>
            </el-descriptions>
          </el-col>
        </el-row>
      </div>
    </div>
  <!--  -->
  <ModelTitleLayout title="物流信息"/>
  <div class="loginfobox ">
				<div class="tc" v-if="loginfo.length==0">
					<img src="./images/nodata.png" alt="">
					<div class="fs-14 loginfotext">
						暂无物流信息
					</div>
				</div>
				<div v-if="loginfo.length>0">
					<div class="flex" v-for="(item,index) in loginfo" :key="index" style="flex-wrap: nowrap;">
						<div class="loginfoicon1 pdl-l" v-if="index<loginfo.length-1">
							<div class="point">
							</div>
							<div class="line"></div>

						</div>
						<div class="loginfoicon1 pdl-l" v-if="index==loginfo.length-1">
							<div class="point1">
							</div>
						</div>
						<div class="logtext1 noshrink">
							{{ item.name1 }}
						</div>
						<!-- <div class="logtext1">
							{{item.name2}}
						</div> -->
						<div>
							<div class="flex" v-for="i,index in item.children" :key="index">
								<div class="logtext2 noshrink wd70">
									{{ i.AcceptTime.substring(10) }}
								</div>
								<div class="logtext2">
									{{ i.AcceptStation }}

								</div>
							</div>
						</div>
					</div>
				</div>

			</div>
    <div class="custom-panel mgt-15 verify-op" v-if="statu==1 && isUp =='true' ">
      <div class="custom-panel_head pdl-15 bdr-gray">
        <div class="custom-panel_dot mgr-5"></div>
        <div class="custom-panel_title">审核信息</div>
      </div>
      <div class="pdl-20 pdr-20 pdt-20 pdb-15">
        <el-form :model="form" ref="formref" :rules="newrule" label-width="100px" class="resetform-style">
          <el-form-item label="审核结果" prop="verifyRes">
            <el-radio-group v-model="form.verifyRes"  class="radio-theme">
              <el-radio label="1" >审核通过</el-radio>
              <el-radio label="0">审核驳回</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="审核意见" prop="verifyOpinion">
            <el-input v-model="form.verifyOpinion"  type="textarea" />
          </el-form-item>
          <el-form-item>
            <!-- <el-button class="custom-btn wt-theme cancel mgr-10" @click="exportList">取消</el-button> -->
            <el-button class="custom-btn submit mgr-10" @click="submit(formref)">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div style="text-align:center" class="mgt-15">
			<el-button style="width:160px" class="mgb-20" @click="back">返回</el-button>
		</div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref,toRefs } from 'vue';
// API依赖
// import { apiGoodsList } from '@/api/pms/goods';
// import { GoodsListQueryParam } from '@/types/api/pms/goods';
import {useRoute, useRouter} from 'vue-router'
import {OrderDetailData,Shenhe, LogisticsUpdate, LogisticsQuery,returninfoBo} from "@/types/api/oms/order";
import {getDetailData, updateRefund,updateLogisticsInfo, queryLogisticsInfo,queryRefundDetail, logisticsModify} from "@/api/oms/order";
import ModelTitleLayout from '@/components/ModelTitleLayout/ModelTitleLayout.vue';
import {FormInstance, FormRules,ElMessage} from 'element-plus'
// 图片
import logisticsIcon from './images/icon_logistics.png'
import { stat } from 'fs';
// import { reactive, toRefs, ref, onMounted } from 'vue';
const router = useRouter();
const route = useRoute();
const form = reactive({
  verifyRes: '',
  verifyOpinion: ''
})
const state = reactive({
  table:[],
info :{} as returninfoBo,
billCharge:'',
statu:null,
mountprice:null,
isUp:null,
loginfo: [],
 newrule :{
	verifyRes: [
		{required: true, message: '请选审批意见', trigger: 'change'},
	],
	verifyOpinion: [
		{required: false, message: '请输入审批意见', trigger: 'blur'},

	],
}
})
const formref = ref<FormInstance>();
const {info,loginfo,billCharge,statu,table,mountprice,newrule,isUp} = toRefs(state);
// const newrule = reactive<FormRules>({
// 	verifyRes: [
// 		{required: true, message: '请选审批意见', trigger: 'change'},
// 	],
// 	verifyOpinion: [
// 		{required: false, message: '请输入审批意见', trigger: 'blur'},

// 	],
// })
const submit = async (formEl: FormInstance | undefined) => {

  console.log(formEl)
  if (!formEl){
    // ElMessage("请填写审核意见")
    return} 
  const val = await formEl.validate();
  if(!val){
    // ElMessage("请填写审核意见")
    return}

  const datate={
    data: {
			returnId: null,
      status:'',
			memo: form.verifyOpinion

		}
  }
  //默认订单type 0：未发货 1：已发货
  if(route.query.type == '0' && form.verifyRes =='1'){
    // 未发货直接进入退款状态 审批通过
    datate.data.status='9' 
  }else if(route.query.type == '0' && form.verifyRes =='0'){
    // 未发货直接进入退款状态 审批驳回
    datate.data.status='4' 
  }else if(route.query.type == '1' && form.verifyRes =='1'){
    // 已发货直接进入待用户邮寄状态 审批通过
    datate.data.status='3' 
  }else if(route.query.type == '1' && form.verifyRes =='0'){
    // 已发货直接进入待用户邮寄状态 审批驳回
    datate.data.status='4' 
  }else{
    console.log("route.query.type =",route.query.type,'form.verifyRes = ',form.verifyRes,'datate.data.status=', datate.data.status)
    // ElMessage('订单状态出错请联系管理员')
    ElMessage.error('订单状态出错请联系管理员')
  }
  
  datate.data.returnId = route.query.id;
  console.log('切换状态', form.verifyRes);
  updateRefund(datate).then(res=>{
    if(res.data.resultBody.resCode=='000000'){
    ElMessage({message:'成功',type:'success'});
    }else if(res.data.resultBody.resCode=='410000'){
      ElMessage({message:'不符合状态',type:'error'});
    }
    back();
  }

  )

}
function queryLogic() {
	const datate = {
		data: {
			qryType: '3',
			code: null
		}
	}
	datate.data.code = route.query.id;
	queryLogisticsInfo(datate).then((res) => {
		if (res.data.code !== '000000') {
			return;
		}
		if (res.data.resultBody.resCode !== '000000') {
			return;
		}
		if (res.data.resultBody.busiResp.resCode !== '000000') {
			return;
		}
		let retData = res.data.resultBody.busiResp.busiDataResp[0];

		let current = {name1: '', children: []};
		if (!retData.traces.Traces[0]) {
			return;
		} else {
			current.name1 = retData.traces.Traces[0].AcceptTime.substring(0, 10);
			state.loginfo.push(current);
		}
		retData.traces.Traces.forEach(x => {

			let day = x.AcceptTime.substring(0, 10);
			if (current.name1 !== day) {
				current = {name1: day, children: []};
				state.loginfo.push(current);
			}
			current.children.push(x);
		});
	})
}
function back() {
	router.go(-1);
}
onMounted(() => {
  // console.log(route.query.id)
  state.statu=route.query.names
  state.isUp=route.query.isUp
  loadData();
});

function loadData() {
  const datate = {
		data: {
			returnId: null
			// code: null
		}
	}
  datate.data.returnId = route.query.id;
  queryRefundDetail(datate).then(res=>{
    state.info  = res.data.resultBody.busiResp.busiDataResp
    state.billCharge = res.data.resultBody.busiResp.busiDataResp.billCharge
    state.table = res.data.resultBody.busiResp.busiDataResp.commodityLists
    state.info.freight = state.info.freight/100
    state.info.refundCharge  =state.info.refundCharge/100
    state.table.forEach(x=>{
    x.instancePrice =x.instancePrice/100
    x.billCharge=x.billCharge/100
    state.mountprice =state.mountprice+x.billCharge
    })
    console.log('table',state.table)
  })
  queryLogic()
}
</script>

<script lang="ts">
// import { Refresh } from '@element-plus/icons-vue';
// import ModelTabsLayout from '@/components/ModelTabsLayout/ModelTabsLayout.vue';

// import RefundSimpletb from './components/refundSimpletb.vue';

export default {
  components: {
    // Refresh,
    // ModelTabsLayout,
    // RefundSimpletb
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


.loginfobox {
	margin-top: 20px;
	margin-bottom: 20px;

	.loginfotext {
		font-size: 14px;
		line-height: 38px;
	}
}

.loginfoicon1 {
	width: 10px;

	.point {
		width: 7px;
		height: 7px;
		background-color: #D8D8D8;
		border-radius: 10px;
		margin-top: 10px;
	}

	.point1 {
		width: 7px;
		height: 7px;
		background-color: #FF9047;
		border-radius: 10px;
		margin-top: 10px;
	}

	.line {
		width: 2px;
		height: 90%;
		background-color: #D8D8D8;
		margin-left: 3px;
		margin-top: 5px;
		margin-bottom: 5px;
	}


}
.logtext1 {
	font-size: 14px;
	line-height: 30px;
	margin-left: 20px;
	font-weight: 600;
	width: 75px;
	
}
.noshrink {
	flex-shrink: 0;
}
.wd70 {
	width: 70px;
}
.logtext2 {
	font-size: 14px;
	line-height: 30px;
	margin-left: 20px;
	color: #333;
	// max-width: 900px;
	word-break: break-all;
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

