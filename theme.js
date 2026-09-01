(() => {
  const data = window.siteData;
  if (!data) return;

  const LANG_KEY = "portfolio-lang";
  let lang = localStorage.getItem(LANG_KEY) === "en" ? "en" : "zh";

  const params = new URLSearchParams(window.location.search);
  const themeId = params.get("theme");
  const theme = (data.lifeThemes || []).find((item) => item.id === themeId);

  const escapeHtml = (value) =>
    String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");

  const t = () => data.locales[lang].ui;

  const renderStaticUi = () => {
    const ui = t();
    document.documentElement.lang = data.locales[lang].htmlLang;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (key && ui[key] != null) el.textContent = ui[key];
    });
    const langBtn = document.getElementById("lang-toggle");
    if (langBtn) {
      langBtn.textContent = ui.langSwitch;
      langBtn.setAttribute("aria-label", ui.langAria);
    }
  };

  const normalizeGalleryItem = (item) =>
    typeof item === "string"
      ? { src: item, position: "center center" }
      : { src: item.src, position: item.position || "center center" };

  const renderTheme = () => {
    const main = document.getElementById("theme-main");
    if (!theme) {
      if (main) {
        main.innerHTML = `<div class="theme-content section-inner theme-empty"><p>${escapeHtml(t().themeNotFound)}</p><a class="theme-back theme-back--inline" href="index.html">${escapeHtml(t().backHome)}</a></div>`;
      }
      document.title = `${t().themeNotFound} · ${data.profile.name}`;
      return;
    }

    const content = theme[lang] || theme.zh;
    const cover = document.getElementById("theme-cover");
    const titleEl = document.getElementById("theme-title");
    const subtitleEl = document.getElementById("theme-subtitle");
    const copyEl = document.getElementById("theme-copy");
    const galleryEl = document.getElementById("theme-gallery");
    const eyebrow = document.getElementById("theme-eyebrow");

    if (cover) {
      cover.src = theme.cover;
      cover.alt = content.title;
      cover.style.objectPosition = theme.coverPosition || "center center";
    }
    if (titleEl) titleEl.textContent = content.title;
    if (subtitleEl) subtitleEl.textContent = content.subtitle;
    if (eyebrow) eyebrow.textContent = lang === "zh" ? "生活" : "Life";
    if (copyEl) {
      copyEl.innerHTML = (content.paragraphs || [])
        .map((p) => `<p>${escapeHtml(p)}</p>`)
        .join("");
    }
    if (galleryEl) {
      const items = (theme.gallery || [theme.cover]).map(normalizeGalleryItem);
      galleryEl.innerHTML = items
        .map(
          (item, i) =>
            `<figure class="theme-gallery-item"><img src="${escapeHtml(item.src)}" alt="${escapeHtml(content.title)} ${i + 1}" loading="lazy" style="object-position:${escapeHtml(item.position)}" /></figure>`
        )
        .join("");
    }

    document.title = `${content.title} · ${data.profile.name}`;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", content.subtitle);
  };

  const renderFooter = () => {
    const footer = document.getElementById("footer-copy");
    if (footer) footer.textContent = `© 2026 ${data.profile.name}`;
  };

  const setLang = (next) => {
    lang = next === "en" ? "en" : "zh";
    localStorage.setItem(LANG_KEY, lang);
    renderStaticUi();
    renderTheme();
  };

  document.getElementById("lang-toggle")?.addEventListener("click", () => {
    setLang(lang === "zh" ? "en" : "zh");
  });

  renderStaticUi();
  renderTheme();
  renderFooter();
})();
