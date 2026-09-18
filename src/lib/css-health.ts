/** Detect whether Tailwind compiled CSS is active in the document. */
export function isTailwindCssActive(): boolean {
  if (typeof document === "undefined") return true;

  const probe = document.createElement("div");
  probe.className = "hidden";
  probe.setAttribute("aria-hidden", "true");
  document.body.appendChild(probe);
  const display = getComputedStyle(probe).display;
  probe.remove();

  return display === "none";
}

export function hasNextCssBundle(): boolean {
  if (typeof document === "undefined") return true;

  const links = Array.from(
    document.querySelectorAll('link[rel="stylesheet"]')
  ) as HTMLLinkElement[];

  return links.some((link) => {
    const href = link.href ?? "";
    return href.includes("_next/static/css");
  });
}

export function stylesLookBroken(): boolean {
  return !isTailwindCssActive() || !hasNextCssBundle();
}
