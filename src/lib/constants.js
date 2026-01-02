/**
 * API URL 상수 정의
 */

// 환경별 API 기본 URL
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

// API 엔드포인트
export const API_ENDPOINTS = {
  // 카테고리
  CATEGORIES: '/categories',
  CATEGORY_BY_ID: (id) => `/categories/${id}`,
  
  // 예약 (예시 - 필요시 추가)
  RESERVATIONS: '/reservations',
  RESERVATION_BY_ID: (id) => `/reservations/${id}`,
  
  // 이벤트 (예시 - 필요시 추가)
  EVENTS: '/events',
  EVENT_BY_ID: (id) => `/events/${id}`,
  
  // 문의 (예시 - 필요시 추가)
  CONTACT: '/contact',
};

// HTTP 상태 코드
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

// 에러 메시지
export const ERROR_MESSAGES = {
  NETWORK_ERROR: '네트워크 오류가 발생했습니다.',
  SERVER_ERROR: '서버 오류가 발생했습니다.',
  NOT_FOUND: '요청한 리소스를 찾을 수 없습니다.',
  UNAUTHORIZED: '인증이 필요합니다.',
  FORBIDDEN: '접근 권한이 없습니다.',
  VALIDATION_ERROR: '입력값이 올바르지 않습니다.',
};

export default {
  API_BASE_URL,
  API_ENDPOINTS,
  HTTP_STATUS,
  ERROR_MESSAGES,
};

