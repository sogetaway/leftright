<!-- Сайт розроблено студентом Агілов Петро Олександрович, група ФІТ-2-11 -->
function loadFragment(url, selector) {
  return fetch(url)
    .then(r => {
      if (!r.ok) throw new Error(`HTTP ${r.status} – ${url}`);
      return r.text();
    })
    .then(html => { document.querySelector(selector).innerHTML = html; })
    .catch(err => console.error(err));
}


window.addEventListener('DOMContentLoaded', () => {

  loadFragment('header.html', '#header-container');


  loadFragment('footer.html', '#footer-container')
    .then(() => {
      const y = document.getElementById('year');
      if (y) y.textContent = new Date().getFullYear();
    });
});
