import { insertApiParams } from '@/types/api/manageApi.d';
import request from '@/utils/request';
import { AxiosPromise } from 'axios';

/**
 * 新增api
 *
 * @param queryParams
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