/**
 * MoneyCheck - ふたりの家計簿
 * Frontend Application
 */

// === Configuration ===
// Google Apps Script Web App URL (デプロイ後に設定)
const CONFIG = {
  GAS_URL: "https://script.google.com/macros/s/AKfycbyzOo0yGsVPfcWbyTI1KdWBDSpQfKdcyi3GZuoJSVPQoucvFa15S5wQb_IeLYCHVzz8/exec",
};

// === State ===
const state = {
  currentUser: null, // { index: 0|1, name: "..." }
  users: [{ name: "としひこ" }, { name: "あつこ" }],
  categories: {
    expense: ["食費", "家賃", "光熱費", "通信費", "交通費", "日用品", "娯楽", "医療", "衣服", "その他"],
    income: ["給与", "副収入", "その他"],
  },
  currentMonth: new Date(),
  transactionType: "expense",
};

// === DOM Elements ===
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// === Templates ===
const DEFAULT_TEMPLATES = [
  { label: "スーパー", category: "食費", memo: "スーパーで買い物" },
  { label: "外食", category: "食費", memo: "外食" },
  { label: "家賃", category: "家賃", memo: "家賃" },
  { label: "電気", category: "光熱費", memo: "電気代" },
  { label: "水道", category: "光熱費", memo: "水道代" },
  { label: "ガス", category: "光熱費", memo: "ガス代" },
  { label: "スマホ", category: "通信費", memo: "スマホ代" },
  { label: "電車", category: "交通費", memo: "電車" },
  { label: "日用品", category: "日用品", memo: "日用品" },
  { label: "娯楽", category: "娯楽", memo: "" },
  { label: "病院", category: "医療", memo: "病院" },
  { label: "給与", category: "給与", memo: "給与", type: "income" },
];

// === Initialization ===
document.addEventListener("DOMContentLoaded", () => {
  initDate();
  initTabs();
  initToggle();
  initTemplates();
  initForm();
  initMonthSelector();
  initLogout();
  loadConfig();
});

function loadConfig() {
  renderLoginButtons();
}

// === Login ===
function renderLoginButtons() {
  const btn0 = $("#btn-user0");
  const btn1 = $("#btn-user1");
  if (!btn0 || !btn1) return;

  btn0.textContent = state.users[0].name;
  btn1.textContent = state.users[1].name;

  [btn0, btn1].forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.dataset.user);
      state.currentUser = { index: idx, name: state.users[idx].name };
      $("#login-screen").classList.add("hidden");
      $("#app-screen").classList.remove("hidden");
      updateCategories();
      loadSummary();
    });
  });
}

// === Logout ===
function initLogout() {
  const btn = $("#btn-logout");
  if (btn) {
    btn.addEventListener("click", () => {
      state.currentUser = null;
      $("#app-screen").classList.add("hidden");
      $("#login-screen").classList.remove("hidden");
    });
  }
}

// === Date Init ===
function initDate() {
  const dateInput = $("#input-date");
  if (dateInput) {
    dateInput.value = formatDateForInput(new Date());
  }
}

// === Tabs ===
function initTabs() {
  $$(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      $$(".tab").forEach((t) => t.classList.remove("active"));
      $$(".tab-content").forEach((c) => c.classList.remove("active"));
      tab.classList.add("active");
      $(`#tab-${tab.dataset.tab}`).classList.add("active");

      if (tab.dataset.tab === "summary") {
        loadSummary();
      }
    });
  });
}

// === Toggle (Income/Expense) ===
function initToggle() {
  $$(".toggle").forEach((toggle) => {
    toggle.addEventListener("click", () => {
      $$(".toggle").forEach((t) => t.classList.remove("active"));
      toggle.classList.add("active");
      state.transactionType = toggle.dataset.type;
      updateCategories();
    });
  });
}

function updateCategories() {
  const select = $("#input-category");
  if (!select) return;
  const cats = state.categories[state.transactionType] || [];
  select.innerHTML = '<option value="">選択してください</option>';
  cats.forEach((cat) => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    select.appendChild(opt);
  });
}

