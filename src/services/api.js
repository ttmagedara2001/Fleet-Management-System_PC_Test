/**
 * Fleet Management System — API Client (DEMO MODE)
 *
 * All HTTP requests are intercepted and routed to MockDataService.
 * No real network calls are made.
 */

import {
  mockGetStateDetails,
  mockGetTopicStateDetails,
  mockUpdateStateDetails,
  mockGetDeviceStreamData,
  mockGetTopicStreamData,
} from './mockDataService';

// ── Keep the getTimeRange utility (it's used by components) ──
export function getTimeRange(rangeHours = 24) {
  const now = new Date();
  const start = new Date(
    now.getTime() - parseFloat(rangeHours) * 60 * 60 * 1000,
  );
  const format = (date) => date.toISOString().split('.')[0] + 'Z';
  return {
    startTime: format(start),
    endTime: format(now),
  };
}

// ============================================================================
// CORE ENDPOINTS (Mock implementations)
// ============================================================================

/**
 * 1. Fetch historical stream data for ALL topics on a device
 */
export async function getDeviceStreamData(
  deviceId,
  startTime,
  endTime,
  pagination = '0',
  pageSize = '100',
) {
  return mockGetDeviceStreamData(deviceId, startTime, endTime, pagination, pageSize);
}

/**
 * 2. Fetch historical stream data for a SPECIFIC topic
 */
export async function getTopicStreamData(
  deviceId,
  topic,
  startTime,
  endTime,
  pagination = '0',
  pageSize = '100',
  { silent = false } = {},
) {
  return mockGetTopicStreamData(deviceId, topic, startTime, endTime, pagination, pageSize);
}

/**
 * 3. Fetch current state details for a SPECIFIC topic
 */
export async function getTopicStateDetails(deviceId, topic) {
  return mockGetTopicStateDetails(deviceId, topic);
}

/**
 * 4. Fetch ALL current state details for a device
 */
export async function getDeviceStateDetails(deviceId) {
  return mockGetStateDetails(deviceId);
}

/**
 * Sequence helper: fetch state details for a specific topic, then fetch
 * the overall device state.
 */
export async function fetchTopicThenDeviceState(deviceId, topic) {
  try {
    const topicState = await getTopicStateDetails(deviceId, topic);
    const deviceState = await getDeviceStateDetails(deviceId);
    return { topicState, deviceState };
  } catch (err) {
    const e = new Error(`Failed to fetch topic/device state: ${err.message}`);
    e.original = err;
    throw e;
  }
}

/**
 * 5. Update device state (Control API)
 */
export async function updateStateDetails(deviceId, topic, payload) {
  return mockUpdateStateDetails(deviceId, topic, payload);
}

// ============================================================================
// CONVENIENCE HELPERS
// ============================================================================

export async function toggleAC(deviceId, turnOn) {
  return updateStateDetails(deviceId, 'fleetMS/ac', {
    status: turnOn ? 'ON' : 'OFF',
  });
}

export async function setAirPurifier(deviceId, mode) {
  return updateStateDetails(deviceId, 'fleetMS/airPurifier', {
    status: mode,
  });
}

/**
 * Legacy support for components using old names
 */
export const getAllStreamData = getDeviceStreamData;
export const getStreamData = getTopicStreamData;
export const getStateDetails = getDeviceStateDetails;
export const updateState = updateStateDetails;

// Mock api object (components may import `api` for raw access)
const api = {
  post: async (url, data) => {
    // Route based on URL
    if (url.includes('get-stream-data/device/topic')) {
      return { data: await mockGetTopicStreamData(data.deviceId, data.topic, data.startTime, data.endTime, data.pagination, data.pageSize) };
    }
    if (url.includes('get-stream-data/device')) {
      return { data: await mockGetDeviceStreamData(data.deviceId, data.startTime, data.endTime, data.pagination, data.pageSize) };
    }
    if (url.includes('get-state-details/device/topic')) {
      return { data: await mockGetTopicStateDetails(data.deviceId, data.topic) };
    }
    if (url.includes('get-state-details/device')) {
      return { data: await mockGetStateDetails(data.deviceId) };
    }
    if (url.includes('update-state-details')) {
      return { data: await mockUpdateStateDetails(data.deviceId, data.topic, data.payload) };
    }
    // Fallback
    return { data: { status: 'Success', message: 'Demo mode — no-op' } };
  },
  get: async () => ({ data: { status: 'Success' } }),
  put: async () => ({ data: { status: 'Success' } }),
  delete: async () => ({ data: { status: 'Success' } }),
};

export default api;
