window.addEventListener("load", () => {
  const $ = document.querySelector.bind(document);

  const Header = $("header");
  const menuMobile = $("nav > #menu-mobile");

  // open and close  menu mobile
  menuMobile.addEventListener("click", (event) => {
    event.preventDefault();
    toggleMenu(Header, "open");
  });

  window.addEventListener("scroll", () => {
    handlePositionHear();
  });

  function toggleMenu(div, divClass) {
    if (existClass(div, divClass)) {
      div.classList.remove(divClass);
      document.body.classList.remove("no-scroll");
    } else {
      div.classList.add(divClass);
      document.body.classList.add("no-scroll");
    }
  }

  function existClass(div, name) {
    return div.classList.contains(name);
  }

  function handlePositionHear() {
    if (window.scrollY >= Header.offsetHeight + 80) {
      if (!Header.classList.contains("header-fixed")) {
        Header.classList.add("header-fixed");
      }
    } else {
      Header.classList.remove("header-fixed");
    }
  }

  $("#scroll-arrow").addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });
});