// === Templates ===
function getTemplates() {
  const saved = localStorage.getItem("moneycheck_templates");
  if (saved) return JSON.parse(saved);
  return [...DEFAULT_TEMPLATES];
}

function saveTemplates(templates) {
  localStorage.setItem("moneycheck_templates", JSON.stringify(templates));
}

function initTemplates() {
  renderTemplates();
  initTemplateEdit();
  initTemplateModal();
}

function renderTemplates() {
  const list = $("#template-list");
  if (!list) return;

  const templates = getTemplates();
  const isEditing = list.classList.contains("editing");

  list.innerHTML = templates.map((t, i) => `
    <button type="button" class="template-btn" data-index="${i}">
      ${escapeHtml(t.label)}${isEditing ? '<span class="delete-badge">\u00D7</span>' : ""}
    </button>
  `).join("") + (isEditing ? `
    <button type="button" class="template-btn add-btn" id="btn-add-template">＋ 追加</button>
  ` : "");

  // Re-bind click events
  list.querySelectorAll(".template-btn:not(.add-btn)").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.dataset.index);
      const t = getTemplates()[idx];

      if (isEditing) {
        // Delete mode
        const templates = getTemplates();
        templates.splice(idx, 1);
        saveTemplates(templates);
        renderTemplates();
        return;
      }

      const type = t.type || "expense";
      state.transactionType = type;
      $$(".toggle").forEach((tog) => {
        tog.classList.toggle("active", tog.dataset.type === type);
      });
      updateCategories();
      $("#input-category").value = t.category;
      $("#input-memo").value = t.memo;
      $("#input-amount").focus();
    });
  });

  const addBtn = list.querySelector("#btn-add-template");
  if (addBtn) {
    addBtn.addEventListener("click", () => openTemplateModal());
  }
}

function initTemplateEdit() {
  const editBtn = $("#btn-edit-templates");
  if (!editBtn) return;

  editBtn.addEventListener("click", () => {
    const list = $("#template-list");
    const isEditing = list.classList.toggle("editing");
    editBtn.textContent = isEditing ? "完了" : "編集";
    renderTemplates();
  });
}

function initTemplateModal() {
  const modal = $("#template-modal");
  if (!modal) return;

  // Toggle for modal
  $$(".tpl-toggle").forEach((tog) => {
    tog.addEventListener("click", () => {
      $$(".tpl-toggle").forEach((t) => t.classList.remove("active"));
      tog.classList.add("active");
      fillModalCategories(tog.dataset.type);
    });
  });

  $("#btn-tpl-cancel").addEventListener("click", closeTemplateModal);
  modal.querySelector(".modal-backdrop").addEventListener("click", closeTemplateModal);

  $("#btn-tpl-save").addEventListener("click", () => {
    const label = $("#tpl-label").value.trim();
    const category = $("#tpl-category").value;
    const memo = $("#tpl-memo").value.trim();
    const type = modal.querySelector(".tpl-toggle.active").dataset.type;

    if (!label || !category) {
      alert("名前とカテゴリを入力してください");
      return;
    }

    const templates = getTemplates();
    templates.push({ label, category, memo, type: type === "income" ? "income" : undefined });
    saveTemplates(templates);
    closeTemplateModal();
    renderTemplates();
  });
}

function openTemplateModal() {
  const modal = $("#template-modal");
  modal.classList.remove("hidden");
  $("#tpl-label").value = "";
  $("#tpl-memo").value = "";
  $$(".tpl-toggle").forEach((t) => {
    t.classList.toggle("active", t.dataset.type === "expense");
  });
  fillModalCategories("expense");
  $("#tpl-label").focus();
}

