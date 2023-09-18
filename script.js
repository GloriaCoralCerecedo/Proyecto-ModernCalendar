const calendar = document.querySelector(".calendar"),
  date = document.querySelector(".date"),
  daysContainer = document.querySelector(".days"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next"),
  todayBtn = document.querySelector(".today-btn"),
  gotoBtn = document.querySelector(".goto-btn"),
  dateInput = document.querySelector(".date-input");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

//Función para agregar días

function initCalendar() {
  //Para obtener los días del mes anterior y el mes actual todos los días y
  //los días restantes del mes siguiente
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 8 - lastDay.getDay() - 1;

  //Actualizar fecha en la parte superior del calendario
  date.innerHTML = months[month] + " " + year;

  //Agregando días en Lunes
  let days = "";

  // Calcular el día de la semana del primer día del mes actual (0 para domingo, 1 para lunes, etc.)
  const firstDayOfWeek = (day + 6) % 7; // Sumamos 6 para ajustar el inicio desde lunes.

  // Días del mes anterior
  for (let x = firstDayOfWeek; x > 0; x--) {
    days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  }

  //   //Días del mes anterior
  //   for (let x = day; x > 0; x--) {
  //     days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  //   }

  //Días del mes actual
  for (let i = 1; i <= lastDate; i++) {
    //Si el día es hoy agrega la clase hoy
    if (
      i === new Date().getDate() &&
      year === new Date().getFullYear() &&
      month === new Date().getMonth()
    ) {
      days += `<div class="day today">${i}</div>`;
    }
    //Agregue el resto tal como está
    else {
      days += `<div class="day">${i}</div>`;
    }
  }
  //Días del próximo mes
  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`;
  }

  daysContainer.innerHTML = days;
}

initCalendar();

// Mes anterior
function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  initCalendar();
}

//Próximo mes
function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalendar();
}

//Agregar detector de eventos en anterior y siguiente
prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

initCalendar();

//Agreguemos la funcionalidad Ir a fecha e Ir a hoy
todayBtn.addEventListener("click", () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  initCalendar();
});
