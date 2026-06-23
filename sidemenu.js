// Mobile drawer: clones the desktop sidebar nav into a slide-in drawer
// triggered by the existing hamburger button in the mobile header.
(function () {
  const aside = document.querySelector('aside nav');
  const mobileHeader = document.querySelector('header.lg\\:hidden');
  if (!aside || !mobileHeader) return;
  const hamburger = mobileHeader.querySelector('button');
  if (!hamburger) return;

  const drawer = document.createElement('div');
  drawer.id = 'mobile-drawer';
  drawer.className = 'fixed inset-0 z-40 hidden lg:hidden';
  drawer.innerHTML = `
    <div class="absolute inset-0 bg-black/40" data-drawer-backdrop></div>
    <div class="absolute left-0 top-0 h-full w-[280px] max-w-[80vw] overflow-y-auto bg-white p-12 shadow-cardLg" data-drawer-panel>
      <div class="mb-12 flex items-center justify-between px-4">
        <span class="text-[13px] font-bold tracking-wide">メニュー</span>
        <button class="grid h-32 w-32 place-items-center" data-drawer-close aria-label="閉じる">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="#1A1A1A" stroke-width="1.8" stroke-linecap="round"/></svg>
        </button>
      </div>
      <div data-drawer-nav class="flex flex-col gap-4"></div>
    </div>
  `;
  document.body.appendChild(drawer);

  // Clone the sidebar nav items into the drawer
  const drawerNav = drawer.querySelector('[data-drawer-nav]');
  drawerNav.innerHTML = aside.innerHTML;

  function open() { drawer.classList.remove('hidden'); document.body.style.overflow = 'hidden'; }
  function close() { drawer.classList.add('hidden'); document.body.style.overflow = ''; }

  hamburger.addEventListener('click', open);
  drawer.querySelector('[data-drawer-backdrop]').addEventListener('click', close);
  drawer.querySelector('[data-drawer-close]').addEventListener('click', close);
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
})();
