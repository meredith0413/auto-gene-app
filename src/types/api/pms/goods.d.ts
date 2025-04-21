import { PageQueryParam, PageResult } from '../base';

/**
 * 商品查询参数类型声明
 */
export interface GoodsQueryParam extends PageQueryParam {
  name?: stirng;
  categoryId?: number;
}

/**
 * 商品列表项类型声明
 */
export interface GoodsItem {
  id: string;
  name: string;
  categoryId?: any;
  brandId?: any;
  originPrice: string;
  price: string;
  sales: number;
  picUrl?: any;
  album?: any;
  unit?: any;
  description: string;
  detail: string;
  status?: any;
  categoryName: string;
  brandName: string;
  skuList: SkuItem[];
}

/**
 * 商品规格项类型声明
 */
export interface SkuItem {
  id: string;
  skuSn?: any;
  name: string;
  spuId?: any;
  specIds: string;
  price: string;
  stockNum: number;
  lockedStockNum?: any;
  picUrl?: any;
}

/**
 * 商品分页项类型声明
 */
export type GoodsPageResult = PageResult<GoodsItem[]>;

/**
 * 商品表单数据类型声明
 */
export interface GoodsDetail {
  id?: string;
  name?: string;
  categoryId?: string;
  brandId?: string;
  originPrice?: number;
  price?: number;
  picUrl?: string;
  album: string[];
  description?: string;
  detail?: string;
  attrList: any[];
  specList: any[];
  skuList: any[];
}


/**
 * 商品规格项类型声明
 */
export interface GoodsListQueryParam {
  providerId: string,
  id: string;
  goodsName?: any;
  name: string;
  stockNum: number;
  commodityName: string,
  commodityId: string,
  commodityStatus: string,
  brandName: string,
  categoryId: any[],
  statusList: string[],
  page: pageparamsType,
  model: string
}

export type pageparamsType = {
  currentPage: number | string
  pageSize: number | string
}

export type GoodsBrandType = {
  brandId: string
  brandName: string
}

export type GoodsTypesType = {
  shopCategoryId: string,
  shopCategoryName: string
}

type PriceErrorType = {
  [string]?: boolean
  specificationValue?: boolean
  priceError?: boolean
  costPriceError?: boolean
  unionPriceError?: boolean
  stockError?: boolean
  virtualSalesError?: boolean
  priceImgUrlError?: boolean
  platformPriceError?: boolean,
  imgError?: boolean
}

/**
 * @specificationValue 规格名称
 * @price 销售价（分）
 * @costPrice  成本价（分）
 * @unionPrice  工会购价（分） 选择设置工会价时，必填
 * @stock  库存
 * @virtualSales  虚拟销量
 * @price_img_id 规格图片
 * @priceId 规格Id
 * @model 平台模式/贸易模式 1平台模式 2贸易模式
 * @servicePrice 服务费(分) 平台模式必填
 * @platformPrice 平台服务费(分) 选择设置工会价时，必填
 * @ifUnion 是否设置工会购价 0不设置，1设置
*/
export type commodityPriceVoType = {
  [string]?: any
  priceId: string | number
  specificationValue: string // 规格名称
  price: number | string // 销售价（分）
  costPrice: number | string
  unionPrice?: number | string
  stock: number | string
  virtualSales: number | string
  priceImgUrl: string
  model: string
  servicePrice?: number | string
  platformPrice?: number | string
  ifUnion: string
  errorObj?: PriceErrorType
}
