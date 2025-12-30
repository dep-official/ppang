import { useQueries } from '@tanstack/react-query';
import { productAPI } from '@/api/services/product';
import { PRODUCT_KEYS } from '@/hooks/useProducts';

/**
 * 예약의 제품 정보를 조회하는 훅
 * useQueries를 사용하여 각 제품을 독립적으로 캐싱
 * @param {Array} productIds - 조회할 제품 ID 배열
 */
export const useReservationProducts = (productIds = []) => {
  console.log('🔍 useReservationProducts - productIds:', productIds);
  
  // 각 제품을 개별적으로 쿼리 (독립적인 캐싱)
  const queries = useQueries({
    queries: productIds.map(id => ({
      queryKey: PRODUCT_KEYS.detail(id),  // ['products', 'detail', id]
      queryFn: async () => {
        console.log(`📡 Fetching product ${id}...`);
        const data = await productAPI.getById(id);
        console.log(`✅ Product ${id} fetched:`, data);
        return data;
      },
      staleTime: 1000 * 60 * 5, // 5분
      enabled: !!id, // id가 있을 때만 쿼리 실행
    })),
  });

  // 모든 쿼리 결과를 객체로 변환 (productId를 key로)
  const productsMap = {};
  queries.forEach((query, index) => {
    if (query.data) {
      productsMap[productIds[index]] = query.data;
    }
  });

  const isLoading = queries.some(query => query.isLoading);
  const isError = queries.some(query => query.isError);
  
  console.log('📦 productsMap:', productsMap);
  console.log('⏳ isLoading:', isLoading);
  console.log('❌ isError:', isError);

  return { 
    productsMap,  // { productId: productData }
    isLoading, 
    isError 
  };
};

export default useReservationProducts;

