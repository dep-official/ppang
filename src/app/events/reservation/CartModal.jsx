"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import "./cart-modal.css";

export default function CartModal({ isOpen, onClose, cartItems, totalPrice, onRemoveItem }) {
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleReservation = () => {
    onClose();
    router.push("/events/reservation/form");
  };

  if (!isOpen) return null;

  return (
    <div className="cart-modal-overlay" onClick={onClose}>
      <div className="cart-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="cart-modal-header">
          <h2 className="cart-modal-title">11월 연말 할인 이벤트</h2>
          <button 
            className="cart-modal-close"
            onClick={onClose}
            aria-label="닫기"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="cart-modal-content">
          <div className="cart-modal-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-modal-item">
                <div className="cart-modal-item-info">
                  <p className="cart-modal-item-title">{item.title}</p>
                </div>
                <button 
                  className="cart-modal-item-remove"
                  onClick={() => onRemoveItem(item.id)}
                  aria-label="삭제"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="#CCCCCC" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <div className="cart-modal-divider"></div>

          <div className="cart-modal-total">
            <span className="cart-modal-total-label">내가 담은 상품(VAT 별도)</span>
            <span className="cart-modal-total-price">{totalPrice.toLocaleString()}원</span>
          </div>
        </div>

        <div className="cart-modal-footer">
          <div className="cart-modal-cart-badge">
            <span>{cartItems.length}</span>
          </div>
          <button className="cart-modal-reserve-btn" onClick={handleReservation}>
            예약 신청하기
          </button>
        </div>
      </div>
    </div>
  );
}

