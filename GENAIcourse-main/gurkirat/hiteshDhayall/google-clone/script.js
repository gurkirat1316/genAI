document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('search-input');
  const form = document.getElementById('search-form');
  const luckyBtn = document.getElementById('lucky-button');

  // Focus search on load
  if (input) {
    try { input.focus({ preventScroll: true }); } catch (_) { input.focus(); }
  }

  // Prevent submitting empty queries
  form?.addEventListener('submit', (e) => {
    const q = input?.value.trim() || '';
    if (!q) {
      e.preventDefault();
      input?.focus();
    }
  });

  // I'm Feeling Lucky -> redirects directly to the first result
  luckyBtn?.addEventListener('click', () => {
    const q = input?.value.trim() || '';
    if (!q) {
      input?.focus();
      return;
    }
    const url = new URL('https://www.google.com/search');
    url.searchParams.set('q', q);
    url.searchParams.set('btnI', '1');
    window.location.href = url.toString();
  });

  // Quick focus shortcut: press '/' to focus the search input
  document.addEventListener('keydown', (e) => {
    const target = e.target;
    const isTyping = target instanceof HTMLElement && (target.closest('input, textarea, [contenteditable="true"]') !== null);
    if (!isTyping && e.key === '/') {
      e.preventDefault();
      input?.focus();
    }
  });
});
