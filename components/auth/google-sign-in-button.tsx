/**
 * Componente de botón para iniciar sesión con Google
 * Usa una ventana popup en lugar de redirección de página
 */

"use client";

import { useState } from "react";

interface GoogleSignInButtonProps {
  className?: string;
  text?: string;
}

export function GoogleSignInButton({
  className = "",
  text = "Continuar con Google",
}: GoogleSignInButtonProps) {
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = () => {
    try {
      setError(null);

      // Abre ventana popup para Google OAuth
      const width = 500;
      const height = 600;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;

      const popup = window.open(
        "/api/auth/google",
        "google-signin",
        `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
      );

      if (!popup) {
        throw new Error("No se pudo abrir ventana popup. Verifica los permisos del navegador.");
      }

      // Escucha mensajes desde la ventana popup
      const handleMessage = (event: MessageEvent) => {
        // Validar origen por seguridad
        if (event.origin !== window.location.origin) {
          return;
        }

        if (event.data.type === "GOOGLE_AUTH_SUCCESS") {
          // Cierra popup
          popup.close();

          // Guarda sesión y redirige
          const { token, user } = event.data.payload;
          
          if (token && user) {
            // Guarda cookie
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 7);
            document.cookie = `turnity_auth_token=${encodeURIComponent(token)}; path=/; expires=${expirationDate.toUTCString()}`;

            // Guarda usuario en localStorage
            localStorage.setItem("turnity_auth_user", JSON.stringify(user));

            // Redirige a company selection
            window.location.href = "/company";
          } else {
            setError("Datos de sesión inválidos");
          }
        } else if (event.data.type === "GOOGLE_AUTH_ERROR") {
          popup.close();
          setError(event.data.error || "Error en autenticación con Google");
        }

        window.removeEventListener("message", handleMessage);
      };

      window.addEventListener("message", handleMessage);

      // Cleanup cuando se cierre el popup sin éxito
      const checkPopupClosed = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkPopupClosed);
          window.removeEventListener("message", handleMessage);
        }
      }, 500);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al iniciar sesión con Google"
      );
    }
  };

  return (
    <div className="w-full">
      <button
        onClick={handleSignIn}
        className={`w-full px-4 py-2 rounded-lg font-medium transition-colors bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 ${className}`}
      >
        {text}
      </button>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
