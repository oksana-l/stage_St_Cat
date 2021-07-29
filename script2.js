console.log("page");
var nav = 0;
var clicked = null;
var dateModif = "";

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'];

/*----------------------------------------------------------------------------------------------------------------------*/
	/* Date du jour */
		
function getTwoDigitDateFormat(monthOrDate) {
	return (monthOrDate < 10) ? '0' + monthOrDate : '' + monthOrDate;
}	

var d = new Date();
var twoDigitDate = getTwoDigitDateFormat(d.getDate()); // Affiche la date à deux chiffres
var twoDigitMonth = getTwoDigitDateFormat(d.getMonth() + 1); // Affiche le mois à deux chiffres
var twoDigitHours = getTwoDigitDateFormat(d.getHours());
var twoDigitMinutes = getTwoDigitDateFormat(d.getMinutes());
var twoDigitSeconds = getTwoDigitDateFormat(d.getSeconds());
dateModif = d.getFullYear() + '-' + twoDigitMonth + '-' + twoDigitDate + " " + twoDigitHours + ":" + twoDigitMinutes + ":" + twoDigitSeconds;

var year = d.getFullYear();
/*----------------------------------------------------------------------------------------------------------------------*/
		/* Fonctions qui créent les options de select mois-année */
	
function creatOptionMonthPlus() {
	var allOption = "";
    var option = "";
	for (var i = 1; i < 6; i ++) {
		var month = d.setMonth(new Date().getMonth() + i);
		option = "<option class='monthDisplay' value='" + i + "'>" + `${d.toLocaleDateString('fr-fr', { month: 'long' })} ${year}` + "</option>";
        allOption += option;
	}
	return allOption;
 }

function creatOptionMonthMoins() {
	var allOption = "";
    var option = "";
	for (var i = -6; i < 1; i ++) {
		var month = d.setMonth(new Date().getMonth() + (i));
		if (i === 0) { 
			console.log(month);
			option = "<option class='monthDisplay' value='" + i + "' selected>" + `${d.toLocaleDateString('fr-fr', { month: 'long' })} ${year}` + "</option>";
		}
		else { 
			option = "<option class='monthDisplay' value='" + i + "'>" + `${d.toLocaleDateString('fr-fr', { month: 'long' })} ${year}` + "</option>";
		}
        allOption += option;
	}
	return allOption;
 }
 
