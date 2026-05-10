// Wild Extremadura — app logic
// Depends on: data.js (BASE, SITES, TYPES), Leaflet (L)

const state = {
  activeView: "map",
  search: "",
  activeTypes: new Set(Object.keys(TYPES)),
  selectedId: null,
};

// ---------- Map ----------
const map = L.map("map", {
  center: [BASE.lat, BASE.lng],
  zoom: 9,
  zoomControl: true,
});

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 18,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Base marker (your accommodation)
const baseIcon = L.divIcon({
  className: "",
  html: `<div class="base-marker" title="${BASE.name}">🏠</div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});
L.marker([BASE.lat, BASE.lng], { icon: baseIcon, zIndexOffset: 1000 })
  .addTo(map)
  .bindPopup(`<div class="popup-title">${BASE.name}</div><div class="popup-meta">${BASE.note}</div>`);

// Site markers
const markers = new Map();
SITES.forEach((site) => {
  const color = TYPES[site.type].color;
  const icon = L.divIcon({
    className: "",
    html: `<div class="site-marker" style="background:${color}"></div>`,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
  });
  const marker = L.marker([site.lat, site.lng], { icon })
    .addTo(map)
    .bindPopup(buildPopup(site));
  marker.on("popupopen", () => {
    const link = document.querySelector(".leaflet-popup-content .popup-link");
    if (link) link.addEventListener("click", () => openDetails(site.id));
  });
  markers.set(site.id, marker);
});

function buildPopup(site) {
  const t = TYPES[site.type];
  return `
    <div class="popup-title">${site.name}</div>
    <div class="popup-meta">
      <span class="badge" style="background:${t.color}">${t.label}</span>
      &nbsp;•&nbsp; ${site.distanceKm} km from base
    </div>
    <div>${escapeHtml(site.summary)}</div>
    <span class="popup-link">View details →</span>
  `;
}

// Fit map to all markers initially
const bounds = L.latLngBounds(SITES.map((s) => [s.lat, s.lng]).concat([[BASE.lat, BASE.lng]]));
map.fitBounds(bounds, { padding: [40, 40] });

// ---------- Legend ----------
const legendEl = document.getElementById("legend");
legendEl.innerHTML = Object.entries(TYPES)
  .map(([key, t]) => `<div class="legend-row"><span class="swatch" style="background:${t.color}"></span>${t.label}</div>`)
  .join("");

// ---------- Filter chips ----------
const filtersEl = document.getElementById("type-filters");
filtersEl.innerHTML = Object.entries(TYPES)
  .map(([key, t]) => `<button class="type-chip active" data-type="${key}"><span class="swatch" style="background:${t.color}"></span>${t.label}</button>`)
  .join("");
filtersEl.addEventListener("click", (e) => {
  const chip = e.target.closest(".type-chip");
  if (!chip) return;
  const type = chip.dataset.type;
  if (state.activeTypes.has(type)) state.activeTypes.delete(type);
  else state.activeTypes.add(type);
  chip.classList.toggle("active");
  applyFilters();
});

// ---------- Search ----------
const searchEl = document.getElementById("search");
searchEl.addEventListener("input", (e) => {
  state.search = e.target.value.trim().toLowerCase();
  applyFilters();
});

// ---------- View toggle ----------
const tabMap = document.getElementById("tab-map");
const tabList = document.getElementById("tab-list");
const viewMap = document.getElementById("view-map");
const viewList = document.getElementById("view-list");

function setView(name) {
  state.activeView = name;
  const isMap = name === "map";
  tabMap.classList.toggle("active", isMap);
  tabList.classList.toggle("active", !isMap);
  tabMap.setAttribute("aria-selected", isMap);
  tabList.setAttribute("aria-selected", !isMap);
  viewMap.hidden = !isMap;
  viewList.hidden = isMap;
  if (isMap) setTimeout(() => map.invalidateSize(), 50);
}
tabMap.addEventListener("click", () => setView("map"));
tabList.addEventListener("click", () => setView("list"));

// ---------- List rendering ----------
const listEl = document.getElementById("site-list");

function renderList(sites) {
  if (!sites.length) {
    listEl.innerHTML = `<li style="text-align:center;color:var(--muted);padding:2rem">No sites match your filter.</li>`;
    return;
  }
  listEl.innerHTML = sites
    .map((s) => {
      const t = TYPES[s.type];
      return `
        <li class="site-card" tabindex="0" data-id="${s.id}">
          <div class="site-card-head">
            <h3>${escapeHtml(s.name)}</h3>
            <span class="distance">${s.distanceKm} km</span>
          </div>
          <div><span class="badge" style="background:${t.color}">${t.label}</span></div>
          <p>${escapeHtml(s.summary)}</p>
        </li>`;
    })
    .join("");
}

listEl.addEventListener("click", (e) => {
  const card = e.target.closest(".site-card");
  if (card) openDetails(card.dataset.id);
});
listEl.addEventListener("keydown", (e) => {
  if (e.key !== "Enter" && e.key !== " ") return;
  const card = e.target.closest(".site-card");
  if (card) {
    e.preventDefault();
    openDetails(card.dataset.id);
  }
});

// ---------- Filtering ----------
function getFiltered() {
  return SITES.filter((s) => {
    if (!state.activeTypes.has(s.type)) return false;
    if (!state.search) return true;
    const haystack = [
      s.name,
      s.summary,
      s.description,
      s.tips,
      ...(s.birds || []),
      TYPES[s.type].label,
    ].join(" ").toLowerCase();
    return haystack.includes(state.search);
  })
  .sort((a, b) => a.distanceKm - b.distanceKm);
}

function applyFilters() {
  const filtered = getFiltered();
  const visibleIds = new Set(filtered.map((s) => s.id));
  // toggle markers
  SITES.forEach((s) => {
    const m = markers.get(s.id);
    const visible = visibleIds.has(s.id);
    if (visible && !map.hasLayer(m)) m.addTo(map);
    if (!visible && map.hasLayer(m)) map.removeLayer(m);
  });
  renderList(filtered);
}

// ---------- Detail panel ----------
const detailPanel = document.getElementById("detail-panel");
const detailContent = detailPanel.querySelector(".detail-content");
detailPanel.querySelector(".detail-close").addEventListener("click", closeDetails);

function openDetails(id) {
  const site = SITES.find((s) => s.id === id);
  if (!site) return;
  state.selectedId = id;
  const t = TYPES[site.type];
  const gmaps = `https://www.google.com/maps/dir/?api=1&destination=${site.lat},${site.lng}`;
  // Render multi-paragraph description, escaping per paragraph but preserving [n] refs as-is
  const paragraphs = (site.description || "")
    .split(/\n\s*\n/)
    .map((p) => `<p>${escapeHtml(p.trim())}</p>`)
    .join("");
  const birdsHtml = (site.birds || [])
    .map((b) => `<li>${escapeHtml(b)}</li>`)
    .join("");
  const sourcesHtml = (site.sources || [])
    .map((src, i) => `<li>[${i + 1}] <a href="${src.url}" target="_blank" rel="noopener">${escapeHtml(src.title)}</a></li>`)
    .join("");
  detailContent.innerHTML = `
    <h2>${escapeHtml(site.name)}</h2>
    <div class="meta">
      <span class="badge" style="background:${t.color}">${t.label}</span>
      <span>${site.distanceKm} km from base</span>
      <span>~${site.durationHours} h visit</span>
    </div>
    <p class="summary">${escapeHtml(site.summary)}</p>
    <section class="description">${paragraphs}</section>
    <section>
      <h4>Common birds</h4>
      <ul class="birds">${birdsHtml}</ul>
    </section>
    <section>
      <h4>Best season</h4>
      <p style="margin:0;font-size:0.88rem">${escapeHtml(site.bestSeason)}</p>
    </section>
    <section>
      <h4>Tips</h4>
      <p class="tips">${escapeHtml(site.tips)}</p>
    </section>
    ${sourcesHtml ? `<section><h4>Sources</h4><ol class="sources">${sourcesHtml}</ol></section>` : ""}
    <div class="detail-actions">
      <a class="btn" href="${gmaps}" target="_blank" rel="noopener">Directions</a>
      <a class="btn btn-secondary" href="${site.waarnemingUrl}" target="_blank" rel="noopener">waarneming.nl (10 km)</a>
      ${site.website ? `<a class="btn btn-secondary" href="${site.website}" target="_blank" rel="noopener">Official site</a>` : ""}
    </div>
  `;
  detailPanel.hidden = false;
  detailPanel.setAttribute("aria-hidden", "false");
  detailPanel.scrollTop = 0;
  // Centre map on site
  if (state.activeView === "map") {
    map.setView([site.lat, site.lng], Math.max(map.getZoom(), 11), { animate: true });
    markers.get(id)?.openPopup();
  }
}

function closeDetails() {
  detailPanel.hidden = true;
  detailPanel.setAttribute("aria-hidden", "true");
  state.selectedId = null;
}

// ---------- Helpers ----------
function escapeHtml(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

// ---------- Initial render ----------
applyFilters();

// ---------- Service worker ----------
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch((err) => {
      console.warn("Service worker registration failed:", err);
    });
  });
}
