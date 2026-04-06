/* ============================================================
   QUEJINHO VEÍCULOS — JavaScript Principal
   Toda renderização dinâmica e interatividade do site.
   ============================================================ */

(function () {
  'use strict';

  /* ========== Helpers ========== */

  /** Gera link de WhatsApp com mensagem */
  function waLink(message) {
    return `https://wa.me/${businessInfo.whatsappNumber}?text=${encodeURIComponent(message)}`;
  }

  /** Cria elemento HTML a partir de string */
  function htmlToElement(html) {
    const t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstChild;
  }

  /* ========== SVG Icons Map ========== */
  const icons = {
    'shield-check': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="22" height="22"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg>',
    'handshake': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="22" height="22"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/></svg>',
    'banknotes': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="22" height="22"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"/></svg>',
    'arrows-exchange': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="22" height="22"><path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"/></svg>',
    'clock': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="22" height="22"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
    'map-pin': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="22" height="22"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>',
    'star': '<svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>',
    calendar: '<svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/></svg>',
    fuel: '<svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14"><path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd"/></svg>',
    gear: '<svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14"><path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/></svg>',
    speed: '<svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/></svg>'
  };

  /* ========== Trust Bar ========== */
  const trustItems = [
    { icon: 'shield-check', text: 'Procedência verificada' },
    { icon: 'handshake', text: 'Atendimento transparente' },
    { icon: 'banknotes', text: 'Financiamento facilitado' },
    { icon: 'arrows-exchange', text: 'Avaliação de troca' },
    { icon: 'clock', text: 'Processo ágil' },
    { icon: 'map-pin', text: 'Referência local' }
  ];

  function renderTrustBar() {
    const grid = document.getElementById('trustBarGrid');
    if (!grid) return;
    grid.innerHTML = trustItems.map(item => `
      <div class="trust-bar__item">
        <div class="trust-bar__icon">${icons[item.icon]}</div>
        <span class="trust-bar__text">${item.text}</span>
      </div>
    `).join('');
  }

  /* ========== Vehicles — Estado dos filtros ========== */
  let activeFilter = 'all';   // marca ativa ou 'all'
  let searchQuery  = '';       // texto digitado na busca

  /** Extrai marcas únicas do array featuredCars (usa campo brand) */
  function getUniqueBrands() {
    const brands = [...new Set(featuredCars.map(c => c.brand))];
    brands.sort((a, b) => a.localeCompare(b));
    return brands;
  }

  /** Remove acentos para busca mais permissiva */
  function normalize(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

  /** Filtra veículos combinando marca + busca por texto */
  function getFilteredCars() {
    let result = featuredCars;

    // Filtro por marca
    if (activeFilter && activeFilter !== 'all') {
      result = result.filter(c => c.brand === activeFilter);
    }

    // Busca por texto (nome, marca, modelo, ano)
    if (searchQuery.trim()) {
      const q = normalize(searchQuery.trim());
      result = result.filter(c => {
        const haystack = normalize(
          `${c.brand} ${c.name} ${c.year} ${c.transmission} ${c.fuel}`
        );
        return haystack.includes(q);
      });
    }

    return result;
  }

  /** Renderiza os cards de veículos */
  function renderVehicles() {
    const grid = document.getElementById('vehiclesGrid');
    if (!grid) return;

    const filtered = getFilteredCars();

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="vehicles__empty">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="48" height="48"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/></svg>
          <p><strong>Nenhum veículo encontrado</strong></p>
          <p>Tente outra busca ou fale no WhatsApp para verificar disponibilidade.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(car => {
      // Suporta tanto image (string) quanto images (array)
      const imgs = car.images || [car.image];
      const hasGallery = imgs.length > 1;
      const dotsHtml = hasGallery
        ? `<div class="gallery__dots">${imgs.map((_, i) => `<button class="gallery__dot${i === 0 ? ' active' : ''}" data-index="${i}" aria-label="Foto ${i + 1}"></button>`).join('')}</div>`
        : '';
      const counterHtml = hasGallery
        ? `<span class="gallery__counter"><span class="gallery__counter-current">1</span>/${imgs.length}</span>`
        : '';

      return `
      <article class="car-card reveal">
        <div class="car-card__gallery" data-car-id="${car.id}">
          <div class="gallery__track">
            ${imgs.map((src, i) => `<img class="gallery__slide${i === 0 ? ' active' : ''}" src="${src}" alt="${car.name} - foto ${i + 1}" loading="lazy">`).join('')}
          </div>
          ${hasGallery ? `
          <button class="gallery__arrow gallery__arrow--prev" aria-label="Foto anterior">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="18" height="18"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/></svg>
          </button>
          <button class="gallery__arrow gallery__arrow--next" aria-label="Próxima foto">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="18" height="18"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>
          </button>
          ` : ''}
          ${counterHtml}
          ${dotsHtml}
          ${car.badge ? `<span class="car-card__badge">${car.badge}</span>` : ''}
        </div>
        <div class="car-card__body">
          <h3 class="car-card__name">${car.name}</h3>
          <div class="car-card__specs">
            <span class="car-card__spec">${icons.calendar} ${car.year}</span>
            <span class="car-card__spec">${icons.gear} ${car.transmission}</span>
            <span class="car-card__spec">${icons.fuel} ${car.fuel}</span>
            <span class="car-card__spec">${icons.speed} ${car.km}</span>
          </div>
          <div class="car-card__price">${car.price}</div>
          <div class="car-card__actions">
            <a href="${waLink(whatsappMessages.interest(car.name))}" class="btn btn--whatsapp" target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            <a href="${waLink(whatsappMessages.interest(car.name))}" class="btn btn--outline" target="_blank" rel="noopener noreferrer">
              Tenho interesse
            </a>
          </div>
        </div>
      </article>
    `;
    }).join('');

    // Inicializa galerias
    initGalleries();

    // Re-apply reveal observer to new cards
    initRevealObserver();
  }

  /* ========== Gallery (carrossel de imagens nos cards) ========== */
  function initGalleries() {
    document.querySelectorAll('.car-card__gallery').forEach(gallery => {
      const slides = gallery.querySelectorAll('.gallery__slide');
      const dots   = gallery.querySelectorAll('.gallery__dot');
      const counter = gallery.querySelector('.gallery__counter-current');
      if (slides.length <= 1) return;

      let current = 0;

      function goTo(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;

        slides[current].classList.remove('active');
        slides[index].classList.add('active');
        dots.forEach(d => d.classList.remove('active'));
        if (dots[index]) dots[index].classList.add('active');
        if (counter) counter.textContent = index + 1;
        current = index;
      }

      // Setas
      const prev = gallery.querySelector('.gallery__arrow--prev');
      const next = gallery.querySelector('.gallery__arrow--next');
      if (prev) prev.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); goTo(current - 1); });
      if (next) next.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); goTo(current + 1); });

      // Dots
      dots.forEach(dot => {
        dot.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          goTo(parseInt(this.dataset.index));
        });
      });

      // Swipe touch
      let touchStartX = 0;
      gallery.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });
      gallery.addEventListener('touchend', function (e) {
        const diff = touchStartX - e.changedTouches[0].screenX;
        if (Math.abs(diff) > 50) {
          goTo(diff > 0 ? current + 1 : current - 1);
        }
      }, { passive: true });

      // Clique na imagem → abre lightbox
      slides.forEach(slide => {
        slide.style.cursor = 'zoom-in';
        slide.addEventListener('click', function (e) {
          e.stopPropagation();
          const carId = parseInt(gallery.dataset.carId);
          if (window.__lightboxOpen) {
            window.__lightboxOpen(carId, current);
          }
        });
      });
    });
  }

  /** Gera os botões de filtro por marca dinamicamente */
  function renderBrandFilters() {
    const container = document.getElementById('vehicleFilters');
    if (!container) return;

    const brands = getUniqueBrands();

    container.innerHTML = `
      <button class="filter-btn active" data-brand="all">Todas as marcas</button>
      ${brands.map(b => `<button class="filter-btn" data-brand="${b}">${b}</button>`).join('')}
    `;
  }

  /** Inicializa os filtros de marca e a busca por texto */
  function initFilters() {
    const container = document.getElementById('vehicleFilters');
    const searchInput = document.getElementById('vehicleSearchInput');
    const clearBtn = document.getElementById('searchClearBtn');

    // --- Filtro por marca (click nos botões) ---
    if (container) {
      container.addEventListener('click', function (e) {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;
        container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = btn.dataset.brand;
        renderVehicles();
      });
    }

    // --- Busca por texto ---
    if (searchInput) {
      let debounceTimer;
      searchInput.addEventListener('input', function () {
        clearTimeout(debounceTimer);
        const val = this.value;
        // Mostra/esconde botão limpar
        if (clearBtn) clearBtn.style.display = val.length > 0 ? 'flex' : 'none';
        debounceTimer = setTimeout(function () {
          searchQuery = val;
          renderVehicles();
        }, 250);
      });
    }

    // --- Botão limpar busca ---
    if (clearBtn && searchInput) {
      clearBtn.addEventListener('click', function () {
        searchInput.value = '';
        searchQuery = '';
        clearBtn.style.display = 'none';
        searchInput.focus();
        renderVehicles();
      });
    }
  }

  /* ========== Hero Showcase (carrossel do banner) ========== */
  function initHeroShowcase() {
    const track = document.getElementById('heroShowcaseTrack');
    const info  = document.getElementById('heroShowcaseInfo');
    const dotsContainer = document.getElementById('heroShowcaseDots');
    const bar   = document.getElementById('heroShowcaseBar');
    const prevBtn = document.getElementById('heroShowcasePrev');
    const nextBtn = document.getElementById('heroShowcaseNext');
    if (!track || !featuredCars.length) return;

    const AUTOPLAY_INTERVAL = 4000; // 4 segundos por slide
    let current = 0;
    let autoplayTimer = null;
    let progressTimer = null;
    let progressStart = 0;

    // Gera slides — pega a primeira foto de cada veículo
    track.innerHTML = featuredCars.map((car, i) => {
      const src = car.images ? car.images[0] : car.image;
      return `
        <div class="hero__showcase-slide${i === 0 ? ' active' : ''}">
          <img src="${src}" alt="${car.name}" loading="${i === 0 ? 'eager' : 'lazy'}">
        </div>
      `;
    }).join('');

    // Gera dots
    dotsContainer.innerHTML = featuredCars.map((_, i) =>
      `<button class="hero__showcase-dot${i === 0 ? ' active' : ''}" data-index="${i}" aria-label="Veículo ${i + 1}"></button>`
    ).join('');

    // Info inicial
    updateInfo(0);

    const slides = track.querySelectorAll('.hero__showcase-slide');
    const dots   = dotsContainer.querySelectorAll('.hero__showcase-dot');

    function updateInfo(index) {
      const car = featuredCars[index];
      info.innerHTML = `
        <div class="hero__showcase-name">${car.name}</div>
        <div class="hero__showcase-price">${car.price}</div>
      `;
    }

    function goTo(index) {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;

      slides[current].classList.remove('active');
      slides[index].classList.add('active');
      dots[current].classList.remove('active');
      dots[index].classList.add('active');
      updateInfo(index);
      current = index;
    }

    // Barra de progresso animada
    function startProgress() {
      if (bar) bar.style.width = '0%';
      progressStart = Date.now();
      clearInterval(progressTimer);
      progressTimer = setInterval(function () {
        const elapsed = Date.now() - progressStart;
        const pct = Math.min((elapsed / AUTOPLAY_INTERVAL) * 100, 100);
        if (bar) bar.style.width = pct + '%';
      }, 30);
    }

    // Autoplay
    function startAutoplay() {
      stopAutoplay();
      startProgress();
      autoplayTimer = setInterval(function () {
        goTo(current + 1);
        startProgress();
      }, AUTOPLAY_INTERVAL);
    }

    function stopAutoplay() {
      clearInterval(autoplayTimer);
      clearInterval(progressTimer);
    }

    function restartAutoplay() {
      stopAutoplay();
      startAutoplay();
    }

    // Eventos — setas
    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1); restartAutoplay(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1); restartAutoplay(); });

    // Eventos — dots
    dots.forEach(dot => {
      dot.addEventListener('click', function () {
        goTo(parseInt(this.dataset.index));
        restartAutoplay();
      });
    });

    // Swipe touch
    let touchStartX = 0;
    track.addEventListener('touchstart', function (e) { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
    track.addEventListener('touchend', function (e) {
      const diff = touchStartX - e.changedTouches[0].screenX;
      if (Math.abs(diff) > 50) {
        goTo(diff > 0 ? current + 1 : current - 1);
        restartAutoplay();
      }
    }, { passive: true });

    // Pausa no hover
    const showcase = document.getElementById('heroShowcase');
    if (showcase) {
      showcase.addEventListener('mouseenter', stopAutoplay);
      showcase.addEventListener('mouseleave', startAutoplay);
    }

    // Clique na imagem do showcase → abre lightbox do veículo
    slides.forEach((slide, i) => {
      slide.style.cursor = 'pointer';
      slide.addEventListener('click', function () {
        const car = featuredCars[i];
        if (car && window.__lightboxOpen) {
          window.__lightboxOpen(car.id, 0);
        }
      });
    });

    // Inicia
    startAutoplay();
  }

  /* ========== Why Us / Highlights ========== */
  function renderHighlights() {
    const grid = document.getElementById('whyUsGrid');
    if (!grid) return;
    grid.innerHTML = highlights.map(h => `
      <div class="why-us__card reveal">
        <div class="why-us__icon">${icons[h.icon] || icons['shield-check']}</div>
        <h3>${h.title}</h3>
        <p>${h.text}</p>
      </div>
    `).join('');
  }

  /* ========== Testimonials ========== */
  function renderTestimonials() {
    const grid = document.getElementById('testimonialsGrid');
    if (!grid) return;
    grid.innerHTML = testimonials.map(t => {
      const initials = t.name.split(' ').map(w => w[0]).join('').slice(0, 2);
      const starsHtml = Array(t.stars).fill(icons.star).join('');
      return `
        <div class="testimonial-card reveal">
          <div class="testimonial-card__stars">${starsHtml}</div>
          <p class="testimonial-card__text">"${t.text}"</p>
          <div class="testimonial-card__author">
            <div class="testimonial-card__avatar">${initials}</div>
            <div>
              <div class="testimonial-card__name">${t.name}</div>
              <div class="testimonial-card__city">${t.city}</div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  /* ========== FAQ ========== */
  function renderFAQ() {
    const list = document.getElementById('faqList');
    if (!list) return;
    list.innerHTML = faqItems.map((item, i) => `
      <div class="faq-item reveal">
        <button class="faq-item__question" aria-expanded="false" aria-controls="faq-answer-${i}">
          <span>${item.question}</span>
          <span class="faq-item__icon" aria-hidden="true"></span>
        </button>
        <div class="faq-item__answer" id="faq-answer-${i}" role="region">
          <div class="faq-item__answer-inner">${item.answer}</div>
        </div>
      </div>
    `).join('');

    // Accordion
    list.addEventListener('click', function (e) {
      const btn = e.target.closest('.faq-item__question');
      if (!btn) return;
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-item__answer');
      const isOpen = item.classList.contains('open');

      // Close all
      list.querySelectorAll('.faq-item.open').forEach(el => {
        el.classList.remove('open');
        el.querySelector('.faq-item__question').setAttribute('aria-expanded', 'false');
        el.querySelector('.faq-item__answer').style.maxHeight = '0';
      });

      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  }

  /* ========== WhatsApp Buttons ========== */
  function initWhatsappButtons() {
    const map = {
      headerWhatsappBtn: whatsappMessages.general,
      heroWhatsappBtn: whatsappMessages.general,
      vehiclesWhatsappBtn: whatsappMessages.general,
      financeWhatsappBtn: whatsappMessages.finance,
      tradeWhatsappBtn: whatsappMessages.trade,
      finalWhatsappBtn: whatsappMessages.contact,
      whatsappFloat: whatsappMessages.general
    };

    Object.keys(map).forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.href = waLink(map[id]);
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener noreferrer');
      }
    });
  }

  /* ========== Dynamic Content from businessInfo ========== */
  function populateBusinessInfo() {
    // Hero
    const heroBadge = document.getElementById('heroBadge');
    if (heroBadge) heroBadge.innerHTML = `${icons['map-pin']} ${businessInfo.city}`;

    const heroSubtitle = document.getElementById('heroSubtitle');
    if (heroSubtitle) heroSubtitle.textContent = `${businessInfo.tagline} com atendimento de confiança em ${businessInfo.city}.`;

    // Footer
    const footerSlogan = document.getElementById('footerSlogan');
    if (footerSlogan) footerSlogan.textContent = businessInfo.slogan;

    const footerInstagram = document.getElementById('footerInstagram');
    if (footerInstagram) footerInstagram.href = businessInfo.instagram;

    const footerFacebook = document.getElementById('footerFacebook');
    if (footerFacebook) footerFacebook.href = businessInfo.facebook;

    // Footer contact
    const contactList = document.getElementById('footerContactList');
    if (contactList) {
      contactList.innerHTML = `
        <li>${businessInfo.phone}</li>
        <li>${businessInfo.whatsapp}</li>
        <li>${businessInfo.address}</li>
        <li>${businessInfo.neighborhood}, ${businessInfo.cityState}</li>
      `;
    }

    // Footer hours
    const footerHours = document.getElementById('footerHours');
    if (footerHours) {
      footerHours.innerHTML = `
        <li>${businessInfo.hours.weekdays}</li>
        <li>${businessInfo.hours.saturday}</li>
      `;
    }

    // Footer route
    const routeBtn = document.getElementById('footerRouteBtn');
    if (routeBtn) routeBtn.href = businessInfo.googleMapsLink;

    // Footer copyright
    const footerCopy = document.getElementById('footerCopy');
    if (footerCopy) {
      const year = new Date().getFullYear();
      footerCopy.textContent = `© ${year} ${businessInfo.name}. Todos os direitos reservados.`;
    }

    // Final CTA hours
    const finalHours = document.getElementById('finalHours');
    if (finalHours) {
      finalHours.textContent = `${businessInfo.hours.weekdays} | ${businessInfo.hours.saturday}`;
    }
  }

  /* ========== Header Scroll ========== */
  function initHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;

    function check() {
      header.classList.toggle('header--scrolled', window.scrollY > 40);
    }
    window.addEventListener('scroll', check, { passive: true });
    check();
  }

  /* ========== Mobile Menu ========== */
  function initMobileMenu() {
    const btn = document.getElementById('hamburgerBtn');
    if (!btn) return;

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'mobile-overlay';
    overlay.id = 'mobileOverlay';

    const menuHTML = `
      <button class="mobile-overlay__close" aria-label="Fechar menu">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
      <nav class="mobile-overlay__menu">
        <a href="#veiculos" class="mobile-overlay__link">Veículos</a>
        <a href="#financiamento" class="mobile-overlay__link">Financiamento</a>
        <a href="#diferenciais" class="mobile-overlay__link">Diferenciais</a>
        <a href="#sobre" class="mobile-overlay__link">Sobre</a>
        <a href="#depoimentos" class="mobile-overlay__link">Depoimentos</a>
        <a href="#faq" class="mobile-overlay__link">FAQ</a>
        <a href="#" class="btn btn--whatsapp btn--lg mobile-overlay__wa" id="mobileWhatsappBtn" style="margin-top:1rem">Fale no WhatsApp</a>
      </nav>
    `;
    overlay.innerHTML = menuHTML;
    document.body.appendChild(overlay);

    const mobileWaBtn = document.getElementById('mobileWhatsappBtn');
    if (mobileWaBtn) {
      mobileWaBtn.href = waLink(whatsappMessages.general);
      mobileWaBtn.setAttribute('target', '_blank');
      mobileWaBtn.setAttribute('rel', 'noopener noreferrer');
    }

    function close() {
      btn.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
      btn.setAttribute('aria-expanded', 'false');
    }

    function toggle() {
      const isActive = btn.classList.toggle('active');
      overlay.classList.toggle('active', isActive);
      document.body.style.overflow = isActive ? 'hidden' : '';
      btn.setAttribute('aria-expanded', isActive);
    }

    btn.addEventListener('click', toggle);

    // Botão X fecha
    overlay.querySelector('.mobile-overlay__close').addEventListener('click', close);

    // Escape fecha
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && btn.classList.contains('active')) close();
    });

    overlay.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', () => {
        if (btn.classList.contains('active')) close();
      });
    });
  }

  /* ========== Scroll Reveal ========== */
  function initRevealObserver() {
    const reveals = document.querySelectorAll('.reveal:not(.visible)');
    if (!reveals.length) return;

    if (!('IntersectionObserver' in window)) {
      reveals.forEach(el => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Stagger animation delay
            entry.target.style.transitionDelay = `${index * 0.08}s`;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    reveals.forEach(el => observer.observe(el));
  }

  /* ========== Smooth Scroll ========== */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  /* ========== Lightbox Modal ========== */
  function initLightbox() {
    const lightbox  = document.getElementById('lightbox');
    const backdrop  = document.getElementById('lightboxBackdrop');
    const closeBtn  = document.getElementById('lightboxClose');
    const prevBtn   = document.getElementById('lightboxPrev');
    const nextBtn   = document.getElementById('lightboxNext');
    const mainImage = document.getElementById('lightboxImage');
    const header    = document.getElementById('lightboxHeader');
    const thumbsWrap = document.getElementById('lightboxThumbs');
    if (!lightbox) return;

    let currentImages = [];
    let currentIndex  = 0;
    let currentName   = '';

    /** Abre o lightbox com as imagens de um veículo */
    function open(carId, startIndex) {
      const car = featuredCars.find(c => c.id === carId);
      if (!car) return;

      currentImages = car.images || [car.image];
      currentName   = car.name;
      currentIndex  = startIndex || 0;

      // Gera thumbnails
      thumbsWrap.innerHTML = currentImages.map((src, i) =>
        `<div class="lightbox__thumb${i === currentIndex ? ' active' : ''}" data-index="${i}">
          <img src="${src}" alt="${car.name} - foto ${i + 1}">
        </div>`
      ).join('');

      updateSlide();
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    /** Fecha o lightbox */
    function close() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }

    /** Atualiza imagem e info */
    function updateSlide() {
      // Fade out/in
      mainImage.style.opacity = '0';
      setTimeout(function () {
        mainImage.src = currentImages[currentIndex];
        mainImage.alt = currentName + ' - foto ' + (currentIndex + 1);
        mainImage.style.opacity = '1';
      }, 150);

      // Header
      header.innerHTML = `
        <div class="lightbox__car-name">${currentName}</div>
        <div class="lightbox__counter">${currentIndex + 1} de ${currentImages.length}</div>
      `;

      // Thumbs
      thumbsWrap.querySelectorAll('.lightbox__thumb').forEach((t, i) => {
        t.classList.toggle('active', i === currentIndex);
      });
    }

    function goTo(index) {
      if (index < 0) index = currentImages.length - 1;
      if (index >= currentImages.length) index = 0;
      currentIndex = index;
      updateSlide();
    }

    // Eventos — fechar
    closeBtn.addEventListener('click', close);
    backdrop.addEventListener('click', close);

    // Eventos — setas
    prevBtn.addEventListener('click', function () { goTo(currentIndex - 1); });
    nextBtn.addEventListener('click', function () { goTo(currentIndex + 1); });

    // Eventos — thumbnails
    thumbsWrap.addEventListener('click', function (e) {
      const thumb = e.target.closest('.lightbox__thumb');
      if (thumb) goTo(parseInt(thumb.dataset.index));
    });

    // Eventos — teclado
    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') goTo(currentIndex - 1);
      if (e.key === 'ArrowRight') goTo(currentIndex + 1);
    });

    // Swipe touch no lightbox
    let touchStartX = 0;
    lightbox.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    lightbox.addEventListener('touchend', function (e) {
      const diff = touchStartX - e.changedTouches[0].screenX;
      if (Math.abs(diff) > 50) {
        goTo(diff > 0 ? currentIndex + 1 : currentIndex - 1);
      }
    }, { passive: true });

    // Expõe a função open para ser chamada pelos cards
    window.__lightboxOpen = open;
  }

  /* ========== Init ========== */
  function init() {
    try {
      populateBusinessInfo();
      initWhatsappButtons();
      initHeroShowcase();
      renderTrustBar();
      renderBrandFilters();
      renderVehicles();
      initFilters();
      renderHighlights();
      renderTestimonials();
      renderFAQ();
      initLightbox();
      initHeaderScroll();
      initMobileMenu();
      initSmoothScroll();
    } catch (err) {
      console.error('Erro ao inicializar site:', err);
    }

    // Esconder loading screen
    var loadingEl = document.getElementById('loadingScreen');
    if (loadingEl) {
      loadingEl.classList.add('hidden');
      setTimeout(function () { loadingEl.remove(); }, 500);
    }
    initRevealObserver();
  }

  // Wait for DOM + Firebase data
  async function bootstrap() {
    if (typeof dataReady !== 'undefined') {
      await dataReady;
    }
    init();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => bootstrap());
  } else {
    bootstrap();
  }
})();
