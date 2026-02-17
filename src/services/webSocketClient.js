/**
 * WebSocket Client — DEMO MODE
 *
 * Replaces the real STOMP/WebSocket connection with a simulated
 * data stream powered by MockDataService. No network connections
 * are opened. Data is generated locally on timers.
 *
 * @module webSocketClient
 */

import { mockConnectWebSocket } from './mockDataService';

/**
 * Connects to a simulated WebSocket.
 *
 * @param {string} deviceId       - Device to subscribe to.
 * @param {function} onStream     - Callback for stream data
 * @param {function} onState      - Callback for state data
 * @param {function} onConnected  - Callback when "connected"
 * @param {function} onDisconnected - Callback on "disconnect"
 * @returns {{ deactivate: () => void }} Mock client with cleanup
 */
export function connectWebSocket(
  deviceId,
  onStream,
  onState,
  onConnected,
  onDisconnected,
) {
  return mockConnectWebSocket(deviceId, onStream, onState, onConnected, onDisconnected);
}
