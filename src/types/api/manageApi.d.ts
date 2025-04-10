
/**
 * 添加API Params
 */
export interface insertApiParams{
    apiName: string
    apiType: string ;
    apiUrl: string ;
    method: string ;
    params: string ;
    headers: string ;
    body: any;
}
/**
 * 更新API Params
 */
export interface updateApiParams{
    apiName: string
    apiType: string ;
    apiUrl: string ;
    method: string ;
    params: string ;
    headers: string ;
    body: any;
}
/**
 * 删除API Params
 */
export interface deleteApiParams{
    apiId: string
}
/** * 获取API列表 Params
 * @param pageNum 当前页码  
 * @param pageSize 每页条数
 *  */  
export interface getApiListParams{
    pageNum: number
    pageSize: number
    apiId: string   
    apiName: string
    apiType: string
    apiUrl: string
    method: string
    params: string
    headers: string
    body: string
}
