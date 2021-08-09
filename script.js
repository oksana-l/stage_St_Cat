console.log("page");
var nav = 0;
var navY = 0;
var clicked = null;
var dateModif = "";
var d = new Date();

const day = d.getDate();
var month = d.getMonth();
const mois = d.getMonth();
var year = d.getFullYear();
const years = d.getFullYear();
var newMonth = "";
var newYear = "";

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

/*-------------------------------------------------------------------------------------------------------------------*/
/* Date du jour */

function getTwoDigitDateFormat(monthOrDate) {
   return (monthOrDate < 10) ? '0' + monthOrDate : '' + monthOrDate;
}

var twoDigitDate = getTwoDigitDateFormat(d.getDate()); // Affiche la date à deux chiffres
var twoDigitMonth = getTwoDigitDateFormat(d.getMonth() + 1); // Affiche le mois à deux chiffres
var twoDigitHours = getTwoDigitDateFormat(d.getHours());
var twoDigitMinutes = getTwoDigitDateFormat(d.getMinutes());
var twoDigitSeconds = getTwoDigitDateFormat(d.getSeconds());
dateModif = d.getFullYear() + '-' + twoDigitMonth + '-' + twoDigitDate + " " + twoDigitHours + ":" + twoDigitMinutes + ":" + twoDigitSeconds;
/*-------------------------------------------------------------------------------------------------------------------*/
/* Fonctions qui créent les options de select mois-année */

function creatOptionMonth() {
   var allOption = "";
   var option = "";
   for (var i = 0; i < 12; i++) {
      month = d.setMonth(i);
      if (nav === (i - mois) || nav - 12 === (i - mois) || nav - 24 === (i - mois) || nav + 12 === (i - mois) || nav + 24 === (i - mois)) {
         option = "<option id='month" + i + "'  value='" + i + "' selected>" + `${d.toLocaleDateString('fr-fr', { month: 'long' })}` + "</option>";
      }
      else {
         option = "<option id='month" + i + "'  value='" + i + "'>" + `${d.toLocaleDateString('fr-fr', { month: 'long' })}` + "</option>";
      }
      allOption += option;
   }
   return allOption;
}

function creatOptionYear() {
   var allOption = "";
   var option = "";
   
   for (var i = -2; i < 3; i++) {
      year = d.setFullYear(years + i);
      if (navY == i) {
         option = "<option id='year" + i + "'  value='" + i + "' selected>" + `${d.toLocaleDateString('fr-fr', { year: 'numeric' })}` + "</option>";
      }
      else {
         option = "<option id='year" + i + "'  value='" + i + "'>" + `${d.toLocaleDateString('fr-fr', { year: 'numeric' })}` + "</option>";
      }
      allOption += option;
   }
   return allOption;
}

function changeDateMonth(newMonth, newYear) {
   newYear = document.getElementById('yearDisplay').value;
   nav = Number(newYear) * 12 + (Number(newMonth) - mois);
   console.log(nav);
   load();
}

function changeDateYear(newMonth, newYear) {
   newMonth = document.getElementById('monthDisplay').value;
   nav = Number(newYear) * 12 + (Number(newMonth) - mois);
   navY = Number(newYear);
   console.log(nav);
   load(); 
}


/*--------------------------------------------------------------------*/
/* Fonction qui construit HTML */

function load() {
   d = new Date();
   console.log(nav);
   if (nav !== 0) {
      d.setMonth(new Date().getMonth() + (nav));
   }

   month = d.getMonth();
   year = d.getFullYear();
   const firstDayOfMonth = new Date(year, month, 1);
   const daysInMonth = new Date(year, month + 1, 0).getDate();

   const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
      weekday: 'long',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
   });

   const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);
   const datePadding = new Date(year, month, 0).getDate();

   document.getElementById('monthsDisplay').innerHTML = "<select name='months' id='monthDisplay'>" + creatOptionMonth() + "</select>";
   var valueMonth = document.getElementById('monthDisplay').value;
   var select = document.getElementById('monthDisplay');
   select.setAttribute("value", valueMonth);
   select.setAttribute("onchange", "changeDateMonth(this.value, newYear)");

   document.getElementById('yearsDisplay').innerHTML = "<select name='years' id='yearDisplay'>" + creatOptionYear() + "</select>";
   var valueYear = document.getElementById('yearDisplay').value;
   var select = document.getElementById('yearDisplay');
   select.setAttribute("value", valueYear);
   select.setAttribute("onchange", "changeDateYear(newMonth, this.value)");

   calendar.innerHTML = '';

   for (var i = 1; i <= paddingDays + daysInMonth; i++) {
      var daySquare = document.createElement('div');
      daySquare.classList.add('day');
      daySquare.innerHTML = "<div class='onco'></div>" +
         "<div class='astr1'></div>" +
         "<div class='astr2'></div>";

      if (i > paddingDays) {
         daySquare.innerHTML = "<div>" + (i - paddingDays) + "</div>" + "<div class='onco'></div>" +
            "<div class='astr1'></div>" +
            "<div class='astr2'></div>";
         if (i - paddingDays === day && nav === 0) {
            daySquare.id = 'currentDay';
         }
      } else {
         daySquare.classList.add('padding');
         daySquare.innerHTML = "<div>" + (datePadding - paddingDays + i) + "</div>" + "<div class='onco'></div>" +
            "<div class='astr1'></div>" +
            "<div class='astr2'></div>";
      }
      if (i - paddingDays >= day && nav === 0) {
         daySquare.innerHTML = "<div>" + (i - paddingDays) + "</div>" + "<div class='onco'>" +
            "<select id='onco'><option>ONCO</option>" +
            "</select></div>" +
            "<div class='astr1'>" +
            "<select><option>ASTR1</option>" + "</select></div>" +
            "<div class='astr2'>" +
            "<select><option>ASTR2</option>" + "</select></div>";
      } else if (nav > 0 && i > paddingDays) {
         daySquare.innerHTML = "<div>" + (i - paddingDays) + "</div>" + "<div class='onco'>" +
            "<select id='onco'><option>ONCO</option>" +
            "</select></div>" +
            "<div class='astr1'>" +
            "<select><option>ASTR1</option>" + "</select></div>" +
            "<div class='astr2'>" +
            "<select><option>ASTR2</option>" + "</select></div>";
      } else if (nav > 0 && i <= paddingDays) {
         daySquare.innerHTML = "<div>" + (datePadding - paddingDays + i) + "</div>" + "<div class='onco'>" +
            "<select id='onco'><option>ONCO</option>" +
            "</select></div>" +
            "<div class='astr1'>" +
            "<select><option>ASTR1</option>" + "</select></div>" +
            "<div class='astr2'>" +
            "<select><option>ASTR2</option>" + "</select></div>";
      }
      calendar.appendChild(daySquare);
   }
}

function initButtons() {
   document.getElementById('nextButton').addEventListener('click', () => {
      nav++;
      if (mois + nav < 0) {
         navY = Math.trunc((mois + nav) / 12 - 1);
      } else {
         navY = Math.trunc((mois + nav) / 12);
      }
      load();
   });

   document.getElementById('backButton').addEventListener('click', () => {
      nav--;
      if (mois + nav < 0) {
         navY = Math.trunc((mois + nav) / 12 - 1);
      } else {
         navY = Math.trunc((mois + nav) / 12);
      }
      load();
   });

}

initButtons();
load();