// 二次創作の投稿（作例 / SS / イラスト）共通データとカード描画
window.POSTS = [
  { type: '作例',   title: '闇翼の槍使い',     user: 'nagi',     href: 'work.html',   tone: 'dark'  },
  { type: 'SS',     title: 'ドラゴン退治①',   user: '漱石枕流', href: 'ss.html',     tone: 'light' },
  { type: 'イラスト', title: '🍺🍺',            user: '圣音玥玥', href: 'illust.html', tone: 'dark'  },
];

function postTypeBadge(t) {
  var cls = t === '作例' ? 'bg-brand-600' : t === 'SS' ? 'bg-ink-700' : 'bg-like';
  return '<span class="rounded px-6 py-2 text-[10px] font-bold text-white ' + cls + '">' + t + '</span>';
}

function postCard(p) {
  return (
    '<a href="' + p.href + '" class="group block w-[150px] shrink-0 snap-start overflow-hidden rounded-lg bg-white shadow-card ring-1 ring-ink-50 transition hover:shadow-cardLg lg:w-[180px]">' +
      '<div class="placeholder ' + (p.tone === 'dark' ? 'ph-dark' : '') + ' relative aspect-[4/3]">' +
        '<div class="absolute left-8 top-8">' + postTypeBadge(p.type) + '</div>' +
      '</div>' +
      '<div class="p-10">' +
        '<div class="line-clamp-1 text-[12px] font-bold">' + p.title + '</div>' +
        '<div class="mt-4 flex items-center gap-4 text-[11px] text-ink-500"><span class="h-14 w-14 rounded-full bg-gradient-to-br from-brand-300 to-brand-100"></span>' + p.user + '</div>' +
      '</div>' +
    '</a>'
  );
}
