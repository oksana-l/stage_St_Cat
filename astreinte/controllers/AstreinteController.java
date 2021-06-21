package isc.appli.astreinte.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import isc.appli.administratif.planning.astreinte.entities.MedecinAstreinte;
import isc.appli.astreinte.repository.AstreinteRepository;
import isc.mvc.URLConstants;

@Controller
public class AstreinteController {

	@Autowired
	AstreinteRepository astreinteRepository;
	
	
	@GetMapping(URLConstants.ASTREINTE)
	public String listPlaning(Model model) {
		List<MedecinAstreinte> medsOnco= astreinteRepository.getMedecin("title");
		List<MedecinAstreinte> medsAstreinte= astreinteRepository.getMedecin("title");

		model.addAttribute("medecinsOnco", medsOnco);
		model.addAttribute("medecinsAstr", medsAstreinte);
		
		return "astreintes/astreinte";
	}

	@GetMapping(URLConstants.ONCO)
	public String listPlaning2(Model model) {
		List<MedecinAstreinte> medsOnco= astreinteRepository.getListMedecin("title");
		List<MedecinAstreinte> medsAstreinte= astreinteRepository.getListMedecin("title");

		model.addAttribute("medecinsOnco", medsOnco);
		model.addAttribute("medecinsAstr", medsAstreinte);

		return "astreintes/onco";
	}
}

