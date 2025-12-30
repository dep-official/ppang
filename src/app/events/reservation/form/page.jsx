"use client";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Calendar } from "@/components/ui/calendar";
import { ko } from "date-fns/locale";
import { useCartStore } from "@/store/useCartStore";
import { useCartProducts, useCartTotalPrice } from "@/hooks/useCartProducts";
import { useAuth } from "@/hooks/useAuth";
import { reservationAPI } from "@/api/services/reservation";
import { isWeekendOrHoliday as checkWeekendOrHoliday } from "@/utils/koreanHolidays";
import "./reservation-form.css";

export default function ReservationFormPage() {
  const router = useRouter();
  const [visitType, setVisitType] = useState("first"); // "first" or "return"
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("10:00"); // 기본 시간
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [snsAgreed, setSnsAgreed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // 로그인 사용자 정보
  const { user, isAuthenticated } = useAuth();
  
  // Zustand store에서 제품 ID만 가져오기
  const { productIds, getProductCount } = useCartStore();
  
  // 서버에서 실제 제품 데이터 조회
  const { data: cartProducts = [] } = useCartProducts();
  
  // 서버 데이터 기반 총 금액
  const { totalPrice, isLoading: isPriceLoading } = useCartTotalPrice();
  
  // Hydration 에러 방지: 클라이언트 마운트 체크
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // 로그인한 사용자 정보 자동 입력
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.name) {
        setName(user.name);
      }
      if (user.phone) {
        // 전화번호 포맷팅 적용
        const formattedPhone = formatPhoneNumber(user.phone);
        setPhone(formattedPhone);
      }
    }
  }, [isAuthenticated, user]);

  // 날짜 포맷팅
  const formatDateString = (date) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  
  // 날짜 + 시간 포맷팅
  const formatDateTimeString = (date, time) => {
    if (!date) return "";
    return `${formatDateString(date)} ${time}`;
  };

  // 요일/공휴일별 예약 가능 시간
  // 월~금: 10:00 ~ 20:00 (30분 단위)
  // 토/일/공휴일: 10:00 ~ 17:00 (30분 단위)

  const weekdayTimes = [
    "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30",
    "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30",
    "18:00", "18:30", "19:00", "19:30", "20:00"
  ];

  const weekendTimes = [
    "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30",
    "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00"
  ];

  // 오늘 날짜
  const today = new Date();

  const availableTimes = useMemo(() => {
    const targetDate = selectedDate || today;
    const isWeekendOrHolidayDate = checkWeekendOrHoliday(targetDate);
    const times = isWeekendOrHolidayDate ? weekendTimes : weekdayTimes;
    
    // 디버깅 로그
    if (targetDate) {
      const day = targetDate.getDay();
      console.log('📅 날짜 체크:', {
        date: formatDateString(targetDate),
        day: day,
        dayName: ['일', '월', '화', '수', '목', '금', '토'][day],
        isWeekendOrHoliday: isWeekendOrHolidayDate,
        times: times,
        count: times.length
      });
    }
    
    return times;
  }, [selectedDate]);
  
  // 전화번호 포맷팅 (공통 함수)
  const formatPhoneNumber = (phoneNumber) => {
    const cleaned = phoneNumber.replace(/[^0-9]/g, "");
    if (cleaned.length <= 11) {
      if (cleaned.length > 7) {
        return cleaned.slice(0, 3) + "-" + cleaned.slice(3, 7) + "-" + cleaned.slice(7);
      } else if (cleaned.length > 3) {
        return cleaned.slice(0, 3) + "-" + cleaned.slice(3);
      }
    }
    return cleaned;
  };

  // 전화번호 입력 핸들러
  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
  };

  // 폼 제출
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 유효성 검사
    if (!selectedDate) {
      alert('날짜를 선택해주세요.');
      return;
    }
    if (!name.trim()) {
      alert('이름을 입력해주세요.');
      return;
    }
    if (!phone.trim()) {
      alert('연락처를 입력해주세요.');
      return;
    }
    if (!privacyAgreed) {
      alert('개인정보 이용 동의가 필요합니다.');
      return;
    }
    if (productIds.length === 0) {
      alert('예약할 제품을 선택해주세요.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // 예약 데이터 구성 (백엔드 DTO 형식에 맞춤)
      const reservationData = {
        name,
        phone,
        email: user?.email || null, // 로그인한 경우 이메일 포함 (선택사항)
        selectedDate: formatDateString(selectedDate),
        selectedTime: selectedTime,
        visitType: visitType.toUpperCase(), // "first" → "FIRST", "return" → "RETURN"
        productIds: productIds, // 제품 ID 배열
      };
      
      console.log('📋 예약 신청 데이터:', reservationData);
      console.log('🔐 로그인 상태:', isAuthenticated ? '로그인됨' : '비로그인');
      console.log('👤 사용자 정보:', user);
      
      // API 호출
      const response = await reservationAPI.create(reservationData);
      
      console.log('✅ 예약 생성 응답:', response);
      
      // 성공 알림
      alert(`예약이 완료되었습니다!\n예약 번호: ${response.id || '확인 중'}`);
      
      // 장바구니 비우기
      const { clearCart } = useCartStore.getState();
      clearCart();
      
      // 홈으로 이동 (또는 예약 완료 페이지로)
      router.push('/');
      
    } catch (error) {
      
      // 에러 메시지 표시
      let errorMessage = '예약에 실패했습니다. 다시 시도해주세요.';
      
      if (error.status === 403) {
        errorMessage = '접근 권한이 없습니다.\n백엔드 Spring Security 설정을 확인해주세요.\n(/api/reservations POST를 permitAll()로 설정)';
      } else if (error.status === 401) {
        errorMessage = '인증이 필요합니다. 다시 로그인해주세요.';
      } else if (error.status === 400) {
        errorMessage = `입력 정보를 확인해주세요.\n${error.data?.message || error.message || ''}`;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      alert(errorMessage);
      
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="reservation-form-page">
      <div className="reservation-form-header">
        <button 
          className="reservation-form-back"
          onClick={() => router.back()}
          aria-label="뒤로가기"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1 className="reservation-form-title">실시간 예약</h1>
        <div className="reservation-form-header-spacer"></div>
      </div>
      <div className="reservation-form-container">
        <form className="reservation-form" onSubmit={handleSubmit}>
          {/* 제목 및 설명 */}
          <div className="reservation-form-intro">
            <h2 className="reservation-form-intro-title">
              Research Your Beauty, PPANG CLINIC.
            </h2>
            <p className="reservation-form-intro-description">
              고민은 저희가 하겠습니다. 편하게 시간을 선택해주세요
            </p>
          </div>

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

          {/* 날짜 및 시간 선택 */}
          <div className="reservation-form-section">
            <label className="reservation-form-label">날짜 및 시간 선택</label>
            <div className="reservation-form-calendar-wrapper">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => {
                  // 과거 날짜 비활성화
                  if (date < today) return true;
                  // 공휴일은 선택 가능하지만 주말 시간대로 처리됨
                  return false;
                }}
                locale={ko}
                className="shadcn-calendar"
                formatters={{
                  formatWeekdayName: (date) => {
                    const days = ['일', '월', '화', '수', '목', '금', '토'];
                    return days[date.getDay()];
                  }
                }}
              />
              
              <div className="reservation-form-datetime-wrapper">
                
                {/* 시간 선택 */}
                <div className="reservation-form-time-section">
                  <label className="reservation-form-time-label">예약 시간</label>
                  <div className="reservation-form-time-grid">
                    {availableTimes.map((time) => (
                      <button
                        key={time}
                        type="button"
                        className={`reservation-form-time-btn ${selectedTime === time ? 'active' : ''}`}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="reservation-form-date-input-wrapper">
                  <input
                    type="text"
                    className="reservation-form-date-input"
                    value={formatDateTimeString(selectedDate, selectedTime)}
                    placeholder="2025-02-13 10:00"
                    readOnly
                  />
                </div>
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
                placeholder={mounted && isAuthenticated ? "" : "이름을 입력해주세요"}
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

      </div>

      {/* 예약 신청하기 버튼 */}
      <div className="reservation-form-footer">
        <div className="reservation-form-total">
          <span className="reservation-form-total-price">
            {isPriceLoading ? '계산 중...' : `${totalPrice.toLocaleString()}원`}
          </span>
        </div>
        <button
          type="submit"
          className="reservation-form-submit-btn"
          onClick={handleSubmit}
          disabled={!mounted || getProductCount() === 0 || isPriceLoading || isSubmitting}
        >
          <div className="reservation-form-badge">
            <span>{mounted ? getProductCount() : 0}</span>
          </div>
          <span>{isSubmitting ? '예약 중...' : '예약 신청하기'}</span>
        </button>
      </div>
    </div>
  );
}
