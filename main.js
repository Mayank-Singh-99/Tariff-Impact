/**
 * Tariff Impact India - shared behaviour.
 *
 * Pages stay declarative: anything needing JavaScript is marked up with
 * data-render="name" and the matching renderer below fills it in on load.
 */
(function (global) {
  'use strict';

  var D = global.TARIFF_DATA;
  var C = global.Charts;

  /* ------------------------------------------------------------------ *
   * Small helpers
   * ------------------------------------------------------------------ */

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function mount(name) { return $('[data-render="' + name + '"]'); }
  function mounts(name) { return $$('[data-render="' + name + '"]'); }

  function esc(str) {
    return String(str === null || str === undefined ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function el(tag, className, html) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (html !== undefined) node.innerHTML = html;
    return node;
  }

  function prefersReducedMotion() {
    return global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /* ------------------------------------------------------------------ *
   * Mobile navigation
   * ------------------------------------------------------------------ */

  function initNav() {
    var toggle = $('.nav-toggle');
    var nav = $('.nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    // Close on Escape, and when a link is chosen
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ------------------------------------------------------------------ *
   * Reveal on scroll
   * ------------------------------------------------------------------ */

  function initReveal() {
    var targets = $$('.reveal');
    if (!targets.length) return;

    if (prefersReducedMotion() || !('IntersectionObserver' in global)) {
      targets.forEach(function (t) { t.classList.add('is-visible'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });

    targets.forEach(function (t) { io.observe(t); });
  }

  /* ------------------------------------------------------------------ *
   * Animated counters
   * ------------------------------------------------------------------ */

  function runCounter(node) {
    var target = parseFloat(node.getAttribute('data-count'));
    var decimals = parseInt(node.getAttribute('data-decimals') || '0', 10);
    var prefix = node.getAttribute('data-prefix') || '';
    var suffix = node.getAttribute('data-suffix') || '';
    var out = prefix + target.toFixed(decimals) + suffix;

    if (prefersReducedMotion() || !('IntersectionObserver' in global)) {
      node.textContent = out;
      return;
    }

    var duration = 1100;
    var startTime = null;

    function frame(ts) {
      if (startTime === null) startTime = ts;
      var p = Math.min(1, (ts - startTime) / duration);
      var eased = 1 - Math.pow(1 - p, 3);
      node.textContent = prefix + (target * eased).toFixed(decimals) + suffix;
      if (p < 1) global.requestAnimationFrame(frame);
      else node.textContent = out;
    }

    var io = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      global.requestAnimationFrame(frame);
    }, { threshold: 0.4 });

    io.observe(node);
  }

  function initCounters() {
    var nodes = $$('[data-count]');
    if (!nodes.length) return;
    nodes.forEach(runCounter);
  }

  /* ------------------------------------------------------------------ *
   * Table of contents scrollspy
   * ------------------------------------------------------------------ */

  function initToc() {
    var toc = $('.toc');
    if (!toc) return;

    var links = $$('.toc a');
    var targets = links
      .map(function (a) {
        var id = a.getAttribute('href');
        return id && id.charAt(0) === '#' ? document.querySelector(id) : null;
      })
      .filter(Boolean);

    if (!targets.length) return;

    function setActive(id) {
      links.forEach(function (a) {
        a.classList.toggle('is-active', a.getAttribute('href') === id);
      });
    }

    if (!('IntersectionObserver' in global)) return;

    var visible = {};
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { visible[e.target.id] = e.isIntersecting; });
      var first = targets.filter(function (t) { return visible[t.id]; })[0];
      if (first) setActive('#' + first.id);
    }, { rootMargin: '-96px 0px -70% 0px', threshold: 0 });

    targets.forEach(function (t) { io.observe(t); });
  }

  /* ------------------------------------------------------------------ *
   * Filter groups - toggle items by data-tag
   * ------------------------------------------------------------------ */

  function initFilters() {
    $$('[data-filter-group]').forEach(function (group) {
      var name = group.getAttribute('data-filter-group');
      var targetSel = group.getAttribute('data-filter-target');
      var items = $$(targetSel);
      var buttons = $$('.filter', group);

      buttons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var value = btn.getAttribute('data-filter');
          buttons.forEach(function (b) {
            b.setAttribute('aria-pressed', String(b === btn));
          });

          items.forEach(function (item) {
            if (value === 'all') {
              item.classList.remove('is-hidden');
              return;
            }
            var tags = (item.getAttribute('data-tags') || '').split(/\s+/);
            item.classList.toggle('is-hidden', tags.indexOf(value) === -1);
          });
        });
      });
    });
  }

  /* ------------------------------------------------------------------ *
   * Glossary search - free text over [data-search-text]
   * ------------------------------------------------------------------ */

  function initSearch() {
    $$('[data-search-input]').forEach(function (input) {
      var group = input.getAttribute('data-search-input');
      var scope = $('[data-search-scope="' + group + '"]');
      var counter = $('[data-search-count="' + group + '"]');
      if (!scope) return;
      var items = $$('[data-search-text]', scope);

      function run() {
        var q = input.value.trim().toLowerCase();
        var shown = 0;
        items.forEach(function (item) {
          // A category filter may have already hidden this item; only the
          // search text should decide its search visibility.
          var hit = !q || item.getAttribute('data-search-text').indexOf(q) !== -1;
          if (hit) {
            item.classList.remove('is-search-hidden');
            shown++;
          } else {
            item.classList.add('is-search-hidden');
          }
        });
        if (counter) {
          counter.textContent = q
            ? shown + ' of ' + items.length + ' terms match'
            : items.length + ' terms';
        }
      }

      input.addEventListener('input', run);
      input.addEventListener('search', run);
      run();
    });
  }

  /* ------------------------------------------------------------------ *
   * Colour theme - light, dark, or follow the system
   * ------------------------------------------------------------------ */

  var THEME_KEY = 'tariff-theme';

  function prefersDark() {
    return !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  }

  /* 'system' resolves to whatever the OS asks for, but is still written out
     as a concrete value so the dark palette in styles.css stays the single
     source of truth. */
  function applyTheme(theme) {
    var root = document.documentElement;
    var resolved = theme === 'system' ? (prefersDark() ? 'dark' : 'light') : theme;
    root.setAttribute('data-theme', resolved);
    root.setAttribute('data-theme-choice', theme);
    $$('[data-theme-toggle]').forEach(function (btn) {
      btn.setAttribute('aria-label', 'Colour theme: ' + theme + '. Activate to change.');
      btn.setAttribute('title', 'Theme: ' + theme);
      var label = $('[data-theme-label]', btn);
      if (label) {
        label.textContent = theme === 'system'
          ? 'Auto'
          : theme.charAt(0).toUpperCase() + theme.slice(1);
      }
    });
  }

  function storedTheme() {
    try {
      return localStorage.getItem(THEME_KEY) || 'system';
    } catch (e) {
      return 'system';
    }
  }

  function initTheme() {
    applyTheme(storedTheme());

    $$('[data-theme-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var order = ['system', 'light', 'dark'];
        var next = order[(order.indexOf(storedTheme()) + 1) % order.length];
        try {
          localStorage.setItem(THEME_KEY, next);
        } catch (e) { /* storage unavailable, theme still applies for this page */ }
        applyTheme(next);
      });
    });

    // Follow the OS while the choice is 'system'.
    if (window.matchMedia) {
      var mq = window.matchMedia('(prefers-color-scheme: dark)');
      var onChange = function () {
        if (storedTheme() === 'system') applyTheme('system');
      };
      if (mq.addEventListener) mq.addEventListener('change', onChange);
      else if (mq.addListener) mq.addListener(onChange);
    }
  }

  /* ------------------------------------------------------------------ *
   * Timeline renderer
   * ------------------------------------------------------------------ */

  var KIND_LABEL = {
    escalation: 'Escalation',
    relief: 'Relief',
    legal: 'Legal',
    negotiation: 'Negotiation',
    domestic: 'Domestic',
    threat: 'Threat'
  };

  function rateBadge(rate) {
    if (rate === null || rate === undefined) return '';
    return '<span class="tl-rate">' + rate + '%</span>';
  }

  /* Split a display date into a day-month, the year and any trailing
     range, so the renderer can put the year in its own aligned column.
     The year always comes from the ISO date, which is authoritative,
     never from the display string. */
  function dateParts(item) {
    var isoYear = String(item.date || '').slice(0, 4);
    var display = String(item.display || '');
    var head = display.match(/(\d{1,2}\s+[A-Za-z]{3,4}|[A-Za-z]{3,9})\s+(\d{4})/);
    var range = display.match(/[-–—]\s*([^–—-]+)$/);
    return {
      day: head ? head[1] : display,
      year: isoYear || (head ? head[2] : ''),
      range: range ? range[1].trim() : ''
    };
  }

  function renderDateCell(item) {
    var d = dateParts(item);
    return [
      '<div class="tl-date">',
      '  <span class="tl-day">' + esc(d.day) + '</span>',
      '  <span class="tl-year">' + esc(d.year) + '</span>',
      d.range ? '<span class="tl-span">to ' + esc(d.range) + '</span>' : '',
      '</div>'
    ].join('\n');
  }

  function renderTimeline(target) {
    var detail = target.getAttribute('data-detail') !== 'false';

    target.innerHTML = D.timeline.map(function (item) {
      return [
        '<div class="tl-item kind-' + esc(item.kind) + '" data-tags="' + esc(item.kind) + '" id="t-' + esc(item.date) + '">',
        '  ' + renderDateCell(item),
        '  <div class="tl-body">',
        '    <span class="tl-dot" aria-hidden="true"></span>',
        '    <div class="tl-head">',
        '      <h3>' + esc(item.title) + '</h3>',
        '      <span class="tag tag-' + esc(item.kind) + '">' + esc(KIND_LABEL[item.kind] || item.kind) + '</span>',
        rateBadge(item.rate),
        '    </div>',
        '    <p class="tl-summary">' + esc(item.summary) + '</p>',
        detail && item.detail ? '<p class="tl-detail">' + esc(item.detail) + '</p>' : '',
        '  </div>',
        '</div>'
      ].join('\n');
    }).join('\n');
  }

  /* ------------------------------------------------------------------ *
   * Chart renderers
   * ------------------------------------------------------------------ */

  function renderRateChart(target) {
    C.rateTimeline(target, D.timeline, {
      height: 420,
      threshold: 25,
      ariaLabel: 'Line chart of the additional US tariff rate on Indian goods, April 2025 to September 2026'
    });
  }

  function renderCompetitorChart(target) {
    var rows = D.competitorRates.map(function (c) {
      return {
        label: c.country,
        value: c.current,
        display: c.current + '%',
        color: c.focus ? C.palette.saffron : C.palette.navyLight
      };
    }).sort(function (a, b) { return a.value - b.value; });

    C.horizontalBarChart(target, rows, {
      labelWidth: 210,
      valueWidth: 70,
      rowHeight: 40,
      unit: '%',
      ariaLabel: 'Current US reciprocal tariff rate on India compared with competing economies'
    });
  }

  function renderCompetitorShift(target) {
    C.groupedBarChart(target, [
      {
        label: 'India',
        values: [
          { label: 'Announced 2 Apr 2025', value: 26, color: C.palette.navyLight },
          { label: 'Current', value: 18, color: C.palette.saffron }
        ]
      },
      {
        label: 'Bangladesh',
        values: [
          { label: 'Announced 2 Apr 2025', value: 37, color: C.palette.navyLight },
          { label: 'Current', value: 19, color: C.palette.navy }
        ]
      },
      {
        label: 'Cambodia',
        values: [
          { label: 'Announced 2 Apr 2025', value: 49, color: C.palette.navyLight },
          { label: 'Current', value: 19, color: C.palette.navy }
        ]
      },
      {
        label: 'European Union',
        values: [
          { label: 'Announced 2 Apr 2025', value: 20, color: C.palette.navyLight },
          { label: 'Current', value: 15, color: C.palette.navy }
        ]
      },
      {
        label: 'China',
        values: [
          { label: 'Announced 2 Apr 2025', value: 34, color: C.palette.navyLight },
          { label: 'Current', value: 20, color: C.palette.navy }
        ]
      }
    ], {
      height: 360,
      unitLabel: 'US reciprocal tariff rate, per cent',
      legend: [
        { label: 'Announced 2 Apr 2025', color: C.palette.navyLight },
        { label: 'Current after Feb 2026 reset', color: C.palette.navy }
      ],
      ariaLabel: 'Announced versus current US reciprocal tariff rates by economy'
    });
  }

  function renderBasketChart(target) {
    var colors = [
      C.palette.saffron, C.palette.navy, C.palette.green, C.palette.purple,
      C.palette.amber, C.palette.slate, C.palette.redLight, '#cfd6e2'
    ];
    C.donutChart(target, D.exportBasket.map(function (b, i) {
      return { label: b.label, value: b.share, color: colors[i % colors.length] };
    }), {
      centerValue: '$87B',
      centerLabel: 'Merchandise exports to the US, FY25',
      ariaLabel: 'Composition of India merchandise exports to the United States in FY25'
    });
  }

  function renderExportsChart(target) {
    C.groupedBarChart(target, [
      {
        label: 'April to July, cumulative',
        values: [
          { label: '2025-26', value: D.monthlyExports.series[0].value, color: C.palette.navyLight },
          { label: '2026-27', value: D.monthlyExports.series[1].value, color: C.palette.saffron }
        ]
      }
    ], {
      height: 300,
      unitLabel: 'Merchandise exports, US$ billion',
      legend: [
        { label: 'April-July 2025-26', color: C.palette.navyLight },
        { label: 'April-July 2026-27', color: C.palette.saffron }
      ],
      ariaLabel: 'Merchandise exports for April to July, year on year'
    });
  }

  function renderCategoryChart(target) {
    C.horizontalBarChart(target, D.categoryGrowth.map(function (c) {
      return {
        label: c.label,
        value: c.julYoy,
        display: '+' + c.julYoy + '%',
        color: C.palette.green,
        valueColor: C.palette.green
      };
    }).sort(function (a, b) { return a.value - b.value; }), {
      labelWidth: 270,
      valueWidth: 82,
      rowHeight: 40,
      unit: '%',
      ariaLabel: 'Year on year export growth by category, July 2026'
    });
  }

  function renderDiversificationChart(target) {
    C.horizontalBarChart(target, D.response.diversification.map(function (d) {
      return {
        label: d.market,
        value: d.value,
        display: '+' + d.value + '%',
        color: C.palette.navy,
        valueColor: C.palette.navy
      };
    }), {
      labelWidth: 230,
      valueWidth: 80,
      rowHeight: 34,
      unit: '%',
      ariaLabel: 'Textile export growth by destination market'
    });
  }

  function renderCostRange(target) {
    var rows = [
      { label: 'Share of US-bound exports hit', low: 55, high: 66, display: '55-66%', color: C.palette.red },
      { label: 'Direct export loss, % of GDP', low: 0.3, high: 0.4, display: '0.3-0.4%', color: C.palette.amber },
      { label: 'Hit to FY26 GDP growth', low: 0.5, high: 1.0, display: '0.5-1.0%', color: C.palette.red }
    ];
    C.rangeChart(target, rows, {
      labelWidth: 300,
      valueWidth: 150,
      unitLabel: 'Per cent, low to high estimate across institutions',
      ariaLabel: 'Range of estimates for the tariff impact on India'
    });
  }

  function renderExposedSplit(target) {
    C.splitBar(target, [
      { label: 'Exempted from the July 2026 levy', value: 45, color: C.palette.green, text: '45%', foot: 'Exempt - generic pharma, smartphones, steel, aluminium, auto parts' },
      { label: 'Subject to the new 10% duty', value: 55, color: C.palette.red, text: '55%', foot: 'Liable for the 10% Section 301 duty on top of MFN' }
    ], {
      height: 108,
      unit: '%',
      ariaLabel: 'Share of India US-bound exports exempt from or subject to the July 2026 duty'
    });
  }

  function renderSection232Chart(target) {
    C.horizontalBarChart(target, D.section232.map(function (s) {
      return {
        label: s.sector,
        value: s.rate,
        display: s.rate + '%',
        color: C.palette.purple
      };
    }), {
      labelWidth: 280,
      valueWidth: 76,
      rowHeight: 42,
      unit: '%',
      ariaLabel: 'Section 232 tariff rates by sector'
    });
  }

  /* ------------------------------------------------------------------ *
   * Table renderers
   * ------------------------------------------------------------------ */

  function table(head, rows, opts) {
    var o = opts || {};
    var html = '<div class="table-scroll"><table>';
    if (o.caption) html += '<caption>' + esc(o.caption) + '</caption>';
    html += '<thead><tr>';
    head.forEach(function (h, i) {
      html += '<th' + (o.numeric && o.numeric.indexOf(i) !== -1 ? ' class="num"' : '') + ' scope="col">' + esc(h) + '</th>';
    });
    html += '</tr></thead><tbody>';
    rows.forEach(function (r) {
      var cls = r.__focus ? ' class="row-focus"' : '';
      html += '<tr' + cls + '>';
      r.forEach(function (c, i) {
        if (c && c.__html) {
          html += '<td' + (o.numeric && o.numeric.indexOf(i) !== -1 ? ' class="num"' : '') + '>' + c.value + '</td>';
        } else {
          html += '<td' + (o.numeric && o.numeric.indexOf(i) !== -1 ? ' class="num"' : '') + '>' + esc(c) + '</td>';
        }
      });
      html += '</tr>';
    });
    html += '</tbody></table></div>';
    return html;
  }

  function renderCompetitorTable(target) {
    target.innerHTML = table(
      ['Economy', 'Announced 2 Apr 2025', 'Current rate', 'Status'],
      D.competitorRates.map(function (c) {
        return [
          { value: c.focus ? '<strong>' + esc(c.country) + '</strong>' : esc(c.country), __html: true },
          c.announced + '%',
          { value: '<strong>' + c.current + '%</strong>', __html: true },
          c.status
        ];
      }),
      { numeric: [1, 2], caption: 'US reciprocal tariff rates by economy. Excludes MFN duties and sector-specific measures.' }
    );
  }

  function renderMonthlyTable(target) {
    target.innerHTML = table(
      ['Period', 'Metric', 'Value', 'Prior year', 'Change'],
      D.monthlyDetail.map(function (m) {
        var sign = m.growth > 0 ? '+' : '';
        return [
          m.label,
          m.metric,
          '$' + C.format.commas(m.value, 2) + 'B',
          '$' + C.format.commas(m.prior, 2) + 'B',
          { value: '<span class="' + (m.inverse ? 'delta-negative' : 'delta-positive') + '">' + sign + m.growth + '%</span>', __html: true }
        ];
      }),
      { numeric: [2, 3, 4], caption: 'Commerce Ministry monthly releases. Services data for the latest month is an RBI estimate.' }
    );
  }

  function renderSection232Table(target) {
    target.innerHTML = table(
      ['Sector', 'Rate', 'Note'],
      D.section232.map(function (s) {
        return [s.sector, s.rate + '%', s.note];
      }),
      { numeric: [1], caption: 'Section 232 duties apply to all US trading partners and were not altered during this episode.' }
    );
  }

  function renderMacroList(target) {
    target.innerHTML = '<div class="def-list">' + D.macro.map(function (m) {
      return [
        '<div class="def-row">',
        '  <div class="def-term">' + esc(m.label) + '</div>',
        '  <div class="def-desc"><strong>' + esc(m.value) + '</strong> &mdash; ' + esc(m.note) + '</div>',
        '</div>'
      ].join('');
    }).join('') + '</div>';
  }

  /* ------------------------------------------------------------------ *
   * Card / list renderers
   * ------------------------------------------------------------------ */

  function renderSectors(target, opts) {
    var o = opts || {};

    target.innerHTML = D.sectors.map(function (s) {
      var metrics = s.metrics.map(function (m) {
        var deltaCls = m.tone === 'positive' ? 'delta-positive' : (m.tone === 'negative' ? 'delta-negative' : 'delta-neutral');
        var sign = m.delta === null || m.delta === undefined ? '' : (m.delta > 0 ? '+' : '');
        return [
          '<div class="metric">',
          '  <div class="metric-label">' + esc(m.label) + '</div>',
          '  <div class="metric-value">' + esc(m.value) + '</div>',
          '  <div class="metric-delta ' + deltaCls + '">' + (sign + (m.delta === null || m.delta === undefined ? '' : m.delta + '%')) + '</div>',
          '  <div class="small muted">' + esc(m.deltaLabel) + '</div>',
          '</div>'
        ].join('');
      }).join('');

      var effects = s.effects.map(function (e) { return '<li>' + esc(e) + '</li>'; }).join('');

      return [
        '<article class="sector sector-card reveal" id="' + esc(s.id) + '" data-tags="' + esc(s.severity) + '">',
        '  <header class="sector-head">',
        '    <div>',
        '      <h3>' + esc(s.name) + '</h3>',
        '      <p class="small muted mb-0">' + esc(s.shareLabel) + '</p>',
        '    </div>',
        '    <span class="tag"><span class="severity-' + esc(s.severity) + '" style="width:8px;height:8px;border-radius:50%;display:inline-block"></span> ' + esc(s.severity) + '</span>',
        '  </header>',
        '  <div class="sector-body">',
        '    <p>' + esc(s.summary) + '</p>',
        '    <div class="metric-row">' + metrics + '</div>',
        '    <ul class="effect-list">' + effects + '</ul>',
        '    <div class="recovery"><strong>Where it stands now.</strong> ' + esc(s.recovery) + '</div>',
        o.cta ? '<a class="card-cta" href="sectors.html#' + esc(s.id) + '">Full sector detail &rarr;</a>' : '',
        '  </div>',
        '</article>'
      ].join('\n');
    }).join('\n');

    initReveal();
  }

  function renderOpenQuestions(target) {
    target.innerHTML = D.openQuestions.map(function (q) {
      return [
        '<article class="qa reveal">',
        '  <h3>' + esc(q.question) + '</h3>',
        '  <p>' + esc(q.text) + '</p>',
        '</article>'
      ].join('\n');
    }).join('\n');
    initReveal();
  }

  function renderCostEstimates(target) {
    target.innerHTML = table(
      ['Institution', 'Estimate', 'What it measures', 'Attribution'],
      D.costEstimates.map(function (c) {
        var value = c.unit === 'US$B'
          ? '$' + c.low + 'B'
          : (c.unit === '% of GDP' ? c.low + '-' + c.high + '% of GDP' : '₹' + c.low + ' lakh crore');
        return [
          { value: '<strong>' + esc(c.body) + '</strong>', __html: true },
          { value: '<span class="mono">' + esc(value) + '</span>', __html: true },
          c.headline,
          c.speaker
        ];
      }),
      { numeric: [1], caption: 'Estimates differ by a factor of more than two. The range is reported rather than reconciled.' }
    );
  }

  function renderTimelineTable(target) {
    target.innerHTML = table(
      ['Date', 'Event', 'Type', 'Additional rate'],
      D.timeline.map(function (t) {
        return [
          { value: '<strong>' + esc(t.display) + '</strong>', __html: true },
          t.title,
          { value: '<span class="tag tag-' + esc(t.kind) + '">' + esc(KIND_LABEL[t.kind] || t.kind) + '</span>', __html: true },
          t.rate === null || t.rate === undefined ? 'n/a' : t.rate + '%'
        ];
      }),
      { numeric: [3], caption: 'Additional duties on Indian goods, over and above standard MFN rates.' }
    );
  }

  function renderSources(target) {
    var groups = {};
    D.sources.forEach(function (s) {
      if (!groups[s.kind]) groups[s.kind] = [];
      groups[s.kind].push(s);
    });

    target.innerHTML = Object.keys(groups).map(function (kind) {
      return [
        '<h3 class="h4" style="margin-top:28px">' + esc(kind) + '</h3>',
        '<div class="table-scroll"><table><tbody>',
        groups[kind].map(function (s) {
          return [
            '<tr>',
            '<td style="width:150px"><strong>' + esc(s.publisher) + '</strong><br><span class="small muted">' + esc(s.date) + '</span></td>',
            '<td>' + esc(s.title) + '<br><a class="small mono" href="' + esc(s.url) + '" target="_blank" rel="noopener noreferrer">' + esc(s.url) + '</a></td>',
            '</tr>'
          ].join('');
        }).join(''),
        '</tbody></table></div>'
      ].join('\n');
    }).join('\n');
  }

  function renderMethod(target) {
    target.innerHTML =
      '<div class="def-list">' +
      '<div class="def-row"><div class="def-term">Last verified</div><div class="def-desc">' + esc(D.method.lastVerified) + '</div></div>' +
      '<div class="def-row"><div class="def-term">Scope</div><div class="def-desc">' + esc(D.method.scope) + '</div></div>' +
      '</div>' +
      '<h3 class="h4 mt-3">Method and conventions</h3><ul class="effect-list">' +
      D.method.rules.map(function (r) { return '<li>' + esc(r) + '</li>'; }).join('') +
      '</ul>' +
      '<h3 class="h4 mt-3">Known limits of this data</h3><ul class="effect-list">' +
      D.method.limits.map(function (r) { return '<li>' + esc(r) + '</li>'; }).join('') +
      '</ul>';
  }

  var GLOSSARY_CATS = ['All', 'Tariffs', 'Export support', 'Agreements', 'Macro', 'Bodies', 'Sectors', 'Method'];

  function renderGlossary(target) {
    var group = target.getAttribute('data-cat-group') || 'glossary';
    var cats = GLOSSARY_CATS.filter(function (c) {
      return D.glossary.some(function (t) { return t.cat === c; });
    });
    if (cats[0] !== 'All') cats.unshift('All');

    var search = target.getAttribute('data-search') === 'true'
      ? '<div class="search-row">' +
          '<label class="search-field">' +
            '<span class="sr-only">Search glossary terms</span>' +
            '<input type="search" class="search-input" data-search-input="' + group + '"' +
            ' placeholder="Search ' + D.glossary.length + ' terms&hellip;" autocomplete="off">' +
          '</label>' +
          '<span class="search-count" data-search-count="' + group + '"></span>' +
        '</div>'
      : '';

    var filters = cats.length > 1
      ? '<div class="filters" data-filter-group="' + group + '" data-filter-target="[data-glossary-item]" role="group" aria-label="Filter glossary by category">' +
          cats.map(function (c, i) {
            return '<button class="filter" type="button" data-filter="' + esc(c) + '" aria-pressed="' + (i === 0) + '">' + esc(c) + '</button>';
          }).join('') +
        '</div>'
      : '';

    var items = D.glossary.map(function (t) {
      return [
        '<div class="term" data-glossary-item data-cat="' + esc(t.cat) + '" data-search-text="' +
          esc((t.t + ' ' + t.d + ' ' + t.cat).toLowerCase()) + '">',
        '  <h4>' + esc(t.t) + '</h4>',
        '  <p>' + esc(t.d) + '</p>',
        '  <span class="term-cat">' + esc(t.cat) + '</span>',
        '</div>'
      ].join('');
    }).join('');

    target.innerHTML = search + filters + '<div class="grid grid-3" data-search-scope="' + group + '">' + items + '</div>';

    var count = $('[data-search-count="' + group + '"]');
    if (count) count.textContent = D.glossary.length + ' terms';
  }

  function renderSaffronBarChart(target) {
    C.barChart(target, [
      { label: 'Total merchandise exports to US, FY25', value: 87, display: '$87B', color: C.palette.navy },
      { label: 'US-bound electronics, FY25', value: 15.3, display: '$15.3B', color: C.palette.saffron },
      { label: 'US-bound pharma, FY25', value: 10.3, display: '$10.3B', color: C.palette.green },
      { label: 'US-bound gems, FY25', value: 10.0, display: '$10.0B', color: C.palette.purple },
      { label: 'US seafood, FY26', value: 8.46, display: '$8.46B', color: C.palette.amber },
      { label: 'US textile & apparel, annual', value: 11, display: '~$11B', color: C.palette.red }
    ], {
      height: 360,
      unit: '',
      maxLabelChars: 18,
      ariaLabel: 'Value of key India to US export lines'
    });
  }

  /* ------------------------------------------------------------------ *
   * Trade flow renderers
   * ------------------------------------------------------------------ */

  function renderBilateralChart(target) {
    var y25 = D.bilateralTrade.years[0];
    var y26 = D.bilateralTrade.years[1];
    C.groupedBarChart(target, [
      {
        label: 'Exports to US',
        values: [
          { label: 'FY25', value: y25.exports, color: C.palette.navyLight },
          { label: 'FY26', value: y26.exports, color: C.palette.navy }
        ]
      },
      {
        label: 'Imports from US',
        values: [
          { label: 'FY25', value: y25.imports, color: C.palette.greenLight },
          { label: 'FY26', value: y26.imports, color: C.palette.green }
        ]
      },
      {
        label: 'Surplus',
        values: [
          { label: 'FY25', value: y25.surplus, color: C.palette.saffronLight },
          { label: 'FY26', value: y26.surplus, color: C.palette.saffron }
        ]
      }
    ], {
      height: 360,
      unitLabel: 'US$ billion, merchandise',
      legend: [
        { label: 'FY25', color: C.palette.navyLight },
        { label: 'FY26', color: C.palette.navy }
      ],
      ariaLabel: 'India to US merchandise exports, imports and surplus, FY25 versus FY26'
    });
  }

  function renderChinaChart(target) {
    C.groupedBarChart(target, [
      {
        label: 'Exports to China',
        values: D.chinaTrade.exports.map(function (e, i) {
          return { label: e.label, value: e.value, color: i === 0 ? C.palette.navyLight : C.palette.navy };
        })
      },
      {
        label: 'Imports from China',
        values: D.chinaTrade.imports.map(function (e, i) {
          return { label: e.label, value: e.value, color: i === 0 ? C.palette.greenLight : C.palette.green };
        })
      }
    ], {
      height: 340,
      unitLabel: 'US$ billion, merchandise',
      legend: [
        { label: 'FY25', color: C.palette.navyLight },
        { label: 'FY26', color: C.palette.navy }
      ],
      ariaLabel: 'India China merchandise trade, FY25 versus FY26'
    });
  }

  function renderDestinationsTable(target) {
    target.innerHTML = table(
      ['Market', 'FY26 exports', 'Note'],
      D.destinations.map(function (d) {
        return [
          { value: d.focus ? '<strong>' + esc(d.market) + '</strong>' : esc(d.market), __html: true },
          d.value ? { value: '<span class="mono">$' + C.format.commas(d.value, 2) + 'B</span>', __html: true } : 'n/d',
          d.note
        ];
      }),
      { numeric: [1], caption: 'India merchandise exports by destination. The US remains the largest market at about a fifth of total exports.' }
    );
  }

  /* ------------------------------------------------------------------ *
   * Regional renderers
   * ------------------------------------------------------------------ */

  function renderStateExportsChart(target) {
    var withBoth = D.stateTextileExports.filter(function (s) { return s.fy26 !== null; });
    C.groupedBarChart(target, withBoth.map(function (s) {
      return {
        label: s.state,
        values: [
          { label: 'FY25', value: s.fy25, color: C.palette.navyLight },
          { label: 'FY26', value: s.fy26, color: s.focus ? C.palette.saffron : C.palette.navy }
        ]
      };
    }), {
      height: 400,
      unitLabel: 'Textile and apparel exports including handicrafts, Rs crore',
      legend: [
        { label: 'FY25', color: C.palette.navyLight },
        { label: 'FY26', color: C.palette.navy }
      ],
      ariaLabel: 'Textile and apparel exports by state, FY25 versus FY26'
    });
  }

  function renderStateScatter(target) {
    var points = D.stateTextileExports
      .filter(function (s) { return s.fy26 !== null; })
      .map(function (s) {
        return {
          x: s.fy26,
          y: s.msmeClosed,
          size: s.jobsAffected,
          label: s.state,
          color: s.focus ? C.palette.saffron : C.palette.navy,
          tooltip: C.format.commas(s.fy26, 0) + ' Rs crore exported, ' +
            C.format.commas(s.msmeClosed, 0) + ' units closed, ' +
            C.format.commas(s.jobsAffected, 0) + ' jobs affected'
        };
      });
    C.scatterChart(target, points, {
      height: 460,
      sizeScale: 'area',
      maxLabelChars: 12,
      xTitle: 'Textile and apparel exports, FY26 (Rs crore)',
      yTitle: 'Textile MSME units closed, 2023-26',
      ariaLabel: 'Scatter chart of state textile exports against MSME closures, bubble size proportional to jobs affected'
    });
  }

  function renderStateTable(target) {
    target.innerHTML = table(
      ['State', 'FY25', 'FY26', 'Change', 'MSME units closed', 'Jobs affected'],
      D.stateTextileExports.map(function (s) {
        var change = (s.fy26 !== null && s.fy25 !== null) ? ((s.fy26 - s.fy25) / s.fy25) * 100 : null;
        var changeCls = change === null ? 'delta-neutral' : (change >= 0 ? 'delta-positive' : 'delta-negative');
        return [
          { value: s.focus ? '<strong>' + esc(s.state) + '</strong>' : esc(s.state), __html: true },
          s.fy25 === null ? 'n/d' : C.format.commas(s.fy25, 0),
          s.fy26 === null ? 'n/d' : C.format.commas(s.fy26, 0),
          {
            value: change === null
              ? '<span class="delta-neutral">n/d</span>'
              : '<span class="' + changeCls + '">' + (change >= 0 ? '+' : '') + change.toFixed(1) + '%</span>',
            __html: true
          },
          C.format.commas(s.msmeClosed, 0),
          C.format.commas(s.jobsAffected, 0)
        ];
      }),
      {
        numeric: [1, 2, 3, 4, 5],
        caption: 'Textile and apparel exports including handicrafts, Rs crore, against MSME closures recorded on the Udyam portal for the three years to March 2026. The closure window predates the tariff regime.'
      }
    );
  }

  function renderJobsChart(target) {
    C.horizontalBarChart(target, D.employment.byState.map(function (s) {
      return {
        label: s.state,
        value: s.jobsAffected,
        display: C.format.commas(s.jobsAffected, 0),
        color: s.state === 'Tamil Nadu' ? C.palette.red : C.palette.navyLight
      };
    }), {
      labelWidth: 200,
      valueWidth: 84,
      rowHeight: 36,
      ariaLabel: 'Jobs attached to closed textile MSME units by state'
    });
  }

  function renderClusterCards(target) {
    target.innerHTML = D.clusters.map(function (c) {
      var metrics = c.metrics.map(function (m) {
        var tone = m.tone === 'positive' ? 'delta-positive' : (m.tone === 'negative' ? 'delta-negative' : 'delta-neutral');
        var sign = m.delta === null || m.delta === undefined ? '' : (m.delta > 0 ? '+' : '');
        return [
          '<div class="metric">',
          '  <div class="metric-label">' + esc(m.label) + '</div>',
          '  <div class="metric-value">' + esc(m.value) + '</div>',
          '  <div class="metric-delta ' + tone + '">' + (sign + (m.delta === null || m.delta === undefined ? '' : m.delta + '%')) + '</div>',
          '  <div class="small muted">' + esc(m.deltaLabel) + '</div>',
          '</div>'
        ].join('');
      }).join('');

      return [
        '<article class="sector sector-card reveal" id="' + esc(c.id) + '" data-tags="' + esc(c.severity) + '">',
        '  <header class="sector-head">',
        '    <div>',
        '      <h3>' + esc(c.name) + '</h3>',
        '      <p class="small muted mb-0">' + esc(c.headline) + '</p>',
        '    </div>',
        '    <span class="tag"><span class="severity-' + esc(c.severity) + '" style="width:8px;height:8px;border-radius:50%;display:inline-block"></span> ' + esc(c.severity) + '</span>',
        '  </header>',
        '  <div class="sector-body">',
        '    <p>' + esc(c.summary) + '</p>',
        '    <div class="metric-row">' + metrics + '</div>',
        '    <ul class="effect-list">' + c.effects.map(function (e) { return '<li>' + esc(e) + '</li>'; }).join('') + '</ul>',
        '    <div class="recovery"><strong>Where it stands now.</strong> ' + esc(c.recovery) + '</div>',
        '    <p class="small faint mt-3 mb-0"><strong>Sources:</strong> ' + esc(c.sources) + '</p>',
        '  </div>',
        '</article>'
      ].join('\n');
    }).join('\n');

    initReveal();
  }

  /* ------------------------------------------------------------------ *
   * Economy renderers
   * ------------------------------------------------------------------ */

  function renderRupeeChart(target) {
    C.lineChart(target, [
      {
        label: 'USD/INR',
        color: C.palette.saffron,
        width: 2.6,
        points: D.rupee.points.map(function (p, i) {
          return {
            date: p.date,
            display: p.display,
            value: p.value,
            note: p.note,
            emphasis: !!p.note,
            anchor: i === D.rupee.points.length - 1 ? 'end' : 'middle',
            tooltip: p.value.toFixed(2) + ' per US dollar'
          };
        })
      }
    ], {
      height: 380,
      unit: '',
      decimals: 1,
      yAxisTitle: 'US$ per US$1',
      axisTitle: 'Indian rupee against the US dollar, 2026',
      ariaLabel: 'Line chart of the rupee against the US dollar through 2026'
    });
  }

  function renderEquityChart(target) {
    C.lineChart(target, [
      {
        label: 'BSE Sensex',
        color: C.palette.navy,
        width: 2.6,
        points: D.equityMarkets.points.map(function (p, i) {
          return {
            date: p.date,
            display: p.display,
            value: p.sensex,
            note: i === 0 ? null : null,
            emphasis: i === D.equityMarkets.points.length - 1,
            anchor: 'end',
            tooltip: C.format.commas(p.sensex, 2)
          };
        })
      }
    ], {
      height: 340,
      axisFormat: 'comma',
      yAxisTitle: 'Index level',
      axisTitle: 'BSE Sensex, 2026',
      ariaLabel: 'Line chart of the BSE Sensex at four points in 2026'
    });
  }

  function renderMacroDashboard(target) {
    target.innerHTML = '<div class="def-list">' + D.macroSeries.points.map(function (m) {
      return [
        '<div class="def-row">',
        '  <div class="def-term">' + esc(m.label) + '</div>',
        '  <div class="def-desc"><strong>' + esc(m.value + m.unit) + '</strong> &mdash; ' + esc(m.note) + '</div>',
        '</div>'
      ].join('');
    }).join('') + '</div>';
  }

  function renderRupeeDrivers(target) {
    target.innerHTML = '<div class="def-list">' + D.rupee.drivers.map(function (d) {
      return [
        '<div class="def-row">',
        '  <div class="def-term">' + esc(d.label) + '</div>',
        '  <div class="def-desc">' + esc(d.text) + '</div>',
        '</div>'
      ].join('');
    }).join('') + '</div>';
  }

  function renderReserves(target) {
    var r = D.rupee.reserves;
    target.innerHTML = [
      '<div class="grid grid-3">',
      '  <div class="stat accent-navy"><div class="stat-label">FX reserves, headline</div><div class="stat-value">$' + r.headline + 'B</div><div class="stat-note">Total reported foreign exchange reserves.</div></div>',
      '  <div class="stat accent-amber"><div class="stat-label">Usable, estimated</div><div class="stat-value">$' + r.usable + 'B</div><div class="stat-note">' + esc(r.usableNote) + '</div></div>',
      '  <div class="stat accent-saffron"><div class="stat-label">Peak intervention, one day</div><div class="stat-value">' + esc(r.intervention) + '</div><div class="stat-note">' + esc(r.interventionNote) + '</div></div>',
      '</div>'
    ].join('');
  }

  function renderMarketEvents(target) {
    target.innerHTML = '<div class="def-list">' + D.equityMarkets.events.map(function (e) {
      return [
        '<div class="def-row">',
        '  <div class="def-term">' + esc(e.date) + '</div>',
        '  <div class="def-desc">' + esc(e.text) + '</div>',
        '</div>'
      ].join('');
    }).join('') + '</div>';
  }

  /* ------------------------------------------------------------------ *
   * Employment renderers
   * ------------------------------------------------------------------ */

  function renderEmploymentNational(target) {
    target.innerHTML = '<div class="def-list">' + D.employment.national.map(function (n) {
      return [
        '<div class="def-row">',
        '  <div class="def-term">' + esc(n.label) + '</div>',
        '  <div class="def-desc"><strong>' + esc(n.value) + '</strong> &mdash; ' + esc(n.note) + '</div>',
        '</div>'
      ].join('');
    }).join('') + '</div>';
  }

  function renderEmploymentMechanisms(target) {
    target.innerHTML = '<div class="grid grid-2">' + D.employment.mechanisms.map(function (m) {
      return [
        '<article class="card reveal">',
        '  <h3>' + esc(m.label) + '</h3>',
        '  <p class="mb-0">' + esc(m.text) + '</p>',
        '</article>'
      ].join('');
    }).join('') + '</div>';
    initReveal();
  }

  /* ------------------------------------------------------------------ *
   * Agreement renderers
   * ------------------------------------------------------------------ */

  function renderAgreements(target) {
    target.innerHTML = D.agreements.list.map(function (a) {
      var targets = a.targets.length
        ? '<h4 class="h4 mt-4">Projected effect</h4><ul class="effect-list">' +
          a.targets.map(function (t) {
            return '<li><strong>' + esc(t.from) + ' &rarr; ' + esc(t.to) + '</strong> &mdash; ' + esc(t.note) + '</li>';
          }).join('') +
          '</ul>'
        : '';

      var side = a.sideeffects.length
        ? '<h4 class="h4 mt-3">Other terms</h4><ul class="effect-list">' +
          a.sideeffects.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') +
          '</ul>'
        : '';

      var dayOne = a.dayone
        ? '<div class="recovery mt-3"><strong>Day one.</strong> ' + esc(a.dayone) + '</div>'
        : '';

      return [
        '<article class="card agreement reveal" id="agr-' + esc(a.abbr.toLowerCase().replace(/[^a-z0-9]+/g, '-')) + '">',
        '  <header class="flex-between">',
        '    <div>',
        '      <h3 class="mb-0">' + esc(a.partner) + '</h3>',
        '      <p class="small muted mb-0">' + esc(a.abbr) + ' &middot; signed ' + esc(a.signed) + '</p>',
        '    </div>',
        '    <span class="tag tag-' + esc(a.colour) + '">' + esc(a.status) + '</span>',
        '  </header>',
        '  <h4 class="h4 mt-3">' + esc(a.headline) + '</h4>',
        '  <p>' + esc(a.detail) + '</p>',
        '  <h4 class="h4">What it covers</h4>',
        '  <p>' + esc(a.sectors) + '</p>',
        '  <h4 class="h4">Scale</h4>',
        '  <p>' + esc(a.scale) + '</p>',
        side,
        targets,
        dayOne,
        '</article>'
      ].join('\n');
    }).join('\n');
    initReveal();
  }

  function renderAgreementsTable(target) {
    var rows = [];
    D.agreements.list.forEach(function (a) {
      rows.push([
        { value: '<strong>' + esc(a.partner) + '</strong>', __html: true },
        a.abbr,
        a.status,
        a.signed,
        a.date
      ]);
    });
    target.innerHTML = table(
      ['Partner', 'Instrument', 'Status', 'Signed', 'In force or concluded'],
      rows,
      { caption: 'The 2025-26 wave of Indian trade agreements. Four are in force or concluded; none replaces US market access.' }
    );
  }

  /* ------------------------------------------------------------------ *
   * Global response renderers
   * ------------------------------------------------------------------ */

  function renderGlobalCards(target) {
    target.innerHTML = D.globalResponses.map(function (g) {
      return [
        '<article class="card global-card reveal" id="g-' + esc(g.id) + '">',
        '  <header class="flex-between">',
        '    <div>',
        '      <h3 class="mb-0">' + esc(g.country) + '</h3>',
        '      <p class="small muted mb-0">' + esc(g.role) + '</p>',
        '    </div>',
        '    <span class="tag tag-' + esc(g.tone) + '">Global</span>',
        '  </header>',
        '  <p class="mt-3">' + esc(g.summary) + '</p>',
        '  <h4 class="h4">Moves</h4>',
        '  <div class="move-list">',
        g.moves.map(function (m) {
          return [
            '<div class="move">',
            '  <div class="move-label">' + esc(m.label) + '</div>',
            '  <div class="move-text">' + esc(m.text) + '</div>',
            '</div>'
          ].join('');
        }).join(''),
        '  </div>',
        '</article>'
      ].join('\n');
    }).join('\n');
    initReveal();
  }

  /* ------------------------------------------------------------------ *
   * Outlook renderers
   * ------------------------------------------------------------------ */

  function renderScenarioChart(target) {
    C.horizontalBarChart(target, D.scenarios.map(function (s) {
      return {
        label: s.name.length > 34 ? s.name.slice(0, 33) + '…' : s.name,
        value: s.probability,
        display: s.probability + '%',
        color: s.tone === 'red' ? C.palette.red
          : s.tone === 'purple' ? C.palette.purple
          : s.tone === 'saffron' ? C.palette.saffron
          : C.palette.navy
      };
    }).sort(function (a, b) { return a.value - b.value; }), {
      labelWidth: 300,
      valueWidth: 66,
      rowHeight: 44,
      unit: '%',
      ariaLabel: 'Author-assigned probability for each outlook scenario'
    });
  }

  function renderScenarios(target) {
    target.innerHTML = D.scenarios.map(function (s) {
      return [
        '<article class="scenario scenario-' + esc(s.tone) + ' reveal" id="sc-' + esc(s.id) + '">',
        '  <header class="scenario-head">',
        '    <div>',
        '      <span class="eyebrow">' + esc(s.likelihood) + '</span>',
        '      <h3 class="mb-0">' + esc(s.name) + '</h3>',
        '    </div>',
        '    <div class="scenario-prob" aria-label="Assigned probability ' + s.probability + ' per cent">',
        '      <div class="scenario-prob-value">' + s.probability + '%</div>',
        '      <div class="scenario-prob-bar"><span style="width:' + s.probability + '%"></span></div>',
        '    </div>',
        '  </header>',
        '  <div class="scenario-body">',
        '    <h4 class="h4">' + esc(s.headline) + '</h4>',
        '    <p>' + esc(s.detail) + '</p>',
        '    <div class="grid grid-2">',
        '      <div>',
        '        <h4 class="h4">What would have to happen</h4>',
        '        <ul class="effect-list">' + s.triggers.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>',
        '      </div>',
        '      <div>',
        '        <h4 class="h4">Consequences</h4>',
        '        <ul class="effect-list">' + s.effects.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>',
        '      </div>',
        '    </div>',
        '    <div class="scenario-tell"><strong>How you would know.</strong> ' + esc(s.tells) + '</div>',
        '  </div>',
        '</article>'
      ].join('\n');
    }).join('\n');
    initReveal();
  }

  /* ------------------------------------------------------------------ *
   * Registry
   * ------------------------------------------------------------------ */

  var RENDERERS = {
    timeline: renderTimeline,
    'timeline-table': renderTimelineTable,
    'rate-chart': renderRateChart,
    'competitor-chart': renderCompetitorChart,
    'competitor-shift': renderCompetitorShift,
    'competitor-table': renderCompetitorTable,
    'basket-chart': renderBasketChart,
    'exports-chart': renderExportsChart,
    'category-chart': renderCategoryChart,
    'diversification-chart': renderDiversificationChart,
    'cost-range': renderCostRange,
    'cost-estimates': renderCostEstimates,
    'exposed-split': renderExposedSplit,
    'section232-chart': renderSection232Chart,
    'section232-table': renderSection232Table,
    'monthly-table': renderMonthlyTable,
    'macro-list': renderMacroList,
    'sectors': renderSectors,
    'open-questions': renderOpenQuestions,
    'sources': renderSources,
    'method': renderMethod,
    'glossary': renderGlossary,
    'export-lines': renderSaffronBarChart,
    'bilateral-chart': renderBilateralChart,
    'china-chart': renderChinaChart,
    'destinations-table': renderDestinationsTable,
    'state-exports-chart': renderStateExportsChart,
    'state-scatter': renderStateScatter,
    'state-table': renderStateTable,
    'jobs-chart': renderJobsChart,
    'cluster-cards': renderClusterCards,
    'rupee-chart': renderRupeeChart,
    'equity-chart': renderEquityChart,
    'macro-dashboard': renderMacroDashboard,
    'rupee-drivers': renderRupeeDrivers,
    'reserves': renderReserves,
    'market-events': renderMarketEvents,
    'employment-national': renderEmploymentNational,
    'employment-mechanisms': renderEmploymentMechanisms,
    'agreements': renderAgreements,
    'agreements-table': renderAgreementsTable,
    'global-cards': renderGlobalCards,
    'scenario-chart': renderScenarioChart,
    'scenarios': renderScenarios
  };

  function runRenderers() {
    Object.keys(RENDERERS).forEach(function (name) {
      var nodes = mounts(name);
      if (!nodes.length) return;
      if (!D || !C) return;
      nodes.forEach(function (node) {
        try {
          RENDERERS[name](node);
        } catch (err) {
          // A single failed chart should never blank the page.
          if (global.console && console.error) {
            console.error('[tariff-impact] renderer "' + name + '" failed:', err);
          }
        }
      });
    });
  }

  /* ------------------------------------------------------------------ *
   * Stamp the verification date wherever a slot exists
   * ------------------------------------------------------------------ */

  function initDates() {
    if (!D) return;
    $$('[data-last-verified]').forEach(function (node) {
      node.textContent = D.lastVerified;
    });
  }

  /* ------------------------------------------------------------------ *
   * Boot
   * ------------------------------------------------------------------ */

  function boot() {
    if (!D || !C) {
      if (global.console && console.error) {
        console.error('[tariff-impact] data.js or charts.js failed to load.');
      }
      return;
    }
    initNav();
    initTheme();
    runRenderers();
    initDates();
    initCounters();
    initReveal();
    initToc();
    initFilters();
    initSearch();
    document.documentElement.classList.add('js-ready');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  global.Site = { init: boot, esc: esc };
})(window);
