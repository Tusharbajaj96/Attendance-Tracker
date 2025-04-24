const bell = document.getElementById('bell-box');
const notify = document.getElementById('notify-Box');
bell.addEventListener("click", () => {
notify.classList.toggle("show");
});
window.addEventListener("click", function (e) {
  
  if (!notify.contains(e.target) && !bell.contains(e.target)) {
    notify.classList.remove("show");
  }
});

function applyThemeFromStorage() {
  const isDark = localStorage.getItem('theme') === 'dark';
  document.body.classList.toggle('dark-mode', isDark);
  const toggle = document.getElementById('darkModeToggle');
  if (toggle) toggle.checked = isDark;
}

function toggleTheme(fromCheckbox = false) {
  const isDark = document.body.classList.toggle('dark-mode');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');

  if (!fromCheckbox) {
    const toggle = document.getElementById('darkModeToggle');
    if (toggle) toggle.checked = isDark;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  applyThemeFromStorage();
  const settingsToggle = document.getElementById('darkModeToggle');
  if (settingsToggle) {
    settingsToggle.addEventListener('change', () => toggleTheme(true));
  }
});
const logOut = document.querySelector('.logout');
logOut.addEventListener('click', function () {
  let proceed = confirm("Do you want to Logout?");
  if (proceed) {
    window.location.href = 'logout.html';
  }
});