"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import CartModal from "./CartModal";
import "./event-detail.css";

export default function EventDetailContent() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("first-visit");
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const firstVisitTreatments = [
    {
      id: 1,
      category: "1회 체험가",
      title: "[1회체험가] 올쎄라피 프라임 100샷",
      description: "기존 리프팅 장비와 달리 같은 SMA 5층까지 초음파를 전달해 주름 및 탄력 개선",
      discount: "50%",
      originalPrice: "90,000",
      salePrice: "900,000원",
    },
    {
      id: 2,
      category: "1회 체험가",
      title: "[1회체험가] 올쎄라피 프라임 100샷",
      description: "기존 리프팅 장비와 달리 같은 SMA 5층까지 초음파를 전달해 주름 및 탄력 개선",
      discount: "50%",
      originalPrice: "90,000",
      salePrice: "900,000원",
    },
    {
      id: 3,
      category: "1회 체험가",
      title: "[1회체험가] 올쎄라피 프라임 100샷",
      description: "기존 리프팅 장비와 달리 같은 SMA 5층까지 초음파를 전달해 주름 및 탄력 개선",
      discount: "50%",
      originalPrice: "90,000",
      salePrice: "900,000원",
    },
  ];

  const regularTreatments = [
    {
      id: 4,
      category: "정기 예약",
      title: "[정기예약] 올쎄라피 프라임 100샷",
      description: "정기 예약 시 추가 할인 혜택을 받을 수 있는 리프팅 시술",
      discount: "30%",
      originalPrice: "1,200,000",
      salePrice: "840,000원",
    },
    {
      id: 5,
      category: "정기 예약",
      title: "[정기예약] 보톡스 풀페이스",
      description: "정기 예약 고객을 위한 보톡스 풀페이스 패키지",
      discount: "25%",
      originalPrice: "800,000",
      salePrice: "600,000원",
    },
    {
      id: 6,
      category: "정기 예약",
      title: "[정기예약] 리프팅 + 보톡스 세트",
      description: "리프팅과 보톡스를 함께 받을 수 있는 정기 예약 패키지",
      discount: "35%",
      originalPrice: "1,500,000",
      salePrice: "975,000원",
    },
  ];

  const treatments = activeTab === "first-visit" ? firstVisitTreatments : regularTreatments;

  const handleAddToCart = (treatment) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === treatment.id);
      if (exists) {
        return prev;
      }
      return [...prev, treatment];
    });
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      // "900,000원" 형식에서 숫자만 추출
      const priceStr = item.salePrice.replace(/[^0-9]/g, "");
      const price = parseInt(priceStr) || 0;
      return total + price;
    }, 0);
  };

  const categories = [
    [{ id: "PP-1·PP-3", name: "PP-1·PP-3" }, { id: "PP-5", name: "PP-5" }],
    [{ id: "PP-7", name: "PP-7" }, { id: "PM-1", name: "PM-1" }],
    [{ id: "PM-3", name: "PM-3" }, { id: "PM-5", name: "PM-5" }],
    [{ id: "쁘띠", name: "쁘띠" }, { id: "레이저", name: "레이저" }],
    [{ id: "PA센터", name: "PA센터" }, { id: "줄기세포", name: "줄기세포" }],
  ];

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
        <h1 className="event-detail-title">11월 연말 할인 이벤트</h1>
        <button 
          className="event-detail-share"
          aria-label="공유하기"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 16.08C17.24 16.08 16.56 16.38 16.04 16.85L8.91 12.7C8.96 12.47 9 12.24 9 12C9 11.76 8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.69 17.21 8 18 8C19.66 8 21 6.66 21 5C21 3.34 19.66 2 18 2C16.34 2 15 3.34 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.31 6.79 9 6 9C4.34 9 3 10.34 3 12C3 13.66 4.34 15 6 15C6.79 15 7.5 14.69 8.04 14.19L15.16 18.34C15.11 18.55 15.08 18.77 15.08 19C15.08 20.61 16.39 21.92 18 21.92C19.61 21.92 20.92 20.61 20.92 19C20.92 17.39 19.61 16.08 18 16.08Z" fill="black"/>
          </svg>
        </button>
      </div>

      <div className="event-detail-tabs">
        <button
          className={`event-detail-tab ${activeTab === "first-visit" ? "active" : ""}`}
          onClick={() => setActiveTab("first-visit")}
        >
          1회 체험가
        </button>
        <button
          className={`event-detail-tab ${activeTab === "regular" ? "active" : ""}`}
          onClick={() => setActiveTab("regular")}
        >
          정기 예약
        </button>
      </div>

      <div className="event-detail-categories">
        <div className="event-detail-categories-list">
          {categories.map((row, rowIndex) => (
            <div key={rowIndex} className="event-detail-category-item">
              <div className="event-detail-category-row">
                <span className="event-detail-category-name">{row[0].name}</span>
                <div className="event-detail-category-divider"></div>
                <span className="event-detail-category-name">{row[1].name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="event-detail-treatments">
        <h2 className="event-detail-section-title">시술 목록</h2>
        <div className="event-detail-treatments-list">
          {treatments.map((treatment) => (
            <div key={treatment.id} className="event-detail-treatment-card">
              <div className="event-detail-treatment-info">
                <span className="event-detail-treatment-category">{treatment.category}</span>
                <h3 className="event-detail-treatment-title">{treatment.title}</h3>
                <p className="event-detail-treatment-description">{treatment.description}</p>
              </div>
              <div className="event-detail-treatment-action">
                <div className="event-detail-treatment-price">
                  <span className="event-detail-discount">{treatment.discount}</span>
                  <span className="event-detail-sale-price">{treatment.salePrice}</span>
                  <span className="event-detail-original-price">{treatment.originalPrice}</span>
                </div>
                <button 
                  className="event-detail-add-cart"
                  onClick={() => handleAddToCart(treatment)}
                >
                  시술담기
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="event-detail-footer">
        <div className="event-detail-cart-badge">
          <span>{cartItems.length}</span>
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
        cartItems={cartItems}
        totalPrice={calculateTotalPrice()}
        onRemoveItem={handleRemoveFromCart}
      />
    </div>
  );
}

