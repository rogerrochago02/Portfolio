const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.getElementById("site-nav");

if (navToggle && siteNav) {
  const navToggleLabel = navToggle.querySelector(".sr-only");

  const setExpanded = (expanded) => {
    navToggle.setAttribute("aria-expanded", String(expanded));
    siteNav.classList.toggle("is-open", expanded);

    if (navToggleLabel) {
      navToggleLabel.textContent = expanded ? "Fechar menu" : "Abrir menu";
    }
  };

  navToggle.addEventListener("click", () => {
    const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
    setExpanded(!isExpanded);
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setExpanded(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setExpanded(false);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 780) setExpanded(false);
  });
}

const yearElement = document.querySelector("[data-year]");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const hashTarget = window.location.hash
  ? document.getElementById(window.location.hash.slice(1))
  : null;

if (hashTarget) {
  window.addEventListener("load", () => hashTarget.scrollIntoView());
}

const copyButton = document.querySelector("[data-copy-email]");

if (copyButton) {
  copyButton.addEventListener("click", async () => {
    const email = copyButton.getAttribute("data-copy-email");
    const originalText = copyButton.textContent;

    const showCopied = () => {
      copyButton.textContent = "E-mail copiado!";
      window.setTimeout(() => {
        copyButton.textContent = originalText;
      }, 2000);
    };

    try {
      await navigator.clipboard.writeText(email);
      showCopied();
    } catch {
      const temporaryInput = document.createElement("textarea");
      temporaryInput.value = email;
      temporaryInput.setAttribute("readonly", "");
      temporaryInput.style.position = "fixed";
      temporaryInput.style.opacity = "0";
      document.body.appendChild(temporaryInput);
      temporaryInput.select();
      document.execCommand("copy");
      temporaryInput.remove();
      showCopied();
    }
  });
}

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');

if ("IntersectionObserver" in window && sections.length && navLinks.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const currentId = entry.target.getAttribute("id");

        navLinks.forEach((link) => {
          const isActive = link.getAttribute("href") === `#${currentId}`;
          link.classList.toggle("is-active", isActive);

          if (isActive) {
            link.setAttribute("aria-current", "location");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      });
    },
    { rootMargin: "-40% 0px -50% 0px" }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}
