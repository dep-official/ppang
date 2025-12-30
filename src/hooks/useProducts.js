import { useQuery } from '@tanstack/react-query';
import { productAPI } from '@/api/services/product';

export const PRODUCT_KEYS = {
  all: ['products'],
  lists: () => [...PRODUCT_KEYS.all, 'list'],
  list: (filters) => [...PRODUCT_KEYS.lists(), filters],
  active: () => [...PRODUCT_KEYS.all, 'active'],
  byCategory: (categoryId) => [...PRODUCT_KEYS.all, 'category', categoryId],
  activeByCate: (categoryId) => [...PRODUCT_KEYS.all, 'category', categoryId, 'active'],
  details: () => [...PRODUCT_KEYS.all, 'detail'],
  detail: (id) => [...PRODUCT_KEYS.details(), id],
};

// 전체 제품 조회
export const useProducts = (params = {}, options = {}) => {
  return useQuery({
    queryKey: PRODUCT_KEYS.list(params),
    queryFn: () => productAPI.getAll(params),
    ...options,
  });
};

// 활성 제품만 조회
export const useActiveProducts = (options = {}) => {
  return useQuery({
    queryKey: PRODUCT_KEYS.active(),
    queryFn: () => productAPI.getActive(),
    ...options,
  });
};

// 카테고리별 제품 조회
export const useProductsByCategory = (categoryId, params = {}, options = {}) => {
  return useQuery({
    queryKey: PRODUCT_KEYS.byCategory(categoryId),
    queryFn: () => productAPI.getByCategory(categoryId, params),
    enabled: !!categoryId,
    ...options,
  });
};

// 카테고리별 활성 제품 조회
export const useActiveProductsByCategory = (categoryId, options = {}) => {
  return useQuery({
    queryKey: PRODUCT_KEYS.activeByCate(categoryId),
    queryFn: () => productAPI.getActiveByCategory(categoryId),
    enabled: !!categoryId,
    ...options,
  });
};

// 단일 제품 조회
export const useProduct = (id, options = {}) => {
  return useQuery({
    queryKey: PRODUCT_KEYS.detail(id),
    queryFn: () => productAPI.getById(id),
    enabled: !!id,
    ...options,
  });
};

export default useProducts;

