import { apiClient } from '../client';
import { wrap } from './utils';

const PRODUCTS = '/api/products';
const byId = (id) => `${PRODUCTS}/${id}`;

export const createProduct = wrap('제품 생성 실패', (data) =>
  apiClient.post(PRODUCTS, data)
);

export const getProductById = wrap('제품 조회 실패', (id) =>
  apiClient.get(byId(id))
);

export const getAllProducts = wrap('제품 목록 조회 실패', (params = {}) =>
  apiClient.get(PRODUCTS, { params })
);

export const getActiveProducts = wrap('활성 제품 조회 실패', () =>
  apiClient.get(PRODUCTS, { params: { active: true } })
);

export const getProductsByCategoryId = wrap('카테고리별 제품 조회 실패', (categoryId, params = {}) =>
  apiClient.get(PRODUCTS, { params: { categoryId, ...params } })
);

export const getActiveProductsByCategoryId = wrap('카테고리별 활성 제품 조회 실패', (categoryId) =>
  apiClient.get(PRODUCTS, { params: { categoryId, active: true } })
);

export const updateProduct = wrap('제품 수정 실패', (id, data) =>
  apiClient.put(byId(id), data)
);

export const deleteProduct = wrap('제품 삭제 실패', (id) =>
  apiClient.delete(byId(id))
);

export const productAPI = {
  create: createProduct,
  getById: getProductById,
  getAll: getAllProducts,
  getActive: getActiveProducts,
  getByCategory: getProductsByCategoryId,
  getActiveByCategory: getActiveProductsByCategoryId,
  update: updateProduct,
  delete: deleteProduct,
};

export default productAPI;

