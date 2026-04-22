/* LUMISCA theme — vanilla JS, no framework. Every feature is self-
   contained and guarded so missing nodes do not throw. */
(function () {
  "use strict";
  var L = (window.LUMISCA = window.LUMISCA || {});
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var store = {
    get: function (k) { try { return JSON.parse(localStorage.getItem(k)); } catch (_) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (_) {} }
  };
  function formatMoney(cents) {
    var amount = (cents / 100).toFixed(2);
    return "£" + amount;
  }
  function on(el, ev, fn) { if (el) el.addEventListener(ev, fn); }
  function emit(name, detail) { document.dispatchEvent(new CustomEvent(name, { detail: detail })); }

  /* Announcement bar rotator */
  (function announcementBar() {
    var root = $("[data-announcement]");
    if (!root) return;
    var items = $$("[data-announcement-item]", root);
    if (items.length < 2) return;
    var i = 0;
    var rotateMs = parseInt(root.getAttribute("data-rotate-ms"), 10) || 4000;
    items.forEach(function (el, idx) { el.classList.toggle("is-active", idx === 0); });
    setInterval(function () {
      items[i].classList.remove("is-active");
      i = (i + 1) % items.length;
      items[i].classList.add("is-active");
    }, rotateMs);
  })();

  /* Mobile nav open/close */
  (function mobileNav() {
    var nav = $("[data-mobile-nav]");
    var open = $("[data-mobile-nav-open]");
    var close = $$("[data-mobile-nav-close]");
    if (!nav) return;
    function show() { nav.classList.add("is-open"); document.body.style.overflow = "hidden"; }
    function hide() { nav.classList.remove("is-open"); document.body.style.overflow = ""; }
    on(open, "click", show);
    close.forEach(function (btn) { on(btn, "click", hide); });
  })();

  /* Cart drawer ------------------------------------------------------ */
  var Cart = {
    drawer: null,
    open: function () {
      if (!this.drawer) this.drawer = $("[data-cart-drawer]");
      if (this.drawer) { this.drawer.classList.add("is-open"); document.body.style.overflow = "hidden"; }
    },
    close: function () {
      if (this.drawer) { this.drawer.classList.remove("is-open"); document.body.style.overflow = ""; }
    },
    fetch: function () {
      return fetch("/cart.js", { headers: { Accept: "application/json" } }).then(function (r) { return r.json(); });
    },
    render: function (cart) {
      var body = $("[data-cart-body]");
      var footer = $("[data-cart-footer]");
      var count = $$("[data-cart-count]");
      var subtotal = $("[data-cart-subtotal]");
      count.forEach(function (n) { n.textContent = cart.item_count; n.classList.toggle("hidden", cart.item_count === 0); });
      if (subtotal) subtotal.textContent = formatMoney(cart.total_price);
      if (!body) return;
      if (cart.item_count === 0) {
        body.innerHTML = '<div class="cart-empty"><p class="eyebrow">Your cart is empty</p><p class="muted" style="max-width:260px;margin:.5rem auto 1.5rem;">Add a Lumisca device to start your at-home light therapy routine.</p><a href="/collections/all" class="btn btn-red">Shop The Collection</a></div>';
        if (footer) footer.classList.add("hidden");
        this.renderFreeShip(0);
        return;
      }
      if (footer) footer.classList.remove("hidden");
      var html = '<ul class="cart-items">';
      cart.items.forEach(function (it) {
        html += '<li class="cart-item" data-line-key="' + it.key + '">';
        html += '  <div class="cart-item-img ph aspect-square"><span class="ph-label">' + (it.product_title.split(" ").slice(-3).join(" ")) + '</span></div>';
        html += '  <div class="cart-item-body">';
        html += '    <a href="' + it.url + '" class="cart-item-title">' + it.product_title + '</a>';
        html += '    <p class="muted" style="font-size:13px;">' + formatMoney(it.final_price) + '</p>';
        html += '    <div class="cart-item-qty">';
        html += '      <button class="qty-btn" data-cart-qty="-1" aria-label="Decrease">−</button>';
        html += '      <span>' + it.quantity + '</span>';
        html += '      <button class="qty-btn" data-cart-qty="1" aria-label="Increase">+</button>';
        html += '      <button class="cart-remove" data-cart-remove>Remove</button>';
        html += '    </div>';
        html += '  </div>';
        html += '</li>';
      });
      html += "</ul>";
      var hasBundle = cart.items.some(function (i) { return i.handle === L.bundle_handle; });
      if (!hasBundle && cart.item_count > 0 && cart.item_count < 3) {
        html += '<div class="cart-upsell"><p class="eyebrow" style="color:var(--gold)">Upgrade &amp; Save £174</p><h3>Go Complete — save 58%</h3><p style="color:rgba(249,247,244,.7)">All 3 devices for just £124.99.</p><a class="btn btn-red btn-block" href="/products/' + L.bundle_handle + '">View The Bundle</a></div>';
      }
      body.innerHTML = html;
      this.renderFreeShip(cart.total_price);
    },
    renderFreeShip: function (cents) {
      var threshold = L.free_shipping_threshold || 5000;
      var bar = $("[data-fs-bar]");
      var fill = $("[data-fs-fill]");
      var msg = $("[data-fs-msg]");
      if (!bar) return;
      var pct = Math.min(100, (cents / threshold) * 100);
      if (fill) fill.style.width = pct + "%";
      if (msg) {
        if (cents >= threshold) msg.innerHTML = "🎉 You've unlocked free UK delivery";
        else msg.innerHTML = "You're <strong>" + formatMoney(threshold - cents) + "</strong> away from free UK delivery";
      }
    },
    add: function (variantId, qty) {
      return fetch(L.routes.cart_add_url + ".js", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ items: [{ id: variantId, quantity: qty || 1 }] })
      })
        .then(function (r) { return r.json(); })
        .then(function (added) {
          emit("lumisca:added", added);
          return Cart.fetch();
        })
        .then(function (cart) { Cart.render(cart); Cart.open(); });
    },
    change: function (key, quantity) {
      return fetch(L.routes.cart_change_url + ".js", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ id: key, quantity: quantity })
      })
        .then(function (r) { return r.json(); })
        .then(function (cart) { Cart.render(cart); });
    }
  };
  window.LumiscaCart = Cart;

  document.addEventListener("click", function (e) {
    var openBtn = e.target.closest("[data-cart-open]");
    if (openBtn) {
      e.preventDefault();
      Cart.fetch()
        .then(function (cart) { Cart.render(cart); })
        .then(function () { Cart.open(); });
      return;
    }
    var closeBtn = e.target.closest("[data-cart-close]");
    if (closeBtn) { e.preventDefault(); Cart.close(); return; }
    var qtyBtn = e.target.closest("[data-cart-qty]");
    if (qtyBtn) {
      var delta = parseInt(qtyBtn.getAttribute("data-cart-qty"), 10);
      var line = qtyBtn.closest("[data-line-key]");
      if (line) {
        var key = line.getAttribute("data-line-key");
        var qtyEl = line.querySelector(".cart-item-qty span");
        var current = parseInt(qtyEl.textContent, 10) || 1;
        Cart.change(key, current + delta);
      }
      return;
    }
    var rmBtn = e.target.closest("[data-cart-remove]");
    if (rmBtn) {
      var line2 = rmBtn.closest("[data-line-key]");
      if (line2) Cart.change(line2.getAttribute("data-line-key"), 0);
      return;
    }
  });

  document.addEventListener("submit", function (e) {
    var form = e.target.closest("[data-product-form]");
    if (!form) return;
    e.preventDefault();
    var variantId = form.querySelector("[name=id]").value;
    var qty = parseInt((form.querySelector("[name=quantity]") || { value: 1 }).value, 10) || 1;
    var btn = form.querySelector("[data-atc-btn]");
    if (btn) { btn.disabled = true; btn.dataset.label = btn.textContent; btn.textContent = "Adding…"; }
    Cart.add(variantId, qty).finally(function () {
      if (btn) { btn.disabled = false; btn.textContent = btn.dataset.label; }
    });
  });

  /* Cart upsell popup: on first add if single product */
  document.addEventListener("lumisca:added", function (e) {
    var added = (e.detail && e.detail.items) ? e.detail.items[0] : e.detail;
    if (!added || added.handle === L.bundle_handle) return;
    Cart.fetch().then(function (cart) {
      var hasBundle = cart.items.some(function (i) { return i.handle === L.bundle_handle; });
      if (hasBundle) return;
      var popup = $("[data-upsell-popup]");
      if (popup) setTimeout(function () { popup.classList.add("is-open"); }, 800);
    });
  });

  /* Popups (welcome + exit + upsell + cookie) ----------------------- */
  function showPopup(el) { if (el) el.classList.add("is-open"); }
  function hidePopup(el) { if (el) el.classList.remove("is-open"); }

  document.addEventListener("click", function (e) {
    var closer = e.target.closest("[data-popup-close]");
    if (closer) {
      var p = closer.closest(".popup");
      hidePopup(p);
      if (p) store.set(p.getAttribute("data-popup-key"), 1);
    }
    var bd = e.target.closest(".popup-backdrop");
    if (bd) {
      var pp = bd.closest(".popup");
      hidePopup(pp);
      if (pp) store.set(pp.getAttribute("data-popup-key"), 1);
    }
  });

  (function welcome() {
    var p = $("[data-popup=welcome]");
    if (!p || store.get("lumisca.welcome")) return;
    setTimeout(function () { showPopup(p); }, 8000);
  })();

  (function exitIntent() {
    var p = $("[data-popup=exit]");
    if (!p || store.get("lumisca.exit")) return;
    var fired = false;
    function welcomeSettled() {
      // Wait until the welcome flow has been dismissed/submitted before arming the exit popup.
      // Prevents the "welcome + exit stacked" race and ensures new visitors see welcome first.
      return document.cookie.indexOf("lumisca_welcome_seen=") !== -1;
    }
    function welcomeOpen() {
      var wm = document.querySelector("[data-welcome-modal]");
      return wm && wm.classList.contains("is-open");
    }
    var trigger = function () {
      if (fired) return;
      if (welcomeOpen()) return;      // never overlap the welcome modal
      if (!welcomeSettled()) return;  // wait until welcome has been seen and dismissed
      fired = true;
      showPopup(p);
    };
    document.addEventListener("mouseleave", function (e) {
      if (e.clientY <= 0 && e.relatedTarget == null) trigger();
    });
    if (window.matchMedia && window.matchMedia("(max-width: 768px)").matches) {
      setTimeout(trigger, 40000);
    }
  })();

  document.addEventListener("submit", function (e) {
    var form = e.target.closest("[data-popup-form]");
    if (!form) return;
    e.preventDefault();
    var success = form.querySelector("[data-popup-success]");
    var main = form.querySelector("[data-popup-main]");
    if (main) main.classList.add("hidden");
    if (success) success.classList.remove("hidden");
    var popup = form.closest(".popup");
    if (popup) store.set(popup.getAttribute("data-popup-key"), 1);
    setTimeout(function () { hidePopup(popup); }, 2400);
  });

  /* Recent purchase toast */
  (function toast() {
    var t = $("[data-toast=recent]");
    if (!t) return;
    var names = ["Sarah","David","Claire","Priya","James","Emma","Tom","Rachel"];
    var locs = ["Manchester","Leeds","Edinburgh","London","Birmingham","Dublin","Glasgow","Bristol"];
    var prods = ["Pro Hair Growth Cap","Glow Face Mask","Rest Heated Eye Mask","Complete Bundle"];
    function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
    function show() {
      t.querySelector("[data-toast-name]").textContent = pick(names);
      t.querySelector("[data-toast-loc]").textContent = pick(locs);
      t.querySelector("[data-toast-product]").textContent = pick(prods);
      t.querySelector("[data-toast-mins]").textContent = (2 + Math.floor(Math.random() * 20)) + " mins ago";
      t.classList.add("is-open");
      setTimeout(function () { t.classList.remove("is-open"); }, 5000);
      setTimeout(show, 60000 + Math.random() * 30000);
    }
    setTimeout(show, 15000);
  })();

  /* Cookie consent */
  (function cookie() {
    var c = $("[data-cookie]");
    if (!c) return;
    if (document.cookie.indexOf("lumisca.consent=") === -1) {
      setTimeout(function () { c.classList.add("is-open"); }, 1200);
    }
    function setCookie(v) {
      var d = new Date(); d.setFullYear(d.getFullYear() + 1);
      document.cookie = "lumisca.consent=" + v + "; expires=" + d.toUTCString() + "; path=/; SameSite=Lax";
    }
    on($("[data-cookie-accept]"), "click", function () { setCookie("accepted"); c.classList.remove("is-open"); });
    on($("[data-cookie-decline]"), "click", function () { setCookie("declined"); c.classList.remove("is-open"); });
  })();

  /* Back to top */
  (function backTop() {
    var b = $("[data-back-top]");
    if (!b) return;
    function check() { b.classList.toggle("is-open", window.scrollY > 400); }
    window.addEventListener("scroll", check, { passive: true });
    on(b, "click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
    check();
  })();

  /* Countdown timers */
  function pad(n) { return String(n).padStart(2, "0"); }
  function tickCountdowns() {
    $$("[data-countdown]").forEach(function (el) {
      var mode = el.getAttribute("data-countdown");
      var now = new Date(); var target;
      if (mode === "daily") {
        target = new Date(); target.setHours(24, 0, 0, 0);
      } else {
        target = new Date(); target.setHours(15, 0, 0, 0);
        if (now >= target) target.setDate(target.getDate() + 1);
      }
      var diff = target - now;
      var h = Math.floor(diff / 3600000);
      var m = Math.floor((diff % 3600000) / 60000);
      var s = Math.floor((diff % 60000) / 1000);
      var hEl = el.querySelector("[data-cd-h]"); if (hEl) hEl.textContent = pad(h);
      var mEl = el.querySelector("[data-cd-m]"); if (mEl) mEl.textContent = pad(m);
      var sEl = el.querySelector("[data-cd-s]"); if (sEl) sEl.textContent = pad(s);
    });
    $$("[data-dispatch-text]").forEach(function (el) {
      var now = new Date();
      var cutoff = new Date(); cutoff.setHours(15, 0, 0, 0);
      if (now >= cutoff) cutoff.setDate(cutoff.getDate() + 1);
      var diff = cutoff - now;
      var h = Math.floor(diff / 3600000);
      var m = Math.floor((diff % 3600000) / 60000);
      var daysToAdd = now >= cutoff ? 4 : 3;
      var delivery = new Date(now); delivery.setDate(delivery.getDate() + daysToAdd);
      while (delivery.getDay() === 0 || delivery.getDay() === 6) delivery.setDate(delivery.getDate() + 1);
      var dStr = delivery.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
      el.innerHTML = "Order in the next <strong>" + h + "h " + pad(m) + "m</strong> for delivery by <strong>" + dStr + "</strong>";
    });
  }
  tickCountdowns();
  setInterval(tickCountdowns, 1000);

  /* Accordion */
  document.addEventListener("click", function (e) {
    var t = e.target.closest(".accordion-trigger");
    if (!t) return;
    var item = t.closest(".accordion-item");
    if (item) item.classList.toggle("is-open");
  });

  /* Product gallery */
  document.addEventListener("click", function (e) {
    var th = e.target.closest("[data-gallery-thumb]");
    if (!th) return;
    var gallery = th.closest("[data-gallery]");
    if (!gallery) return;
    var src = th.getAttribute("data-gallery-thumb");
    var label = th.getAttribute("data-gallery-label") || "";
    var main = gallery.querySelector("[data-gallery-main]");
    $$("[data-gallery-thumb]", gallery).forEach(function (b) { b.classList.remove("is-active"); });
    th.classList.add("is-active");
    if (main) {
      if (src && src !== "") {
        main.innerHTML = '<img src="' + src + '" alt="' + label + '" loading="lazy">';
        main.classList.remove("ph");
      } else {
        main.classList.add("ph");
        main.innerHTML = '<span class="ph-label">' + label + '</span>';
      }
    }
  });

  /* Product quantity */
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-qty-step]");
    if (!b) return;
    var input = b.closest("[data-qty]").querySelector("input");
    var d = parseInt(b.getAttribute("data-qty-step"), 10);
    var v = parseInt(input.value, 10) || 1;
    input.value = Math.max(1, v + d);
  });

  /* Sticky ATC observer */
  (function stickyATC() {
    var main = $("[data-main-atc]");
    var sticky = $("[data-sticky-atc]");
    if (!main || !sticky || !("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var below = !en.isIntersecting && en.boundingClientRect.top < 0;
        sticky.classList.toggle("is-open", below);
      });
    }, { threshold: 0 });
    io.observe(main);
  })();

  /* Product tabs */
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-tab]");
    if (!t) return;
    var group = t.closest("[data-tabs]");
    if (!group) return;
    var id = t.getAttribute("data-tab");
    $$("[data-tab]", group).forEach(function (b) { b.classList.toggle("is-active", b === t); });
    $$("[data-tab-panel]", group).forEach(function (p) {
      p.classList.toggle("is-active", p.getAttribute("data-tab-panel") === id);
    });
  });

  /* Collection filter/sort */
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-filter]");
    if (!b) return;
    var val = b.getAttribute("data-filter");
    var group = b.closest("[data-filters]");
    if (!group) return;
    $$("[data-filter]", group).forEach(function (x) { x.classList.toggle("is-active", x === b); });
    var grid = document.querySelector("[data-collection-grid]");
    if (!grid) return;
    $$("[data-cat]", grid).forEach(function (card) {
      var cat = (card.getAttribute("data-cat") || "").toLowerCase();
      var tags = (card.getAttribute("data-tags") || "").toLowerCase().split(",");
      var match = val === "all" || cat === val || tags.indexOf(val) > -1;
      card.classList.toggle("hidden", !match);
    });
  });

  var sort = $("[data-sort]");
  if (sort) sort.addEventListener("change", function () {
    var grid = $("[data-collection-grid]");
    if (!grid) return;
    var cards = $$("[data-cat]", grid);
    var mode = sort.value;
    cards.sort(function (a, b) {
      var pa = parseFloat(a.getAttribute("data-price")) || 0;
      var pb = parseFloat(b.getAttribute("data-price")) || 0;
      var ra = parseFloat(a.getAttribute("data-rating")) || 0;
      var rb = parseFloat(b.getAttribute("data-rating")) || 0;
      if (mode === "price-asc") return pa - pb;
      if (mode === "price-desc") return pb - pa;
      if (mode === "rating") return rb - ra;
      return 0;
    });
    cards.forEach(function (c) { grid.appendChild(c); });
  });

  /* Header scrolled state */
  (function header() {
    var h = $("[data-header]");
    if (!h) return;
    function check() { h.classList.toggle("is-scrolled", window.scrollY > 10); }
    window.addEventListener("scroll", check, { passive: true });
    check();
  })();

  /* Fade-up on scroll */
  (function fadeUp() {
    var items = $$("[data-fade-up]");
    if (items.length === 0) return;
    if (!("IntersectionObserver" in window)) { items.forEach(function (el) { el.classList.add("is-visible"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    items.forEach(function (el) { io.observe(el); });
  })();

  /* Video-demo: autoplay on mobile, play-on-hover on desktop */
  (function videoDemo() {
    var vids = $$(".video-demo-video");
    if (vids.length === 0) return;
    var mobile = window.matchMedia && window.matchMedia("(max-width: 768px)").matches;
    vids.forEach(function (v) {
      if (mobile && v.hasAttribute("data-autoplay-mobile")) {
        var p = v.play();
        if (p && typeof p.catch === "function") p.catch(function () {});
        return;
      }
      var card = v.closest(".video-demo-card") || v;
      card.addEventListener("mouseenter", function () {
        var p = v.play();
        if (p && typeof p.catch === "function") p.catch(function () {});
      });
      card.addEventListener("mouseleave", function () { v.pause(); v.currentTime = 0; });
    });
  })();

  /* Initial cart load to sync count */
  Cart.fetch().then(function (cart) { Cart.render(cart); }).catch(function () {});
})();
