"use client";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import "./privacy-modal.css";

export default function PrivacyModal({ isOpen, onClose }) {
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

  if (!isOpen) return null;

  return createPortal(
    <div className="privacy-modal-overlay" onClick={onClose}>
      <div className="privacy-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="privacy-modal-header">
          <h2 className="privacy-modal-title">개인정보 수집 및 이용 동의</h2>
          <button
            className="privacy-modal-close"
            onClick={onClose}
            aria-label="닫기"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="privacy-modal-content">
          <p className="privacy-modal-intro">
            팡클리닉(이하 &quot;본원&quot;)은 귀하의 개인정보를 중요시하며, 『개인정보 보호법』 등 관련 법령을 준수하고 있습니다. 본원은 서비스 이용을 위해 아래와 같이 개인정보를 수집 및 이용하고자 합니다.
          </p>

          <div className="privacy-modal-section">
            <h3>1. 개인정보 수집 및 이용 목적</h3>
            <p>본원은 수집한 개인정보를 다음의 목적을 위해 활용합니다.</p>
            <ul>
              <li><strong>진료 및 병원 서비스:</strong> 진단, 시술, 청구, 수납, 환불, 증명서 발급 등 법적/행정적 처리</li>
              <li><strong>고객 관리:</strong> 진료 일정 안내(예약/방문), 예약 조회, 고지사항 전달, 민원 처리</li>
              <li><strong>마케팅 및 광고 (동의 시):</strong> 팡클리닉의 시술 정보안내, 이벤트 및 혜택 제공, 맞춤형 큐레이션 서비스(문자, 전화, 카카오톡 등)</li>
            </ul>
          </div>

          <div className="privacy-modal-section">
            <h3>2. 수집하는 개인정보의 항목</h3>
            <p>서비스 제공을 위해 필요한 최소한의 정보를 수집합니다.</p>
            <ul>
              <li><strong>[필수 항목]:</strong> 성명, 연락처(휴대전화번호), 관심 시술 부위, 방문 희망일</li>
              <li><strong>[선택 항목]:</strong> 성별, 연령대, 이메일, 상담 내용 및 기타 요청사항</li>
              <li><strong>[진료 시 추가 수집]:</strong> (의료법에 따름) 주민등록번호 등 고유식별정보, 주소, 병력 및 투약 정보 등 건강 관련 정보</li>
            </ul>
          </div>

          <div className="privacy-modal-section">
            <h3>3. 개인정보의 보유 및 이용 기간</h3>
            <p>본원은 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 관련 법령의 규정에 의하여 보존할 필요가 있는 경우 아래와 같이 관계 법령에서 정한 일정한 기간 동안 정보를 보관합니다.</p>
            <ul>
              <li><strong>진료 기록:</strong> 10년 (의료법)</li>
              <li><strong>소비자 불만 또는 분쟁 처리에 관한 기록:</strong> 3년 (전자상거래 등에서의 소비자 보호에 관한 법률)</li>
              <li><strong>신용 정보의 수집/처리 및 이용 등에 관한 기록:</strong> 3년 (신용정보의 이용 및 보호에 관한 법률)</li>
              <li><strong>웹사이트 방문 기록:</strong> 3개월 (통신비밀보호법)</li>
              <li><strong>기타 마케팅 정보:</strong> 회원 탈퇴 시 혹은 동의 철회 시 즉시 파기</li>
            </ul>
          </div>

          <div className="privacy-modal-section">
            <h3>4. 동의 거부 권리 및 불이익</h3>
            <p>귀하는 개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있습니다. 단, 필수 항목에 대한 동의를 거부할 경우 진료 예약, 상담 및 이벤트 참여 등 서비스 이용에 제한이 있을 수 있습니다.</p>
          </div>
        </div>

        <div className="privacy-modal-footer">
          <button className="privacy-modal-confirm-btn" onClick={onClose}>
            확인
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
