import { OrderPageResult, OrderQueryParam } from '@/types/api/oms/order.d';
import { OrderReq, OrderListData, OrderDetailData, TradeReq, TradeData, LogisticsUpdate, LogisticsQuery, LogisticsModify } from '@/types/api/oms/order';
import request from '@/utils/request';
import { AxiosPromise } from 'axios';

/**
 * 获取订单分页列表
 *
 * @param queryParams
 */
export function listOrderPages(
  queryParams: OrderQueryParam
): AxiosPromise<OrderPageResult> {
  return request({
    url: '/mall-oms/api/v1/orders',
    method: 'get',
    params: queryParams,
  });
}

/**
 * 获取订单详情用于跳转
 *
 * @param orderId
 */
export function getOrderDetail(orderId: number) {
  return request({
    url: '/mall-oms/api/v1/orders/' + orderId,
    method: 'get',
  });
}
/** 查询订单列表
 * 
 * @param req 
 * 
 */
//  参数我先出来了
export function getListData(req: OrderReq): any {
  return request({
    url: '/zuul/goods/goodsApp/order/queryList',
    method: 'post',
    data: req,
    // headers: { "Content-Type": "application/json", }
  })
}
/**
 * 查询订单详情
 * @param req 
 * @returns 
 */
export function getDetailData(req: OrderDetailData) {
  return request({
    url: '/zuul/goods/goodsApp/order/queryOrderDetail',
    method: 'post',
    data: req
  })
}
/**
 * 查询交易单
 * @param req 
 * @returns 
 */
export function getTradeOrder(req: TradeReq) {
  return request({
    url: '/zuul/goods/goodsApp/order/queryTrade',
    method: 'post',
    params: req
  })
}


/**
 * 物流发货
 * @param req 
 * 
 */
export function   updateLogisticsInfo(req: LogisticsUpdate) {
  return request({
    url: '/zuul/goods/goodsApp/order/updateLogistics',
    method: 'post',
    data: req
  })
}
/**
 * 物流修改
 * @param req 
 * 
 */
 export function   logisticsModify(req: OrderReq) {
  return request({
    url: '/zuul/goods/goodsApp/order/logisticsModify',
    method: 'post',
    data: req
  })
}
/**
 * 物流备注修改
 * @param req 
 * 
 */
export function   logisticsRemarkModify(req: OrderReq) {
  return request({
    url: '/zuul/goods/goodsApp/order/addLogisticsRemark',
    method: 'post',
    data: req
  })
}
/**
 * 物流查询
 * @param req 
 * @returns 
 */
export function queryLogisticsInfo(req: OrderReq) {
  return request({
    url: '/zuul/goods/goodsApp/order/queryLogistics',
    method: 'post',
    data: req
  })
}
export function exportList(req: any) {
  return request({
    url: '/zuul/goods/goodsApp/order/exportList',
    method: 'post',
    data: req,
    responseType: 'blob'
  })
}
export function queryRefundList(req: OrderReq) {
  return request({
    url: '/zuul/goods/goodsApp/order/queryRefundList',
    method: 'post',
    data: req
  })
}
export function exportRefundList(req: OrderReq) {
  return request({
    url: '/zuul/goods/goodsApp/order/exportRefundList',
    method: 'post',
    data: req,
    responseType: 'blob'
  }).then((res) => {

    const contentDisposition: string = res.headers['content-disposition'];
    //     // 这里后端给的内容中，文件名字可能是驼峰式名称的 fileName ，或者是全部小写的 filename
    const filename = '退款订单明细.xlsx'
    const blob = new Blob([res.data], { type: 'application/msexcel' });
    //  let blob = new Blob([res.data], {type: "application/x-msdownload;charset=UTF8"});
    const url = window.URL.createObjectURL(blob);
    if ((window.navigator as any).msSaveBlob) { //IE
      try {
        (window.navigator as any).msSaveBlob(blob, filename);
      }
      catch (e) {
        console.log(e);
      }
    } else { //非IE
      const link = document.createElement('a');
      link.style.display = 'none';
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
    }
    URL.revokeObjectURL(url); // 释放内存
    // });
  });
 
}
export function queryRefundDetail(req: OrderReq) {
  return request({
    url: '/zuul/goods/goodsApp/order/queryRefundDetail',
    method: 'post',
    data: req
  })
}
export function updateRefund(req: OrderReq) {
  return request({
    url: '/zuul/goods/goodsApp/order/updateRefund',
    method: 'post',
    data: req
  })
}