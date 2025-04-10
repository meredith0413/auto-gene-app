import { insertApiParams } from '@/types/api/manageApi.d';
import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import type { ECharts } from 'echarts'

/**
 * 新增api
 *
 * @param queryParamscc
 */
export function insertApiFunc(
  queryParams: insertApiParams
): AxiosPromise<insertApiParams> {
  return request({
    url: '/car-sys/api/insertApi',
    method: 'post',
    params: queryParams
  });
}