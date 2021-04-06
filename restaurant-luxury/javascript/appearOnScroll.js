const appearOptions = {
  threshold: 0,
  rootMargin: "0px 0px -200px 0px",
};

const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const { target } = entry;
    target.classList.add("appear");
    appearOnScroll.unobserve(target);
  });
}, appearOptions);

export default appearOnScroll;
