/* ------------------------------------------------------------------
   GS Property Group — static / WordPress edition
   Vanilla interactions for the exported homepage. No framework needed.
   ------------------------------------------------------------------ */
(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var menu = document.getElementById("site-menu");
  var menuTrigger = header ? header.querySelector(".site-menu-button") : null;
  var menuClose = menu ? menu.querySelector('button[aria-label="Close navigation menu"]') : null;
  var desktopMedia = window.matchMedia("(min-width: 1360px)");
  var navLinks = header ? Array.prototype.slice.call(header.querySelectorAll(".site-nav a")) : [];
  var mobileLinks = menu ? Array.prototype.slice.call(menu.querySelectorAll("nav a[href]")) : [];
  var menuOpen = false;
  var previouslyFocused = null;
  var navLockUntil = 0;

  function labelFor(link) {
    return (link.textContent || "").trim().replace(/\s+/g, " ");
  }

  function markMobileDots() {
    mobileLinks.forEach(function (link) {
      var dot = link.querySelector("span.h-1.w-1");
      if (dot) dot.setAttribute("data-active-dot", "true");
    });
  }

  function updateMobileDots() {
    mobileLinks.forEach(function (link) {
      var right = link.querySelector(":scope > span:last-child");
      if (!right) return;
      var dot = right.querySelector("[data-active-dot]");
      var active = link.getAttribute("aria-current") === "page";

      if (active && !dot) {
        dot = document.createElement("span");
        dot.setAttribute("aria-hidden", "true");
        dot.setAttribute("data-active-dot", "true");
        dot.className = "h-1 w-1 rotate-45 bg-gold";
        right.insertBefore(dot, right.firstChild);
      } else if (!active && dot) {
        dot.remove();
      }
    });
  }

  function setActiveLabel(label) {
    navLinks.concat(mobileLinks).forEach(function (link) {
      var active = Boolean(label) && labelFor(link) === label;
      if (active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
    updateMobileDots();
  }

  function updateHeader() {
    if (header) header.setAttribute("data-scrolled", String(window.scrollY > 32));

    if (Date.now() < navLockUntil) return;

    var probe = window.scrollY + 140;
    var sections = [
      { id: "top", label: "Home" },
      { id: "pathways", label: null },
      { id: "investors", label: "Investors" },
      { id: "landlords", label: "Landlords" },
      { id: "property-owners", label: "Property Owners" },
      { id: "landowners", label: "Landowners" },
      { id: "about", label: "About Us" },
      { id: "process", label: null },
      { id: "enquire", label: "Contact" },
      { id: "faq", label: null },
    ];
    var current = sections[0];

    sections.forEach(function (section) {
      var element = document.getElementById(section.id);
      if (element && element.offsetTop <= probe) current = section;
    });

    setActiveLabel(current.label);
  }

  markMobileDots();

  if (header) {
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      navLockUntil = Date.now() + 1100;
      setActiveLabel(labelFor(link));
    });
  });

  var headerCta = header ? header.querySelector(".site-cta") : null;
  if (headerCta) {
    headerCta.addEventListener("click", function () {
      navLockUntil = Date.now() + 1100;
      setActiveLabel("Contact");
    });
  }

  var brandLinks = [];
  if (header) brandLinks.push(header.querySelector(".site-brand a"));
  if (menu) brandLinks.push(menu.querySelector("a[aria-label]"));
  brandLinks.forEach(function (link) {
    if (!link) return;
    link.addEventListener("click", function () {
      navLockUntil = Date.now() + 1100;
      setActiveLabel("Home");
      if (menuOpen) closeMenu();
    });
  });

  /* ---------------------------- Mobile menu ---------------------------- */

  function focusableInMenu() {
    if (!menu) return [];
    return Array.prototype.slice
      .call(menu.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'))
      .filter(function (element) {
        return element.getClientRects().length > 0;
      });
  }

  function onMenuKeydown(event) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
      return;
    }

    if (event.key !== "Tab") return;

    var focusable = focusableInMenu();
    if (!focusable.length) return;

    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    var current = document.activeElement;

    if (event.shiftKey && (current === first || !menu.contains(current))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && current === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function openMenu() {
    if (!menu || !menuTrigger || menuOpen) return;

    menuOpen = true;
    previouslyFocused = document.activeElement;
    menu.setAttribute("data-open", "true");
    menu.removeAttribute("inert");
    menu.setAttribute("aria-hidden", "false");
    menuTrigger.setAttribute("aria-expanded", "true");

    var scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) document.body.style.paddingRight = scrollbarWidth + "px";

    menu.querySelectorAll("nav li").forEach(function (item, index) {
      item.style.transitionDelay = 70 + index * 45 + "ms";
    });
    var footerPanel = menu.querySelector("nav + div > div");
    if (footerPanel) footerPanel.style.transitionDelay = "420ms";

    window.requestAnimationFrame(function () {
      if (menuClose) menuClose.focus();
    });
    document.addEventListener("keydown", onMenuKeydown);
  }

  function closeMenu() {
    if (!menu || !menuTrigger || !menuOpen) return;

    menuOpen = false;
    menu.setAttribute("data-open", "false");
    menu.setAttribute("inert", "");
    menu.setAttribute("aria-hidden", "true");
    menuTrigger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
    document.removeEventListener("keydown", onMenuKeydown);

    if (previouslyFocused && typeof previouslyFocused.focus === "function") {
      previouslyFocused.focus({ preventScroll: true });
    }
  }

  if (menuTrigger) menuTrigger.addEventListener("click", openMenu);
  if (menuClose) menuClose.addEventListener("click", closeMenu);

  mobileLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      navLockUntil = Date.now() + 1100;
      setActiveLabel(labelFor(link));
      closeMenu();
    });
  });

  var mobileCta = menu ? Array.prototype.slice.call(menu.querySelectorAll('a[href="#enquire"]')).pop() : null;
  if (mobileCta) {
    mobileCta.addEventListener("click", function () {
      navLockUntil = Date.now() + 1100;
      setActiveLabel("Contact");
      closeMenu();
    });
  }

  function handleResize() {
    if (desktopMedia.matches && menuOpen) closeMenu();
  }
  desktopMedia.addEventListener("change", handleResize);

  /* ------------------------------- FAQ -------------------------------- */

  var faqButtons = Array.prototype.slice.call(
    document.querySelectorAll("#faq button[aria-controls]")
  );

  function setFaqState(button, open) {
    var panel = document.getElementById(button.getAttribute("aria-controls"));
    var question = button.querySelector("span.flex-1");
    var icon = button.querySelector(":scope > span:last-child");

    button.setAttribute("aria-expanded", String(open));
    if (panel) panel.setAttribute("data-open", String(open));
    if (question) {
      question.classList.toggle("text-navy", open);
      question.classList.toggle("text-charcoal", !open);
    }
    if (icon) {
      icon.classList.toggle("rotate-45", open);
      icon.classList.toggle("border-gold", open);
      icon.classList.toggle("bg-gold", open);
      icon.classList.toggle("text-navy-deep", open);
      icon.classList.toggle("border-stone-line", !open);
      icon.classList.toggle("text-navy", !open);
      icon.classList.toggle("group-hover:border-gold", !open);
    }
  }

  faqButtons.forEach(function (button) {
    setFaqState(button, button.getAttribute("aria-expanded") === "true");
    button.addEventListener("click", function () {
      var willOpen = button.getAttribute("aria-expanded") !== "true";
      faqButtons.forEach(function (other) {
        setFaqState(other, other === button ? willOpen : false);
      });
    });
  });

  /* --------------------------- Enquiry form --------------------------- */

  var AUDIENCE_FIELDS = {
    investor: [
      {
        key: "investmentInterests",
        label: "Investment interests",
        type: "select",
        required: true,
        half: true,
        options: [
          "Development projects",
          "Joint venture opportunities",
          "Refurbishment projects",
          "Conversions (HMO / apartments)",
          "I'm not sure yet — advise me",
        ],
      },
      {
        key: "investmentBudget",
        label: "Indicative investment budget",
        type: "select",
        half: true,
        hint: "Optional — simply helps us discuss relevant projects.",
        options: [
          "Under £50,000",
          "£50,000 – £100,000",
          "£100,000 – £250,000",
          "£250,000 – £500,000",
          "Over £500,000",
          "I'd prefer to discuss",
        ],
      },
    ],
    landlord: [
      {
        key: "landlordLocation",
        label: "Property location",
        type: "text",
        required: true,
        placeholder: "e.g. Edgbaston, Birmingham",
      },
      {
        key: "propertyCount",
        label: "Number of properties",
        type: "select",
        required: true,
        half: true,
        options: ["1 property", "2 – 5 properties", "6 – 10 properties", "11 or more"],
      },
      {
        key: "landlordRequirement",
        label: "Main requirement",
        type: "select",
        required: true,
        half: true,
        options: [
          "Property management",
          "Selling a rental property",
          "Portfolio exit / retirement",
          "Something else",
        ],
      },
    ],
    owner: [
      {
        key: "ownerLocation",
        label: "Property location",
        type: "text",
        required: true,
        placeholder: "e.g. Harborne, Birmingham",
      },
      {
        key: "propertyType",
        label: "Property type",
        type: "select",
        required: true,
        half: true,
        options: [
          "House",
          "Flat or apartment",
          "House in multiple occupation (HMO)",
          "Commercial property",
          "Mixed-use",
          "Other",
        ],
      },
      {
        key: "timescale",
        label: "Preferred timescale",
        type: "select",
        required: true,
        half: true,
        options: [
          "As soon as possible",
          "Within 1 – 3 months",
          "Within 3 – 6 months",
          "Flexible / just exploring",
        ],
      },
    ],
    landowner: [
      {
        key: "landLocation",
        label: "Land location",
        type: "text",
        required: true,
        placeholder: "e.g. Near Sutton Coldfield",
      },
      {
        key: "landSize",
        label: "Approximate land size",
        type: "text",
        half: true,
        placeholder: "e.g. 0.8 acres",
        hint: "Optional — a rough estimate is fine.",
      },
      {
        key: "planningStatus",
        label: "Planning status",
        type: "select",
        half: true,
        hint: "Optional — select “Not sure” if unknown.",
        options: [
          "No planning permission",
          "Planning applied for",
          "Planning permission granted",
          "Not sure",
        ],
      },
    ],
  };

  var AUDIENCE_COPY = {
    investor: {
      intro:
        "Tell us about your investment interests and we'll arrange an initial conversation about current and upcoming projects.",
      note:
        "Whether you're considering active involvement or a more hands-off partnership, we'll explain how we work and answer your questions.",
      placeholder:
        "Tell us a little about your experience, the type of projects that interest you, and how involved you'd like to be…",
    },
    landlord: {
      intro:
        "Tell us about your property or portfolio and what you'd like to change — management, a sale, or planning an exit.",
      note:
        "Tired landlords, tenanted properties and whole portfolios can all be discussed. There's no commitment at this stage.",
      placeholder:
        "Tell us about your property or portfolio — tenancies, condition, and what you'd like to change…",
    },
    owner: {
      intro:
        "Share a few details about your property and your preferred timescale, and we'll talk through the options available.",
      note:
        "Residential and commercial property considered, including homes that need refurbishment. We'll explain every step clearly.",
      placeholder:
        "Tell us about your property, its condition, and anything else that would help us understand your situation…",
    },
    landowner: {
      intro:
        "Tell us where your land is and anything you know about its current status, and we'll discuss whether it may have development potential.",
      note:
        "A development partnership can allow you to explore potential without funding or managing the development yourself, subject to agreed terms.",
      placeholder:
        "Tell us anything you know about the land — access, boundaries, previous planning history…",
    },
  };

  var form = document.querySelector("#enquire form");

  if (form) {
    var swap = form.querySelector(".animate-form-swap");
    var grid = swap ? swap.querySelector(".mt-8.grid") : null;
    var guidance = swap ? swap.firstElementChild : null;
    var guidanceParagraphs = guidance ? guidance.querySelectorAll("p") : [];
    var radios = Array.prototype.slice.call(form.querySelectorAll('input[name="audience"]'));
    var messageInput = form.querySelector("#field-message");
    var commonIds = ["field-fullName", "field-phone", "field-email", "field-message"];

    var labelClass = "mb-2 block text-[0.8125rem] font-semibold tracking-wide text-navy";
    var inputClass =
      "w-full rounded-[2px] border bg-cream/40 px-4 py-3 text-[0.95rem] text-charcoal placeholder:text-ink-soft/45 transition-colors duration-300 border-stone-line hover:border-navy/35 focus:border-gold-deep focus:outline-none focus:ring-2 focus:ring-gold/25";
    var chevronSvg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down pointer-events-none absolute top-1/2 right-3.5 h-4.5 w-4.5 -translate-y-1/2 text-ink-soft" aria-hidden="true"><path d="m6 9 6 6 6-6"></path></svg>';

    function escapeHtml(value) {
      return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    }

    function directGridChild(element) {
      var node = element;
      while (node && node.parentElement !== grid) node = node.parentElement;
      return node;
    }

    var commonWrappers = commonIds
      .map(function (id) {
        var field = document.getElementById(id);
        return field ? directGridChild(field) : null;
      })
      .filter(Boolean);

    function fieldMarkup(field) {
      var id = "field-" + field.key;
      var optional = field.required
        ? ""
        : '<span class="ml-1.5 font-normal text-ink-soft/70">(optional)</span>';
      var hint = field.hint
        ? '<p id="' +
          id +
          '-hint" class="mt-1.5 text-[0.78rem] text-ink-soft/80">' +
          escapeHtml(field.hint) +
          "</p>"
        : "";
      var describedBy = field.hint ? ' aria-describedby="' + id + '-hint"' : "";
      var control;

      if (field.type === "select") {
        var options = (field.options || [])
          .map(function (option) {
            return (
              '<option value="' +
              escapeHtml(option) +
              '">' +
              escapeHtml(option) +
              "</option>"
            );
          })
          .join("");
        control =
          '<div class="relative"><select id="' +
          id +
          '" aria-invalid="false"' +
          describedBy +
          ' class="' +
          inputClass +
          ' appearance-none pr-11 text-ink-soft/60"><option value="">Please select…</option>' +
          options +
          "</select>" +
          chevronSvg +
          "</div>";
      } else {
        control =
          '<input id="' +
          id +
          '" type="text" aria-invalid="false"' +
          describedBy +
          ' class="' +
          inputClass +
          '" placeholder="' +
          escapeHtml(field.placeholder || "") +
          '">';
      }

      return (
        '<div class="' +
        (field.half ? "" : "sm:col-span-2") +
        '"><div><label for="' +
        id +
        '" class="' +
        labelClass +
        '">' +
        escapeHtml(field.label) +
        optional +
        "</label>" +
        control +
        hint +
        "</div></div>"
      );
    }

    function applyAudience(id) {
      var copy = AUDIENCE_COPY[id];
      if (!copy) return;

      radios.forEach(function (input) {
        var label = input.closest("label");
        var selected = input.value === id;
        input.checked = selected;

        if (!label) return;
        label.classList.toggle("border-navy", selected);
        label.classList.toggle("bg-navy", selected);
        label.classList.toggle("text-cream", selected);
        label.classList.toggle("shadow-lift", selected);
        label.classList.toggle("border-stone-line", !selected);
        label.classList.toggle("bg-white", !selected);
        label.classList.toggle("text-navy", !selected);
        label.classList.toggle("hover:border-gold-deep", !selected);

        var icon = label.querySelector("svg");
        if (icon) {
          icon.classList.toggle("text-gold", selected);
          icon.classList.toggle("text-gold-deep", !selected);
        }

        var dot = label.querySelector("span.absolute");
        if (dot) {
          dot.classList.toggle("bg-gold", selected);
          dot.classList.toggle("opacity-100", selected);
          dot.classList.toggle("opacity-0", !selected);
        }
      });

      if (guidanceParagraphs[0]) guidanceParagraphs[0].textContent = copy.intro;
      if (guidanceParagraphs[1]) guidanceParagraphs[1].textContent = copy.note;
      if (messageInput) messageInput.setAttribute("placeholder", copy.placeholder);

      if (!grid) return;
      var messageWrapper = commonWrappers.filter(function (wrapper) {
        return wrapper && wrapper.contains(messageInput);
      })[0];

      Array.prototype.slice.call(grid.children).forEach(function (child) {
        if (commonWrappers.indexOf(child) !== -1) return;
        if (child.querySelector("input, select, textarea")) child.remove();
      });

      (AUDIENCE_FIELDS[id] || []).forEach(function (field) {
        var holder = document.createElement("div");
        holder.innerHTML = fieldMarkup(field);
        var generated = holder.firstElementChild;
        if (!generated) return;
        if (messageWrapper && messageWrapper.parentElement === grid) {
          grid.insertBefore(generated, messageWrapper);
        } else {
          grid.appendChild(generated);
        }
        var select = generated.querySelector("select");
        if (select) {
          select.addEventListener("change", function () {
            select.classList.toggle("text-ink-soft/60", !select.value);
          });
        }
      });
    }

    radios.forEach(function (input) {
      input.addEventListener("change", function () {
        if (input.checked) applyAudience(input.value);
      });
    });

    var checkedRadio = radios.filter(function (input) {
      return input.checked;
    })[0];
    if (checkedRadio) applyAudience(checkedRadio.value);

    /* Any audience card or footer link pre-selects the form and scrolls to it,
       matching the shared conversion action in the React app. */
    Array.prototype.slice.call(document.querySelectorAll("[data-audience]")).forEach(function (button) {
      button.addEventListener("click", function () {
        var audienceId = button.getAttribute("data-audience");
        var matchingRadio = radios.filter(function (input) {
          return input.value === audienceId;
        })[0];

        if (matchingRadio) {
          matchingRadio.checked = true;
          applyAudience(audienceId);
        }

        var target = document.getElementById("enquire");
        if (!target) return;
        var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        target.scrollIntoView({
          behavior: reduceMotion ? "auto" : "smooth",
          block: "start",
        });
      });
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var status = form.querySelector("[data-demo-status]");
      if (!status) {
        status = document.createElement("p");
        status.setAttribute("data-demo-status", "");
        status.setAttribute("role", "status");
        status.setAttribute("tabindex", "-1");
        form.appendChild(status);
      }
      status.textContent =
        "This is a design preview — no details have been sent. For a genuine enquiry, please call 0121 714 1658 or email info@gspropertygroup.co.uk.";
      status.focus({ preventScroll: false });
    });
  }
})();
