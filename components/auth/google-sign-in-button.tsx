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
  text = "Continue with Google",
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
        throw new Error("Could not open popup window. Please check your browser permissions.");
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
            setError("Invalid session data");
          }
        } else if (event.data.type === "GOOGLE_AUTH_ERROR") {
          popup.close();
          setError(event.data.error || "Google authentication error");
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
        err instanceof Error ? err.message : "Error signing in with Google"
      );
    }
  };

  return (
    <div className="w-full">
      <button
        onClick={handleSignIn}
        className={`w-full px-4 py-3 rounded-xl font-medium transition-all duration-200 glass dark:bg-white/5 border border-white/30 dark:border-white/10 text-gray-900 dark:text-white hover:bg-white/90 dark:hover:bg-white/10 active:scale-95 flex items-center justify-center gap-2 ${className}`}
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        {text}
      </button>
      {error && (
        <div className="mt-3 rounded-lg glass backdrop-blur-md border border-red-200/50 dark:border-red-900/50 bg-red-50/80 dark:bg-red-950/30 p-3 flex items-start gap-2">
          <div className="h-5 w-5 rounded-full bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 flex items-center justify-center flex-shrink-0 text-xs font-bold">
            !
          </div>
          <p className="text-sm text-red-700 dark:text-red-400 font-medium leading-tight">
            {error}
          </p>
        </div>
      )}
    </div>
  );
}
