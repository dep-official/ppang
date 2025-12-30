"use client";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import { useAuth } from "@/hooks/useAuth";
import { reservationAPI } from "@/api/services/reservation";
import { useReservationProducts } from "@/hooks/useReservationProducts";
import "./mypage.css";

export default function MyPage() {
  const router = useRouter();
  const { isAuthenticated, user, loading: authLoading } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedReservation, setExpandedReservation] = useState(null);
  
  // 모든 예약의 제품 ID를 수집
  const allProductIds = useMemo(() => {
    const ids = new Set();
    reservations.forEach(reservation => {
      if (reservation.products) {
        reservation.products.forEach(item => {
          if (item.productId) {
            ids.add(item.productId);
          }
        });
      }
    });
    return Array.from(ids);
  }, [reservations]);
  
  // 모든 제품 정보를 한 번에 조회 (캐싱됨)
  const { productsMap, isLoading: isProductsLoading } = useReservationProducts(allProductIds);

  useEffect(() => {
    // 로그인 체크가 완료되고 로그인되지 않은 경우 로그인 페이지로 이동
    if (!authLoading && !isAuthenticated) {
      alert("로그인이 필요합니다.");
      router.push("/login");
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchReservations();
    }
  }, [isAuthenticated]);

  const fetchReservations = async () => {
    try {
      setIsLoading(true);
      console.log('📋 내 예약 목록 조회 시작...');
      console.log('👤 현재 사용자:', user);
      
      const response = await reservationAPI.getMy();
      
      console.log('✅ 예약 목록 응답:', response);
      console.log('📊 예약 개수:', response?.data?.length || response?.length || 0);
      
      setReservations(response.data || response || []);
      setError("");
    } catch (err) {
      console.error("❌ 예약 목록 조회 실패:", err);
      setError("예약 목록을 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 드롭다운 토글
  const toggleProducts = (reservationId) => {
    if (expandedReservation === reservationId) {
      setExpandedReservation(null);
    } else {
      setExpandedReservation(reservationId);
    }
  };

  const handleCancelReservation = async (reservationId) => {
    if (!confirm("예약을 취소하시겠습니까?")) {
      return;
    }

    try {
      await reservationAPI.cancel(reservationId);
      alert("예약이 취소되었습니다.");
      fetchReservations(); // 목록 새로고침
    } catch (err) {
      console.error("예약 취소 실패:", err);
      alert(err.message || "예약 취소에 실패했습니다.");
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      PENDING: { text: "대기중", className: "status-pending" },
      CONFIRMED: { text: "확정", className: "status-confirmed" },
      CANCELLED: { text: "취소", className: "status-cancelled" },
      COMPLETED: { text: "완료", className: "status-completed" }
    };

    const config = statusConfig[status] || statusConfig.PENDING;
    return <span className={`status-badge ${config.className}`}>{config.text}</span>;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "short"
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return "";
    return timeString.substring(0, 5); // HH:MM 형식으로 변환
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  if (authLoading || (isAuthenticated && isLoading)) {
    return (
      <>
        <Nav />
        <div className="mypage-loading">
          <div className="loading-spinner"></div>
          <p>로딩중...</p>
        </div>
      </>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Nav />
      <div className="mypage-container">
        <div className="mypage-content">
          {/* 헤더 */}
          <div className="mypage-header">
            <h1 className="mypage-title">마이페이지</h1>
            <div className="user-info">
              <p className="user-greeting">
                <strong>{user?.name}</strong>님 환영합니다
              </p>
              <p className="user-email">{user?.email}</p>
            </div>
          </div>

          {/* 예약 목록 */}
          <div className="reservations-section">
            <h2 className="section-title">예약 현황</h2>

            {error && (
              <div className="error-message">
                <p>{error}</p>
                <button onClick={fetchReservations}>다시 시도</button>
              </div>
            )}

            {!error && reservations.length === 0 && (
              <div className="empty-state">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M32 8C18.745 8 8 18.745 8 32C8 45.255 18.745 56 32 56C45.255 56 56 45.255 56 32C56 18.745 45.255 8 32 8Z" stroke="#D0D0D0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M24 24H24.02" stroke="#D0D0D0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M40 24H40.02" stroke="#D0D0D0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M24 40C24 40 27 36 32 36C37 36 40 40 40 40" stroke="#D0D0D0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p>예약 내역이 없습니다.</p>
                <button 
                  className="btn-primary"
                  onClick={() => router.push("/events/reservation")}
                >
                  예약하러 가기
                </button>
              </div>
            )}

            {!error && reservations.length > 0 && (
              <div className="reservations-list">
                {reservations.map((reservation) => (
                  <div key={reservation.id} className="reservation-card">
                    <div className="reservation-card-header">
                      <div className="reservation-date">
                        {/* <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15.8333 3.33334H4.16667C3.24619 3.33334 2.5 4.07954 2.5 5.00001V16.6667C2.5 17.5871 3.24619 18.3333 4.16667 18.3333H15.8333C16.7538 18.3333 17.5 17.5871 17.5 16.6667V5.00001C17.5 4.07954 16.7538 3.33334 15.8333 3.33334Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M13.3333 1.66666V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M6.66667 1.66666V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M2.5 8.33334H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg> */}
                        <span>
                          예약번호 : #{reservation.id}
                        </span>
                      </div>
                      {getStatusBadge(reservation.status)}
                    </div>

                    <div className="reservation-card-body">
                      <div className="reservation-info-row">
                        <span className="label">예약일</span>
                        <span className="value">{formatDate(reservation.selectedDate)}</span>
                      </div>
                      <div className="reservation-info-row">
                        <span className="label">방문시간</span>
                        <span className="value">{formatTime(reservation.selectedTime)}</span>
                      </div>
                      
                      {/* 예약 시술 드롭다운 */}
                      <div className="reservation-info-row products-dropdown">
                        <button
                          className="products-dropdown-trigger"
                          onClick={() => toggleProducts(reservation.id)}
                          type="button"
                        >
                          <span className="label">
                            예약시술 
                            <span className="products-count">
                              ({reservation.products?.length || 0}개)
                            </span>
                          </span>
                          <svg 
                            className={`dropdown-icon ${expandedReservation === reservation.id ? 'expanded' : ''}`}
                            width="20" 
                            height="20" 
                            viewBox="0 0 20 20" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path 
                              d="M5 7.5L10 12.5L15 7.5" 
                              stroke="currentColor" 
                              strokeWidth="1.5" 
                              strokeLinecap="round" 
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                        
                        {expandedReservation === reservation.id && (
                          <div className="products-list">
                            {reservation.products && reservation.products.length > 0 ? (
                              reservation.products.map((item) => {
                                const product = productsMap[item.productId];
                                
                                // 디버깅 로그
                                console.log('🔍 Product Item:', {
                                  itemId: item.id,
                                  productId: item.productId,
                                  product: product,
                                  productsMap: productsMap,
                                  allProductIds: allProductIds
                                });
                                
                                return (
                                  <div key={item.id} className="product-item">
                                    {product ? (
                                      <>
                                        <div className="product-item-info">
                                          {product.category?.name && (
                                            <span className="product-category">
                                              {product.category.name}
                                            </span>
                                          )}
                                          <span className="product-name">
                                            {product.title || product.name || '제품명 없음'}
                                            {item.quantity > 1 && (
                                              <span className="product-quantity"> x{item.quantity}</span>
                                            )}
                                          </span>
                                        </div>
                                        <span className="product-price">
                                          {formatPrice(item.priceSnapshot || item.currentPrice || 0)}원
                                        </span>
                                      </>
                                    ) : isProductsLoading ? (
                                      <div className="product-loading">
                                        <div className="loading-spinner-small"></div>
                                        <span>제품 정보 불러오는 중...</span>
                                      </div>
                                    ) : (
                                      <>
                                        <div className="product-item-info">
                                          <span className="product-name">
                                            제품 ID: {item.productId}
                                          </span>
                                        </div>
                                        <span className="product-price">
                                          {formatPrice(item.priceSnapshot || item.currentPrice || 0)}원
                                        </span>
                                      </>
                                    )}
                                  </div>
                                );
                              })
                            ) : (
                              <div className="no-products">시술 정보 없음</div>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="reservation-info-row total">
                        <span className="label">총 금액</span>
                        <span className="value price">
                          {formatPrice(reservation.totalPrice)}원
                        </span>
                      </div>
                    </div>

                    {reservation.status === "PENDING" && (
                      <div className="reservation-card-footer">
                        <button
                          className="btn-cancel"
                          onClick={() => handleCancelReservation(reservation.id)}
                        >
                          예약 취소
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <ConditionalFooter />
    </>
  );
}


