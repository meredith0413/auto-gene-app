/**
 * 订单请求
 */
export interface OrderReq {
    signType?: string,
    data: any,
    sign?: string
}
/**
 * 订单列表
 */
export interface OrderListData {
    // data: {
    orderId: string,
    createTimeBegin: any,
    createTimeEnd: string,
    loginName: string,
    channels: string,
    agentsName: any,
    agentsId: string,
    finishCreateTime: string,
    finishCloseTime: string,
    status:string
    // }
}
/**
 * 订单详情
 */
export interface OrderDetailData {
    data:{
    orderId: string
    }
}
/**
 * 交易单
 */
export interface TradeReq {
    data: any
}
export interface TradeData {
    tradeId: string
}
/**
 * 物流发货接口
 */
export interface LogisticsUpdate {
    disWay: string,
    logistics: any,
    logisticsId: string,
    orderId: any,
    specialNote: string,
    deliveryTime: string,
    specialNote:''
}
/**
 * 物流查询接口
 */
export interface LogisticsQuery {
    qryType: string,
    ShipperCode: string,
    code: string
}
export interface LogisticsModify {
    distributionId:string,
    distributionCode:string
}
export interface QueryRefundList {
    returnId: string,
    orderId: string,
    phoneNum: string,
    providerId: string,
    returnApplyBegin: any,
    reasonType: string,
    returnApplyEnd: any,
    returnStatus: string,
    page:any
}
export interface Shenhe {
    verifyRes: string,
    verifyOpinion: string
  }
export interface QueryRefundDetail {
    returnId: string,
    providerId: string,
    
}
export interface UpdateRefund {
    returnId: string,
    providerId: string,
    status:string
    
}
export interface RefundList {
    returnId: string,
    orderId: string,
    orderItemId: string,
    type: string,
    status: string,
    agentsName: string,
    refundCharge: string,
    createDate: string,
    commodityName:string,
    commodityId: string,
    commodityPic: string,
    commodityCount: string,
    instancePrice: string,
    commodityTotalCharge: string,
    mobile: string,
    reasonType: string,
}
export interface returninfoBo {
    returnId: string,
    orderId: string,
    freight:any,
    orderItemId: string,
    priceId: string,
    province:string,
    receiver:string,
    refundCharge:any,
    commodityName: string,
    specValueDesc : string,
    instancePrice: string,
    createDate: string,
    commodityNum :string,
    commodityId: string,
    status: string,
    commodityCount: string,
    billCharge: string,
    createTime: string,
    mobile: string,
    reasonType: any,
    memo:string,
    city:string,
    country:string,
    detailAddr:string
}