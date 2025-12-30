"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import CartModal from "./CartModal";
import { useCategories } from "@/hooks/useCategories";
import { useActiveProducts, PRODUCT_KEYS } from "@/hooks/useProducts";
import { CategorySkeleton, ProductSkeleton } from "@/components/Skeleton";
import { useCartStore } from "@/store/useCartStore";
import { useCartProducts } from "@/hooks/useCartProducts";
import "./event-detail.css";

export default function EventDetailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const queryClient = useQueryClient();
  
  // Zustand store 사용 (ID만 저장)
  const { productIds, addProduct, removeProduct, getProductCount } = useCartStore();
  
  // 서버에서 실제 제품 데이터 조회
  const { data: cartProducts = [], isLoading: isCartLoading } = useCartProducts();
  
  // 총 금액 계산 (서버 데이터 기반)
  const totalPrice = cartProducts.reduce((total, product) => {
    return total + (product?.price || 0);
  }, 0);
  
  // Hydration 에러 방지: 클라이언트 마운트 체크
  useEffect(() => {
    setMounted(true);
  }, []);

  // URL 공유 기능
  const handleShare = async () => {
    try {
      // 현재 페이지의 전체 URL 생성
      const currentUrl = typeof window !== 'undefined' 
        ? window.location.href 
        : '';
      
      // 클립보드에 복사
      await navigator.clipboard.writeText(currentUrl);
      
      // 사용자 피드백
      alert('링크가 복사되었습니다!');
    } catch (err) {
      console.error('URL 복사 실패:', err);
      
      // Fallback: 구형 브라우저 지원
      try {
        const textArea = document.createElement('textarea');
        textArea.value = window.location.href;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('링크가 복사되었습니다!');
      } catch (fallbackErr) {
        console.error('Fallback 복사 실패:', fallbackErr);
        alert('링크 복사에 실패했습니다. 주소창에서 직접 복사해주세요.');
      }
    }
  };
  
  // TanStack Query로 카테고리 조회
  const { data: categoriesData, isLoading: isCategoriesLoading } = useCategories();
  
  // TanStack Query로 제품 조회
  const { data: productsData, isLoading: isProductsLoading } = useActiveProducts();
  

  // URL에서 초기 카테고리 읽기
  const [selectedCategory, setSelectedCategory] = useState(() => {
    const categoryName = searchParams.get("category");
    return categoryName || null;
  });

  const handleAddToCart = (product) => {
    addProduct(product.id); // ID만 저장
    
    // Optimistic update: 즉시 캐시에 제품 데이터 저장
    // 이미 화면에 있는 데이터를 재사용하여 API 호출 없이 즉시 표시
    queryClient.setQueryData(
      PRODUCT_KEYS.detail(product.id),
      product
    );
    
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (productId) => {
    removeProduct(productId);
  };


  // URL 변경 감지 (브라우저 뒤로가기/앞으로가기 등)
  useEffect(() => {
    const categoryName = searchParams.get("category");
    setSelectedCategory(categoryName || null);
  }, [searchParams]);

  const handleCategoryClick = (categoryName) => {
    if (!categoryName) return;
    
    const newCategory = selectedCategory === categoryName ? null : categoryName;
    
    // URL 업데이트
    const params = new URLSearchParams(searchParams.toString());
    if (newCategory) {
      params.set("category", newCategory);
    } else {
      params.delete("category");
    }
    
    // 경로 끝의 슬래시 제거하고 URL 생성
    const cleanPathname = pathname.replace(/\/$/, "");
    const queryString = params.toString();
    const newUrl = queryString ? `${cleanPathname}?${queryString}` : cleanPathname;
    
    // router.replace를 사용하여 히스토리에 추가하지 않고 URL만 변경
    router.replace(newUrl, { scroll: false });
  };

  // API에서 받은 카테고리를 2개씩 행으로 나누기
  const dynamicCategories = categoriesData 
    ? categoriesData.reduce((rows, category, index) => {
        if (index % 2 === 0) {
          rows.push([category]);
        } else {
          rows[rows.length - 1].push(category);
        }
        return rows;
      }, [])
    : [];

  // 제품 데이터 가공 (필요시 형식 변환)
  const treatments = productsData || [];

  // 필터링된 시술 목록
  const filteredTreatments = selectedCategory
    ? treatments.filter((treatment) => {
        // category 객체 또는 categoryName으로 필터링
        const categoryName = treatment.category?.name || treatment.categoryName || '';
        return categoryName.includes(selectedCategory) || categoryName.startsWith(selectedCategory);
      })
    : treatments;

  return (
    <div className="event-detail-page">
      <div className="event-detail-header">
        <button 
          className="event-detail-back"
          onClick={() => router.back()}
          aria-label="뒤로가기"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1 className="event-detail-title">그랜드 오픈 1회 특별 체험가</h1>
        <button 
          className="event-detail-share"
          aria-label="공유하기"
          onClick={handleShare}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 16.08C17.24 16.08 16.56 16.38 16.04 16.85L8.91 12.7C8.96 12.47 9 12.24 9 12C9 11.76 8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.69 17.21 8 18 8C19.66 8 21 6.66 21 5C21 3.34 19.66 2 18 2C16.34 2 15 3.34 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.31 6.79 9 6 9C4.34 9 3 10.34 3 12C3 13.66 4.34 15 6 15C6.79 15 7.5 14.69 8.04 14.19L15.16 18.34C15.11 18.55 15.08 18.77 15.08 19C15.08 20.61 16.39 21.92 18 21.92C19.61 21.92 20.92 20.61 20.92 19C20.92 17.39 19.61 16.08 18 16.08Z" fill="black"/>
          </svg>
        </button>
      </div>

      <div className="event-detail-tabs">
        <button
          className="event-detail-tab active"
        >
          1회 체험가
        </button>
      </div>

      <div className="event-detail-categories">
        <div className="event-detail-categories-list">
          {isCategoriesLoading ? (
            <CategorySkeleton />
          ) : (
            // 실제 카테고리 데이터
            dynamicCategories.map((row, rowIndex) => {
            const categoryIndex0 = rowIndex * 2; // 첫 번째 카테고리 전체 인덱스
            const categoryIndex1 = rowIndex * 2 + 1; // 두 번째 카테고리 전체 인덱스
            
            return (
              <div key={rowIndex} className="event-detail-category-item">
                <div className="event-detail-category-row">
                  <span 
                      className={`event-detail-category-name ${selectedCategory === row[0]?.name ? "active" : ""} ${categoryIndex0 % 2 === 0 ? "even" : "odd"}`}
                      onClick={() => handleCategoryClick(row[0]?.name)}
                  >
                      {row[0]?.name}
                  </span>
                    {row[1] && (
                      <>
                  <div className="event-detail-category-divider"></div>
                  <span 
                          className={`event-detail-category-name ${selectedCategory === row[1]?.name ? "active" : ""} ${categoryIndex1 % 2 === 0 ? "even" : "odd"}`}
                          onClick={() => handleCategoryClick(row[1]?.name)}
                  >
                          {row[1]?.name}
                  </span>
                      </>
                    )}
                </div>
              </div>
            );
            })
          )}
        </div>
      </div>

      <div className="event-detail-treatments">
        <h2 className="event-detail-section-title">시술 목록</h2>
        {isProductsLoading ? (
          <ProductSkeleton count={6} />
        ) : filteredTreatments.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <p>해당 카테고리의 제품이 없습니다.</p>
          </div>
        ) : (
        <div className="event-detail-treatments-list">
            {filteredTreatments.map((treatment) => {
              const categoryName = treatment.category?.name || treatment.categoryName || '';
              const productName = treatment.name || treatment.title || '';
              const productDescription = treatment.description || '';
              const productPrice = treatment.price || treatment.salePrice || '0원';
              
              return (
            <div key={treatment.id} className="event-detail-treatment-card">
              <div className="event-detail-treatment-info">
                    <span className="event-detail-treatment-category">{categoryName}</span>
                    <h3 className="event-detail-treatment-title">{productName}</h3>
                    <p className="event-detail-treatment-description">{productDescription}</p>
              </div>
              <div className="event-detail-treatment-action">
                <div className="event-detail-treatment-price">
                      <span className="event-detail-sale-price">
                        {typeof productPrice === 'number' 
                          ? `${productPrice.toLocaleString()}원` 
                          : productPrice}
                      </span>
                      <span className="event-detail-vat-note">VAT 별도</span>
                </div>
                <button 
                  className="event-detail-add-cart"
                  onClick={() => handleAddToCart(treatment)}
                >
                  시술담기
                </button>
              </div>
            </div>
              );
            })}
        </div>
        )}
      </div>

      <div className="event-detail-footer">
        <div className="event-detail-cart-badge">
          <span>{mounted ? getProductCount() : 0}</span>
        </div>
        <button 
          className="event-detail-reserve-btn"
          onClick={() => setIsCartOpen(true)}
        >
          예약 신청하기
        </button>
      </div>

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartProducts}
        totalPrice={totalPrice}
        onRemoveItem={handleRemoveFromCart}
        isLoading={isCartLoading}
      />
    </div>
  );
}

