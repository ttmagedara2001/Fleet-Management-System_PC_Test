/**
 * Authentication Service — DEMO MODE
 *
 * All real auth calls are replaced with mock implementations.
 * No network requests are made. The app enters demo mode instantly.
 */

import {
  mockLogin,
  mockGetToken,
  mockClearTokens,
  mockRefreshSession,
} from './mockDataService';

// Re-export mock functions under original names
export const login = mockLogin;
export const getToken = mockGetToken;
export const clearTokens = mockClearTokens;
export const refreshSession = mockRefreshSession;

export default { login, refreshSession, getToken, clearTokens };
