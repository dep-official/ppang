/**
 * API 호출을 래핑하여 에러 처리를 일관되게 관리하는 유틸리티 함수
 * @param {string} errorMessage - 에러 발생 시 표시할 메시지
 * @param {Function} apiCall - 실행할 API 호출 함수
 * @returns {Function} 래핑된 함수
 */
export const wrap = (errorMessage, apiCall) => {
  return async (...args) => {
    try {
      return await apiCall(...args);
    } catch (error) {
      console.error(`${errorMessage}:`, error);
      throw error;
    }
  };
};

/**
 * 성공 메시지도 함께 처리하는 래퍼 (선택적 사용)
 * @param {string} errorMessage - 에러 메시지
 * @param {string} successMessage - 성공 메시지
 * @param {Function} apiCall - 실행할 API 호출 함수
 * @returns {Function} 래핑된 함수
 */
export const wrapWithSuccess = (errorMessage, successMessage, apiCall) => {
  return async (...args) => {
    try {
      const result = await apiCall(...args);
      console.log(`${successMessage}`);
      return result;
    } catch (error) {
      console.error(`${errorMessage}:`, error);
      throw error;
    }
  };
};

export default wrap;

