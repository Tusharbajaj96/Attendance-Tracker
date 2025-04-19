
const ctx = document.getElementById('attendanceChart').getContext('2d');
const attendanceChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Present', 'Absent'],
    datasets: [{
      label: 'Attendance Count',
      data: [10, 3],
      backgroundColor: ['orange', 'green'],
      borderRadius: 10,
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Attendance Overview',
        font: {
          size: 18
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        grid: {
          display: false
        },
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    }
  }
});
const dayScheduleData = {
  Monday: [
    "9:00 AM - No Class",
    "11:00 AM - C Programming",
    "2:00 PM - Operating System"
  ],
  Tuesday: [
    "9:00 AM - Differential Equations and Transformations",
    "10:00 AM - Modern and Computational Physics",
    "11:00 AM - Operating System (Lab)",
    "2:00 PM - Source Code Management"
  ],
  Wednesday: [
    "9:00 AM - Differential Equations and Transformation",
    "10:00 AM - Modern and Computational Physics",
    "11:00 AM - C Programming",
    "2:00 PM - Source Code Management"
  ],
  Thursday: [
    "9:00 AM - Modern and Computational Physics(Lab)",
    "11:00 AM - C Programming",
    "2:00 PM - Differenatial Equations and Transformations"
  ],
  Friday: [
    "9:00 AM - Modern and Computational Physics",
    "10:00 AM - C Programming",
    "12:00 AM - Differential Equations and Transformations",
    "2:00 PM - Operating System"
  ],
  Saturday: [
    "Free Day - No Classes"
  ],
  Sunday: [
    "Weekend - Rest & Study"
  ]
};

function toggleDropdown() {
  document.getElementById("calendarDropdown").classList.toggle("show");
}

function updateDaySchedule(selectedDay = "") {
  if (!selectedDay) {
    selectedDay = document.getElementById("daySelect").value;
  }

  const scheduleSub = document.getElementById("scheduleSub");
  const scheduleList = document.getElementById("scheduleList");

  scheduleList.innerHTML = "";

  if (selectedDay) {
    scheduleSub.textContent = `Here's your schedule activity for ${selectedDay}`;

    const events = dayScheduleData[selectedDay];
    if (events && events.length > 0) {
      events.forEach(event => {
        const li = document.createElement("li");
        li.textContent = event;
        scheduleList.appendChild(li);
      });
    } else {
      const li = document.createElement("li");
      li.textContent = "No activities scheduled.";
      scheduleList.appendChild(li);
    }

    document.getElementById("daySelect").value = selectedDay;
  } else {
    scheduleSub.textContent = "Here's your schedule activity for today";
  }
}
window.addEventListener("click", function (e) {
  if (!e.target.closest(".schedule-head")) {
    document.getElementById("calendarDropdown").classList.remove("show");
  }
});
window.addEventListener("DOMContentLoaded", () => {
  const todayIndex = new Date().getDay();
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = daysOfWeek[todayIndex];
  updateDaySchedule(today);
});
const bell = document.getElementById('bell-box');
const notify = document.getElementById('notify-box');
bell.addEventListener("click", () => {
  notify.classList.toggle("show");
});
window.addEventListener("click", function (e) {
  if (!e.target.closest(".course-dropdown-toggle")) {
    document.getElementById("courseDropdown").classList.remove("show");
  }

  if (!e.target.closest(".schedule-head")) {
    document.getElementById("calendarDropdown").classList.remove("show");
  }

  if (!notify.contains(e.target) && !bell.contains(e.target)) {
    notify.classList.remove("show");
  }
});



const logOut = document.querySelector('.logout');
logOut.addEventListener('click', function () {
  let proceed = confirm("Do you want to Logout?");
  if (proceed) {
    window.location.href = 'pages/logout.html';
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
const allCourseStats = {
  math: {
    totalModules: 20,
    done: 12,
    onProgress: 5,
    toDo: 3
  },
  os: {
    totalModules: 15,
    done: 8,
    onProgress: 4,
    toDo: 3
  },
  physics: {
    totalModules: 18,
    done: 6,
    onProgress: 7,
    toDo: 5
  },
  c: {
    totalModules: 13,
    done: 7,
    onProgress: 2,
    toDo: 4
  }
};
function updateCourseStatistics(course) {
  const { totalModules, done, onProgress, toDo } = course;

  const donePercent = Math.round((done / totalModules) * 100);
  const onPercent = Math.round((onProgress / totalModules) * 100);
  const todoPercent = Math.round((toDo / totalModules) * 100);

  document.getElementById('donePercent').textContent = `${donePercent}%`;
  document.getElementById('onPercent').textContent = `${onPercent}%`;
  document.getElementById('todoPercent').textContent = `${todoPercent}%`;

  document.getElementById('doneProgress').style.width = `${donePercent}%`;
  document.getElementById('onProgress').style.width = `${onPercent}%`;
  document.getElementById('todoProgress').style.width = `${todoPercent}%`;
}
function onCourseChange() {
  const selectedCourse = document.getElementById('courseSelect').value;
  const stats = allCourseStats[selectedCourse];
  updateCourseStatistics(stats);
}
function toggleCourseDropdown(event) {
  event.stopPropagation();
  document.getElementById("courseDropdown").classList.toggle("show");
}
function toggleCourseDropdown(event) {
  event.stopPropagation(); 
  const dropdown = document.getElementById("courseDropdown");
  dropdown.classList.toggle("show");
}

document.addEventListener("DOMContentLoaded", () => {
  const dropdown = document.getElementById("courseDropdown");
  dropdown.addEventListener("click", (e) => {
    e.stopPropagation(); 
  });
});
