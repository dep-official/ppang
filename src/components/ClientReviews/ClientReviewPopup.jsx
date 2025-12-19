"use client";
import { useEffect } from "react";
import Image from "next/image";
import "./ClientReviewPopup.css";

const doctorHistory = {
  "이규승": {
    current: [
      "팡클리닉 대표원장 (대한 비만 연구 의사회 인증 비만 전문 인증의)"
    ],
    previous: [
      "글로벌쁨의원 수석원장",
      "올라인의원 총괄원장",
      "원진성형외과 총괄원장",
      "포에버의원 총괄원장",
      "귀족성형외과 대표원장",
      "레아트성형외과 원장",
      "유캔비성형외과 원장",
      "설레임의원 대표원장",
      "S라인성형외과 대표원장",
      "톡스유의원 대표원장",
      "샤인스타의원 수석원장",
      "위즈앤미의원 수석원장"
    ],
    overseas: [
      "중국 화메이클리닉 자문의사",
      "중국 메이라이클리닉 자문의사",
      "중국 상해 썬택병원 성형외과 피부과 자문의사",
      "중국 북경 그린병원 성형외과 피부과 자문의사",
      "인도네시아 자타르타 M클리닉 자문의사"
    ]
  },
  "김아름": {
    current: [
      "팡클리닉 대표원장 (대한 비만 연구 의사회 인증 비만 전문 인증의)"
    ],
    previous: [
      "올라인 의원 부원장",
      "쁨 글로벌 강남 총괄원장 및 교육 원장",
      "픽셀랩 (구 클로엔 성형외과) 성형외과 부원장"
    ],
    education: [
      "삼성 서울병원 전공의 수련",
      "삼성 서울병원 인턴 수료",
      "이화여자대학교 의과대학"
    ],
    activities: [
      "대한 비만 연구 의사회 정회원",
      "대한 비만 학회 정회원",
      "대한 임상레이저 학회 정회원",
      "대한 리프팅 연구회 정회원"
    ]
  }
};

export default function ClientReviewPopup({ isOpen, onClose, client }) {
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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !client) return null;

  const history = doctorHistory[client.name] || null;

  return (
    <div className="client-review-popup-overlay" onClick={onClose}>
      <div className="client-review-popup-container" onClick={(e) => e.stopPropagation()}>
        <button 
          className="client-review-popup-close"
          onClick={onClose}
          aria-label="닫기"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="client-review-popup-content">
          <div className="client-review-popup-image">
            <Image
              src={client.image}
              alt={client.name}
              width={600}
              height={800}
              className="popup-image"
            />
          </div>
          <div className="client-review-popup-info">
            <div className="client-review-popup-header">
              <div className="client-review-popup-avatar">
                <Image
                  src={client.avatar}
                  alt={client.name}
                  width={80}
                  height={80}
                  className="popup-avatar"
                />
              </div>
              <div className="client-review-popup-text">
                <h3 className="popup-client-name">{client.name}</h3>
                <p className="popup-client-title">{client.title}</p>
              </div>
            </div>
            
            {history && (
              <div className="client-review-popup-history">
                <div className="history-section">
                  <h4 className="history-section-title">현직</h4>
                  <ul className="history-list">
                    {history.current.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                
                {history.previous && history.previous.length > 0 && (
                  <div className="history-section">
                    <h4 className="history-section-title">경력</h4>
                    <ul className="history-list">
                      {history.previous.map((item, index) => (
                        <li key={index}>전) {item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {history.overseas && history.overseas.length > 0 && (
                  <div className="history-section">
                    <h4 className="history-section-title">해외 자문</h4>
                    <ul className="history-list">
                      {history.overseas.map((item, index) => (
                        <li key={index}>전) {item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {history.education && history.education.length > 0 && (
                  <div className="history-section">
                    <h4 className="history-section-title">학력</h4>
                    <ul className="history-list">
                      {history.education.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {history.activities && history.activities.length > 0 && (
                  <div className="history-section">
                    <h4 className="history-section-title">학회활동 및 기타</h4>
                    <ul className="history-list">
                      {history.activities.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

