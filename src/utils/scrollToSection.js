export function navigateAndScroll(navigate, sectionId) {
  navigate("/", {
    state: { scrollTo: sectionId },
  });
}
