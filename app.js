'use strict';
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menuButton?.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(expanded));
  navigation.classList.toggle('open', expanded);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.focus();
  }
});
const search = document.querySelector('#pub-search');
if (search) {
  const year = document.querySelector('#pub-year');
  const type = document.querySelector('#pub-type');
  const rows = [...document.querySelectorAll('#pub-list .pub-row')];
  const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const applyFilters = () => {
    const words = normalize(search.value).trim().split(/\s+/).filter(Boolean);
    let count = 0;
    rows.forEach(row => {
      const match = words.every(word => normalize(row.dataset.search).includes(word)) &&
        (!year.value || row.dataset.year === year.value) && (!type.value || row.dataset.type === type.value);
      row.hidden = !match;
      if (match) count++;
    });
    document.querySelector('#pub-count').textContent = `${count} of ${rows.length} records`;
    document.querySelector('#pub-empty').hidden = count > 0;
  };
  search.addEventListener('input', applyFilters);
  year.addEventListener('change', applyFilters);
  type.addEventListener('change', applyFilters);
  document.querySelector('#pub-reset').addEventListener('click', () => {
    search.value = ''; year.value = ''; type.value = ''; applyFilters(); search.focus();
  });
  applyFilters();
}
document.querySelector('#print-cv')?.addEventListener('click', () => window.print());
