package isc.webservices.appli.administratif.planning.astreinte.webservices;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import isc.appli.administratif.planning.astreinte.entities.MedecinAstreinte;
import isc.appli.administratif.planning.astreinte.webservice.PlanningAstreinteWebServices;
import isc.webservices.appli.administratif.planning.astreinte.repository.PlanningAstreinteRepository;


/***
 * @author loksan
 */

@RestController
public class PlanningAstreinteServices {
	@Autowired
	private PlanningAstreinteRepository planningAstreinteRepository;
	
	@RequestMapping(value = PlanningAstreinteWebServices.ASTREINTE)
	public ArrayList<MedecinAstreinte> findMedecinAstreinte() {
		return planningAstreinteRepository.findMedecinAstreinte();
	}
	
	@RequestMapping(value = PlanningAstreinteWebServices.ONCO)
	public ArrayList<MedecinAstreinte> findMedecinOnco() {
		return planningAstreinteRepository.findMedecinOnco();
	}
}
