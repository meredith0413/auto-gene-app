<template>
	<div class="app-container">

		<div class="content pd-l" v-if="orderStatus == 4">
			<div class="flex flexb alignc flexr">
				<!-- <div class="fwb fs-20">
					商品已下单，待卖家发货
				</div> -->
				<el-button class="" type="primary" @click="diaflag = true">发货</el-button>
			</div>
			<!-- <div class="orangetip mgt-m">
				卖家备注：商家备注文案文案文案文案商家备注文案文案文案文案
			</div> -->

		</div>
		<div class="content pd-l" v-if="orderStatus == 12">
			<div class="flex flexb alignc flexr">

				<el-button class="" type="primary" @click="diaflagModify = true">修改物流信息</el-button>

			</div>

		</div>
		<div class="tabbox mgt-m">
			<div class="tabitem" v-for="item, index in tablist" :key="index" :class="{ active: index == tabindex }"
					 @click="tabindex = index">
				{{ item }}

			</div>

		</div>
		<div class="content " style="margin-top:0;" v-show="tabindex == 0">
			<div class="pd-l bdb">
				<div class="flex flexb">
					<div style="width:33%">
						<div class="fs-16">
							订单信息
						</div>
						<div class="mgt-m flex" v-for="item, index in orderInfo" :key="index">
							<div class="color-999 fs-14">
								<div class="" style="width:100px">
									{{ item.key }}
								</div>

							</div>
							<div class="fs-14">
								{{ item.value }}
							</div>

						</div>


					</div>
					<div style="width:33%">
						<div class="fs-16">
							商家信息
						</div>
						<div class="mgt-m flex" v-for="item, index in infolist2" :key="index">
							<div class="color-999 fs-14">
								<div class="" style="width:100px">
									{{ item.key }}
								</div>

							</div>
							<div class="fs-14">
								{{ item.value }}
							</div>

						</div>


					</div>
					<div style="width:33%">
						<div class="fs-16">
							买家信息
						</div>
						<div class="mgt-m flex" v-for="item, index in buyerInfo" :key="index">
							<div class="color-999 fs-14">
								<div class="" style="width:100px">
									{{ item.key }}
								</div>

							</div>
							<div class="fs-14">
								{{ item.value }}
							</div>

						</div>


					</div>

				</div>
				<div class="mgt-l">
					<el-table :data="tableData1" style="width: 100%"
										:header-cell-style="{ background: 'rgba(191, 197, 211, 0.12)' }" highlight-current-row
										ref="singleTable">
						<el-table-column type="index" label="序号" width="100"></el-table-column>
						<!-- <el-table-column prop="name7" label="SKU编号"> </el-table-column> -->
						<el-table-column prop="commodityName" label="商品名称"></el-table-column>
						<el-table-column prop="specificationValue" label="规格"></el-table-column>
						<el-table-column prop="instancePrice" label="单价(元)"></el-table-column>

						<el-table-column prop="commodityNum" label="数量"></el-table-column>
						<el-table-column prop="charge" label="总价"></el-table-column>
						<el-table-column prop="coupon" label="优惠券"></el-table-column>
						<el-table-column prop="billCharge" label="金额小计(元)"></el-table-column>


					</el-table>


				</div>
				<div class="flex flexb">
					<div></div>
					<div>
						<div class="mgt-m flex" v-for="item, index in infolist4" :key="index">
							<div class="color-999 fs-14">
								<div class="" style="width:100px">
									{{ item.key }}
								</div>

							</div>
							<div class="fs-14">
								￥{{ item.value / 100 }}
							</div>

						</div>
						<div class="mgt-m flex fs-14" :v-bind="charge">
							<div class="" style="width:100px">
								实付价格
							</div>
							<div class="color-orange">
								￥{{ charge / 100 }}
							</div>

						</div>

					</div>


				</div>

			</div>
			<div class="pd-l">
				<div class="flex flexb">
					<div style="width:50%">
						<div class="fs-16">
							下单信息
						</div>
						<div class="mgt-m flex" v-for="item, index in checkInfo" :key="index">
							<div class="color-999 fs-14">
								<div class="" style="width:100px">
									{{ item.key }}
								</div>

							</div>
							<div class="fs-14">
								{{ item.value }}
							</div>

						</div>


					</div>
					<!-- <div style="width:33%">
						<div class="fs-16">
							发票信息
						</div>
						<div class="mgt-m flex" v-for="item, index in infolist6" :key="index">
							<div class="color-999 fs-14">
								<div class="" style="width:100px">
									{{ item.key }}
								</div>

							</div>
							<div class="fs-14">
								{{ item.value }}
							</div>

						</div>


					</div> -->
					<div style="width:50%">
						<div class="fs-16">
							买家信息
						</div>
						<div class="mgt-m flex" v-for="item, index in infolist7" :key="index">
							<div class="color-999 fs-14">
								<div class="" style="width:100px">
									{{ item.key }}
								</div>

							</div>
							<div class="fs-14">
								{{ item.value }}
							</div>

						</div>


					</div>

				</div>

			</div>

		</div>
		<div class="content " style="margin-top:0;" v-show="tabindex == 1">
			<div class="pd-l  bdb">
				<el-table :data="tableData2" style="width: 100%"
									:header-cell-style="{ background: 'rgba(191, 197, 211, 0.12)' }" highlight-current-row
									ref="singleTable">
					<el-table-column type="index" label="序号" width="100"></el-table-column>
					<el-table-column prop="orderId" label="订单id"></el-table-column>
					<el-table-column prop="distributionCode" label="物流单号"></el-table-column>
					<el-table-column label="收货人">{{ postInfo.receiver }}</el-table-column>
					<el-table-column prop="deliveryTime" label="发货时间">{{ postInfo.deliveryTime }}</el-table-column>

					<!-- <el-table-column prop="status" label="发货状态">
						<template #default="scope">
							<img src="@/assets/img/yellowicon.png" alt="" v-if="scope.row.name5=='待发货'">
							{{scope.row.name5}}

						</template>

					</el-table-column> -->
				</el-table>
				<div class="flex flexb">
					<div></div>
					<div class="mgt-m fs-14">
						共计：1件
						<div>
							<!-- <el-button type="primary" class="mgt-m" @click="diaflag=true">物流填写</el-button> -->
						</div>
					</div>
				</div>
			</div>
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
							{{ item.key }}
						</div>
						<!-- <div class="logtext1">
							{{item.value}}
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
		</div>
		<el-dialog v-model="diaflag" title="物流信息">
			<div class="editnum-dialog">
				<el-form ref="ruleFormRef" label-width="100px" :rules="rules" :model="ruleForm" style="max-width: 460px">
					<el-form-item label="物流公司：" prop="logistics">
						<el-select v-model="ruleForm.logistics" placeholder="请选择物流公司" style="width: 240px">
							<el-option v-for="item in options" :key="item.label" :label="item.value" :value="item.label"/>
						</el-select>
					</el-form-item>
					<el-form-item label="物流单号：" prop="logisticsId">
						<el-input v-model="ruleForm.logisticsId" placeholder="请输入物流单号"/>
					</el-form-item>
					<el-form-item label="发货时间：" prop="deliveryTime">
						<el-date-picker v-model="ruleForm.deliveryTime" type="datetime" value-format="YYYY-MM-DD HH:mm:ss"
														placeholder="请选择发货日期"/>
					</el-form-item>
				</el-form>
			</div>
			<div class="dialog-btn-div ">
				<el-button class="btn" @click="diaflag = false">
					取消
				</el-button>
				<el-button class="btn query" @click="submitForm(ruleFormRef)">
					确认
				</el-button>
			</div>
		</el-dialog>
		<!-- 修改dialog -->
		<el-dialog v-model="diaflagModify" title="修改物流信息">
			<div class="editnum-dialog">
				<el-form ref="ruleFormRef1" label-width="100px" :rules="rules" :model="ruleForm1" style="max-width: 460px">
					<el-form-item label="物流公司：" prop="logistics">
						<el-select v-model="ruleForm1.logistics" placeholder="请选择物流公司" style="width: 240px">
							<el-option v-for="item in options" :key="item.label" :label="item.value" :value="item.label" />
						</el-select>
					</el-form-item>
					<el-form-item label="物流单号：" prop="logisticsId">
						<el-input v-model="ruleForm1.logisticsId" placeholder="请输入物流单号"/>
					</el-form-item>
					<el-form-item label="发货时间：" prop="deliveryTime">
						<el-date-picker v-model="ruleForm1.deliveryTime" type="datetime" value-format="YYYY-MM-DD HH:mm:ss"
							placeholder="请选择发货日期" />
					</el-form-item>
				</el-form>


			</div>
			<div class="dialog-btn-div ">
				<el-button class="btn" @click="diaflagModify = false">
					取消
				</el-button>
				<el-button class="btn query" @click="submitForm1(ruleFormRef1)">
					确认
				</el-button>
			</div>
		</el-dialog>
		<div style="text-align:center" class="mgt-15">
			<el-button style="width:160px" class="mgb-20" @click="back">返回</el-button>
		</div>
	</div>

