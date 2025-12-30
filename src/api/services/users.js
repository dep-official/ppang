import { apiClient } from '../client';
import { wrap } from './utils';

const USERS = '/api/users';
const byId = (id) => `${USERS}/${id}`;

export const getAllUsers = wrap('사용자 목록 조회 실패', (params) =>
  apiClient.get(USERS, { params })
);

export const getUserById = wrap('사용자 조회 실패', (id) =>
  apiClient.get(byId(id))
);

export const updateUser = wrap('사용자 수정 실패', (id, data) =>
  apiClient.put(byId(id), data)
);

export const deleteUser = wrap('사용자 삭제 실패', (id) =>
  apiClient.delete(byId(id))
);

export const usersAPI = {
  getAll: getAllUsers,
  getById: getUserById,
  update: updateUser,
  delete: deleteUser,
};

export default usersAPI;

