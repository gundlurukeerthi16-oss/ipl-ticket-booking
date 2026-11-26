function showToast(message, type = "info", duration = 3000) {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.setAttribute("aria-live", "polite");
    container.style.cssText =
      "position:fixed;bottom:20px;right:20px;display:flex;flex-direction:column;gap:10px;z-index:9999;max-width:340px;";
    document.body.appendChild(container);
  }

  const colors = {
    info: { bg: "#003874", border: "#ff6a00", text: "#ffffff" },
    success: { bg: "#065f46", border: "#34d399", text: "#ffffff" },
    error: { bg: "#7f1d1d", border: "#f87171", text: "#ffffff" },
  };
  const theme = colors[type] || colors.info;

  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.cssText = `background:${theme.bg};color:${theme.text};border-left:4px solid ${theme.border};padding:12px 16px;border-radius:6px;box-shadow:0 6px 18px rgba(0,0,0,0.25);font-size:0.92rem;font-weight:500;opacity:0;transform:translateY(10px);transition:opacity 0.25s ease,transform 0.25s ease;`;

  container.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";
  });

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    toast.addEventListener("transitionend", () => toast.remove(), { once: true });
  }, duration);
}

document.addEventListener("DOMContentLoaded", () => {
  const bookingSection =
    document.querySelector("#booking-form") ||
    document.querySelector("#booking") ||
    document.querySelector(".booking-wrapper") ||
    document.querySelector("form");

  const bookButtons = document.querySelectorAll(
    "[data-book-match], .book-btn, .btn-book, table button, table a, a[href*='booking']"
  );

  bookButtons.forEach((btn) => {
    const text = btn.textContent.trim().toLowerCase();
    if (!btn.matches("[data-book-match], .book-btn, .btn-book, a[href*='booking']") && !text.startsWith("book")) {
      return;
    }

    btn.addEventListener("click", (e) => {
      if (btn.tagName === "A" && btn.getAttribute("href")?.startsWith("#")) {
        e.preventDefault();
      }

      const row = btn.closest("tr");
      const matchName =
        btn.dataset.match ||
        (row ? row.cells[0]?.textContent.trim() : "") ||
        "selected match";

      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      showToast(`Scrolling to booking form for ${matchName}...`, "info");
    });
  });

  const form = document.querySelector("#booking-form") || document.querySelector("form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      showToast("Booking details submitted!", "success");
    });
  }
});
function showToast(message, type = "info", duration = 3000) {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.setAttribute("aria-live", "polite");
    container.style.cssText =
      "position:fixed;bottom:20px;right:20px;display:flex;flex-direction:column;gap:10px;z-index:9999;max-width:340px;";
    document.body.appendChild(container);
  }

  const colors = {
    info: { bg: "#003874", border: "#ff6a00", text: "#ffffff" },
    success: { bg: "#065f46", border: "#34d399", text: "#ffffff" },
    error: { bg: "#7f1d1d", border: "#f87171", text: "#ffffff" },
  };
  const theme = colors[type] || colors.info;

  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.cssText = `background:${theme.bg};color:${theme.text};border-left:4px solid ${theme.border};padding:12px 16px;border-radius:6px;box-shadow:0 6px 18px rgba(0,0,0,0.25);font-size:0.92rem;font-weight:500;opacity:0;transform:translateY(10px);transition:opacity 0.25s ease,transform 0.25s ease;`;

  container.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";
  });

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    toast.addEventListener("transitionend", () => toast.remove(), { once: true });
  }, duration);
}

document.addEventListener("DOMContentLoaded", () => {
  // Smooth scroll from Book buttons to booking form
  const bookingSection =
    document.querySelector("#booking-form") ||
    document.querySelector("#booking") ||
    document.querySelector(".booking-wrapper") ||
    document.querySelector("form");

  const bookButtons = document.querySelectorAll(
    "[data-book-match], .book-btn, .btn-book, table button, table a, a[href*='booking']"
  );

  bookButtons.forEach((btn) => {
    const text = btn.textContent.trim().toLowerCase();
    if (
      !btn.matches("[data-book-match], .book-btn, .btn-book, a[href*='booking']") &&
      !text.startsWith("book")
    ) {
      return;
    }

    btn.addEventListener("click", (e) => {
      if (btn.tagName === "A" && btn.getAttribute("href")?.startsWith("#")) {
        e.preventDefault();
      }

      const row = btn.closest("tr");
      const matchName =
        btn.dataset.match ||
        (row ? row.cells[0]?.textContent.trim() : "") ||
        "selected match";

      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      showToast(`Scrolling to booking form for ${matchName}...`, "info");
    });
  });

  // Activity 7: Live Booking Summary & Total Price
  const matchSelect = document.getElementById("matchSelect");
  const standSelect = document.getElementById("standCategory");
  const qtyInput = document.getElementById("ticketCount");

  const summaryMatch = document.querySelector("#summary-match");
  const summaryStand = document.querySelector("#summary-stand");
  const summaryQty = document.querySelector("#summary-qty");
  const summaryUnitPrice = document.querySelector("#summary-unit-price");
  const summaryTotal = document.querySelector("#summary-total");

  const standPrices = {
    "General Stand": 800,
    "Pavilion Terrace": 1800,
    "Club House": 3500,
    "VIP Hospitality Box": 7500,
  };

  function updateBookingSummary(notify = false) {
    if (!matchSelect || !standSelect || !qtyInput || !summaryTotal) return;

    const selectedMatch = matchSelect.value || "Not selected";
    const selectedStand = standSelect.value || "Not selected";

    let qty = parseInt(qtyInput.value, 10);
    if (Number.isNaN(qty) || qty < 1) {
      qty = 0;
    } else if (qty > 10) {
      qty = 10;
      qtyInput.value = 10;
    }

    const unitPrice = standPrices[selectedStand] || 0;
    const totalPrice = unitPrice * qty;

    if (summaryMatch) summaryMatch.textContent = selectedMatch;
    if (summaryStand) summaryStand.textContent = selectedStand;
    if (summaryQty) summaryQty.textContent = String(qty);
    if (summaryUnitPrice) {
      summaryUnitPrice.textContent = `₹${unitPrice.toLocaleString("en-IN")}`;
    }
    summaryTotal.textContent = `₹${totalPrice.toLocaleString("en-IN")}`;

    if (notify) {
      showToast(
        `Summary updated: ${qty} ticket(s) — Total ₹${totalPrice.toLocaleString("en-IN")}`,
        "info"
      );
    }
  }

  if (matchSelect && standSelect && qtyInput) {
    matchSelect.addEventListener("change", () => updateBookingSummary(true));
    standSelect.addEventListener("change", () => updateBookingSummary(true));
    qtyInput.addEventListener("change", () => updateBookingSummary(true));
    qtyInput.addEventListener("input", () => updateBookingSummary(false));
    updateBookingSummary(false);
  }
});