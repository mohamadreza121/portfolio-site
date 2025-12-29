export function initSectionDepthShift() {
  const sections = document.querySelectorAll(
    "section, .projects-page, .about-page, .certifications-page, .services-page"
  );

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("section-visible");
        }
      });
    },
    {
      root: null,
      threshold: 0.18
    }
  );

  sections.forEach(section => observer.observe(section));
}
