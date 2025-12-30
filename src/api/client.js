import axios from 'axios';
import { authStorage } from '@/lib/auth';

// API 기본 URL (환경 변수에서 가져오거나 기본값 사용)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:10032';

// Axios 인스턴스 생성
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 쿠키/세션 사용 시 필요
});

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config) => {
    // 토큰이 있으면 헤더에 추가
    const token = authStorage.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response.data; // data만 반환
  },
  (error) => {
    if (error.response) {
      // 서버가 응답을 반환했지만 에러 상태 코드
      console.error('API Error Response:', {
        status: error.response.status,
        data: error.response.data,
        url: error.config?.url,
      });

      // 에러 메시지 처리
      const errorMessage = error.response.data?.message || '서버 오류가 발생했습니다.';
      
      // 특정 상태 코드에 따른 처리
      switch (error.response.status) {
        case 401:
          console.error('인증 오류: 로그인이 필요합니다.');
          // 토큰 제거 및 로그인 페이지로 리다이렉트
          authStorage.clearAll();
          if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
            window.location.href = '/login';
          }
          break;
        case 403:
          console.error('권한 오류: 접근 권한이 없습니다.');
          break;
        case 404:
          console.error('Not Found: 요청한 리소스를 찾을 수 없습니다.');
          break;
        case 500:
          console.error('서버 오류: 잠시 후 다시 시도해주세요.');
          break;
        default:
          console.error('Error:', errorMessage);
      }

      return Promise.reject({
        status: error.response.status,
        message: errorMessage,
        data: error.response.data,
      });
    } else if (error.request) {
      // 요청이 전송되었지만 응답이 없음
      console.error('Network Error: 서버에 연결할 수 없습니다.', error.request);
      return Promise.reject({
        status: 0,
        message: '네트워크 오류가 발생했습니다.',
      });
    } else {
      // 요청 설정 중 오류 발생
      console.error('Request Setup Error:', error.message);
      return Promise.reject({
        message: error.message,
      });
    }
  }
);

export default apiClient;

