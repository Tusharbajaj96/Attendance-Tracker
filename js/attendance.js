const courseData = {
    C: {
      events: [
        { title: 'Present', start: '2025-04-03', backgroundColor: 'green', display: 'background' },
        { title: 'Absent', start: '2025-04-06', backgroundColor: 'orange', display: 'background' }
      ],
      present: 1,
      absent: 1
    },
    MCP: {
      events: [
        { title: 'Present', start: '2025-04-05', backgroundColor: 'green', display: 'background' },
        { title: 'Absent', start: '2025-04-01', backgroundColor: 'orange', display: 'background' }
      ],
      present: 1,
      absent: 1
    },
    DET: {
      events: [
        { title: 'Present', start: '2025-04-02', backgroundColor: 'green', display: 'background' },
        { title: 'Absent', start: '2025-04-04', backgroundColor: 'orange', display: 'background' },
        { title: 'Present', start: '2025-04-09', backgroundColor: 'green', display: 'background' },
        { title: 'Present', start: '2025-04-08', backgroundColor: 'green', display: 'background' },
        { title: 'Present', start: '2025-04-07', backgroundColor: 'green', display: 'background' },
      ],
      present: 4,
      absent: 1
    },
    SCM: {
      events: [
        { title: 'Present', start: '2025-04-07', backgroundColor: 'green', display: 'background' },
        { title: 'Absent', start: '2025-04-08', backgroundColor: 'orange', display: 'background' },
        { title: 'Present', start: '2025-04-11', backgroundColor: 'green', display: 'background' },
      ],
      present: 2,
      absent: 1
    }
  };
  let donutChart;

  const donut = document.getElementById('donutChart');
  donutChart = new Chart(donut, {
    type: 'doughnut',
    data: {
      labels: ['Present', 'Absent'],
      datasets: [{
        label: 'Attendance',
        data: [0, 0],
        backgroundColor: ['green', 'orange'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });

  let calendar;

  document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('calendar');

    calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      height: 500,
      events: []
    });
    calendar.render()
    
    document.getElementById('courseSelect').addEventListener('change', function () {
      const selectedCourse = this.value;
      const course = courseData[selectedCourse];

      calendar.removeAllEvents();
      calendar.addEventSource(course.events);

      donutChart.data.datasets[0].data = [course.present, course.absent];
      donutChart.update();
      document.querySelector('.course').textContent = selectedCourse;
      document.querySelector('.Total .p-text').textContent = `Total:${course.present + course.absent}`;
      document.querySelector('.pres .p-text').textContent = `Present: ${course.present}`;
      document.querySelector('.abs .p-text').textContent = `Absent: ${course.absent}`;

      const percent = ((course.present / (course.present + course.absent)) * 100).toFixed(2);
      document.querySelector('.percent-t').textContent = `Total Percentage: ${percent}%`;
      const textElement = document.querySelector('.text-t');
      if (percent >= 80) {
        textElement.textContent = "Great job! Keep it up!";
      } else {
        textElement.textContent = "You can't miss the class now!";
      }
    });

    document.getElementById('courseSelect').value = "C";
    document.getElementById('courseSelect').dispatchEvent(new Event('change'));
  });
  const logOut = document.querySelector('.logout');
  logOut.addEventListener('click', function () {
    let proceed = confirm("Do you want to Logout?");
    if (proceed) {
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
  }
  );
