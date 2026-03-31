export function createToast(message, type = "error") {
  if (!message) return null;

  if (typeof message === "object" && message.text) {
    return {
      id: message.id || Date.now(),
      type: message.type || type,
      text: message.text,
    };
  }

  if (typeof message === "object" && message.message) {
    return {
      id: Date.now(),
      type,
      text: String(message.message),
    };
  }

  return {
    id: Date.now(),
    type,
    text: String(message),
  };
}

export function flashToast(message, type = "success") {
  const toast = createToast(message, type);
  if (!toast) return;

  sessionStorage.setItem("app_toast", JSON.stringify(toast));
}

export function consumeFlashToast() {
  const rawToast = sessionStorage.getItem("app_toast");
  if (!rawToast) return null;

  sessionStorage.removeItem("app_toast");

  try {
    return JSON.parse(rawToast);
  } catch {
    return null;
  }
}
