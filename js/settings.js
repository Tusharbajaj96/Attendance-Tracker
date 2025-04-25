const tabButtons = document.querySelectorAll('.tab-btn');
const sections = document.querySelectorAll('.tab-section');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const target = button.getAttribute('data-target');

    sections.forEach(section => {
      section.style.display = (section.id === target) ? 'block' : 'none';
    });

    tabButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
  });
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
  logOut.addEventListener('click',function (){
    let proceed = confirm("Do you want to Logout?");
    if(proceed){
      window.location.href = 'logout.html';
    }
  });
  const bell = document.getElementById('bell-box');
const notify = document.getElementById('notify-box');
bell.addEventListener("click", () => {
notify.classList.toggle("show");
});
window.addEventListener("click", function (e) {

if (!notify.contains(e.target) && !bell.contains(e.target)) {
  notify.classList.remove("show");
}
});
window.addEventListener("DOMContentLoaded", () => {
    const fields = document.querySelectorAll('.info-div, .bio-box');
  
    fields.forEach((field, index) => {
      const saved = localStorage.getItem(`field${index}`);
      if (saved !== null) {
        field.innerText = saved;
      }
    });
  });

  document.getElementById("editBtn").addEventListener("click", function () {
    const fields = document.querySelectorAll('.info-div, .bio-box');
    fields.forEach(field => {
      field.contentEditable = true;
      field.classList.add('editing');
    });
  });

  document.querySelector(".update button:nth-child(2)").addEventListener("click", function () {
    const fields = document.querySelectorAll('.info-div, .bio-box');
    fields.forEach((field, index) => {
      localStorage.setItem(`field${index}`, field.innerText.trim());
      field.contentEditable = false;
      field.classList.remove('editing');
    });
  
    alert("Profile updated and saved!");
  });

