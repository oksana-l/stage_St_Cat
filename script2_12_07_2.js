console.log("page");
var nav = 0;
var clicked = null;

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'];

/*-------------------------------------------------------------------*/
	 /* Fonction qui remplie la liste : nom + couleur */
	 
   function createOptionsOnco() {
		var allOption = ""; 
		var option = "";
        for (key in listeMedecinOnco) {
        
        	var styleS = listeMedecinOnco[key].backgroundColor;
            var value = ' value=' + listeMedecinOnco[key].id;
            option = "<option style='background-color:" + listeMedecinOnco[key].backgroundColor + "'" + value + " id=" + styleS + ">" + listeMedecinOnco[key].title + "</option>";
                        
            allOption += option;		
        }
         return allOption;
    }
	 
	function createOptionsAstr() {
   		var allOption = "";
        var option = "";
        for(key in listeMedecinAstreinte){
        	var styleS = listeMedecinAstreinte[key].backgroundColor;
        	var value = ' value=' + listeMedecinAstreinte[key].id;
            option = "<option style='background-color:" + listeMedecinAstreinte[key].backgroundColor + "'" + value + " id=" + styleS + ">";
            option += listeMedecinAstreinte[key].title;
            option += "</option>";
                
            allOption+=option;		
		}
         return allOption;
    }

/*--------------------------------------------------------------------*/
	/* Fonction qui construit HTML */
	
function load() {
  const dt = new Date();

  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

  document.getElementById('monthDisplay').innerText = 
    `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`;

  var form = document.createElement('form');    
  form.setAttribute("id", "form");
  form.setAttribute("method", "get");
  //form.setAttribute("action", "initArray");
  form.setAttribute("target","myiframe");
  var calendar = document.getElementById('calendar'); 
  calendar.innerHTML = "";
  calendar.appendChild(form);
                        
  form.innerHTML = '';

	for(var i = 1; i <= paddingDays + daysInMonth; i++) {
    var daySquare = document.createElement('div');
    daySquare.classList.add('day');
    var dayMonthYearOnco = (i - paddingDays) + "_" + month + "_" + year + ";onco";
    var dayMonthYearAstr1 = (i - paddingDays) + "_" + month + "_" + year + ";astr1";
    var dayMonthYearAstr2 = (i - paddingDays) + "_" + month + "_" + year + ";astr2";
    daySquare.innerHTML = "<select id=" + dayMonthYearOnco + " class='onco'><option>ONCO</option>" + createOptionsOnco() + "</select>" + 
				          "<select id=" + dayMonthYearAstr1 + " class='astr1'><option>ASTR1</option>"  + createOptionsAstr() + "</select>" + 
				          "<select id=" + dayMonthYearAstr2 + " class='astr2'><option>ASTR2</option>" + createOptionsAstr() + "</select>" ;
  
    if (i > paddingDays) {
        daySquare.innerHTML = "<div>" + (i - paddingDays) + "</div>" +  
        					  "<select id=" + dayMonthYearOnco + " class='onco' onclick='reponseOncolien(this.id)'><option>ONCO</option>" + createOptionsOnco() + "</select>" + 
					          "<select id=" + dayMonthYearAstr1 + " class='astr1' onclick='reponseAstr1(this.id)'><option>ASTR1</option>" + createOptionsAstr() + "</select>" + 
					          "<select id=" + dayMonthYearAstr2 + " class='astr2' onclick='reponseAstr2(this.id)'><option>ASTR2</option>" + createOptionsAstr() + "</select>";

      	if (i - paddingDays === day && nav === 0) {
        	daySquare.id = 'currentDay';
      	}

      } else {
        daySquare.classList.add('padding');
      }
      form.appendChild(daySquare);  
  }
  var s = document.createElement("input");
  	 s.setAttribute("id", "input");
     s.setAttribute("type", "button");
     s.setAttribute("onclick", "initArray();");
     s.setAttribute("value", "Submit");
  	 form.appendChild(s);    
  	 
}

/*-------------------------------------------------------------------*/
	/* Récupération des données */
	
var dateListeOncolien = new Array();
var idMedOncolien = new Array();
var dateListeAstr1 = new Array();
var idMedAstr1 = new Array();
var dateListeAstr2 = new Array();
var idMedAstr2 = new Array();

function reponseOncolien(obj) {
	if (document.getElementById(obj)){
		var selectValue = document.getElementById(obj).options[document.getElementById(obj).selectedIndex].value;
		var selectId = document.getElementById(obj).options[document.getElementById(obj).selectedIndex].id;
		document.getElementById(obj).setAttribute("style", 'background-color:' + selectId);
	}
	console.log(obj, selectValue, selectId);
	dateListeOncolien.push(obj);
	idMedOncolien.push(selectValue);
}
function reponseAstr1(obj) {
	if (document.getElementById(obj)){
		var selectValue = document.getElementById(obj).options[document.getElementById(obj).selectedIndex].value;
		var selectId = document.getElementById(obj).options[document.getElementById(obj).selectedIndex].id;
		document.getElementById(obj).setAttribute("style", 'background-color:' + selectId);
	}
	console.log(obj, selectValue);
	dateListeAstr1.push(obj);
	idMedAstr1.push(selectValue);
}
function reponseAstr2(obj) {
	if (document.getElementById(obj)){
		var selectValue = document.getElementById(obj).options[document.getElementById(obj).selectedIndex].value;
		var selectId = document.getElementById(obj).options[document.getElementById(obj).selectedIndex].id;
		document.getElementById(obj).setAttribute("style", 'background-color:' + selectId);
	}
	console.log(obj, selectValue);
	dateListeAstr2.push(obj);
	idMedAstr2.push(selectValue);
}

var initArrayOncolien = new Array();
var initArrayAstr1 = new Array();
var initArrayAstr2 = new Array();

function initArray() {

	for (var i = 0; i < dateListeOncolien.length; i++) { 
		initArrayOncolien[dateListeOncolien[i]] = idMedOncolien[i];
	}
	console.log(initArrayOncolien);
	
	for (var i = 0; i < dateListeAstr1.length; i++) { 
		initArrayAstr1[dateListeAstr1[i]] = idMedAstr1[i];
	}
	console.log(initArrayAstr1);
	
	for (var i = 0; i < dateListeAstr2.length; i++) { 
		initArrayAstr2[dateListeAstr2[i]] = idMedAstr2[i];
	}
	console.log(initArrayAstr2);
	var d = new Date();
	var today = d.getDate() + '-' + (d.getMonth()+1) + '-' + d.getFullYear();
	console.log(today);
}

function initButtons() {
	 document.getElementById('nextButton').addEventListener('click', () => {
		nav++;
		load();
	});

 	document.getElementById('backButton').addEventListener('click', () => {
		nav--;
		load();
	});
  
	if (document.getElementById('input')) {
		document.getElementById('input').addEventListener('click', () => {
		initArray();
		});
	}
}
$(document).ready(function() {
	console.log("ready!");
	reponseOncolien();
	reponseAstr1();
	reponseAstr2();
	initArray();
	initButtons();
	load();
});

