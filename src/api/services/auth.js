import { apiClient } from '../client';
import { wrap } from './utils';
import { authStorage } from '@/lib/auth';

const AUTH = '/auth';
const byPath = (path) => `${AUTH}/${path}`;

export const signup = wrap('회원가입 실패', (data) =>
  apiClient.post(byPath('signup'), data)
);

// 로그인 - 토큰 저장 및 사용자 정보 가져오기
export const login = async (data) => {
  try {
    const response = await apiClient.post(byPath('login'), data);
    
    // 토큰 저장
    if (response.accessToken) {
      authStorage.setToken(response.accessToken);
    }
    if (response.refreshToken) {
      authStorage.setRefreshToken(response.refreshToken);
    }
    
    // 사용자 정보 저장 (응답에 포함된 경우)
    if (response.user) {
      authStorage.setUser(response.user);
    } else {
      // 사용자 정보가 없으면 별도로 가져오기
      try {
        const userData = await apiClient.get(byPath('me'));
        authStorage.setUser(userData);
      } catch (err) {
        console.error('사용자 정보 조회 실패:', err);
        // 사용자 정보 조회 실패해도 로그인은 성공으로 처리
      }
    }
    
    return response;
  } catch (error) {
    console.error('로그인 실패:', error);
    throw error;
  }
};

// 로그아웃 - 토큰 제거 포함
export const logout = async () => {
  try {
    await apiClient.post(byPath('logout'));
  } catch (error) {
    console.error('로그아웃 실패:', error);
  } finally {
    // 로컬 토큰 제거 (서버 요청 실패해도 제거)
    authStorage.clearAll();
  }
};

export const refreshToken = wrap('토큰 갱신 실패', (data) =>
  apiClient.post(byPath('refresh'), data)
);

export const getCurrentUser = wrap('사용자 정보 조회 실패', () =>
  apiClient.get(byPath('me'))
);

export const changePassword = wrap('비밀번호 변경 실패', (data) =>
  apiClient.put(byPath('change-password'), data)
);

export const authAPI = {
  signup,
  login,
  logout,
  refreshToken,
  getCurrentUser,
  changePassword,
};

export default authAPI;

