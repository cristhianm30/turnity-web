"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { X, AlertCircle, CheckCircle2, AlertTriangle, Info } from "lucide-react";

export type ToastVariant = "default" | "success" | "destructive" | "warning";

interface ToasterToast {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: ToastVariant;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  action?: React.ReactNode;
}

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;

type Action =
  | {
      type: "ADD_TOAST";
      toast: ToasterToast;
    }
  | {
      type: "UPDATE_TOAST";
      toast: Partial<ToasterToast>;
    }
  | {
      type: "DISMISS_TOAST";
      toastId?: string;
    }
  | {
      type: "REMOVE_TOAST";
      toastId?: string;
    };

interface State {
  toasts: ToasterToast[];
}

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_VALUE;
  return count.toString();
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };

    case "DISMISS_TOAST": {
      const { toastId } = action;

      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
  }
};

const listeners: Array<(state: State) => void> = [];

let memoryState: State = { toasts: [] };

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

export function toast({
  title,
  description,
  variant = "default",
  ...props
}: {
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: ToastVariant;
  action?: React.ReactNode;
}) {
  const id = genId();

  const update = (props: Partial<ToasterToast>) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });

  dispatch({
    type: "ADD_TOAST",
    toast: {
      id,
      title,
      description,
      variant,
      open: true,
      onOpenChange: (open: boolean) => {
        if (!open) dismiss();
      },
      ...props,
    },
  });

  return {
    id: id,
    dismiss,
    update,
  };
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  };
}

export { useToast };

export function ToastViewport({
  className,
  ...props
}: React.HTMLAttributes<HTMLOListElement>) {
  const { toasts } = useToast();

  return (
    <ol
      className={cn(
        "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:w-[420px]",
        className
      )}
      {...props}
    >
      {toasts.map(function (toast) {
        return <Toast key={toast.id} {...toast} />;
      })}
    </ol>
  );
}

function Toast({
  title,
  description,
  variant = "default",
  open,
  onOpenChange,
  action,
}: ToasterToast) {
  React.useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onOpenChange(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [open, onOpenChange]);

  if (!open) return null;

  const variantStyles = {
    default: "bg-white border border-[#e8dcd0]",
    success: "bg-green-50 border border-green-200",
    destructive: "bg-red-50 border border-red-200",
    warning: "bg-yellow-50 border border-yellow-200",
  };

  const iconColor = {
    default: "text-[#f59e0b]",
    success: "text-green-600",
    destructive: "text-red-600",
    warning: "text-yellow-600",
  };

  const getIcon = () => {
    switch (variant) {
      case "success":
        return <CheckCircle2 className={cn("h-5 w-5", iconColor[variant])} />;
      case "destructive":
        return <AlertCircle className={cn("h-5 w-5", iconColor[variant])} />;
      case "warning":
        return <AlertTriangle className={cn("h-5 w-5", iconColor[variant])} />;
      default:
        return <Info className={cn("h-5 w-5", iconColor[variant])} />;
    }
  };

  return (
    <li className="w-full animate-in slide-in-from-right-full mb-4">
      <div
        className={cn(
          "rounded-lg shadow-lg p-4 flex gap-3",
          variantStyles[variant]
        )}
        role="status"
      >
        <div className="flex-shrink-0">{getIcon()}</div>
        <div className="flex-1">
          {title && <div className="font-semibold text-[#1c1207] text-sm">{title}</div>}
          {description && (
            <div className="text-sm text-[#7d6d5c] mt-1">{description}</div>
          )}
        </div>
        {action}
        <button
          onClick={() => onOpenChange(false)}
          className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      </div>
    </li>
  );
}
