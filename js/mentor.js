
    window.onload = function () {
      ShowContent('st-Query'); 
    };
  
    function ShowContent(sectionId) {
      const querySection = document.getElementById('st-Query');
      const feedbackSection = document.getElementById('st-feedback');
  
      const queryTab = document.getElementById('query');
      const feedbackTab = document.getElementById('feedback');
  
      if (sectionId === 'st-Query') {
        querySection.style.display = 'block';
        feedbackSection.style.display = 'none';
        queryTab.classList.add('active');
        feedbackTab.classList.remove('active');
      } else {
        querySection.style.display = 'none';
        feedbackSection.style.display = 'block';
        queryTab.classList.remove('active');
        feedbackTab.classList.add('active');
      }
    }
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
const logOut = document.querySelector('.logout');
    logOut.addEventListener('click',function (){
      let proceed = confirm("Do you want to Logout?");
      if(proceed){
        window.location.href = 'logout.html';
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
      updateCourseStatistics(allCourseStats.math); 
    
      const settingsToggle = document.getElementById('darkModeToggle');
      if (settingsToggle) {
        settingsToggle.addEventListener('change', () => toggleTheme(true));
      }
    }
    );
  const stars = document.querySelectorAll('.stars i');
let currentRating = parseInt(localStorage.getItem('starRating')) || 0;

function setRating(rating) {
  stars.forEach(star => {
    const value = parseInt(star.getAttribute('data-value'));

    if (value <= rating) {
      star.classList.remove('far');
      star.classList.add('fas', 'filled');
    } else {
      star.classList.remove('fas', 'filled');
      star.classList.add('far');
    }
  });

  currentRating = rating;
  localStorage.setItem('starRating', rating);
}

if (currentRating) {
  setRating(currentRating);
}

stars.forEach(star => {
  star.addEventListener('click', () => {
    const value = parseInt(star.getAttribute('data-value'));


    if (value === currentRating) {
      setRating(0);
      localStorage.removeItem('starRating');
    } else {
      setRating(value);
    }
  });
});