/**
 * 한국 공휴일 계산 유틸리티
 * 고정 공휴일과 음력 기반 공휴일(설날, 추석)을 계산
 */

/**
 * 날짜를 YYYY-MM-DD 형식으로 변환
 */
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * 고정 공휴일 목록 (매년 동일)
 */
const getFixedHolidays = (year) => {
  return [
    `${year}-01-01`, // 신정
    `${year}-03-01`, // 삼일절
    `${year}-05-05`, // 어린이날
    `${year}-06-06`, // 현충일
    `${year}-08-15`, // 광복절
    `${year}-10-03`, // 개천절
    `${year}-10-09`, // 한글날
    `${year}-12-25`, // 크리스마스
  ];
};

/**
 * 음력 기반 공휴일 (설날, 추석) - 2025~2030년 데이터
 * 실제 운영 시에는 서버 API 또는 별도 라이브러리 사용 권장
 */
const getLunarHolidays = (year) => {
  const lunarHolidaysData = {
    2025: {
      설날: ['2025-01-28', '2025-01-29', '2025-01-30'],
      추석: ['2025-10-05', '2025-10-06', '2025-10-07'],
    },
    2026: {
      설날: ['2026-02-16', '2026-02-17', '2026-02-18'],
      추석: ['2026-09-24', '2026-09-25', '2026-09-26'],
    },
    2027: {
      설날: ['2027-02-06', '2027-02-07', '2027-02-08'],
      추석: ['2027-09-23', '2027-09-24', '2027-09-25'],
    },
    2028: {
      설날: ['2028-01-26', '2028-01-27', '2028-01-28'],
      추석: ['2028-10-10', '2028-10-11', '2028-10-12'],
    },
    2029: {
      설날: ['2029-02-13', '2029-02-14', '2029-02-15'],
      추석: ['2029-09-30', '2029-10-01', '2029-10-02'],
    },
    2030: {
      설날: ['2030-02-02', '2030-02-03', '2030-02-04'],
      추석: ['2030-09-19', '2030-09-20', '2030-09-21'],
    },
  };

  const yearData = lunarHolidaysData[year];
  if (!yearData) {
    return [];
  }

  return [...yearData.설날, ...yearData.추석];
};

/**
 * 특정 날짜가 공휴일인지 확인
 * @param {Date} date - 확인할 날짜
 * @returns {boolean} 공휴일 여부
 */
export const isKoreanHoliday = (date) => {
  if (!date) return false;

  const year = date.getFullYear();
  const dateStr = formatDate(date);

  // 고정 공휴일 확인
  const fixedHolidays = getFixedHolidays(year);
  if (fixedHolidays.includes(dateStr)) {
    return true;
  }

  // 음력 기반 공휴일 확인
  const lunarHolidays = getLunarHolidays(year);
  if (lunarHolidays.includes(dateStr)) {
    return true;
  }

  return false;
};

/**
 * 특정 연도의 모든 공휴일 목록 반환
 * @param {number} year - 연도
 * @returns {string[]} 공휴일 목록 (YYYY-MM-DD 형식)
 */
export const getKoreanHolidays = (year) => {
  const fixedHolidays = getFixedHolidays(year);
  const lunarHolidays = getLunarHolidays(year);
  return [...fixedHolidays, ...lunarHolidays].sort();
};

/**
 * 특정 날짜가 주말 또는 공휴일인지 확인
 * @param {Date} date - 확인할 날짜
 * @returns {boolean} 주말 또는 공휴일 여부
 */
export const isWeekendOrHoliday = (date) => {
  if (!date) return false;

  const day = date.getDay(); // 0: 일요일, 6: 토요일
  const isWeekend = day === 0 || day === 6;
  const isHoliday = isKoreanHoliday(date);

  return isWeekend || isHoliday;
};

export default {
  isKoreanHoliday,
  getKoreanHolidays,
  isWeekendOrHoliday,
};

