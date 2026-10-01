// Clipboard with fallbacks: the async API needs a permission some embedded
// browsers deny, so a failed write retries via a hidden textarea and
// execCommand before giving up. Client-only.
export function copyToClipboard(text: string): Promise<boolean> {
  const legacy = () => {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch {
      ok = false;
    }
    document.body.removeChild(ta);
    return ok;
  };
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text).then(
      () => true,
      () => legacy(),
    );
  }
  return Promise.resolve(legacy());
}
