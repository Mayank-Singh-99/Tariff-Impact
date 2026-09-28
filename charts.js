/**
 * Tariff Impact India - dependency-free SVG chart library.
 *
 * No external charting dependency. Every chart is emitted as SVG with a viewBox
 * so it scales with its container. Callers pass data in and get an element back.
 */
(function (global) {
  'use strict';

  var NS = 'http://www.w3.org/2000/svg';

  var PALETTE = {
    navy: '#132c52',
    navyLight: '#4a6a94',
    saffron: '#e07800',
    saffronLight: '#f5b267',
    green: '#0f7a3d',
    greenLight: '#5fbf8c',
    red: '#b3261e',
    redLight: '#e0766f',
    amber: '#b26a00',
    purple: '#6b3fa0',
    slate: '#667085',
    grid: '#f1f3f6',
    axis: '#e4e7ec',
    text: '#384250',
    textMuted: '#667085',
    textFaint: '#98a2b3'
  };

  // Every palette colour is also published as a CSS custom property, so charts
  // re-colour themselves when the page theme changes without re-rendering.
  var CSS_VARS = {};
  Object.keys(PALETTE).forEach(function (key) {
    CSS_VARS[PALETTE[key]] = '--chart-' + key.toLowerCase();
  });

  function themeColor(value) {
    var name = CSS_VARS[value];
    return name ? 'var(' + name + ', ' + value + ')' : value;
  }

  function el(name, attrs) {
    var node = document.createElementNS(NS, name);
    if (attrs) {
      for (var k in attrs) {
        if (!Object.prototype.hasOwnProperty.call(attrs, k)) continue;
        if (attrs[k] === null || attrs[k] === undefined) continue;
        var v = String(attrs[k]);
        if ((k === 'fill' || k === 'stroke' || k === 'stop-color') && CSS_VARS[v]) {
          node.style[k] = themeColor(v);
        } else {
          node.setAttribute(k, v);
        }
      }
    }
    return node;
  }

  function text(str, attrs) {
    var node = el('text', attrs);
    node.textContent = str;
    return node;
  }

  function svgRoot(w, h) {
    return el('svg', {
      viewBox: '0 0 ' + w + ' ' + h,
      class: 'chart-svg',
      role: 'img',
      preserveAspectRatio: 'xMidYMid meet'
    });
  }

  function niceMax(value) {
    if (value <= 0) return 1;
    var exp = Math.floor(Math.log10(value));
    var base = Math.pow(10, exp);
    var frac = value / base;
    var step;
    if (frac <= 1) step = 1;
    else if (frac <= 2) step = 2;
    else if (frac <= 2.5) step = 2.5;
    else if (frac <= 5) step = 5;
    else step = 10;
    return step * base;
  }

  function tickValues(max, count) {
    var out = [];
    for (var i = 0; i <= count; i++) out.push((max / count) * i);
    return out;
  }

  function fmt(value, decimals) {
    if (decimals === undefined || decimals === null) {
      decimals = Number.isInteger(value) ? 0 : 1;
    }
    return Number(value).toFixed(decimals);
  }

  function withCommas(value, decimals) {
    var n = Number(value);
    var fixed = n.toFixed(decimals === undefined ? 0 : decimals);
    var parts = fixed.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }

  function fmtAxis(value, opts) {
    var o = opts || {};
    if (o.axisFormat === 'comma') return withCommas(value, o.decimals === undefined ? 0 : o.decimals);
    if (o.axisFormat === 'plain') return fmt(value, o.decimals === undefined ? 1 : o.decimals);
    return withCommas(value, value < 10 && value % 1 !== 0 ? 1 : 0) + (o.unit || '');
  }

  function niceTimeBounds(series) {
    var times = [];
    series.forEach(function (s) {
      s.points.forEach(function (p) { times.push(new Date(p.date).getTime()); });
    });
    return { start: Math.min.apply(null, times), end: Math.max.apply(null, times) };
  }

  /* Wrap a label onto at most `max` lines of roughly `maxChars` characters. */
  function wrapLabel(str, maxChars, max) {
    var words = String(str).split(' ');
    var lines = [];
    var cur = '';
    words.forEach(function (w) {
      if ((cur + ' ' + w).trim().length > maxChars) { lines.push(cur.trim()); cur = w; }
      else { cur += ' ' + w; }
    });
    if (cur.trim()) lines.push(cur.trim());
    return lines.slice(0, max || 2);
  }

  function makeTooltip(node, label, value) {
    var title = el('title');
    title.textContent = label + ': ' + value;
    node.appendChild(title);
  }

  /* ================================================================ *
   * Rate line chart - the flagship: US tariff rate on Indian goods
   * over time, with bands for each episode.
   * ================================================================ */
  function rateTimeline(mount, points, options) {
    if (!mount) return;
    var opts = options || {};
    var W = 1000;
    var H = opts.height || 400;
    var pad = { top: 24, right: 26, bottom: 52, left: 46 };
    var innerW = W - pad.left - pad.right;
    var innerH = H - pad.top - pad.bottom;

    var svg = svgRoot(W, H);
    svg.setAttribute('aria-label', opts.ariaLabel || 'US tariff rate on Indian goods over time');

    var start = new Date(points[0].date).getTime();
    var end = new Date(points[points.length - 1].date).getTime();
    var span = end - start || 1;
    var maxY = niceMax(Math.max.apply(null, points.map(function (p) { return p.rate || 0; })));

    function x(dateStr) {
      return pad.left + ((new Date(dateStr).getTime() - start) / span) * innerW;
    }
    function y(val) {
      return pad.top + innerH - (val / maxY) * innerH;
    }

    // Threshold band: above 25% is the punitive zone
    if (opts.showThreshold !== false) {
      svg.appendChild(el('rect', {
        x: pad.left, y: pad.top, width: innerW,
        height: Math.max(0, y(opts.threshold || 25) - pad.top),
        fill: PALETTE.red, opacity: 0.05
      }));
    }

    // Gridlines + y axis
    tickValues(maxY, 4).forEach(function (t) {
      var ty = y(t);
      svg.appendChild(el('line', {
        x1: pad.left, y1: ty, x2: pad.left + innerW, y2: ty,
        class: t === 0 ? 'axis-line' : 'axis-grid'
      }));
      svg.appendChild(text(fmt(t) + '%', {
        x: pad.left - 10, y: ty + 4, 'text-anchor': 'end', class: 'axis-label'
      }));
    });

    // X axis baseline
    svg.appendChild(el('line', {
      x1: pad.left, y1: pad.top + innerH, x2: pad.left + innerW, y2: pad.top + innerH,
      class: 'axis-line'
    }));

    // Area under the step line
    var stepPts = [];
    points.forEach(function (p, i) {
      var px = x(p.date);
      var py = y(p.rate || 0);
      if (i === 0) stepPts.push([px, py]);
      else stepPts.push([px, stepPts[stepPts.length - 1][1]]);
      stepPts.push([px, py]);
    });
    var areaD = 'M' + stepPts.map(function (p) { return p[0] + ',' + p[1]; }).join(' L') +
      ' L' + stepPts[stepPts.length - 1][0] + ',' + (pad.top + innerH) +
      ' L' + stepPts[0][0] + ',' + (pad.top + innerH) + ' Z';

    var gradId = 'rateGrad';
    var defs = el('defs');
    var lg = el('linearGradient', { id: gradId, x1: '0', y1: '0', x2: '0', y2: '1' });
    lg.appendChild(el('stop', { offset: '0%', 'stop-color': PALETTE.saffron, 'stop-opacity': '0.28' }));
    lg.appendChild(el('stop', { offset: '100%', 'stop-color': PALETTE.saffron, 'stop-opacity': '0.02' }));
    defs.appendChild(lg);
    svg.appendChild(defs);
    svg.appendChild(el('path', { d: areaD, fill: 'url(#' + gradId + ')' }));

    // Step line
    var lineD = 'M' + stepPts.map(function (p) { return p[0] + ',' + p[1]; }).join(' L');
    svg.appendChild(el('path', {
      d: lineD, fill: 'none', stroke: PALETTE.saffron,
      'stroke-width': 2.5, 'stroke-linejoin': 'round', 'stroke-linecap': 'round'
    }));

    // Points, coloured by episode
    var kindColor = {
      escalation: PALETTE.red,
      relief: PALETTE.green,
      legal: PALETTE.purple,
      negotiation: PALETTE.navy,
      domestic: PALETTE.saffron,
      threat: '#7f1d1d'
    };

    points.forEach(function (p) {
      if (p.rate === null || p.rate === undefined) return;
      var cx = x(p.date);
      var cy = y(p.rate);
      var color = kindColor[p.kind] || PALETTE.navy;
      var g = el('g');
      g.appendChild(el('circle', {
        cx: cx, cy: cy, r: 5, fill: PALETTE.navy,
        stroke: color, 'stroke-width': 2.5
      }));
      makeTooltip(g, p.display, p.rate + '% additional duty' + (p.title ? ' - ' + p.title : ''));
      svg.appendChild(g);
    });

    // Annotate the peak and the current rate
    function annotate(p, anchor, color) {
      var cx = x(p.date);
      var cy = y(p.rate);
      var label = text(p.rate + '%', {
        x: cx, y: cy - 16, 'text-anchor': anchor, class: 'point-label', fill: color
      });
      svg.appendChild(label);
    }
    var peak = points.reduce(function (a, b) { return (b.rate || 0) > (a.rate || 0) ? b : a; });
    annotate(peak, 'middle', PALETTE.red);
    var last = points[points.length - 1];
    if (last.rate !== null) annotate(last, 'end', PALETTE.navy);

    // X labels. Index-based labels drift out of alignment and can drop
    // the final year off the axis, so label calendar years instead:
    // a gridline at each 1 January and the year centred inside its own
    // span, which spaces them evenly and keeps the last one on the plot.
    function xT(t) {
      return pad.left + ((t - start) / span) * innerW;
    }

    var firstYear = new Date(start).getFullYear();
    var lastYear = new Date(end).getFullYear();
    for (var yr = firstYear; yr <= lastYear; yr++) {
      var jan = new Date(yr, 0, 1).getTime();
      if (jan > start && jan < end) {
        svg.appendChild(el('line', {
          x1: xT(jan), y1: pad.top, x2: xT(jan), y2: pad.top + innerH,
          class: 'axis-grid'
        }));
      }
      svg.appendChild(text(String(yr), {
        x: xT(new Date(yr, 6, 1).getTime()),
        y: pad.top + innerH + 20,
        'text-anchor': 'middle',
        class: 'axis-label axis-year'
      }));
    }

    // Exact first and last dates on a second line, trimmed of any range
    // so the boundary days stay on one line each.
    function edgeDate(p) {
      return String(p.display).split(/\s*[-–—]\s*/)[0];
    }
    [[points[0], 'start'], [points[points.length - 1], 'end']].forEach(function (pair) {
      if (!pair[0]) return;
      svg.appendChild(text(edgeDate(pair[0]), {
        x: pair[1] === 'start' ? pad.left : pad.left + innerW,
        y: pad.top + innerH + 37,
        'text-anchor': pair[1],
        class: 'axis-label axis-edge'
      }));
    });

    svg.appendChild(text('Additional US duty on Indian goods, on top of MFN', {
      x: pad.left, y: H - 8, class: 'axis-title'
    }));

    mount.appendChild(svg);
  }

  /* ================================================================ *
   * Vertical bar chart
   * ================================================================ */
  function barChart(mount, items, options) {
    if (!mount || !items.length) return;
    var opts = options || {};
    var W = 1000;
    var H = opts.height || 340;
    var pad = { top: 22, right: 20, bottom: opts.labelHeight || 62, left: opts.valueAxis === false ? 16 : 48 };
    var innerW = W - pad.left - pad.right;
    var innerH = H - pad.top - pad.bottom;

    var svg = svgRoot(W, H);
    svg.setAttribute('aria-label', opts.ariaLabel || 'Bar chart');

    var maxVal = niceMax(Math.max.apply(null, items.map(function (i) { return i.value; })));
    var showAxis = opts.valueAxis !== false;

    function y(val) { return pad.top + innerH - (val / maxVal) * innerH; }

    if (showAxis) {
      tickValues(maxVal, 4).forEach(function (t) {
        var ty = y(t);
        svg.appendChild(el('line', {
          x1: pad.left, y1: ty, x2: pad.left + innerW, y2: ty,
          class: t === 0 ? 'axis-line' : 'axis-grid'
        }));
        svg.appendChild(text(fmt(t) + (opts.unit || ''), {
          x: pad.left - 10, y: ty + 4, 'text-anchor': 'end', class: 'axis-label'
        }));
      });
    }

    var slot = innerW / items.length;
    var barW = Math.min(slot * (opts.barRatio || 0.56), 78);
    var radius = 4;

    items.forEach(function (item, i) {
      var cx = pad.left + slot * i + slot / 2;
      var h = Math.max(1.5, (item.value / maxVal) * innerH);
      var by = pad.top + innerH - h;
      var color = item.color || opts.color || PALETTE.navy;

      var g = el('g', { class: 'bar' });
      g.appendChild(el('rect', {
        x: cx - barW / 2, y: by, width: barW, height: h,
        rx: radius, ry: radius, fill: color
      }));
      makeTooltip(g, item.label, item.display || (fmt(item.value, opts.decimals) + (opts.unit || '')));
      svg.appendChild(g);

      if (opts.showValues !== false) {
        svg.appendChild(text(item.display || fmt(item.value, opts.decimals), {
          x: cx, y: by - 8, 'text-anchor': 'middle', class: 'bar-value'
        }));
      }

      // Wrapped label
      var words = String(item.label).split(' ');
      var lines = [];
      var cur = '';
      var maxChars = opts.maxLabelChars || 16;
      words.forEach(function (w) {
        if ((cur + ' ' + w).trim().length > maxChars) { lines.push(cur.trim()); cur = w; }
        else { cur += ' ' + w; }
      });
      if (cur.trim()) lines.push(cur.trim());
      lines.slice(0, 3).forEach(function (line, li) {
        svg.appendChild(text(line, {
          x: cx, y: pad.top + innerH + 18 + li * 13, 'text-anchor': 'middle', class: 'axis-label'
        }));
      });
    });

    mount.appendChild(svg);
  }

  /* ================================================================ *
   * Grouped bar chart - two series side by side per category
   * ================================================================ */
  function groupedBarChart(mount, groups, options) {
    if (!mount || !groups.length) return;
    var opts = options || {};
    var W = 1000;
    var H = opts.height || 340;
    var pad = { top: 26, right: 20, bottom: 68, left: 56 };
    var innerW = W - pad.left - pad.right;
    var innerH = H - pad.top - pad.bottom;

    var svg = svgRoot(W, H);
    svg.setAttribute('aria-label', opts.ariaLabel || 'Grouped bar chart');

    var allVals = [];
    groups.forEach(function (g) { allVals = allVals.concat(g.values.map(function (v) { return v.value; })); });
    var maxVal = niceMax(Math.max.apply(null, allVals));

    function y(val) { return pad.top + innerH - (val / maxVal) * innerH; }

    tickValues(maxVal, 4).forEach(function (t) {
      var ty = y(t);
      svg.appendChild(el('line', {
        x1: pad.left, y1: ty, x2: pad.left + innerW, y2: ty,
        class: t === 0 ? 'axis-line' : 'axis-grid'
      }));
      svg.appendChild(text(withCommas(t), {
        x: pad.left - 10, y: ty + 4, 'text-anchor': 'end', class: 'axis-label'
      }));
    });

    var slot = innerW / groups.length;
    var seriesCount = groups[0].values.length;
    var barW = Math.min((slot * 0.62) / seriesCount, 54);
    var radius = 4;

    groups.forEach(function (group, gi) {
      var groupW = barW * seriesCount + 6 * (seriesCount - 1);
      var startX = pad.left + slot * gi + (slot - groupW) / 2;

      group.values.forEach(function (v, si) {
        var h = Math.max(1.5, (v.value / maxVal) * innerH);
        var by = pad.top + innerH - h;
        var bx = startX + si * (barW + 6);
        var g = el('g', { class: 'bar' });
        g.appendChild(el('rect', {
          x: bx, y: by, width: barW, height: h, rx: radius, ry: radius, fill: v.color
        }));
        makeTooltip(g, group.label + ' - ' + v.label, '$' + withCommas(v.value, 2) + 'B');
        svg.appendChild(g);
        if (opts.showValues !== false) {
          svg.appendChild(text(withCommas(v.value, 1), {
            x: bx + barW / 2, y: by - 8, 'text-anchor': 'middle', class: 'bar-value'
          }));
        }
      });

      var words = String(group.label).split(' ');
      var lines = [];
      var cur = '';
      words.forEach(function (w) {
        if ((cur + ' ' + w).trim().length > (opts.maxLabelChars || 20)) { lines.push(cur.trim()); cur = w; }
        else { cur += ' ' + w; }
      });
      if (cur.trim()) lines.push(cur.trim());
      lines.slice(0, 2).forEach(function (line, li) {
        svg.appendChild(text(line, {
          x: pad.left + slot * gi + slot / 2,
          y: pad.top + innerH + 20 + li * 13,
          'text-anchor': 'middle', class: 'axis-label'
        }));
      });
    });

    // Legend
    if (opts.legend) {
      opts.legend.forEach(function (item, i) {
        var lx = pad.left + i * 190;
        svg.appendChild(el('rect', { x: lx, y: 6, width: 11, height: 11, rx: 3, fill: item.color }));
        svg.appendChild(text(item.label, { x: lx + 17, y: 16, class: 'axis-label' }));
      });
    }

    svg.appendChild(text(opts.unitLabel || '', {
      x: pad.left, y: H - 8, class: 'axis-title'
    }));

    mount.appendChild(svg);
  }

  /* ================================================================ *
   * Horizontal bar chart - good for ranked lists with long labels
   * ================================================================ */
  function horizontalBarChart(mount, items, options) {
    if (!mount || !items.length) return;
    var opts = options || {};
    var rowH = opts.rowHeight || 34;
    var W = 1000;
    var labelW = opts.labelWidth || 230;
    var valueW = opts.valueWidth || 96;
    var H = items.length * rowH + 34;
    var pad = { top: 20, right: 12, bottom: 20, left: 4 };

    var svg = svgRoot(W, H);
    svg.setAttribute('aria-label', opts.ariaLabel || 'Ranked bar chart');

    var innerW = W - labelW - valueW - pad.left - pad.right;
    var maxVal = Math.max.apply(null, items.map(function (i) { return i.value; }));

    items.forEach(function (item, i) {
      var cy = pad.top + i * rowH + rowH / 2;
      var w = Math.max(2, (item.value / maxVal) * innerW);
      var color = item.color || opts.color || PALETTE.navy;

      svg.appendChild(text(item.label, {
        x: pad.left, y: cy + 4, class: 'bar-label', 'text-anchor': 'start'
      }));

      var g = el('g', { class: 'bar' });
      g.appendChild(el('rect', {
        x: labelW, y: cy - 9, width: w, height: 18, rx: 4, fill: color
      }));
      makeTooltip(g, item.label, item.display || fmt(item.value, 1) + (opts.unit || ''));
      svg.appendChild(g);

      svg.appendChild(text(item.display || fmt(item.value, 1) + (opts.unit || ''), {
        x: W - pad.right, y: cy + 4, 'text-anchor': 'end',
        class: 'bar-value', fill: item.valueColor || PALETTE.ink
      }));

      svg.appendChild(el('line', {
        x1: pad.left, y1: pad.top + (i + 1) * rowH, x2: W - pad.right, y2: pad.top + (i + 1) * rowH,
        class: 'axis-grid'
      }));
    });

    mount.appendChild(svg);
  }

  /* ================================================================ *
   * Donut chart - composition of the export basket
   * ================================================================ */
  function donutChart(mount, items, options) {
    if (!mount || !items.length) return;
    var opts = options || {};
    var W = 1000;
    var H = 420;
    var cx = 250;
    var cy = H / 2;
    var R = 150;
    var r = 82;

    var svg = svgRoot(W, H);
    svg.setAttribute('aria-label', opts.ariaLabel || 'Composition chart');

    var total = items.reduce(function (a, b) { return a + b.value; }, 0);
    var angle = -Math.PI / 2;

    function arcPath(a0, a1) {
      var x0 = cx + R * Math.cos(a0), y0 = cy + R * Math.sin(a0);
      var x1 = cx + R * Math.cos(a1), y1 = cy + R * Math.sin(a1);
      var x2 = cx + r * Math.cos(a1), y2 = cy + r * Math.sin(a1);
      var x3 = cx + r * Math.cos(a0), y3 = cy + r * Math.sin(a0);
      var large = a1 - a0 > Math.PI ? 1 : 0;
      return 'M' + x0 + ',' + y0 +
        ' A' + R + ',' + R + ' 0 ' + large + ' 1 ' + x1 + ',' + y1 +
        ' L' + x2 + ',' + y2 +
        ' A' + r + ',' + r + ' 0 ' + large + ' 0 ' + x3 + ',' + y3 + ' Z';
    }

    items.forEach(function (item) {
      var sweep = (item.value / total) * Math.PI * 2;
      var g = el('g', { class: 'bar' });
      g.appendChild(el('path', { d: arcPath(angle, angle + sweep), fill: item.color }));
      makeTooltip(g, item.label, item.display || fmt(item.value, 1) + '%');
      svg.appendChild(g);
      angle += sweep;
    });

    // Centre label
    svg.appendChild(text(opts.centerValue || '$87B', {
      x: cx, y: cy - 4, 'text-anchor': 'middle',
      style: 'font-size:26px;font-weight:750;fill:' + themeColor(PALETTE.navy)
    }));
    svg.appendChild(text(opts.centerLabel || 'FY25 exports to the US', {
      x: cx, y: cy + 20, 'text-anchor': 'middle',
      style: 'font-size:12px;font-weight:600;fill:' + themeColor(PALETTE.textMuted)
    }));

    // Side legend with values
    var lx = 470;
    var ly = cy - (items.length * 34) / 2 + 22;
    items.forEach(function (item, i) {
      var yPos = ly + i * 34;
      svg.appendChild(el('rect', { x: lx, y: yPos - 11, width: 12, height: 12, rx: 3, fill: item.color }));
      svg.appendChild(text(item.label, { x: lx + 21, y: yPos, class: 'bar-label' }));
      svg.appendChild(text(item.display || fmt(item.value, 1) + '%', {
        x: W - 16, y: yPos, 'text-anchor': 'end', class: 'bar-value'
      }));
    });

    mount.appendChild(svg);
  }

  /* ================================================================ *
   * Range chart - shows competing estimates as spans
   * ================================================================ */
  function rangeChart(mount, rows, options) {
    if (!mount || !rows.length) return;
    var opts = options || {};
    var rowH = opts.rowHeight || 52;
    var W = 1000;
    var labelW = 250;
    var valueW = 150;
    var H = rows.length * rowH + 44;
    var pad = { top: 28, right: 20, bottom: 22, left: 6 };

    var svg = svgRoot(W, H);
    svg.setAttribute('aria-label', opts.ariaLabel || 'Estimate ranges');

    var innerW = W - labelW - valueW - pad.left - pad.right;
    var maxVal = niceMax(Math.max.apply(null, rows.map(function (r) { return r.high; })));

    function x(val) { return labelW + (val / maxVal) * innerW; }

    // Axis
    [0, maxVal / 4, maxVal / 2, (maxVal * 3) / 4, maxVal].forEach(function (t) {
      svg.appendChild(el('line', {
        x1: x(t), y1: pad.top - 8, x2: x(t), y2: H - pad.bottom,
        class: t === 0 ? 'axis-line' : 'axis-grid'
      }));
      svg.appendChild(text(fmt(t, 1), { x: x(t), y: 14, 'text-anchor': 'middle', class: 'axis-label' }));
    });

    rows.forEach(function (row, i) {
      var cy = pad.top + 14 + i * rowH + rowH / 2;
      var x0 = x(row.low);
      var x1 = x(row.high);
      var color = row.color || opts.color || PALETTE.navy;
      var isPoint = Math.abs(row.high - row.low) < 0.0001;

      var g = el('g', { class: 'bar' });
      if (isPoint) {
        g.appendChild(el('circle', { cx: x0, cy: cy, r: 7, fill: color }));
      } else {
        g.appendChild(el('rect', {
          x: x0, y: cy - 11, width: Math.max(4, x1 - x0), height: 22, rx: 5, fill: color
        }));
      }
      makeTooltip(g, row.label, fmt(row.low, 1) + ' to ' + fmt(row.high, 1) + (opts.unit || ''));
      svg.appendChild(g);

      svg.appendChild(text(row.label, { x: pad.left, y: cy + 4, class: 'bar-label' }));
      svg.appendChild(text(row.display || (fmt(row.low, 1) + '-' + fmt(row.high, 1) + (opts.unit || '')), {
        x: W - pad.right, y: cy + 4, 'text-anchor': 'end', class: 'bar-value', fill: color
      }));
    });

    svg.appendChild(text(opts.unitLabel || '', { x: labelW, y: H - 6, class: 'axis-title' }));

    mount.appendChild(svg);
  }

  /* ================================================================ *
   * Stacked severity bar - share of exports hit
   * ================================================================ */
  function splitBar(mount, segments, options) {
    if (!mount) return;
    var opts = options || {};
    var W = 1000;
    var H = opts.height || 92;
    var barY = 8;
    var barH = opts.barHeight || 40;

    var svg = svgRoot(W, H);
    svg.setAttribute('aria-label', opts.ariaLabel || 'Share of exports');

    var total = segments.reduce(function (a, b) { return a + b.value; }, 0);
    var x = 0;
    var radius = 6;

    segments.forEach(function (seg, i) {
      var w = (seg.value / total) * W;
      var g = el('g', { class: 'bar' });
      var isFirst = i === 0;
      var isLast = i === segments.length - 1;
      g.appendChild(el('rect', {
        x: x, y: barY, width: Math.max(2, w - (isLast ? 0 : 2)), height: barH,
        rx: isFirst || isLast ? radius : 0,
        fill: seg.color
      }));
      makeTooltip(g, seg.label, fmt(seg.value, seg.decimals === undefined ? 0 : seg.decimals) + (opts.unit || '%'));
      svg.appendChild(g);

      if (w > 78) {
        svg.appendChild(text(seg.text || (fmt(seg.value, 0) + (opts.unit || '%')), {
          x: x + w / 2, y: barY + barH / 2 + 5, 'text-anchor': 'middle',
          style: 'font-size:13px;font-weight:700;fill:' + (seg.textColor || '#fff')
        }));
      }
      x += w;
    });

    if (opts.footLabels !== false) {
      segments.forEach(function (seg, i) {
        var w = (seg.value / total) * W;
        if (w < 60) return;
        var gx = 0, idx = 0;
        for (var k = 0; k < i; k++) gx += (segments[k].value / total) * W;
        svg.appendChild(text(seg.foot || '', {
          x: gx + w / 2, y: barY + barH + 22, 'text-anchor': 'middle',
          class: 'axis-label'
        }));
      });
    }

    mount.appendChild(svg);
  }

  /* ================================================================ *
   * Multi-series line chart - the workhorse for time series that are
   * not tariff rates: exchange rates, index levels, commodity prices.
   * ================================================================ */
  function lineChart(mount, series, options) {
    if (!mount || !series || !series.length) return;
    var opts = options || {};
    var W = 1000;
    var H = opts.height || 380;
    var pad = { top: 30, right: 34, bottom: 56, left: 62 };
    var innerW = W - pad.left - pad.right;
    var innerH = H - pad.top - pad.bottom;

    var svg = svgRoot(W, H);
    svg.setAttribute('aria-label', opts.ariaLabel || 'Time series chart');

    var bounds = niceTimeBounds(series);
    var span = (bounds.end - bounds.start) || 1;

    var all = [];
    series.forEach(function (s) { all = all.concat(s.points); });
    var vals = all.map(function (p) { return p.value; });
    var rawMin = Math.min.apply(null, vals);
    var rawMax = Math.max.apply(null, vals);
    var padVal = (rawMax - rawMin) * 0.18 || Math.abs(rawMax) * 0.05 || 1;
    var minY = opts.minY !== undefined ? opts.minY : Math.max(0, rawMin - padVal);
    var maxY = opts.maxY !== undefined ? opts.maxY : rawMax + padVal;
    if (maxY <= minY) maxY = minY + 1;

    function x(t) { return pad.left + ((t - bounds.start) / span) * innerW; }
    function y(v) { return pad.top + innerH - ((v - minY) / (maxY - minY)) * innerH; }

    // Optional shaded period bands behind everything else
    (opts.bands || []).forEach(function (band) {
      var bx0 = x(new Date(band.from).getTime());
      var bx1 = x(new Date(band.to).getTime());
      var left = Math.min(bx0, bx1);
      var w = Math.max(2, Math.abs(bx1 - bx0));
      svg.appendChild(el('rect', {
        x: left, y: pad.top, width: w, height: innerH,
        fill: band.color, opacity: band.opacity === undefined ? 0.08 : band.opacity
      }));
      if (band.label) {
        svg.appendChild(text(band.label, {
          x: left + w / 2, y: pad.top - 8, 'text-anchor': 'middle',
          class: 'axis-title', fill: band.color
        }));
      }
    });

    // Horizontal gridlines and value axis
    var tickCount = opts.ticks || 4;
    for (var i = 0; i <= tickCount; i++) {
      var v = minY + ((maxY - minY) / tickCount) * i;
      var ty = y(v);
      svg.appendChild(el('line', {
        x1: pad.left, y1: ty, x2: pad.left + innerW, y2: ty,
        class: i === 0 ? 'axis-line' : 'axis-grid'
      }));
      svg.appendChild(text(fmtAxis(v, opts), {
        x: pad.left - 10, y: ty + 4, 'text-anchor': 'end', class: 'axis-label'
      }));
    }

    svg.appendChild(el('line', {
      x1: pad.left, y1: pad.top + innerH, x2: pad.left + innerW, y2: pad.top + innerH,
      class: 'axis-line'
    }));

    // Series lines, drawn back to front so the primary series sits on top
    series.forEach(function (s) {
      var ordered = s.points.slice().sort(function (a, b) {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
      var d = ordered.map(function (p, pi) {
        return (pi === 0 ? 'M' : 'L') + x(new Date(p.date).getTime()) + ',' + y(p.value);
      }).join(' ');

      svg.appendChild(el('path', {
        d: d, fill: 'none', stroke: s.color || PALETTE.navy,
        'stroke-width': s.width || 2.4,
        'stroke-linejoin': 'round', 'stroke-linecap': 'round',
        'stroke-dasharray': s.dashed ? '6 5' : null
      }));

      ordered.forEach(function (p) {
        var cx = x(new Date(p.date).getTime());
        var cy = y(p.value);
        var g = el('g');
        g.appendChild(el('circle', {
          cx: cx, cy: cy, r: p.emphasis ? 5.5 : 3.6,
          fill: '#fff',
          stroke: s.color || PALETTE.navy, 'stroke-width': p.emphasis ? 2.6 : 1.8
        }));
        makeTooltip(g, s.label + ' - ' + p.display, p.tooltip || fmtAxis(p.value, opts));
        svg.appendChild(g);

        if (p.note || (opts.showValues && p.emphasis)) {
          svg.appendChild(text(p.note || fmtAxis(p.value, opts), {
            x: cx, y: cy - 12, 'text-anchor': p.anchor || 'middle',
            class: 'point-label', fill: s.color || PALETTE.navy
          }));
        }
      });
    });

    // Date axis: evenly spaced unique labels
    var seen = {};
    var dates = [];
    all.forEach(function (p) { if (!seen[p.date]) { seen[p.date] = true; dates.push(p.date); } });
    dates.sort();
    var want = opts.xLabels || 4;
    var stride = Math.max(1, Math.ceil(dates.length / want));
    var picked = [];
    for (var k = 0; k < dates.length; k += stride) picked.push(dates[k]);
    if (picked[picked.length - 1] !== dates[dates.length - 1]) picked.push(dates[dates.length - 1]);

    picked.forEach(function (d, pi) {
      svg.appendChild(text(d, {
        x: x(new Date(d).getTime()),
        y: pad.top + innerH + 20,
        'text-anchor': pi === 0 ? 'start' : (pi === picked.length - 1 ? 'end' : 'middle'),
        class: 'axis-label'
      }));
    });

    if (opts.axisTitle) {
      svg.appendChild(text(opts.axisTitle, { x: pad.left, y: H - 8, class: 'axis-title' }));
    }
    if (opts.yAxisTitle) {
      svg.appendChild(text(opts.yAxisTitle, {
        x: pad.left - 52, y: pad.top - 8, class: 'axis-title'
      }));
    }

    mount.appendChild(svg);
  }

  /* ================================================================ *
   * Bubble scatter - two variables against each other with a third
   * encoded as bubble area. Used for state-level exposure.
   * ================================================================ */
  function scatterChart(mount, points, options) {
    if (!mount || !points || !points.length) return;
    var opts = options || {};
    var W = 1000;
    var H = opts.height || 460;
    var pad = { top: 26, right: 150, bottom: 66, left: 74 };
    var innerW = W - pad.left - pad.right;
    var innerH = H - pad.top - pad.bottom;

    var svg = svgRoot(W, H);
    svg.setAttribute('aria-label', opts.ariaLabel || 'Scatter chart');

    var xs = points.map(function (p) { return p.x; });
    var ys = points.map(function (p) { return p.y; });
    var maxX = niceMax(Math.max.apply(null, xs));
    var maxY = niceMax(Math.max.apply(null, ys));
    var sizes = points.map(function (p) { return p.size || 0; });
    var maxSize = Math.max.apply(null, sizes) || 1;

    function px(v) { return pad.left + (v / maxX) * innerW; }
    function py(v) { return pad.top + innerH - (v / maxY) * innerH; }

    // Gridlines
    tickValues(maxY, 4).forEach(function (t) {
      svg.appendChild(el('line', {
        x1: pad.left, y1: py(t), x2: pad.left + innerW, y2: py(t),
        class: t === 0 ? 'axis-line' : 'axis-grid'
      }));
      svg.appendChild(text(withCommas(t, 0), {
        x: pad.left - 10, y: py(t) + 4, 'text-anchor': 'end', class: 'axis-label'
      }));
    });
    tickValues(maxX, 5).forEach(function (t) {
      svg.appendChild(text(withCommas(t, 0), {
        x: px(t), y: pad.top + innerH + 20, 'text-anchor': 'middle', class: 'axis-label'
      }));
    });
    svg.appendChild(el('line', {
      x1: pad.left, y1: pad.top + innerH, x2: pad.left + innerW, y2: pad.top + innerH, class: 'axis-line'
    }));

    // Quadrant guides, if a split point is supplied
    if (opts.split) {
      [opts.split.x, opts.split.y].forEach(function (v, i) {
        if (v === undefined || v === null) return;
        var isX = i === 0;
        var p1 = isX ? px(v) : py(v);
        svg.appendChild(el('line', {
          x1: isX ? p1 : pad.left, y1: isX ? pad.top : p1,
          x2: isX ? p1 : pad.left + innerW, y2: isX ? pad.top + innerH : p1,
          class: 'axis-line', 'stroke-dasharray': '5 4'
        }));
      });
    }

    // Bubbles, largest first so smaller ones stay clickable-looking
    points.slice().sort(function (a, b) { return (b.size || 0) - (a.size || 0); }).forEach(function (p) {
      var r = opts.sizeScale === 'area'
        ? 7 + 22 * Math.sqrt((p.size || 0) / maxSize)
        : 7 + 16 * ((p.size || 0) / maxSize);
      var color = p.color || PALETTE.navy;
      var cx = px(p.x);
      var cy = py(p.y);

      var g = el('g', { class: 'bar' });
      g.appendChild(el('circle', { cx: cx, cy: cy, r: r, fill: color, opacity: 0.34 }));
      g.appendChild(el('circle', {
        cx: cx, cy: cy, r: r, fill: 'none', stroke: color, 'stroke-width': 2
      }));
      makeTooltip(g, p.label, p.tooltip || '');
      svg.appendChild(g);

      var labelLines = wrapLabel(p.label, opts.maxLabelChars || 14, 2);
      labelLines.forEach(function (line, li) {
        svg.appendChild(text(line, {
          x: cx + r + 6, y: cy + 4 + (li - (labelLines.length - 1) / 2) * 12,
          class: 'bar-label'
        }));
      });
    });

    // Axis titles
    svg.appendChild(text(opts.xTitle || '', {
      x: pad.left + innerW / 2, y: H - 8, 'text-anchor': 'middle', class: 'axis-title'
    }));
    svg.appendChild(text(opts.yTitle || '', {
      x: 16, y: pad.top + innerH / 2, 'text-anchor': 'middle', class: 'axis-title',
      transform: 'rotate(-90 16 ' + (pad.top + innerH / 2) + ')'
    }));

    mount.appendChild(svg);
  }

  /* ================================================================ *
   * Diverging bar chart - above and below a zero line. For balances
   * such as a bilateral trade surplus, or growth above and below nil.
   * ================================================================ */
  function divergingBarChart(mount, items, options) {
    if (!mount || !items.length) return;
    var opts = options || {};
    var rowH = opts.rowHeight || 40;
    var W = 1000;
    var labelW = opts.labelWidth || 210;
    var valueW = opts.valueWidth || 92;
    var H = items.length * rowH + 30;
    var pad = { top: 16, right: 12, bottom: 14, left: 4 };

    var svg = svgRoot(W, H);
    svg.setAttribute('aria-label', opts.ariaLabel || 'Diverging bar chart');

    var innerW = W - labelW - valueW - pad.left - pad.right;
    var maxAbs = Math.max.apply(null, items.map(function (i) { return Math.abs(i.value); })) || 1;
    var mid = labelW + innerW / 2;
    var half = innerW / 2 - 4;

    items.forEach(function (item, i) {
      var cy = pad.top + i * rowH + rowH / 2;
      var w = (Math.abs(item.value) / maxAbs) * half;
      var positive = item.value >= 0;
      var color = item.color || (positive ? PALETTE.green : PALETTE.red);

      svg.appendChild(text(item.label, { x: pad.left, y: cy + 4, class: 'bar-label' }));

      var g = el('g', { class: 'bar' });
      g.appendChild(el('rect', {
        x: positive ? mid : mid - w, y: cy - 9, width: Math.max(2, w), height: 18, rx: 4, fill: color
      }));
      makeTooltip(g, item.label, item.display || fmt(item.value, 1));
      svg.appendChild(g);

      svg.appendChild(text(item.display || fmt(item.value, 1), {
        x: W - pad.right, y: cy + 4, 'text-anchor': 'end', class: 'bar-value', fill: color
      }));

      svg.appendChild(el('line', {
        x1: pad.left, y1: pad.top + (i + 1) * rowH, x2: W - pad.right, y2: pad.top + (i + 1) * rowH,
        class: 'axis-grid'
      }));
    });

    svg.appendChild(el('line', {
      x1: mid, y1: pad.top, x2: mid, y2: H - pad.bottom, class: 'axis-line'
    }));

    if (opts.zeroLabels) {
      svg.appendChild(text(opts.zeroLabels[0], {
        x: mid - 8, y: 12, 'text-anchor': 'end', class: 'axis-label'
      }));
      svg.appendChild(text(opts.zeroLabels[1], {
        x: mid + 8, y: 12, 'text-anchor': 'start', class: 'axis-label'
      }));
    }

    mount.appendChild(svg);
  }

  global.Charts = {
    palette: PALETTE,
    rateTimeline: rateTimeline,
    barChart: barChart,
    groupedBarChart: groupedBarChart,
    horizontalBarChart: horizontalBarChart,
    donutChart: donutChart,
    rangeChart: rangeChart,
    splitBar: splitBar,
    lineChart: lineChart,
    scatterChart: scatterChart,
    divergingBarChart: divergingBarChart,
    format: {
      commas: withCommas,
      num: fmt
    }
  };
})(window);