</template>

<script setup lang="ts">
import {onMounted, reactive, toRefs} from 'vue';
import {getDetailData, updateLogisticsInfo, queryLogisticsInfo, logisticsModify} from "@/api/oms/order";
import {FormInstance, FormRules,ElMessage} from 'element-plus'
import {OrderDetailData, LogisticsUpdate, LogisticsQuery} from "@/types/api/oms/order";
import {useRoute, useRouter} from 'vue-router'
import {ref} from 'vue';
import ModelTitleLayout from '@/components/ModelTitleLayout/ModelTitleLayout.vue';
import {getSysDictInfo} from "@/api/pms/goods";

const ruleFormRef = ref<FormInstance>()
const ruleFormRef1 = ref<FormInstance>()
const ruleForm = reactive({
	logistics: [],
	logisticsId: '',
	deliveryTime: '',

})
const ruleForm1 = reactive({
	logistics: [],
	logisticsId: '',
	deliveryTime: '',

})
const rules = reactive<FormRules>({
	logistics: [
		{required: true, message: '请选择物流公司', trigger: 'blur'},
	],
	logisticsId: [
		{required: true, message: '请输入物流单号', trigger: 'blur'},

	],
	deliveryTime: [
		{required: true, message: '请选择发货日期', trigger: 'blur'},

	],
})
//import router from '@/router';
onMounted(() => {
	console.log("create");

	loadData();
	if (route.query.logic) {
		state.tabindex = 1;
	}
	;
});
const state = reactive({
	tablist: ['订单详情', '发货记录'],
	tabindex: 0,
	req: {} as OrderDetailData,
	sendLogic: {} as LogisticsUpdate,
	logCom: '',
	loginfo: [],
	info1: {
		key: '',
		value: ''
	},
	orderInfo: [
		{
			key: '订单号',
			value: '暂无信息'
		},
		{
			key: '下单时间',
			value: '暂无信息'
		},
	],
	infolist2: [
		{
			key: '商家名称',
			value: '暂无信息'

		},
		{
			key: '商家编号',
			value: '暂无信息'

		},
		{
			key: '买家备注',
			value: '暂无信息'

		}
	],
	buyerInfo: [
		{
			key: '买家昵称',
			value: '暂无信息'

		},
		// {
		//   key: '买家身份',
		//   value: '暂无信息'

		// },
		{
			key: '买家联系方式',
			value: '暂无信息'

		},
		{
			key: '地址',
			value: '暂无信息'

		}
	],
	tableData1: [
		{
			name1: "暂无信息",
			name2: "暂无信息",
			name3: "暂无信息",
			name5: "暂无信息",
			name6: "暂无信息",
			name7: "暂无信息",
		},
		{
			name1: "暂无信息",
			name2: "暂无信息",
			name3: "暂无信息",
			name5: "暂无信息",
			name6: "暂无信息",
			name7: "暂无信息",
		},

	],
	tableData2: [
		{
			name1: "暂无信息",
			name2: "暂无信息",
			name3: "暂无信息",
			name5: "暂无信息",
			name7: "暂无信息",
		},


	],
	infolist4: [
		{
			key: '合计金额',
			value: '暂无信息'

		},
		{
			key: '配送费用',
			value: '暂无信息'
		}
		, {
			key: '优惠金额',
			value: 0
		}

	],
	checkInfo: [
		{
			key: '收货人',
			value: '暂无信息'

		},

		{
			key: '联系方式',
			value: '暂无信息'

		},
		{
			key: '收货地址',
			value: '暂无信息'

		}
	],
	infolist6: [
		{
			key: '是否需要发票',
			value: ''

		},

	],
	infolist7: [

		{
			key: '支付方式',
			value: '暂无信息'

		},
		{
			key: '支付时间',
			value: '暂无信息'

		},
		{
			key: '交易单ID',
			value: '暂无信息'

		}
	],
	diaflag: false,
	diaflagModify: false,
	diaformData: {
		logistics: [],
		logisticsId: '',
		deliveryTime: '',
	},
	options: [
		// {
		// 	value: '邮政平邮小包',
		// 	label: 'YZPY',
		// },
		// {
		// 	value: '德邦物流',
		// 	label: 'DBL',
		// },
		// {
		// 	value: '百世快递',
		// 	label: 'HTKY',
		// },
		// {
		// 	value: 'EMS',
		// 	label: 'EMS',
		// },
		// {
		// 	value: '百世快运',
		// 	label: 'BTWL',
		// },
		// {
		// 	value: '申通快递',
		// 	label: 'STO',
		// },
		// {
		// 	value: '品俊',
		// 	label: 'PJ',
		// },
		// {
		// 	value: '宅急送',
		// 	label: 'ZJS',
		// },
		// {
		// 	value: '加运美',
		// 	label: 'JYM',
		// },
		// {
		// 	value: '一站式速运',
		// 	label: 'YZTSY',
		// },
		// {
		// 	value: '韵达快递',
		// 	label: 'YD',
		// },
		// {
		// 	value: '中通速递',
		// 	label: 'ZTO',
		// },
		// {
		// 	value: '圆通速递',
		// 	label: 'YTO',
		// },
		// {
		// 	value: '顺丰速运',
		// 	label: 'SF',
		// },
		// {
		// 	value: '天天快递',
		// 	label: 'HHTT',
		// },
		// {
		// 	value: '优速快递',
		// 	label: 'UC',
		// },
		// {
		// 	value: '中邮物流',
		// 	label: 'ZYWL',
		// },
		// {
		// 	value: '快捷速递',
		// 	label: 'FAST',
		// },
		// {
		// 	value: '安能物流',
		// 	label: 'ANE',
		// },
		// {
		// 	value: '国通快递',
		// 	label: 'GTO',
		// },
		// {
		// 	value: 'CNPEX中邮快递',
		// 	label: 'CNPEX',
		// },
		// {
		// 	value: '增益速递',
		// 	label: 'ZENY',
		// },
		// {
		// 	value: '安捷快递',
		// 	label: 'AJ',
		// },
		// {
		// 	value: '亚马逊',
		// 	label: 'AMAZON',
		// },
	],
	charge: null,
	postInfo: null,
	orderStatus: null,
	distributionId: '',
	// distributionCode:''
});
const {
	tablist,
	tabindex,
	orderInfo,
	infolist2,
	buyerInfo,
	tableData1,
	infolist4,
	checkInfo,
	infolist6,
	infolist7,
	tableData2,
	diaflag,
	diaflagModify,
	diaformData,
	options,
	sendLogic,
	charge,
	postInfo,
	orderStatus,
	loginfo,
	distributionId,
	// distributionCode
}
	= toRefs(state);

