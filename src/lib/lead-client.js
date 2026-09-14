// Analytics and optional browser storage must never turn a successful lead into an error.
export function trackEvent(event) {
  if (typeof window === "undefined") return;
  try {
    window.dataLayer = window.dataLayer || [];
    if (typeof window.dataLayer.push === "function") window.dataLayer.push(event);
  } catch {
    // Tracking is best-effort; navigation and submissions remain usable.
  }
}

export const leadStorage = {
  getItem(key) {
    try { return window.localStorage.getItem(key); } catch { return null; }
  },
  setItem(key, value) {
    try { window.localStorage.setItem(key, value); } catch { /* Storage is optional. */ }
  },
};

export const leadSessionStorage = {
  getItem(key) {
    try { return window.sessionStorage.getItem(key); } catch { return null; }
  },
  setItem(key, value) {
    try { window.sessionStorage.setItem(key, value); } catch { /* Storage is optional. */ }
  },
};

export async function submitLead(options) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 30_000);
  try {
    const response = await fetch("/api/lead", { ...options, signal: controller.signal });
    const data = await response.clone().json().catch(() => null);
    if (!response.ok || !data?.success) {
      throw new Error(data?.message || "Unable to submit your request. Please try again.");
    }
    if (!data.duplicate) trackEvent({ event: "lead_form", page_name: window.location.pathname });
    return response;
  } catch (error) {
    if (error.name === "AbortError" || error instanceof TypeError) {
      throw new Error("We could not confirm your submission. Please contact us before submitting again.");
    }
    throw error;
  } finally {
    clearTimeout(timer);
  }
}

let captchaPromise;
export function loadLeadCaptcha() {
  if (window.grecaptcha?.render) return Promise.resolve(window.grecaptcha);
  if (captchaPromise) return captchaPromise;
  captchaPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    const callback = "__leadCaptchaReady";
    const finish = (error) => {
      clearTimeout(timer);
      delete window[callback];
      if (error) { script.remove(); reject(error); }
      else resolve(window.grecaptcha);
    };
    const timer = setTimeout(() => finish(new Error("Verification did not load. Please try again.")), 15_000);
    window[callback] = () => finish();
    script.src = `https://www.google.com/recaptcha/api.js?onload=${callback}&render=explicit`;
    script.async = true;
    script.defer = true;
    script.onerror = () => finish(new Error("Verification could not load. Please check your connection and try again."));
    document.head.appendChild(script);
  }).catch((error) => { captchaPromise = undefined; throw error; });
  return captchaPromise;
}

const widgets = new WeakMap();
export function renderLeadCaptcha(container, options) {
  const existing = widgets.get(container);
  if (existing !== undefined && container.hasChildNodes()) {
    resetLeadCaptcha(container);
    return existing;
  }
  const id = window.grecaptcha.render(container, { ...options, size: "compact" });
  widgets.set(container, id);
  return id;
}

export function resetLeadCaptcha(container) {
  if (!container) return;
  const id = widgets.get(container);
  if (id === undefined || !container.hasChildNodes()) return;
  try { window.grecaptcha?.reset(id); } catch { /* The owning form may have unmounted. */ }
}
