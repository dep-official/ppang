/**
 * 인증 관련 커스텀 훅
 * 로그인 상태, 사용자 정보, 로그아웃 등을 관리
 */
'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/api/services/auth';
import { authStorage } from '@/lib/auth';

/**
 * @param {boolean} requireAuth - true일 경우 미인증 시 로그인 페이지로 리다이렉트
 * @returns {Object} { user, loading, isAuthenticated, logout, refetch }
 */
export function useAuth(requireAuth = false) {
  const router = useRouter();
  const [user, setUser] = useState(() => {
    // 초기값으로 localStorage의 사용자 정보 사용
    return authStorage.getUser();
  });
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    // 토큰이 없으면 바로 리턴
    if (!authStorage.isAuthenticated()) {
      setUser(null);
      setLoading(false);
      if (requireAuth) {
        router.push('/login');
      }
      return;
    }

    try {
      const userData = await authAPI.getCurrentUser();
      setUser(userData);
      authStorage.setUser(userData); // localStorage에도 저장
    } catch (error) {
      console.error('인증 확인 실패:', error);
      authStorage.clearAll();
      setUser(null);
      if (requireAuth) {
        router.push('/login');
      }
    } finally {
      setLoading(false);
    }
  }, [requireAuth, router]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleLogout = useCallback(async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('로그아웃 처리 중 오류:', error);
    } finally {
      setUser(null);
      router.push('/login');
    }
  }, [router]);

  return {
    user,
    loading,
    isAuthenticated: !!user,
    logout: handleLogout,
    refetch: fetchUser,
  };
}

export default useAuth;

