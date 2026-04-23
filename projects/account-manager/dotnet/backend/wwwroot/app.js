'use strict';
const BASE = window.LANG_BASE || '';
const API  = BASE + '/api/accounts';

// ── State ─────────────────────────────────────────────────────────────────────

const state = {
  accounts: [],
  filters: { search: '', status: '!3', dateField: '', dateFrom: '', dateTo: '' },
  sort:    { col: 'id', dir: 'asc' },
  page:    1,
  perPage: 20,
  selected: new Set(),
};

// ── Data helpers ──────────────────────────────────────────────────────────────

function getFiltered() {
  const { search, status, dateField, dateFrom, dateTo } = state.filters;
  let list = state.accounts;

  if (search) {
    const q = search.toLowerCase();
    list = list.filter(a =>
      (a.name  || '').toLowerCase().includes(q) ||
      (a.email || '').toLowerCase().includes(q)
    );
  }
  if (status === '!3') list = list.filter(a => a.status !== 3);
  else if (status) list = list.filter(a => String(a.status) === status);
  if (dateField && dateFrom) {
    const ms = new Date(dateFrom).getTime();
    list = list.filter(a => a[dateField] >= ms);
  }
  if (dateField && dateTo) {
    const ms = new Date(dateTo).getTime() + 86399999;
    list = list.filter(a => a[dateField] <= ms);
  }

  const { col, dir } = state.sort;
  return [...list].sort((a, b) => {
    let va = a[col] ?? '', vb = b[col] ?? '';
    if (typeof va === 'string') va = va.toLowerCase();
    if (typeof vb === 'string') vb = vb.toLowerCase();
    if (va < vb) return dir === 'asc' ? -1 : 1;
    if (va > vb) return dir === 'asc' ?  1 : -1;
    return 0;
  });
}

function getPage(filtered) {
  const start = (state.page - 1) * state.perPage;
  return filtered.slice(start, start + state.perPage);
}

// ── Render ────────────────────────────────────────────────────────────────────

function render() {
  const filtered   = getFiltered();
  const totalPages = Math.max(1, Math.ceil(filtered.length / state.perPage));
  if (state.page > totalPages) state.page = totalPages;
  const rows = getPage(filtered);

  renderTable(rows, filtered.length);
  renderPagination(filtered.length, totalPages);
  renderBulkBar();
  updateSortIcons();
}

function renderTable(rows, total) {
  const tbody    = document.getElementById('accounts-body');
  const checkAll = document.getElementById('check-all');

  if (!rows.length) {
    const msg = total === 0 && !state.filters.search && !state.filters.status
      ? 'No accounts yet — create one above.'
      : 'No accounts match the current filters.';
    tbody.innerHTML = `<tr><td colspan="9" class="empty">${msg}</td></tr>`;
    checkAll.checked = checkAll.indeterminate = false;
    return;
  }

  tbody.innerHTML = rows.map(a => {
    const checked = state.selected.has(a.id) ? 'checked' : '';
    const sClass  = { 1: 'status-1', 2: 'status-2', 3: 'status-3' }[a.status] || '';
    const sLabel  = { 1: 'Active',   2: 'Inactive', 3: 'Deleted'  }[a.status] || a.status;
    return `<tr${state.selected.has(a.id) ? ' class="row-selected"' : ''}>
      <td class="col-check"><input type="checkbox" class="row-check" data-id="${a.id}" ${checked}></td>
      <td>${a.id}</td>
      <td>${esc(a.name  || '')}</td>
      <td>${esc(a.email || '')}</td>
      <td class="col-addr">${esc(a.address || '')}</td>
      <td><span class="status-badge ${sClass}">${sLabel}</span></td>
      <td>${fmt(a.created_time)}</td>
      <td>${fmt(a.updated_time)}</td>
      <td class="col-actions">
        <button class="btn btn-edit"   data-action="edit"   data-id="${a.id}">Edit</button>
        <button class="btn btn-danger" data-action="delete" data-id="${a.id}">Delete</button>
      </td>
    </tr>`;
  }).join('');

  const allChecked  = rows.every(a => state.selected.has(a.id));
  const someChecked = rows.some(a  => state.selected.has(a.id));
  checkAll.checked       = allChecked;
  checkAll.indeterminate = !allChecked && someChecked;
}

