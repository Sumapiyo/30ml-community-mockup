// 用語リンク(glossary.html?id=...)をクリックしたら、ページ遷移せずモーダルシートで開く。
// window.GLOSSARY (glossary-data.js) が必要。読み込めない場合は通常遷移にフォールバック。
(function () {
  function brandBadge(b) {
    var cls = b === '30MF' ? 'bg-gold' : b === '30MS' ? 'bg-brand-500' : 'bg-ink-700';
    return '<span class="rounded px-6 py-2 text-[10px] font-bold text-white ' + cls + '">' + b + '</span>';
  }
  function catBadge(cat) {
    var cls = (cat === '勢力' || cat === '陣営') ? 'bg-brand-600' : (cat === '用語') ? 'bg-ink-600' : 'bg-brand-500';
    return '<span class="rounded px-6 py-2 text-[10px] font-bold text-white ' + cls + '">' + cat + '</span>';
  }
  function esc(s) { return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  var ov = document.createElement('div');
  ov.id = 'glo-sheet';
  ov.className = 'fixed inset-0 z-50 hidden';
  ov.innerHTML =
    '<div data-gs-backdrop class="absolute inset-0 bg-ink-900/50"></div>' +
    '<div class="absolute inset-x-0 bottom-0 flex max-h-[88vh] flex-col rounded-t-lg bg-white shadow-cardLg lg:inset-x-auto lg:bottom-auto lg:left-1/2 lg:top-1/2 lg:max-h-[82vh] lg:w-[460px] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:rounded-lg">' +
      '<div class="mx-auto mt-8 h-4 w-36 shrink-0 rounded-full bg-ink-200 lg:hidden"></div>' +
      '<div class="flex shrink-0 items-center justify-between px-16 py-12">' +
        '<div class="text-[13px] font-bold text-ink-500">用語</div>' +
        '<button data-gs-close class="grid h-32 w-32 place-items-center rounded-full text-ink-500 hover:bg-ink-25">' +
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>' +
        '</button>' +
      '</div>' +
      '<div data-gs-body class="overflow-y-auto"></div>' +
    '</div>';
  document.addEventListener('DOMContentLoaded', function () { document.body.appendChild(ov); });
  // bodyが既にあるなら即追加
  if (document.body) document.body.appendChild(ov);

  var bodyEl = ov.querySelector('[data-gs-body]');

  function open(id) {
    var list = window.GLOSSARY || [];
    var g = list.find(function (x) { return x.id === id; });
    if (!g) { location.href = 'glossary.html?id=' + encodeURIComponent(id); return; }
    var meta = [['ブランド', g.brand], ['カテゴリ', g.cat]];
    if (g.faction) meta.push(['勢力', g.faction]);
    bodyEl.innerHTML =
      '<div class="placeholder ' + (g.tone === 'dark' ? 'ph-dark' : '') + ' relative aspect-[16/9]">' +
        '<div class="absolute left-12 top-12 flex gap-6">' + catBadge(g.cat) + brandBadge(g.brand) + '</div>' +
      '</div>' +
      '<div class="px-16 py-16">' +
        '<h2 class="text-[20px] font-bold leading-snug">' + esc(g.name) + '</h2>' +
        '<dl class="mt-12 grid grid-cols-[72px_1fr] gap-y-6 text-[13px]">' +
          meta.map(function (m) { return '<dt class="text-ink-500">' + m[0] + '</dt><dd>' + esc(m[1]) + '</dd>'; }).join('') +
        '</dl>' +
        '<p class="mt-14 text-[14px] leading-relaxed text-ink-700">' + esc(g.desc) + '</p>' +
        '<a href="glossary.html?id=' + encodeURIComponent(g.id) + '" data-gs-full class="mt-16 inline-flex h-40 items-center gap-4 rounded-full bg-brand-600 px-18 text-[13px] font-bold text-white hover:bg-brand-700">' +
          '用語ページで開く' +
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="m9 6 6 6-6 6" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
        '</a>' +
      '</div>';
    ov.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
  function close() { ov.classList.add('hidden'); document.body.style.overflow = ''; }
  window.openGlossarySheet = open;

  ov.querySelector('[data-gs-backdrop]').addEventListener('click', close);
  ov.querySelector('[data-gs-close]').addEventListener('click', close);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });

  // 用語リンクを横取り（「用語ページで開く」だけは通常遷移を許可）
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href*="glossary.html?id="]');
    if (!a || a.hasAttribute('data-gs-full')) return;
    e.preventDefault();
    var id = decodeURIComponent((a.getAttribute('href').split('id=')[1] || ''));
    open(id);
  });
})();
