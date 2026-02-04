/**
 * Device detection utilities for AR functionality
 */

export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;

  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

export function isIOS(): boolean {
  if (typeof window === 'undefined') return false;

  return /iPhone|iPad|iPod/i.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

export function isAndroid(): boolean {
  if (typeof window === 'undefined') return false;

  return /Android/i.test(navigator.userAgent);
}

export function supportsAR(): boolean {
  if (typeof window === 'undefined') return false;

  // Check for WebXR support
  if ('xr' in navigator) {
    return true;
  }

  // iOS Safari supports AR Quick Look
  if (isIOS()) {
    return true;
  }

  // Android Chrome supports Scene Viewer
  if (isAndroid()) {
    return true;
  }

  return false;
}
