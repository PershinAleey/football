// ======================
// 0. КОНФИГ ДЛЯ НОВИНОК
// ======================

// "Текущая" дата для расчёта новинок (как ты попросил)
const TODAY = new Date("2025-02-10T00:00:00");
// сколько дней товар считается новинкой
const NEW_DAYS = 60;

// утилита: дата N дней назад от TODAY
function dateDaysAgo(days) {
  const d = new Date(TODAY);
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10); // формат YYYY-MM-DD
}

// проверка: является ли товар новинкой
function isNew(product) {
  if (!product.addedAt) return false;
  const added = new Date(product.addedAt);
  if (Number.isNaN(added.getTime())) return false;

  const diffMs = TODAY - added;
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return diffDays >= 0 && diffDays <= NEW_DAYS;
}

// ======================
// 1. СПИСОК ТОВАРОВ
// ======================

const products = [
  // ========================
  // NIKE BOOTS (30 товаров)
  // ========================
  ...Array.from({ length: 30 }, (_, i) => {
    // первые 10 — свежие, остальные старые
    const isFresh = i < 10;
    return {
      id: i + 1,
      title: `Nike Mercurial Vapor ${15 + (i % 5)} Elite FG`,
      sku: `NIK-MERC-${i + 100}`,
      category: "boots",
      brand: "Nike",
      level: ["elite", "pro", "training"][i % 3],
      price: 18990 + (i % 5) * 3000,
      image: [
        "https://images.unsplash.com/photo-1606813902917-1c2a7c3ee73b?w=800",
        "https://images.unsplash.com/photo-1606813790633-89c93da8d508?w=800",
        "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?w=800",
        "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800",
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
      ][i % 5],
      // старый tag оставляем для "Хит" и т.п., но "Новинка" будем считать по дате
      tag: ["", "Хит", "", "", ""][i % 5],
      // новизна по дате
      addedAt: isFresh ? dateDaysAgo(5 + i) : dateDaysAgo(80 + i), // 5–14 дней и 80+ дней назад
    };
  }),

  // ========================
  // ADIDAS BOOTS (30 товаров)
  // ========================
  ...Array.from({ length: 30 }, (_, i) => {
    const isFresh = i < 5;
    return {
      id: 100 + i,
      title: `adidas Predator Accuracy ${i % 4}.1 FG`,
      sku: `ADI-PRED-${i + 200}`,
      category: "boots",
      brand: "adidas",
      level: ["elite", "pro", "training"][i % 3],
      price: 17990 + (i % 4) * 2500,
      image: [
        "https://images.unsplash.com/photo-1589182373727-0ad940f5f5d5?w=800",
        "https://images.unsplash.com/photo-1542293787938-c9e299b8805f?w=800",
        "https://images.unsplash.com/photo-1533681018184-68bd1d8835f1?w=800",
        "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800",
      ][i % 4],
      tag: ["", "Хит", "", ""][i % 4],
      addedAt: isFresh ? dateDaysAgo(20 + i) : dateDaysAgo(70 + i),
    };
  }),

  // ========================
  // PUMA BOOTS (20 товаров)
  // ========================
  ...Array.from({ length: 20 }, (_, i) => {
    const isFresh = i < 8;
    return {
      id: 200 + i,
      title: `Puma Ultra Ultimate FG/AG ${i + 1}`,
      sku: `PUM-ULTRA-${i + 300}`,
      category: "boots",
      brand: "Puma",
      level: ["elite", "pro"][i % 2],
      price: 16990 + (i % 3) * 2000,
      image: [
        "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?w=800",
        "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800",
      ][i % 2],
      tag: ["", "Хит"][i % 2],
      addedAt: isFresh ? dateDaysAgo(15 + i) : dateDaysAgo(75 + i),
    };
  }),

  // ========================
  // MIZUNO BOOTS (20 товаров)
  // ========================
  ...Array.from({ length: 20 }, (_, i) => {
    const isFresh = i < 4;
    return {
      id: 300 + i,
      title: `Mizuno Morelia Neo III β ${i + 1}`,
      sku: `MIZ-NEO3-${i + 400}`,
      category: "boots",
      brand: "Mizuno",
      level: ["elite", "pro"][i % 2],
      price: 19990 + (i % 4) * 1500,
      image: [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
        "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800",
      ][i % 2],
      tag: ["", "", "Хит"][i % 3] || "",
      addedAt: isFresh ? dateDaysAgo(25 + i) : dateDaysAgo(90 + i),
    };
  }),

  // ========================
  // APPAREL (ОДЕЖДА — 20 товаров)
  // ========================
  ...Array.from({ length: 20 }, (_, i) => {
    const isFresh = i < 3;
    return {
      id: 400 + i,
      title: `Игровая футболка ${["Nike", "adidas"][i % 2]} Training ${i + 1}`,
      sku: `APP-${i + 500}`,
      category: "apparel",
      brand: ["Nike", "adidas"][i % 2],
      level: ["training", "amateur"][i % 2],
      price: 2990 + (i % 4) * 400,
      image: [
        "https://images.unsplash.com/photo-1585386959984-a41552231693?w=800",
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800",
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800",
        "https://images.unsplash.com/photo-1599661046289-b4d1e5d0bb20?w=800",
      ][i % 4],
      tag: ["", "Sale", "", ""][i % 4],
      addedAt: isFresh ? dateDaysAgo(10 + i) : dateDaysAgo(65 + i),
    };
  }),
];

