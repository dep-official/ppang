import { apiClient } from '../client';
import { wrap } from './utils';

const CATEGORIES = '/api/categories';
const byId = (id) => `${CATEGORIES}/${id}`;

export const createCategory = wrap('카테고리 생성 실패', (data) =>
  apiClient.post(CATEGORIES, data)
);

export const getCategoryById = wrap('카테고리 조회 실패', (id) =>
  apiClient.get(byId(id))
);

export const getCategories = wrap('카테고리 목록 조회 실패', (params = {}) =>
  apiClient.get(CATEGORIES, { params })
);

export const getActiveCategories = wrap('활성 카테고리 조회 실패', () =>
  apiClient.get(CATEGORIES, { params: { active: true } })
);

export const updateCategory = wrap('카테고리 수정 실패', (id, data) =>
  apiClient.put(byId(id), data)
);

export const deleteCategory = wrap('카테고리 삭제 실패', (id) =>
  apiClient.delete(byId(id))
);

// 기본 export (객체 형태)
export const categoryAPI = {
  create: createCategory,
  getById: getCategoryById,
  getAll: getCategories,
  getActive: getActiveCategories,
  update: updateCategory,
  delete: deleteCategory,
};

export default categoryAPI;
