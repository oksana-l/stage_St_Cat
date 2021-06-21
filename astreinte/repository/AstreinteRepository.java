package isc.appli.astreinte.repository;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

import isc.appli.administratif.planning.astreinte.entities.MedecinAstreinte;
import isc.appli.administratif.planning.astreinte.webservice.PlanningAstreinteWebServices;
import isc.utils.services.WebServiceConsumer;

@Component
public class AstreinteRepository {

	@Autowired
	WebServiceConsumer webServiceConsumer;

	// TODO
	public List<MedecinAstreinte> getListMedecin(String title) {
		try {
			ObjectMapper mapper = new ObjectMapper();
			MedecinAstreinte[] medecinsOnco  = mapper.readValue(
					webServiceConsumer.consumeGet(PlanningAstreinteWebServices.ONCO),
					MedecinAstreinte[].class);
			return Arrays.asList( medecinsOnco );

			
		} catch (Exception e) {
			isc.util.log.LogUtil.getLogger().error(e.getMessage(), e);
		}
		return null;
	}
	
	// TODO
	public List<MedecinAstreinte> getMedecin(String title) {
		try {
			ObjectMapper mapper = new ObjectMapper();
			MedecinAstreinte[] medecinsAstr  = mapper.readValue(
					webServiceConsumer.consumeGet(PlanningAstreinteWebServices.ASTREINTE),
					MedecinAstreinte[].class);
			return Arrays.asList( medecinsAstr );

			
		} catch (Exception e) {
			isc.util.log.LogUtil.getLogger().error(e.getMessage(), e);
		}
		return null;
	}
	



}