function renderPagination(total, totalPages) {
  const start = total ? (state.page - 1) * state.perPage + 1 : 0;
  const end   = Math.min(state.page * state.perPage, total);
  document.getElementById('page-info').textContent  = `Showing ${start}–${end} of ${total}`;
  document.getElementById('page-label').textContent = `${state.page} / ${totalPages}`;
  document.getElementById('btn-prev').disabled = state.page <= 1;
  document.getElementById('btn-next').disabled = state.page >= totalPages;
}

function renderBulkBar() {
  const n   = state.selected.size;
  const bar = document.getElementById('bulk-bar');
  bar.classList.toggle('hidden', n === 0);
  if (n) document.getElementById('selected-count').textContent = `${n} selected`;
}

function updateSortIcons() {
  document.querySelectorAll('.sortable').forEach(th => {
    const icon = th.querySelector('.sort-icon');
    icon.textContent = th.dataset.col === state.sort.col
      ? (state.sort.dir === 'asc' ? ' ↑' : ' ↓')
      : '';
  });
}

// ── UI helpers ────────────────────────────────────────────────────────────────

function esc(s) {
  return String(s)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function fmt(ms) {
  if (!ms) return '–';
  return new Date(Number(ms)).toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' });
}

function setLoading(on) {
  document.getElementById('loading-overlay').classList.toggle('hidden', !on);
}

function showError(msg) {
  const el = document.getElementById('error-banner');
  el.textContent = msg;
  el.classList.remove('hidden');
  clearTimeout(el._timer);
  el._timer = setTimeout(() => el.classList.add('hidden'), 6000);
}

// ── API ───────────────────────────────────────────────────────────────────────

async function apiFetch(path, opts = {}) {
  const r = await fetch(path, {
    headers: { 'Content-Type': 'application/json' },
    ...opts,
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data.error || `HTTP ${r.status}`);
  return data;
}

async function loadAccounts() {
  setLoading(true);
  try {
    state.accounts = await apiFetch(API);
    state.selected.clear();
    render();
  } catch (e) {
    showError('Failed to load accounts: ' + e.message);
  } finally {
    setLoading(false);
  }
}

async function saveAccount(body, id) {
  setLoading(true);
  try {
    if (id) {
      const updated = await apiFetch(`${API}/${id}`, { method: 'PUT', body: JSON.stringify(body) });
      const i = state.accounts.findIndex(a => a.id === id);
      if (i !== -1) state.accounts[i] = updated;
    } else {
      const created = await apiFetch(API, { method: 'POST', body: JSON.stringify(body) });
      state.accounts.push(created);
    }
    closeModal();
    render();
  } catch (e) {
    showFormError(e.message);
  } finally {
    setLoading(false);
  }
}

async function doDelete(id) {
  setLoading(true);
  try {
    await apiFetch(`${API}/${id}`, { method: 'DELETE' });
    state.accounts = state.accounts.filter(a => a.id !== id);
    state.selected.delete(id);
    render();
  } catch (e) {
    showError('Delete failed: ' + e.message);
  } finally {
    setLoading(false);
  }
}

async function doEmptyAll() {
  setLoading(true);
  try {
    await apiFetch(API, { method: 'DELETE' });
    state.accounts = [];
    state.selected.clear();
    render();
  } catch (e) {
    showError('Empty failed: ' + e.message);
  } finally {
    setLoading(false);
  }
}

const RAND_NAMES   = ['Alice','Bob','Carol','David','Emma','Frank','Grace','Henry','Iris','Jack','Kate','Liam','Mia','Noah','Olivia','Paul','Quinn','Rachel','Sam','Tara','Uma','Victor','Wendy','Xander','Yara','Zane'];
const RAND_SNAMES  = ['Smith','Jones','Brown','Wilson','Davis','Miller','Moore','Taylor','Anderson','Thomas','Jackson','White','Harris','Martin','Thompson','Garcia','Martinez','Robinson','Clark','Lewis'];
const RAND_DOMAINS = ['gmail.com','yahoo.com','hotmail.com','outlook.com','company.io','work.org'];
const RAND_STREETS = ['Main St','Oak Ave','Maple Rd','Park Blvd','Cedar Ln','Elm St','Lake Dr','River Rd','Hill Ave','Forest Way'];
const RAND_CITIES  = ['New York','Los Angeles','Chicago','Houston','Phoenix','Seattle','Austin','Denver','Boston','Miami'];
// status distribution: 70% active, 30% inactive (no deleted — soft-deleted records are hidden from the list)
const RAND_STATUSES = [1,1,1,1,1,1,1,2,2,2];

async function doRandom() {
  const TOTAL = 1000, BATCH = 50;
  const now     = Date.now();
  const oneYear = 365 * 24 * 60 * 60 * 1000;
  const seed    = now.toString(36); // unique suffix per run — prevents email conflicts on repeat clicks
  setLoading(true);
  try {
    for (let b = 0; b < Math.ceil(TOTAL / BATCH); b++) {
      const size = Math.min(BATCH, TOTAL - b * BATCH);
      await Promise.all(Array.from({ length: size }, (_, i) => {
        const n  = b * BATCH + i + 1;
        const fn = RAND_NAMES[n % RAND_NAMES.length];
        const ln = RAND_SNAMES[Math.floor(n / RAND_NAMES.length) % RAND_SNAMES.length];
        const created_time = now - Math.floor(Math.random() * oneYear);
        return apiFetch(API, {
          method: 'POST',
          body: JSON.stringify({
            name:         `${fn} ${ln} ${n}`,
            email:        `${fn.toLowerCase()}.${ln.toLowerCase()}${n}.${seed}@${RAND_DOMAINS[n % RAND_DOMAINS.length]}`,
            address:      `${100 + n} ${RAND_STREETS[n % RAND_STREETS.length]}, ${RAND_CITIES[Math.floor(n / RAND_STREETS.length) % RAND_CITIES.length]}`,
            status:       RAND_STATUSES[n % RAND_STATUSES.length],
            created_time,
          }),
        });
      }));
    }
    await loadAccounts();
  } catch (e) {
    showError('Random failed: ' + e.message);
    await loadAccounts();
  } finally {
    setLoading(false);
  }
}

async function doBulkDelete(ids) {
  setLoading(true);
  try {
    await Promise.all(ids.map(id => apiFetch(`${API}/${id}`, { method: 'DELETE' })));
    state.accounts = state.accounts.filter(a => !ids.includes(a.id));
    ids.forEach(id => state.selected.delete(id));
    render();
  } catch (e) {
    showError('Bulk delete failed: ' + e.message);
    await loadAccounts();
  } finally {
    setLoading(false);
  }
}

// ── Modals ────────────────────────────────────────────────────────────────────

function openModal(account = null) {
  document.getElementById('modal-title').textContent = account ? 'Edit Account' : 'New Account';
  document.getElementById('form-id').value      = account?.id    || '';
  document.getElementById('form-name').value    = account?.name  || '';
  document.getElementById('form-email').value   = account?.email || '';
  document.getElementById('form-address').value = account?.address || '';
  document.getElementById('form-status').value  = account?.status || '1';
  clearFormError();
  document.getElementById('modal-overlay').classList.remove('hidden');
  document.getElementById('form-name').focus();
}

function closeModal() {
  document.getElementById('modal-overlay').classList.add('hidden');
  document.getElementById('account-form').reset();
  document.getElementById('form-id').value = '';
}

function showFormError(msg) {
  const el = document.getElementById('form-error');
  el.textContent = msg;
  el.classList.remove('hidden');
}

function clearFormError() {
  const el = document.getElementById('form-error');
  el.textContent = '';
  el.classList.add('hidden');
}

let confirmCallback = null;

function openConfirm(msg, onOk) {
  document.getElementById('confirm-msg').textContent = msg;
  confirmCallback = onOk;
  document.getElementById('confirm-overlay').classList.remove('hidden');
}

function closeConfirm() {
  document.getElementById('confirm-overlay').classList.add('hidden');
  confirmCallback = null;
}

// ── Event wiring ──────────────────────────────────────────────────────────────

// New / Empty / Random buttons
document.getElementById('btn-new').addEventListener('click', () => openModal());
document.getElementById('btn-empty').addEventListener('click', () =>
  openConfirm('Delete ALL accounts permanently? This cannot be undone.', doEmptyAll)
);
document.getElementById('btn-random').addEventListener('click', doRandom);

// Cancel / close modal
document.getElementById('btn-cancel').addEventListener('click', closeModal);
document.getElementById('modal-overlay').addEventListener('click', e => {
  if (e.target === document.getElementById('modal-overlay')) closeModal();
});

// Form submit
document.getElementById('account-form').addEventListener('submit', async e => {
  e.preventDefault();
  const id = document.getElementById('form-id').value;
  await saveAccount({
    name:    document.getElementById('form-name').value.trim()    || undefined,
    email:   document.getElementById('form-email').value.trim()   || undefined,
    address: document.getElementById('form-address').value.trim() || undefined,
    status:  Number(document.getElementById('form-status').value),
  }, id ? Number(id) : null);
});

// Table body: edit / delete / checkbox via event delegation
document.getElementById('accounts-body').addEventListener('click', e => {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;
  const id = Number(btn.dataset.id);

  if (btn.dataset.action === 'edit') {
    const account = state.accounts.find(a => a.id === id);
    if (account) openModal(account);
  }

  if (btn.dataset.action === 'delete') {
    const account = state.accounts.find(a => a.id === id);
    openConfirm(
      `Delete "${account?.name || id}"? This cannot be undone.`,
      () => doDelete(id)
    );
  }
});

document.getElementById('accounts-body').addEventListener('change', e => {
  if (!e.target.classList.contains('row-check')) return;
  const id = Number(e.target.dataset.id);
  if (e.target.checked) state.selected.add(id);
  else state.selected.delete(id);
  renderBulkBar();
  // Update check-all indeterminate state
  const rows = [...document.querySelectorAll('.row-check')];
  const allChecked = rows.every(c => c.checked);
  const someChecked = rows.some(c => c.checked);
  const ca = document.getElementById('check-all');
  ca.checked = allChecked;
  ca.indeterminate = !allChecked && someChecked;
});

// Select all
document.getElementById('check-all').addEventListener('change', e => {
  const visible = getPage(getFiltered());
  visible.forEach(a => {
    if (e.target.checked) state.selected.add(a.id);
    else state.selected.delete(a.id);
  });
  render();
});

// Bulk delete
document.getElementById('btn-bulk-delete').addEventListener('click', () => {
  const ids = [...state.selected];
  openConfirm(
    `Delete ${ids.length} selected account(s)? This cannot be undone.`,
    () => doBulkDelete(ids)
  );
});

// Confirm modal buttons
document.getElementById('btn-confirm-ok').addEventListener('click', () => {
  const cb = confirmCallback;
  closeConfirm();
  if (cb) cb();
});
document.getElementById('btn-confirm-cancel').addEventListener('click', closeConfirm);
document.getElementById('confirm-overlay').addEventListener('click', e => {
  if (e.target === document.getElementById('confirm-overlay')) closeConfirm();
});

// Sort
document.querySelectorAll('.sortable').forEach(th => {
  th.addEventListener('click', () => {
    const col = th.dataset.col;
    if (state.sort.col === col) {
      state.sort.dir = state.sort.dir === 'asc' ? 'desc' : 'asc';
    } else {
      state.sort.col = col;
      state.sort.dir = 'asc';
    }
    state.page = 1;
    render();
  });
});

// Filters
['filter-search', 'filter-status', 'filter-date-field', 'filter-date-from', 'filter-date-to']
  .forEach(id => {
    const el = document.getElementById(id);
    el.addEventListener('input',  onFilterChange);
    el.addEventListener('change', onFilterChange);
  });

function onFilterChange() {
  state.filters.search    = document.getElementById('filter-search').value;
  state.filters.status    = document.getElementById('filter-status').value;
  state.filters.dateField = document.getElementById('filter-date-field').value;
  state.filters.dateFrom  = document.getElementById('filter-date-from').value;
  state.filters.dateTo    = document.getElementById('filter-date-to').value;
  state.page = 1;
  render();
}

document.getElementById('btn-clear-filters').addEventListener('click', () => {
  ['filter-search','filter-status','filter-date-field','filter-date-from','filter-date-to']
    .forEach(id => { document.getElementById(id).value = ''; });
  state.filters = { search: '', status: '!3', dateField: '', dateFrom: '', dateTo: '' };
  state.page = 1;
  render();
});

// Pagination
document.getElementById('btn-prev').addEventListener('click', () => {
  if (state.page > 1) { state.page--; render(); }
});
document.getElementById('btn-next').addEventListener('click', () => {
  const total = getFiltered().length;
  const maxPage = Math.max(1, Math.ceil(total / state.perPage));
  if (state.page < maxPage) { state.page++; render(); }
});
document.getElementById('per-page-select').addEventListener('change', e => {
  state.perPage = Number(e.target.value);
  state.page    = 1;
  render();
});

// ── Init ──────────────────────────────────────────────────────────────────────

loadAccounts();
