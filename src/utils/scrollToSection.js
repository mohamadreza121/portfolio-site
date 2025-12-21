/**
 * Smoothly scrolls to a page section with fixed-header offset.
 * Safari-safe replacement for scrollIntoView().
 *
 * @param {string} id - Target element ID (without #)
 */
export function scrollToSection(id) {
  // ✅ Home should be true top
  if (id === "home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const el = document.getElementById(id);
  if (!el) return;

  const OFFSET = 80; // fixed dock / navbar height
  const y =
    el.getBoundingClientRect().top + window.pageYOffset - OFFSET;

  window.scrollTo({
    top: y,
    behavior: "smooth",
  });
}
