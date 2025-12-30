import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      // 제품 ID만 저장 (가격은 서버에서 조회)
      productIds: [],

      // 제품 ID 추가
      addProduct: (productId) => set((state) => {
        if (state.productIds.includes(productId)) {
          return state; // 이미 있으면 추가하지 않음
        }
        return { productIds: [...state.productIds, productId] };
      }),

      // 제품 ID 제거
      removeProduct: (productId) => set((state) => ({
        productIds: state.productIds.filter((id) => id !== productId),
      })),

      // 전체 삭제
      clearCart: () => set({ productIds: [] }),

      // 제품 개수
      getProductCount: () => get().productIds.length,
    }),
    {
      name: 'cart-storage', // localStorage key
    }
  )
);

export default useCartStore;