function changeDate(value) { 
	console.log(value);
	nav = value;
	load();
}
/*----------------------------------------------------------------------------------------------------------------------*/
	 /* Fonctions qui remplissent la liste : nom + couleur */
	 
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

	if (nav !== 0) {
		d.setMonth(new Date().getMonth() + nav);
	}

	const day = d.getDate();
	const month = d.getMonth();

	const firstDayOfMonth = new Date(year, month, 1);
  	const daysInMonth = new Date(year, month + 1, 0).getDate();
  
	const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
	    weekday: 'long',
	    year: 'numeric',
	    month: 'numeric',
	    day: 'numeric',
	});
	const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);
	console.log(creatOptionMonthMoins());
  	document.getElementById('monthDisplay').innerHTML = "<select id='monthsDisplay' onchange='changeDate(value);'>" + creatOptionMonthMoins() + creatOptionMonthPlus() + "</select>"; 

																					
	var form = document.createElement('form');    
	form.setAttribute("id", "form");
	form.setAttribute("method", "post");
  //form.setAttribute("action", "initArray");

	var calendar = document.getElementById('calendar'); 
  	calendar.innerHTML = "";
  	calendar.appendChild(form);
                        
  	form.innerHTML = '';

	for(var i = 1; i <= paddingDays + daysInMonth; i++) {
		twoDigitDate = getTwoDigitDateFormat(i - paddingDays);
    	var daySquare = document.createElement('div');
    	daySquare.classList.add('day');
    	var yearMonthDay = year + "-" + twoDigitMonth + "-" + twoDigitDate;
    	daySquare.innerHTML = "<select id='" + yearMonthDay + "Oncol' class='onco'><option>ONCO</option>" + createOptionsOnco() + "</select>" + 
					          "<select id='" + yearMonthDay + "Astr1' class='astr1'><option>ASTR1</option>"  + createOptionsAstr() + "</select>" + 
					          "<select id='" + yearMonthDay + "Astr2' class='astr2'><option>ASTR2</option>" + createOptionsAstr() + "</select>" ;
  
    	if (i > paddingDays) {
        	daySquare.innerHTML = "<div>" + (i - paddingDays) + "</div>" +  
        						  "<select id='" + yearMonthDay + "Oncol' class='onco' onclick='reponsePlanning(this.id)'><option>ONCO</option>" + createOptionsOnco() + "</select>" + 
					    	      "<select id='" + yearMonthDay + "Astr1' class='astr1' onclick='reponsePlanning(this.id)'><option>ASTR1</option>" + createOptionsAstr() + "</select>" + 
								  "<select id='" + yearMonthDay + "Astr2' class='astr2' onclick='reponsePlanning(this.id)'><option>ASTR2</option>" + createOptionsAstr() + "</select>";

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
     s.setAttribute("onclick", "initObj();");
     s.setAttribute("value", "Submit");
  	 form.appendChild(s);    
  	 
}

/*-------------------------------------------------------------------*/
	/* Récupération des données */
	
var datePlanning = "";
var type = "";
var jour = {};
var idMedOncolien = "";
var idMedAstr1 = "";
var idMedAstr2 = "";
var listeJours = new Array();

function reponsePlanning(thisId) {
	if (document.getElementById(thisId)) {
		type = thisId.substring(10,15);
		datePlanning = thisId.substring(0,10);
		
		if (listeJours !== null && listeJours.length === 0) { // On vérifie si la listeJours est vide -> oui
			console.log("coucou1");
			listeJours.push(JSON.parse(JSON.stringify(jour)));
			listeJours[0]['datePlanningAstreintes'] = datePlanning;
			console.log(listeJours[0]);
			console.log(listeJours);
		} else if (listeJours !== null && listeJours.length > 0) {  // La listeJours n'est pas vide
			for (let i = 0; i < listeJours.length; i++) { 
				let day = listeJours[i];
				let date = day.datePlanningAstreintes;
				console.log(day);
				if (date === datePlanning) { // la date existe -> oui et si c'est la même on modifie les données
					console.log("coucou2");
															
					if (type === "Oncol") {
						var selectValueOncolien = document.getElementById(thisId).options[document.getElementById(thisId).selectedIndex].value;
						var selectIdOncolien = document.getElementById(thisId).options[document.getElementById(thisId).selectedIndex].id;
						document.getElementById(thisId).setAttribute("style", 'background-color:' + selectIdOncolien);
						idMedOncolien = selectValueOncolien;
						if (selectValueOncolien !== "ONCO") {
							day['idMedecinOnco'] = idMedOncolien;
						}
					}
					else if (type === "Astr1") {
						var selectValueAstr1 = document.getElementById(thisId).options[document.getElementById(thisId).selectedIndex].value;
						var selectIdAstr1 = document.getElementById(thisId).options[document.getElementById(thisId).selectedIndex].id;
						document.getElementById(thisId).setAttribute("style", 'background-color:' + selectIdAstr1);
						idMedAstr1 = selectValueAstr1;
						if (selectValueAstr1 !== "ASTR1") {
							day['idMedecinAstr1'] = idMedAstr1;
						}
					}
					else if (type === "Astr2") {
						var selectValueAstr2 = document.getElementById(thisId).options[document.getElementById(thisId).selectedIndex].value;
						var selectIdAstr2 = document.getElementById(thisId).options[document.getElementById(thisId).selectedIndex].id;
						document.getElementById(thisId).setAttribute("style", 'background-color:' + selectIdAstr2);
						idMedAstr2 = selectValueAstr2;
						if (selectValueAstr2 !== "ASTR2") {
							day['idMedecinAstr2'] = idMedAstr2;
						}
					}  
				}
				 else {					
					listeJours.push(JSON.parse(JSON.stringify(jour)));
					listeJours[i+1]['datePlanningAstreintes'] = datePlanning;

					console.log(listeJours[i], [i+1]);
					console.log(listeJours);
				}	
			}
		} 
	} 
}


/*-----------------------------------------------------------------------------------------------------------------------------*/
	/* Transformation des données */

var obj = {};
var listObj = [];

function initObj() {

	obj['datePlanningAstreintes'] = datePlanning;
	obj['idMedecinOnco'] = idMedOncolien;
	obj['idMedecinAstr1'] = idMedAstr1;
	obj['idMedecinAstr2'] = idMedAstr2;
	//obj['dateModif'] = dateModif;
	console.log(obj);
}

function initListObj() {


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
	reponsePlanning();
	initObj();
	initButtons();
	//clickOptions();
	load();

	$("#input").click(function(){
			$.ajax({
			contentType: 'application/json',
			type: 'POST',
			url: 'reponse',
			data: JSON.stringify(obj),
			success: function (resultat, statut) {
				console.log(resultat);				
			},
			error: function (resultat, statut, erreur) {
				alert('erreur');			
			}
		});
	});			
});

/*---------------------------------------------------------------------------------------------------------------------*/
	/* Snippets */
	
	//arrayToString = JSON.stringify(Object.assign({}, initArrayOncolien));  // convert array to string
	//objOncolien = JSON.parse(arrayToString);  // convert string to json object

	
	//  'yyyy-MM-dd'T'HH:mm:ss.SSSX'
	
	//dateListePlanning.push(datePlanning);
	//console.log(dateListePlanning.length);
	
	/*				if (type === "Oncol") {
					var selectValueOncolien = document.getElementById(thisId).options[document.getElementById(thisId).selectedIndex].value;
					var selectIdOncolien = document.getElementById(thisId).options[document.getElementById(thisId).selectedIndex].id;
					document.getElementById(thisId).setAttribute("style", 'background-color:' + selectIdOncolien);
					idMedOncolien = selectValueOncolien;
					if (selectValueOncolien !== "ONCO") {
						jour[1] = selectValueOncolien;
					}
				}
				
				else if (type === "Astr1") {
					var selectValueAstr1 = document.getElementById(thisId).options[document.getElementById(thisId).selectedIndex].value;
					var selectIdAstr1 = document.getElementById(thisId).options[document.getElementById(thisId).selectedIndex].id;
					document.getElementById(thisId).setAttribute("style", 'background-color:' + selectIdAstr1);
					idMedAstr1 = selectValueAstr1;
					if (selectValueAstr1 !== "ASTR1") {
						jour[2] = selectValueAstr1;
					}
				}
				
				else if (type === "Astr2") {
					var selectValueAstr2 = document.getElementById(thisId).options[document.getElementById(thisId).selectedIndex].value;
					var selectIdAstr2 = document.getElementById(thisId).options[document.getElementById(thisId).selectedIndex].id;
					document.getElementById(thisId).setAttribute("style", 'background-color:' + selectIdAstr2);
					idMedAstr2 = selectValueAstr2;
					if (selectValueAstr2 !== "ASTR2") {
						jour[3] = selectValueAstr2;
					}
				}*/
