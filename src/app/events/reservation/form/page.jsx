"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "./reservation-form.css";

export default function ReservationFormPage() {
  const router = useRouter();
  const [visitType, setVisitType] = useState("first"); // "first" or "return"
  const [selectedDate, setSelectedDate] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [snsAgreed, setSnsAgreed] = useState(false);

  // 날짜 포맷팅 (date-fns 없이)
  const formatDateString = (date) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // 전화번호 포맷팅
  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 11) {
      if (value.length > 7) {
        value = value.slice(0, 3) + "-" + value.slice(3, 7) + "-" + value.slice(7);
      } else if (value.length > 3) {
        value = value.slice(0, 3) + "-" + value.slice(3);
      }
      setPhone(value);
    }
  };

  // 폼 제출
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: 실제 제출 로직 구현
    console.log({
      visitType,
      selectedDate: formatDateString(selectedDate),
      name,
      phone,
      privacyAgreed,
      snsAgreed,
    });
    // 성공 후 처리 (예: 완료 페이지로 이동)
    // router.push('/events/reservation/complete');
  };

  return (
    <div className="reservation-form-page">
      <div className="reservation-form-top-header">
        <button 
          className="reservation-form-back"
          onClick={() => router.back()}
          aria-label="뒤로가기"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      <div className="reservation-form-container">
        <div className="reservation-form-header">
          <h1 className="reservation-form-title">실시간 예약</h1>
          <p className="reservation-form-description">
            예약을 신청하시면, 무료 비만검사 후<br />
            프로그램 상담이 진행됩니다.
          </p>
        </div>

        <form className="reservation-form" onSubmit={handleSubmit}>
          {/* 진료여부 */}
          <div className="reservation-form-section">
            <label className="reservation-form-label">진료여부</label>
            <div className="reservation-form-radio-group">
              <label className="reservation-form-radio">
                <input
                  type="radio"
                  name="visitType"
                  value="first"
                  checked={visitType === "first"}
                  onChange={(e) => setVisitType(e.target.value)}
                />
                <span className="reservation-form-radio-label">초진</span>
              </label>
              <label className="reservation-form-radio">
                <input
                  type="radio"
                  name="visitType"
                  value="return"
                  checked={visitType === "return"}
                  onChange={(e) => setVisitType(e.target.value)}
                />
                <span className="reservation-form-radio-label">재진</span>
              </label>
            </div>
          </div>

          <div className="reservation-form-divider"></div>

          {/* 날짜선택 */}
          <div className="reservation-form-section">
            <label className="reservation-form-label">날짜선택</label>
            <div className="reservation-form-calendar-wrapper">
              <div className="reservation-form-calendar">
                <DayPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  showOutsideDays={false}
                  className="custom-day-picker"
                />
              </div>

              <div className="reservation-form-date-input-wrapper">
                <input
                  type="text"
                  className="reservation-form-date-input"
                  value={formatDateString(selectedDate)}
                  placeholder="2025-02-13"
                  readOnly
                />
              </div>
            </div>
          </div>

          <div className="reservation-form-divider"></div>

          {/* 이름, 연락처 */}
          <div className="reservation-form-section">
            <div className="reservation-form-input-group">
              <label className="reservation-form-input-label">이름*</label>
              <input
                type="text"
                className="reservation-form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="reservation-form-input-group">
              <label className="reservation-form-input-label">연락처*</label>
              <input
                type="tel"
                className="reservation-form-input"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="000-0000-0000"
                required
              />
            </div>
          </div>

          <div className="reservation-form-divider"></div>

          {/* 동의 체크박스 */}
          <div className="reservation-form-section agreement-section">
            <div className="reservation-form-agreement">
              <label className="reservation-form-checkbox">
                <input
                  type="checkbox"
                  checked={privacyAgreed}
                  onChange={(e) => setPrivacyAgreed(e.target.checked)}
                />
                <span className="reservation-form-checkbox-label">개인정보 이용 동의</span>
              </label>
              <button type="button" className="reservation-form-detail-link">
                자세히 보기
              </button>
            </div>
            <div className="reservation-form-agreement">
              <label className="reservation-form-checkbox">
                <input
                  type="checkbox"
                  checked={snsAgreed}
                  onChange={(e) => setSnsAgreed(e.target.checked)}
                />
                <span className="reservation-form-checkbox-label">SNS 수신 및 기록 상담 동의</span>
              </label>
              <button type="button" className="reservation-form-detail-link">
                자세히 보기
              </button>
            </div>
          </div>
        </form>

        {/* 예약 신청하기 버튼 */}
        <div className="reservation-form-footer">
          <button
            type="submit"
            className="reservation-form-submit-btn"
            onClick={handleSubmit}
          >
            예약 신청하기
          </button>
        </div>
      </div>
    </div>
  );
}