let filteredProducts = [...products];
let currentSort = "default";
let visibleCount = 6;

// ======================
// 2. DOM-ЭЛЕМЕНТЫ
// ======================

const productsGrid = document.getElementById("products-grid");
const productsCount = document.getElementById("products-count");
const sortSelect = document.getElementById("sort-select");
const priceMinInput = document.getElementById("price-min");
const priceMaxInput = document.getElementById("price-max");
const priceApplyBtn = document.getElementById("price-apply");
const resetFiltersBtn = document.getElementById("reset-filters");
const filtersToggleBtn = document.getElementById("filters-toggle");
const filtersElement = document.getElementById("filters");
const cartCountEl = document.getElementById("cart-count");
const loadMoreBtn = document.getElementById("load-more");

let cartCount = 0;

// ======================
// 3. РЕНДЕР КАРТОЧЕК ДЛЯ КАТАЛОГА
// ======================

function renderProducts(list) {
  productsGrid.innerHTML = "";

  if (list.length === 0) {
    productsGrid.innerHTML =
      '<p style="opacity:0.7;font-size:14px;">По выбранным параметрам товаров не найдено.</p>';
    productsCount.textContent = "Найдено: 0 товаров";
    return;
  }

  list.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";

    const imageWrap = document.createElement("div");
    imageWrap.className = "product-image-wrap";

    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.title;
    imageWrap.appendChild(img);

    // Бейджик: сначала проверяем новинку по дате, потом уже "Хит"/"Sale"
    let badgeText = "";
    if (isNew(product)) {
      badgeText = "Новинка";
    } else if (product.tag && product.tag !== "Новинка") {
      badgeText = product.tag;
    }

    if (badgeText) {
      const tag = document.createElement("div");
      tag.className = "product-tag";
      tag.textContent = badgeText;
      card.appendChild(tag);
    }

    const info = document.createElement("div");
    info.className = "product-info";

    const title = document.createElement("div");
    title.className = "product-title";
    title.textContent = product.title;

    const meta = document.createElement("div");
    meta.className = "product-meta";
    meta.innerHTML = `
      <span>${product.brand}</span>
      <span>Артикул: ${product.sku}</span>
    `;

    info.appendChild(title);
    info.appendChild(meta);

    const footer = document.createElement("div");
    footer.className = "product-footer";

    const price = document.createElement("div");
    price.className = "product-price";
    price.textContent = product.price.toLocaleString("ru-RU") + " ₽";

    const btn = document.createElement("button");
    btn.className = "product-btn";
    btn.textContent = "В корзину";
    btn.addEventListener("click", () => {
      cartCount += 1;
      cartCountEl.textContent = cartCount.toString();
    });

    footer.appendChild(price);
    footer.appendChild(btn);

    card.appendChild(imageWrap);
    card.appendChild(info);
    card.appendChild(footer);

    productsGrid.appendChild(card);
  });
}