function fillModalCategories(type) {
  const select = $("#tpl-category");
  const cats = state.categories[type] || [];
  select.innerHTML = cats.map((c) => `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join("");
}

function closeTemplateModal() {
  $("#template-modal").classList.add("hidden");
}

// === Form Submit ===
function initForm() {
  const form = $("#expense-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const amount = parseInt($("#input-amount").value);
    const category = $("#input-category").value;
    const date = $("#input-date").value;
    const memo = $("#input-memo").value.trim();
    const type = state.transactionType;

    if (!amount || !category || !date) return;

    const data = {
      date,
      amount,
      type,
      category,
      user: state.currentUser.name,
      memo,
    };

    const submitBtn = $("#btn-submit");
    submitBtn.disabled = true;
    submitBtn.textContent = "送信中...";

    try {
      await postToGAS("addTransaction", data);
      showFeedback("記録しました！", "success");
      form.reset();
      $("#input-date").value = formatDateForInput(new Date());
      state.transactionType = "expense";
      $$(".toggle").forEach((t) => {
        t.classList.toggle("active", t.dataset.type === "expense");
      });
      updateCategories();
    } catch (err) {
      showFeedback("送信に失敗しました。もう一度お試しください。", "error");
      console.error(err);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "記録する";
    }
  });
}

function showFeedback(message, type) {
  const el = $("#submit-feedback");
  el.textContent = message;
  el.className = `feedback ${type}`;
  el.classList.remove("hidden");
  setTimeout(() => el.classList.add("hidden"), 3000);
}

// === Month Selector ===
function initMonthSelector() {
  const btnPrev = $("#btn-prev-month");
  const btnNext = $("#btn-next-month");

  if (btnPrev) {
    btnPrev.addEventListener("click", () => {
      state.currentMonth.setMonth(state.currentMonth.getMonth() - 1);
      loadSummary();
    });
  }
  if (btnNext) {
    btnNext.addEventListener("click", () => {
      state.currentMonth.setMonth(state.currentMonth.getMonth() + 1);
      loadSummary();
    });
  }
}

// === Summary ===
async function loadSummary() {
  const monthStr = formatMonth(state.currentMonth);
  $("#current-month").textContent = formatMonthDisplay(state.currentMonth);

  // Set user names
  if (state.users[0]) {
    $("#summary-user0-name").textContent = state.users[0].name;
  }
  if (state.users[1]) {
    $("#summary-user1-name").textContent = state.users[1].name;
  }

  try {
    showLoading(true);
    const data = await getFromGAS("getTransactions", { month: monthStr });

    if (!data || !data.transactions) {
      renderEmptySummary();
      return;
    }

    renderSummary(data.transactions);
  } catch (err) {
    console.error("Failed to load summary:", err);
    renderEmptySummary();
  } finally {
    showLoading(false);
  }
}

function renderSummary(transactions) {
  // Calculate totals
  const totals = { income: 0, expense: 0 };
  const userTotals = [{income: 0, expense: 0}, {income: 0, expense: 0}];
  const categoryTotals = {};

  transactions.forEach((t) => {
    const amount = parseInt(t.amount) || 0;
    totals[t.type] += amount;

    // Match user
    const userIdx = state.users.findIndex((u) => u.name === t.user);
    if (userIdx >= 0) {
      userTotals[userIdx][t.type] += amount;
    }

    // Category totals (expenses only)
    if (t.type === "expense") {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + amount;
    }
  });

  // Update summary cards
  const fmt = (n) => n.toLocaleString();
  $("#summary-total-income").textContent = `+\u00A5${fmt(totals.income)}`;
  $("#summary-total-expense").textContent = `-\u00A5${fmt(totals.expense)}`;
  const balance = totals.income - totals.expense;
  $("#summary-total-balance").textContent = `${balance >= 0 ? "" : "-"}\u00A5${fmt(Math.abs(balance))}`;
  $("#summary-total-balance").style.color = balance >= 0 ? "var(--income)" : "var(--expense)";

  $("#summary-user0-income").textContent = `+\u00A5${fmt(userTotals[0].income)}`;
  $("#summary-user0-expense").textContent = `-\u00A5${fmt(userTotals[0].expense)}`;
  $("#summary-user1-income").textContent = `+\u00A5${fmt(userTotals[1].income)}`;
  $("#summary-user1-expense").textContent = `-\u00A5${fmt(userTotals[1].expense)}`;

  // Category breakdown
  const catList = $("#category-list");
  const maxCat = Math.max(...Object.values(categoryTotals), 1);
  const sorted = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);

  if (sorted.length === 0) {
    catList.innerHTML = '<p class="empty-state">支出データがありません</p>';
  } else {
    catList.innerHTML = sorted.map(([name, amount]) => `
      <div class="category-row">
        <span class="category-name">${escapeHtml(name)}</span>
        <div class="category-bar-wrap">
          <div class="category-bar" style="width:${(amount / maxCat * 100)}%"></div>
        </div>
        <span class="category-amount">\u00A5${fmt(amount)}</span>
      </div>
    `).join("");
  }

  // Transaction list (sorted by date desc)
  const txList = $("#transaction-list");
  const sortedTx = [...transactions].sort((a, b) => b.date.localeCompare(a.date));

  if (sortedTx.length === 0) {
    txList.innerHTML = '<p class="empty-state">データがありません</p>';
  } else {
    txList.innerHTML = sortedTx.map((t) => `
      <div class="transaction-row">
        <div class="transaction-info">
          <span class="transaction-category">${escapeHtml(t.category)}</span>
          <span class="transaction-meta">${t.date} / ${escapeHtml(t.user)}${t.memo ? " / " + escapeHtml(t.memo) : ""}</span>
        </div>
        <span class="transaction-amount ${t.type}">
          ${t.type === "income" ? "+" : "-"}\u00A5${fmt(parseInt(t.amount))}
        </span>
      </div>
    `).join("");
  }
}

function renderEmptySummary() {
  const fmt = () => "\u00A50";
  $("#summary-total-income").textContent = `+${fmt()}`;
  $("#summary-total-expense").textContent = `-${fmt()}`;
  $("#summary-total-balance").textContent = fmt();
  $("#summary-total-balance").style.color = "var(--text)";
  $("#summary-user0-income").textContent = `+${fmt()}`;
  $("#summary-user0-expense").textContent = `-${fmt()}`;
  $("#summary-user1-income").textContent = `+${fmt()}`;
  $("#summary-user1-expense").textContent = `-${fmt()}`;
  $("#category-list").innerHTML = '<p class="empty-state">データがありません</p>';
  $("#transaction-list").innerHTML = '<p class="empty-state">データがありません</p>';
}

// === API Communication ===
async function postToGAS(action, data) {
  if (!CONFIG.GAS_URL) {
    // Offline fallback: save to localStorage
    saveOffline({ action, ...data });
    return { success: true, offline: true };
  }

  const res = await fetch(CONFIG.GAS_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify({ action, ...data }),
  });
  return res.json();
}

async function getFromGAS(action, params = {}) {
  if (!CONFIG.GAS_URL) {
    return getOfflineData(action, params);
  }

  const url = new URL(CONFIG.GAS_URL);
  url.searchParams.set("action", action);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url.toString());
  return res.json();
}

// === Offline Storage ===
function saveOffline(data) {
  const key = "moneycheck_offline";
  const existing = JSON.parse(localStorage.getItem(key) || "[]");
  existing.push({ ...data, id: Date.now() });
  localStorage.setItem(key, JSON.stringify(existing));
}

function getOfflineData(action, params) {
  if (action === "getTransactions") {
    const all = JSON.parse(localStorage.getItem("moneycheck_offline") || "[]");
    const month = params.month; // "YYYY-MM"
    const filtered = all
      .filter((t) => t.action === "addTransaction" && t.date && t.date.startsWith(month));
    return { transactions: filtered };
  }
  return {};
}

// === Utilities ===
function formatDateForInput(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatMonth(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

function formatMonthDisplay(date) {
  return `${date.getFullYear()}年${date.getMonth() + 1}月`;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function showLoading(show) {
  const el = $("#loading");
  if (el) el.classList.toggle("hidden", !show);
}
