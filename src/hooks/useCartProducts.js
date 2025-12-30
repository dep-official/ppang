import { useQueries } from '@tanstack/react-query';
import { productAPI } from '@/api/services/product';
import { useCartStore } from '@/store/useCartStore';
import { PRODUCT_KEYS } from '@/hooks/useProducts';

// 장바구니 제품들의 실제 데이터를 서버에서 조회
// useQueries로 각 제품을 독립적으로 캐싱
export const useCartProducts = (options = {}) => {
  const { productIds } = useCartStore();

  // 각 제품을 개별적으로 쿼리 (독립적인 캐싱)
  const queries = useQueries({
    queries: productIds.map(id => ({
      queryKey: PRODUCT_KEYS.detail(id),  // ['products', 'detail', id]
      queryFn: () => productAPI.getById(id),
      staleTime: 1000 * 60 * 5, // 5분
      ...options,
    })),
  });

  // 모든 쿼리 결과 합치기
  const products = queries.map(query => query.data).filter(Boolean);
  const isLoading = queries.some(query => query.isLoading);
  const isError = queries.some(query => query.isError);

  return { 
    data: products, 
    isLoading, 
    isError 
  };
};

// 총 금액 계산 (서버 데이터 기반)
export const useCartTotalPrice = () => {
  const { data: products = [], isLoading } = useCartProducts();
  
  const totalPrice = products.reduce((total, product) => {
    const price = product?.price || 0;
    return total + price;
  }, 0);
  
  return { totalPrice, isLoading };
};

export default useCartProducts;

