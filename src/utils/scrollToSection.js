/**
 * Smoothly scrolls to a page section with fixed-header offset.
 * Safari-safe replacement for scrollIntoView().
 *
 * @param {string} id - Target element ID (without #)
 */
export function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;

  const OFFSET = 110; // fixed dock / navbar height
  const y =
    el.getBoundingClientRect().top + window.pageYOffset - OFFSET;

  window.scrollTo({
    top: y,
    behavior: "smooth",
  });
}