const router = useRouter();
const route = useRoute();

function loadData() {
	console.log("in load")
	const req = {
		data: {
			orderId: null
		}

	}

	req.data.orderId = route.query.id;

	// req.data.orderId ="1202208301564515126701330432";
	const info1 = {
		key: '',
		value: ''
	};
  getSysDictInfo('1008').then((res) => {
    console.log('获取物流公司码表', res);
    state.options = [];
    res.data.resultBody.forEach(element => {
      state.options.push({value: element.label,label:element.value});
    });
  })

	getDetailData(req).then((res) => {
		queryLogic()
		if (res.data.resultBody.busiResp) {
			//list1
			console.log(res.data.resultBody.busiResp.busiDataResp[0]);
			//订单状态 orderStatus
			state.orderStatus = res.data.resultBody.busiResp.busiDataResp[0].status;
			if (res.data.resultBody.busiResp.busiDataResp[0].distributionList[0]) {
				state.distributionId = res.data.resultBody.busiResp.busiDataResp[0].distributionList[0].distributionId;
			}

			console.log('distributionId', state.distributionId);
			// info1.key ="订单号"
			state.orderInfo[0].value = res.data.resultBody.busiResp.busiDataResp[0].orderId;

			// info1.key ="下单时间"
			state.orderInfo[1].value = res.data.resultBody.busiResp.busiDataResp[0].createTime;


			//list2
			// info1.key ="卖家名称"
			state.infolist2[0].value = res.data.resultBody.busiResp.busiDataResp[0].shipperName;

			// info1.key ="商家编号"
			state.infolist2[1].value = res.data.resultBody.busiResp.busiDataResp[0].shipperId;

			// info1.key ="买家备注"
			state.infolist2[2].value = res.data.resultBody.busiResp.busiDataResp[0].remark;

			//list3
			// info1.key ="买家昵称"


			const str2 = res.data.resultBody.busiResp.busiDataResp[0].shopPersonName;

			state.buyerInfo[0].value = str2.substring(0, 3) + "****" + str2.substring(str2.length - 4);
			// info1.key ="买家身份"
			// state.buyerInfo[1].value = res.data.resultBody.busiResp.busiDataResp[0].customerRoleCode;

			// info1.key ="买家联系方式"
			const str3 = res.data.resultBody.busiResp.busiDataResp[0].shopMobile;
			state.buyerInfo[1].value = str3.substring(0, 3) + "****" + str3.substring(str3.length - 4);
			// info1.key ="地址"
			state.buyerInfo[2].value = res.data.resultBody.busiResp.busiDataResp[0].province + res.data.resultBody.busiResp.busiDataResp[0].city + res.data.resultBody.busiResp.busiDataResp[0].country + res.data.resultBody.busiResp.busiDataResp[0].detailAddr;
			//list4
			// info1.key ="合计金额"
			state.infolist4[0].value = res.data.resultBody.busiResp.busiDataResp[0].billCharge;
			state.charge = res.data.resultBody.busiResp.busiDataResp[0].charge;
			// info1.key ="配送费用"
			state.infolist4[1].value = res.data.resultBody.busiResp.busiDataResp[0].freight;
			//info1.key ="优惠金额"
			// state.infolist4[2].value = res.data.resultBody.busiResp.busiDataResp[0].coupon;
			//list5
			// info1.key ="收货人"
			state.checkInfo[0].value = res.data.resultBody.busiResp.busiDataResp[0].postInfo.receiver;
			// info1.key ="联系方式"
			state.checkInfo[1].value = res.data.resultBody.busiResp.busiDataResp[0].postInfo.mobile;
			// info1.key ="收货地址"
			state.checkInfo[2].value = res.data.resultBody.busiResp.busiDataResp[0].postInfo.province + res.data.resultBody.busiResp.busiDataResp[0].postInfo.city + res.data.resultBody.busiResp.busiDataResp[0].postInfo.country + res.data.resultBody.busiResp.busiDataResp[0].postInfo.detailAddr;
			//list6
			// info1.key ="是否需要发票"
			//state.infolist6[0].value =res.data.resultBody.busiResp.busiDataResp[0].postInfo.detailAddr;
			// state.infolist6.push(info1);
			// list7
			// info1.key ="支付时间"
			state.infolist7[0].value = res.data.resultBody.busiResp.busiDataResp[0].payType == '' && res.data.resultBody.busiResp.busiDataResp[0].status != '2' ? '在线支付' : res.data.resultBody.busiResp.busiDataResp[0].payType;

			state.infolist7[1].value = res.data.resultBody.busiResp.busiDataResp[0].payTime;
			state.infolist7[2].value = res.data.resultBody.busiResp.busiDataResp[0].tradeId;
			state.tableData1 = res.data.resultBody.busiResp.busiDataResp[0].orderItemDetailResp;
			state.tableData1.forEach(x => {
				x.charge = x.charge / 100				
				x.instancePrice = x.instancePrice / 100
				x.billCharge = x.billCharge / 100
				state.infolist4[2].value = state.infolist4[2].value + x.coupon
				 x.coupon = x.coupon / 100	
				
			})
			state.postInfo = res.data.resultBody.busiResp.busiDataResp[0].postInfo;
			// state.deliveryTime = res.data.resultBody.busiResp.busiDataResp[0].postInfo.deliveryTime;
			// state.tableData1[0].price = res.data.resultBody.busiResp.busiDataResp[0].orderItemDetailResp[0].price /100 ;
			// state.tableData1[0].price = 0

			state.tableData2 = res.data.resultBody.busiResp.busiDataResp[0].distributionList;
		} else {
			ElMessage('获取信息失败');

		}

	})
}

