(() => {
  const data = window.siteData;
  if (!data) return;

  const LANG_KEY = "portfolio-lang";
  let lang = localStorage.getItem(LANG_KEY) === "en" ? "en" : "zh";

  const icons = {
    email: `<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M4 6.5h16v11H4v-11zm0 0l8 6 8-6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    linkedin: `<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M6.2 9.2h2.7V18H6.2V9.2zM7.55 5a1.55 1.55 0 1 1 0 3.1 1.55 1.55 0 0 1 0-3.1zM10.5 9.2h2.6v1.2h.04c.36-.68 1.24-1.4 2.55-1.4 2.73 0 3.23 1.8 3.23 4.14V18h-2.7v-4.05c0-.97-.02-2.21-1.35-2.21-1.35 0-1.56 1.05-1.56 2.14V18h-2.7V9.2z" fill="currentColor"/></svg>`,
    github: `<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M12 3.2a8.8 8.8 0 0 0-2.8 17.1c.4.1.6-.2.6-.4v-1.5c-2.5.5-3-1.2-3-1.2-.4-1-1-1.3-1-1.3-.8-.6.1-.6.1-.6.9.1 1.4.9 1.4.9.8 1.4 2.1 1 2.6.8.1-.6.3-1 .6-1.2-2-.2-4.1-1-4.1-4.5 0-1 .4-1.8 1-2.4-.1-.2-.4-1.2.1-2.4 0 0 .8-.3 2.5.9a8.7 8.7 0 0 1 4.6 0c1.7-1.2 2.5-.9 2.5-.9.5 1.2.2 2.2.1 2.4.6.6 1 1.4 1 2.4 0 3.5-2.1 4.3-4.1 4.5.3.3.6.8.6 1.6v2.4c0 .2.2.5.6.4A8.8 8.8 0 0 0 12 3.2z" fill="currentColor"/></svg>`,
    external: `<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path d="M14 5h5v5M19 5l-9 9M10 5H5v14h14v-5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    sparkles: `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M12 3l1.2 4.2L17.5 8.5 13.2 9.8 12 14l-1.2-4.2L6.5 8.5l4.3-1.3L12 3zM18.5 13l.7 2.3 2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7.7-2.3zM6.5 15l.6 1.8 1.8.6-1.8.6-.6 1.8-.6-1.8-1.8-.6 1.8-.6.6-1.8z" fill="currentColor"/></svg>`,
    react: `<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><circle cx="12" cy="12" r="1.6" fill="currentColor"/><ellipse cx="12" cy="12" rx="9" ry="3.5" fill="none" stroke="currentColor" stroke-width="1.4"/><ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)" fill="none" stroke="currentColor" stroke-width="1.4"/><ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>`,
    vite: `<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="M12 3l8.5 14.5H3.5L12 3z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M12 8.5v8" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    tailwind: `<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="M6.5 13c1.5-4 3.5-6 6-6 2 0 3.2 1 4.5 3 1.3-2 2.8-3 4.5-3 .8 0 1.6.3 2.5 1-1.2 3.2-3 4.8-5.5 4.8-2 0-3.2-1-4.5-3-1.3 2-2.8 3-4.5 3-.8 0-1.6-.3-2.5-1 1-.8 1.8-1.3 2.5-1.8z" fill="currentColor"/></svg>`,
    express: `<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="M4 8h11.5a2.5 2.5 0 0 1 0 5H10m0 0l3.5 3.5M10 13l3.5-3.5M16.5 8.5L20 12l-3.5 3.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    llm: `<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="M8 7h8v6H8V7zm0 0V5.5A2.5 2.5 0 0 1 10.5 3h3A2.5 2.5 0 0 1 16 5.5V7m-6 6v2.5A2.5 2.5 0 0 0 12.5 18h0A2.5 2.5 0 0 0 15 15.5V13M9.5 20.5h5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  };

  const techIcon = (tech) => {
    const key = String(tech).toLowerCase();
    if (key.includes("react")) return icons.react;
    if (key.includes("vite")) return icons.vite;
    if (key.includes("tailwind")) return icons.tailwind;
    if (key.includes("express")) return icons.express;
    if (key.includes("llm") || key.includes("api")) return icons.llm;
    return icons.sparkles;
  };

  const escapeHtml = (value) =>
    String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");

  const t = () => data.locales[lang];

  const contactButtons = () => {
    const { email, linkedin, github } = data.profile;
    const ui = t().ui;
    return [
      { href: `mailto:${email}`, label: email, icon: icons.email },
      {
        href: linkedin,
        label: ui.linkedin,
        icon: icons.linkedin,
        external: true,
      },
      { href: github, label: ui.github, icon: icons.github, external: true },
    ]
      .map((item) => {
        const external = item.external
          ? ` target="_blank" rel="noopener noreferrer"`
          : "";
        return `<li><a class="contact-btn" href="${escapeHtml(item.href)}"${external}>${item.icon}<span>${escapeHtml(item.label)}</span></a></li>`;
      })
      .join("");
  };

  const renderStaticUi = () => {
    const locale = t();
    const ui = locale.ui;

    document.documentElement.lang = locale.htmlLang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (key && ui[key] != null) el.textContent = ui[key];
    });

    const langBtn = document.getElementById("lang-toggle");
    if (langBtn) {
      langBtn.textContent = ui.langSwitch;
      langBtn.setAttribute("aria-label", ui.langAria);
    }

    const navToggle = document.getElementById("nav-toggle");
    if (navToggle) {
      const open = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-label", open ? ui.closeMenu : ui.openMenu);
    }

    const hero = document.getElementById("hero");
    if (hero) hero.setAttribute("aria-label", ui.heroAria);

    const stats = document.getElementById("stats");
    if (stats) stats.setAttribute("aria-label", ui.statsAria);
  };

  const renderHero = () => {
    const { profile } = data;
    const locale = t();
    const nameEl = document.getElementById("hero-name");
    const taglineEl = document.getElementById("hero-tagline");
    const introEl = document.getElementById("hero-intro");
    const avatarEl = document.getElementById("hero-avatar");
    const resumeBtn = document.getElementById("resume-btn");

    const displayName = lang === "en" ? profile.nameEn : profile.name;

    if (nameEl) nameEl.textContent = displayName;
    if (taglineEl) taglineEl.textContent = locale.tagline;
    if (introEl) introEl.textContent = locale.about[0] || locale.tagline;
    if (avatarEl) {
      avatarEl.src = profile.avatar;
      avatarEl.alt =
        lang === "zh"
          ? `${profile.name}的正式头像`
          : `Portrait of ${profile.nameEn}`;
    }
    if (resumeBtn) {
      resumeBtn.href = profile.resumeFile;
      resumeBtn.setAttribute("download", profile.resumeDownloadName);
    }

    const brand = document.querySelector(".nav-brand");
    if (brand) brand.textContent = "Nice to meet you!";

    const footer = document.getElementById("footer-copy");
    if (footer) footer.textContent = `© 2026 ${profile.name}`;

    document.title = `${profile.name} · ${profile.nameEn} — ${locale.titleSuffix}`;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", locale.metaDescription);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", document.title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", locale.metaDescription);
  };

  const renderParade = () => {
    const parade = document.getElementById("photo-parade");
    if (!parade) return;
    const themes = data.lifeThemes || [];
    const label = t().ui.photoLabel;

    const renderGroup = (duplicate) =>
      themes
        .map((theme) => {
          const focusAttr = duplicate ? ' tabindex="-1"' : "";
          const href = `theme.html?theme=${encodeURIComponent(theme.id)}`;
          const hoverLabel =
            theme.hoverLabel ||
            `Life-${(theme.en?.title || theme.id).replace(/\s+/g, "")}`;
          const ariaTitle = theme[lang]?.title || theme.zh.title;
          return `<a class="mini-photo" href="${escapeHtml(href)}" aria-label="${escapeHtml(label)}：${escapeHtml(ariaTitle)}"${focusAttr}><span class="mini-photo-tag">${escapeHtml(hoverLabel)}</span><img src="${escapeHtml(theme.cover)}" alt="" /></a>`;
        })
        .join("");

    /* 三组拼接：一组宽度可能小于视口，两组在 -50% 时右侧会空窗 */
    parade.innerHTML = `<div class="parade-track"><div class="parade-group">${renderGroup(false)}</div><div class="parade-group" aria-hidden="true">${renderGroup(true)}</div><div class="parade-group" aria-hidden="true">${renderGroup(true)}</div></div>`;
  };

  const renderAbout = () => {
    const root = document.getElementById("about-copy");
    if (!root) return;
    root.innerHTML = t()
      .about.map((p) => `<p>${escapeHtml(p)}</p>`)
      .join("");
  };

  const renderExperience = () => {
    const root = document.getElementById("experience-list");
    if (!root) return;
    root.innerHTML = t()
      .experiences.map(
        (item) => `
      <li class="timeline-item">
        <p class="timeline-period">${escapeHtml(item.period)}</p>
        <div>
          <h3 class="timeline-company">${escapeHtml(item.company)}</h3>
          <p class="timeline-role">${escapeHtml(item.role)}</p>
          <p class="timeline-desc">${escapeHtml(item.description)}</p>
          <ul class="tag-list">${(item.tags || [])
            .map((tag) => `<li class="tag">${escapeHtml(tag)}</li>`)
            .join("")}</ul>
        </div>
      </li>`
      )
      .join("");
  };

  const renderStats = () => {
    const root = document.getElementById("stats-grid");
    if (!root) return;
    root.innerHTML = t()
      .stats.map(
        (item) => `
      <li class="stat-card">
        <span class="stat-value">${escapeHtml(item.value)}</span>
        <span class="stat-label">${escapeHtml(item.label)}</span>
      </li>`
      )
      .join("");
  };

  const renderProjects = () => {
    const root = document.getElementById("projects-grid");
    if (!root) return;
    const ui = t().ui;
    root.innerHTML = t()
      .projects.map((project) => {
        const liveDisabled = project.liveUrl ? "" : " is-disabled";
        const githubDisabled = project.githubUrl ? "" : " is-disabled";
        const liveAttrs = project.liveUrl
          ? `href="${escapeHtml(project.liveUrl)}" target="_blank" rel="noopener noreferrer"`
          : `href="#" aria-disabled="true"`;
        const githubAttrs = project.githubUrl
          ? `href="${escapeHtml(project.githubUrl)}" target="_blank" rel="noopener noreferrer"`
          : `href="#" aria-disabled="true"`;
        return `
        <article class="project-card">
          <div class="project-header">
            <span class="project-icon" aria-hidden="true">${
              project.icon
                ? `<img src="${escapeHtml(project.icon)}" alt="" class="project-icon-img" />`
                : icons.sparkles
            }</span>
            <h3 class="project-name">${escapeHtml(project.name)}</h3>
          </div>
          <p class="project-desc">${escapeHtml(project.description)}</p>
          <ul class="tag-list">${(project.tech || [])
            .map(
              (tech) =>
                `<li class="tag tag--tech">${techIcon(tech)}<span>${escapeHtml(tech)}</span></li>`
            )
            .join("")}</ul>
          <div class="project-actions">
            <a class="project-link${liveDisabled}" ${liveAttrs}>${icons.external}<span>${escapeHtml(ui.viewProject)}</span></a>
            <a class="project-link${githubDisabled}" ${githubAttrs}>${icons.github}<span>${escapeHtml(ui.github)}</span></a>
          </div>
        </article>`;
      })
      .join("");
  };

  const renderSkills = () => {
    const root = document.getElementById("skills-grid");
    if (!root) return;
    root.innerHTML = t()
      .skills.map(
        (group) => `
      <div class="skill-group">
        <h3 class="skill-group-title">${escapeHtml(group.category)}</h3>
        <ul class="tag-list">${(group.items || [])
          .map((item) => `<li class="tag">${escapeHtml(item)}</li>`)
          .join("")}</ul>
      </div>`
      )
      .join("");
  };

  const renderContact = () => {
    const heading = document.getElementById("contact-heading");
    const blurb = document.getElementById("contact-blurb");
    const links = document.getElementById("contact-links");
    const contact = t().contact;
    if (heading) heading.textContent = contact.heading;
    if (blurb) blurb.textContent = contact.blurb;
    if (links) links.innerHTML = contactButtons();
  };

  const renderAll = () => {
    renderStaticUi();
    renderHero();
    renderParade();
    renderAbout();
    renderExperience();
    renderStats();
    renderProjects();
    renderSkills();
    renderContact();
  };

  const setLang = (next) => {
    lang = next === "en" ? "en" : "zh";
    localStorage.setItem(LANG_KEY, lang);
    renderAll();
  };

  const setupLangToggle = () => {
    const btn = document.getElementById("lang-toggle");
    if (!btn) return;
    btn.addEventListener("click", () => {
      setLang(lang === "zh" ? "en" : "zh");
    });
  };

  const setupMobileNav = () => {
    const toggle = document.getElementById("nav-toggle");
    const panel = document.getElementById("nav-panel");
    if (!toggle || !panel) return;

    const syncLabel = () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute(
        "aria-label",
        open ? t().ui.closeMenu : t().ui.openMenu
      );
    };

    const closeMenu = () => {
      panel.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
      syncLabel();
    };

    toggle.addEventListener("click", () => {
      const open = panel.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("menu-open", open);
      syncLabel();
    });

    panel.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => closeMenu());
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  };

  const setupReveal = () => {
    const items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );

    items.forEach((el) => observer.observe(el));
  };

  renderAll();
  setupLangToggle();
  setupMobileNav();
  setupReveal();
})();
