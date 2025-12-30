import { apiClient } from '../client';
import { wrap } from './utils';

const RESERVATIONS = '/api/reservations';
const byId = (id) => `${RESERVATIONS}/${id}`;

// 예약 생성 (회원/비회원)
export const createReservation = wrap('예약 생성 실패', async (data) => {
  return await apiClient.post(RESERVATIONS, data);
});

// 예약 조회
export const getReservationById = wrap('예약 조회 실패', (id) =>
  apiClient.get(byId(id))
);

// 내 예약 목록 (로그인 필요)
export const getMyReservations = wrap('내 예약 목록 조회 실패', () =>
  apiClient.get(`${RESERVATIONS}/my`)
);

// 비회원 예약 조회
export const getGuestReservations = wrap('비회원 예약 조회 실패', (phone, name) =>
  apiClient.get(`${RESERVATIONS}/guest`, {
    params: { phone, name }
  })
);

// 전체 예약 목록 (관리자)
export const getAllReservations = wrap('전체 예약 목록 조회 실패', () =>
  apiClient.get(RESERVATIONS)
);

// 예약 상태 변경 (관리자)
export const updateReservationStatus = wrap('예약 상태 변경 실패', (id, status) =>
  apiClient.put(`${byId(id)}/status`, null, {
    params: { status }
  })
);

// 예약 취소
export const cancelReservation = wrap('예약 취소 실패', (id) =>
  apiClient.delete(byId(id))
);

export const reservationAPI = {
  create: createReservation,
  getById: getReservationById,
  getMy: getMyReservations,
  getGuest: getGuestReservations,
  getAll: getAllReservations,
  updateStatus: updateReservationStatus,
  cancel: cancelReservation,
};

export default reservationAPI;