// ======================
// 4. ФИЛЬТРЫ
// ======================

function applyFilters() {
  const categoryInput = document.querySelector('input[name="category"]:checked');
  const category = categoryInput ? categoryInput.value : "all";

  const brandInputs = Array.from(document.querySelectorAll('input[name="brand"]:checked'));
  const brands = brandInputs.map((input) => input.value);

  const levelInputs = Array.from(document.querySelectorAll('input[name="level"]:checked'));
  const levels = levelInputs.map((input) => input.value);

  const minPrice = priceMinInput.value ? Number(priceMinInput.value) : null;
  const maxPrice = priceMaxInput.value ? Number(priceMaxInput.value) : null;

  filteredProducts = products.filter((product) => {
    if (category !== "all" && product.category !== category) return false;
    if (brands.length > 0 && !brands.includes(product.brand)) return false;
    if (levels.length > 0 && !levels.includes(product.level)) return false;
    if (minPrice !== null && product.price < minPrice) return false;
    if (maxPrice !== null && product.price > maxPrice) return false;
    return true;
  });

  applySort();
  visibleCount = 6;
  renderVisibleProducts();
}

// ======================
// 5. СОРТИРОВКА
// ======================

function applySort() {
  if (currentSort === "price-asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (currentSort === "price-desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }
}

// ======================
// 6. ПОСТЕПЕННАЯ ЗАГРУЗКА
// ======================

function renderVisibleProducts() {
  const visible = filteredProducts.slice(0, visibleCount);
  renderProducts(visible);

  productsCount.textContent = `Найдено: ${filteredProducts.length} товаров`;

  if (!loadMoreBtn) return;

  if (visibleCount >= filteredProducts.length) {
    loadMoreBtn.style.display = "none";
  } else {
    loadMoreBtn.style.display = "block";
  }
}

function loadMoreProducts() {
  visibleCount += 20;
  renderVisibleProducts();
}

if (loadMoreBtn) {
  loadMoreBtn.addEventListener("click", loadMoreProducts);
}

// ======================
// 7. ОБРАБОТЧИКИ СОБЫТИЙ
// ======================

document.querySelectorAll('input[name="category"]').forEach((input) => {
  input.addEventListener("change", applyFilters);
});

document.querySelectorAll('input[name="brand"]').forEach((input) => {
  input.addEventListener("change", applyFilters);
});

document.querySelectorAll('input[name="level"]').forEach((input) => {
  input.addEventListener("change", applyFilters);
});

if (priceApplyBtn) {
  priceApplyBtn.addEventListener("click", applyFilters);
}

if (resetFiltersBtn) {
  resetFiltersBtn.addEventListener("click", () => {
    const allRadio = document.querySelector('input[name="category"][value="all"]');
    if (allRadio) allRadio.checked = true;

    document.querySelectorAll('input[name="brand"]').forEach((input) => {
      input.checked = false;
    });

    document.querySelectorAll('input[name="level"]').forEach((input) => {
      input.checked = false;
    });

    priceMinInput.value = "";
    priceMaxInput.value = "";

    filteredProducts = [...products];
    applySort();
    visibleCount = 6;
    renderVisibleProducts();
  });
}

if (sortSelect) {
  sortSelect.addEventListener("change", (e) => {
    currentSort = e.target.value;
    applySort();
    visibleCount = 6;
    renderVisibleProducts();
  });
}

if (filtersToggleBtn && filtersElement) {
  filtersToggleBtn.addEventListener("click", () => {
    filtersElement.classList.toggle("filters-collapsed");
    const collapsed = filtersElement.classList.contains("filters-collapsed");
    filtersToggleBtn.textContent = collapsed ? "Показать" : "Скрыть";
  });
}

