'use client';

import { useSyncExternalStore } from 'react';

const STORAGE_KEY = 'digital_store_cookie_consent';
const CONSENT_EVENT = 'digital-store-cookie-consent-change';

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener(CONSENT_EVENT, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(CONSENT_EVENT, callback);
  };
}

function getClientSnapshot(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'accepted';
  } catch {
    return false;
  }
}

function getServerSnapshot(): boolean {
  return false;
}

export function acceptCookies() {
  try {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    window.dispatchEvent(new Event(CONSENT_EVENT));
  } catch {
    // Игнорируем ошибку хранилища
  }
}

export function useCookieConsent(): boolean {
  return useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
}