const submitForm = async (formEl: FormInstance | undefined) => {
	if (!formEl) return
	await formEl.validate((valid) => {
		if (valid) {
			send()
		} else {
			console.log('error submit!')
		}
	})

}
const submitForm1 = async (formEl: FormInstance | undefined) => {
	if (!formEl) return
	await formEl.validate((valid) => {
		if (valid) {
			modify()
		} else {
			console.log('error submit!')
		}
	})

}

function back() {
	router.go(-1);
}

function queryLogic() {
	state.loginfo=[];
	const datate = {
		data: {
			qryType: '2',
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

		let current = {key: '', children: []};
		if (!retData.traces.Traces[0]) {
			return;
		} else {
			current.key = retData.traces.Traces[0].AcceptTime.substring(0, 10);
			state.loginfo.push(current);
		}
		retData.traces.Traces.forEach(x => {

			let day = x.AcceptTime.substring(0, 10);
			if (current.key !== day) {
				current = {key: day, children: []};
				state.loginfo.push(current);
			}
			current.children.push(x);
		});
	})
}

function send() {
	const arg = sendLogic;
	arg.value.disWay = "3";
	arg.value.logistics = ruleForm.logistics;
	arg.value.logisticsId = ruleForm.logisticsId;
	arg.value.deliveryTime = ruleForm.deliveryTime;
	arg.value.orderId = route.query.id;

	updateLogisticsInfo(arg.value).then(res => {
		console.log(res.data)
		state.diaflag = false
		loadData();
	});
}

