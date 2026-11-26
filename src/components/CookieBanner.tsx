"use client";

import React, { useSyncExternalStore } from "react";
import Link from "next/link";

const STORAGE_KEY = "digital_store_cookie_consent";
const CONSENT_EVENT = "digital-store-cookie-consent-change";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CONSENT_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CONSENT_EVENT, callback);
  };
}

function getClientSnapshot(): boolean {
  try {
    return !localStorage.getItem(STORAGE_KEY);
  } catch {
    // Если localStorage заблокирован в режиме инкогнито — показываем баннер
    return true;
  }
}

// На сервере (SSR) всегда возвращаем false, чтобы избежать ошибки гидратации
function getServerSnapshot(): boolean {
  return false;
}

export function CookieBanner() {
  const isVisible = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  const handleAccept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
      // Уведомляем useSyncExternalStore об изменении в текущей вкладке
      window.dispatchEvent(new Event(CONSENT_EVENT));
    } catch {
      // Игнорируем ошибку доступа к хранилищу
    }
  };

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Уведомление об использовании файлов cookie"
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-4xl rounded-xl border border-gray-200 bg-white/95 p-4 shadow-lg backdrop-blur-sm sm:flex sm:items-center sm:justify-between sm:gap-6 sm:px-6"
    >
      <p className="text-xs leading-relaxed text-gray-600 sm:text-sm">
        Мы используем файлы cookie и сервис аналитики Яндекс Метрика для
        корректной работы сайта и анализа посещаемости. Продолжая использовать
        сайт, вы соглашаетесь с{" "}
        <Link
          href="/privacy"
          className="font-medium text-blue-600 underline hover:text-blue-700"
        >
          Политикой конфиденциальности
        </Link>
        .
      </p>

      <div className="mt-3 flex shrink-0 justify-end sm:mt-0">
        <button
          type="button"
          onClick={handleAccept}
          className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Понятно
        </button>
      </div>
    </div>
  );
}
