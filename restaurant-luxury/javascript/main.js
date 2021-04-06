import appearOnScroll from "./appearOnScroll.js";
import { $, $$ } from "./query.js";

window.addEventListener("load", function () {
  /* handle toggle Menu Mobile */
  const activeToggleClass = "active-toggle";

  $("#btn-toggle").addEventListener("click", () => toggleClass($("header"), activeToggleClass));

  function toggleClass(element, cls) {
    if (!element || !cls) return;
    element.classList.toggle(cls);
  }

  /* Add and Remove class fixed for Header */
  const classFixed = "fixed";
  const headerOnScrollOptions = {
    rootMargin: "-200px 0px 0px 0px",
  };

  const headerOnScroll = new IntersectionObserver(function (entries, headerOnScroll) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        $("header").classList.add(classFixed);
      } else {
        $("header").classList.remove(classFixed);
      }
    });
  }, headerOnScrollOptions);

  headerOnScroll.observe($("#section-first"));

  $("#submit-newsletter").addEventListener("click", (e) => {
    e.preventDefault();
    $("#email").value = "";
  });

  /* Add animation when scroll */
  setTimeout(() => {
    $("#loader").style.display = "none";
    document.body.classList.remove("disable");

    $$('*[class*="am-"]').forEach((element) => appearOnScroll.observe(element));
  }, 1000);
});