function modify() {
	const arg = {
		data: {
			logisticsId: ruleForm1.logisticsId,
			orderId: route.query.id,
			logistics:ruleForm1.logistics,
			disWay:'2',
			deliveryTime:ruleForm1.deliveryTime


		}
	}
	logisticsModify(arg).then(_ => {
		state.diaflagModify = false;
		loadData();
	})

}
</script>

<style lang="scss" scoped>
.pd-l {
	padding: 20px;
}

.pdl-l {
	padding-left: 20px;
}

.fwb {
	font-weight: bold;
}

.fs-20 {
	font-size: 20px;
}

.orangetip {
	height: 25px;
	line-height: 25px;
	padding-left: 16px;

	background: rgba(254, 142, 68, 0.12);
	border: 1px dashed #FD7634;
	color: #FE8E44;
	font-size: 12px;
}

.mgt-m {
	margin-top: 10px;
}

.tabbox {
	display: flex;

	.tabitem {
		width: 148px;
		height: 57px;
		background: #F7F9FA;
		box-shadow: 2px 2px 8px 0px rgba(82, 90, 102, 0.08), 1px 1px 2px 0px rgba(82, 90, 102, 0.04);
		font-size: 16px;
		color: #333;
		text-align: center;
		line-height: 57px;
		box-sizing: border-box;
		margin-right: 2px;
		cursor: pointer;
	}

	.tabitem.active {
		border-top: 4px solid #FE8E44;
		background-color: #fff;

	}
}

.content {
	box-sizing: border-box;
	width: 100%;
	padding: 10px;
	background-color: #fff;
	margin-top: 10px;
	box-shadow: 0px 1px 3px 0px #dce2f1;
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

::v-deep.el-button--primary {
	color: #FFF;
	background-color: #FE8E44 !important;
	border-color: #FE8E44 !important;
}

.mgt-m {
	margin-top: 10px;
}

.color-999 {
	color: #999;
}

.fs-14 {
	font-size: 14px;
}

.mgt-l {
	margin-top: 20px;
}

.bdb {
	border-bottom: 1px solid #eef0f3;
}

.editnum-dialog {
	margin: 0 20px 20px 20px;
	//   border: 1px #f7f7f7 solid;
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

.flexr {
	flex-direction: row-reverse
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
</style>
