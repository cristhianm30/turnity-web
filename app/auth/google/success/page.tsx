"use client";

import { useEffect } from "react";

export default function GoogleAuthSuccessPage() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const encodedUser = params.get("user");

    if (!token || !encodedUser) {
      // Error: datos incompletos
      if (window.opener) {
        window.opener.postMessage(
          {
            type: "GOOGLE_AUTH_ERROR",
            error: "Datos de sesión incompletos",
          },
          window.location.origin
        );
      }
      window.close();
      return;
    }

    try {
      const user = JSON.parse(decodeURIComponent(encodedUser));

      // Envía datos a ventana padre
      if (window.opener) {
        window.opener.postMessage(
          {
            type: "GOOGLE_AUTH_SUCCESS",
            payload: {
              token,
              user,
            },
          },
          window.location.origin
        );
      }

      // Cierra después de un pequeño delay
      setTimeout(() => {
        window.close();
      }, 1000);
    } catch {
      if (window.opener) {
        window.opener.postMessage(
          {
            type: "GOOGLE_AUTH_ERROR",
            error: "Error procesando datos de sesión",
          },
          window.location.origin
        );
      }
      window.close();
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf9f6]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f59e0b] mx-auto mb-4"></div>
        <p className="text-[#8b6545] font-medium">Completando inicio de sesión...</p>
        <p className="text-[#c4a882] text-sm mt-2">Esta ventana se cerrará automáticamente</p>
      </div>
    </div>
  );
}
