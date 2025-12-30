/**
 * TanStack Query를 사용한 카테고리 조회 훅
 */
import { useQuery } from '@tanstack/react-query';
import { categoryAPI } from '@/api/services/category';

// Query Key 상수
export const CATEGORY_KEYS = {
  all: ['categories'],
  lists: () => [...CATEGORY_KEYS.all, 'list'],
  list: (filters) => [...CATEGORY_KEYS.lists(), filters],
  active: () => [...CATEGORY_KEYS.all, 'active'],
  details: () => [...CATEGORY_KEYS.all, 'detail'],
  detail: (id) => [...CATEGORY_KEYS.details(), id],
};

/**
 * 전체 카테고리 조회
 * @param {Object} options - useQuery 옵션
 * @returns {Object} { data, isLoading, error, refetch }
 */
export const useCategories = (options = {}) => {
  return useQuery({
    queryKey: CATEGORY_KEYS.lists(),
    queryFn: () => categoryAPI.getAll(),
    ...options,
  });
};

/**
 * 활성 카테고리만 조회
 * @param {Object} options - useQuery 옵션
 * @returns {Object} { data, isLoading, error, refetch }
 */
export const useActiveCategories = (options = {}) => {
  return useQuery({
    queryKey: CATEGORY_KEYS.active(),
    queryFn: () => categoryAPI.getActive(),
    ...options,
  });
};

/**
 * 특정 카테고리 조회
 * @param {number} id - 카테고리 ID
 * @param {Object} options - useQuery 옵션
 * @returns {Object} { data, isLoading, error, refetch }
 */
export const useCategory = (id, options = {}) => {
  return useQuery({
    queryKey: CATEGORY_KEYS.detail(id),
    queryFn: () => categoryAPI.getById(id),
    enabled: !!id, // id가 있을 때만 실행
    ...options,
  });
};

export default useCategories;