// ======================
// 8. HERO SLIDER
// ======================

const heroSlides = document.querySelectorAll(".hero-slide");
const heroDots = document.querySelectorAll(".hero-dot");
const heroPrev = document.querySelector(".hero-nav--prev");
const heroNext = document.querySelector(".hero-nav--next");

let heroCurrent = 0;
let heroTimer = null;

function setHeroSlide(index) {
  heroSlides.forEach((slide) => slide.classList.remove("is-active"));
  heroDots.forEach((dot) => dot.classList.remove("is-active"));

  heroCurrent = (index + heroSlides.length) % heroSlides.length;

  heroSlides[heroCurrent].classList.add("is-active");
  heroDots[heroCurrent].classList.add("is-active");
}

function heroNextSlide() {
  setHeroSlide(heroCurrent + 1);
}

function heroPrevSlide() {
  setHeroSlide(heroCurrent - 1);
}

function heroStartAuto() {
  if (heroTimer) clearInterval(heroTimer);
  heroTimer = setInterval(heroNextSlide, 6000);
}

if (heroSlides.length > 0 && heroDots.length > 0 && heroPrev && heroNext) {
  setHeroSlide(heroCurrent);
  heroStartAuto();

  heroPrev.addEventListener("click", () => {
    heroPrevSlide();
    heroStartAuto();
  });

  heroNext.addEventListener("click", () => {
    heroNextSlide();
    heroStartAuto();
  });

  heroDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = Number(dot.dataset.slide || 0);
      setHeroSlide(index);
      heroStartAuto();
    });
  });
}

// ======================
// 9. ГОРИЗОНТАЛЬНАЯ ЛЕНТА "НОВИНКИ"
// ======================

// если секция уже есть в HTML — используем её, если нет — создаём
let newSection = document.querySelector(".new-products-section");
if (!newSection) {
  newSection = document.createElement("section");
  newSection.className = "new-products-section";
  newSection.innerHTML = `
    <div class="container">
      <h2 class="new-products-title">Новинки</h2>
      <div class="new-products-scroll" id="new-products-scroll"></div>
    </div>
  `;
  const catalogSection = document.querySelector("#catalog");
  if (catalogSection && catalogSection.parentNode) {
    catalogSection.parentNode.insertBefore(newSection, catalogSection);
  }
}

let newProductsContainer = document.getElementById("new-products-scroll");
if (!newProductsContainer && newSection) {
  newProductsContainer = document.createElement("div");
  newProductsContainer.id = "new-products-scroll";
  newProductsContainer.className = "new-products-scroll";
  newSection.appendChild(newProductsContainer);
}

// отбираем все новинки по дате
const newProducts = products.filter(isNew);

function renderNewProducts() {
  if (!newProductsContainer) return;

  newProductsContainer.innerHTML = "";

  if (newProducts.length === 0) {
    newProductsContainer.innerHTML =
      "<p style='opacity:0.7;font-size:14px;'>Пока нет новинок.</p>";
    return;
  }

  newProducts.forEach((product) => {
    const card = document.createElement("div");
    card.className = "new-product-card";

    card.innerHTML = `
      <div class="new-product-image">
        <img src="${product.image}" alt="${product.title}">
      </div>
      <div class="new-product-name">${product.title}</div>
      <div class="new-product-price">${product.price.toLocaleString("ru-RU")} ₽</div>
      <button class="new-product-btn">В корзину</button>
    `;

    const btn = card.querySelector(".new-product-btn");
    if (btn) {
      btn.addEventListener("click", () => {
        cartCount += 1;
        cartCountEl.textContent = cartCount.toString();
      });
    }

    newProductsContainer.appendChild(card);
  });
}

// ======================
// 10. СТАРТОВЫЙ ЗАПУСК
// ======================

applySort();
renderVisibleProducts();
renderNewProducts();
