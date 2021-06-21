package isc.webservices.appli.administratif.planning.astreinte.repository;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import isc.appli.administratif.planning.astreinte.entities.MedecinAstreinte;
import isc.database.postgresql.ClientRequestSelect;
import isc.util.IscResultSet;
import isc.webservices.database.ClientLoader;
import isc.webservices.database.postgres.InfocentreClient;

/**
 * @author loksan
 */
@Component
public class PlanningAstreinteRepository {
/**
 * Recupère et affiche la liste des médecins de BDD
 */
	   @Autowired
		private ClientLoader loader;
	   
		
		public ArrayList<MedecinAstreinte>  findMedecinOnco( ) {
			ArrayList<MedecinAstreinte> list=new ArrayList<MedecinAstreinte>();
			InfocentreClient client=loader.getClientPostgres();
			ClientRequestSelect crs = new ClientRequestSelect("select id, full_name, color from medecin  where onco = true");
			IscResultSet rs=client.sendRequestSelect(crs);
			for(int i=0;rs!=null && i<rs.getRowCount();i++)
			{
				rs.goToRow(i);
				int id=rs.getInt("id");
				String name=rs.getString("full_name");	
				String couleur=rs.getString("color");
				MedecinAstreinte medecin=new MedecinAstreinte();
				medecin.setId(id);
				medecin.setTitle(name);
				medecin.setBackgroundColor(couleur);
				//medecin.setStart("2021-06-11");
				list.add(medecin);
			}

			rs.close();
			loader.releaseClientPostgres(client);	
			return list; 
		}
	   
		public ArrayList<MedecinAstreinte>  findMedecinAstreinte( ) {
			ArrayList<MedecinAstreinte> list=new ArrayList<MedecinAstreinte>();
			InfocentreClient client=loader.getClientPostgres();
			ClientRequestSelect crs = new ClientRequestSelect("select id, full_name, color from medecin");
			IscResultSet rs=client.sendRequestSelect(crs);
			for(int i=0;rs!=null && i<rs.getRowCount();i++)
			{
				rs.goToRow(i);
				int id=rs.getInt("id");
				String name=rs.getString("full_name");	
				String couleur=rs.getString("color");
				MedecinAstreinte medecin=new MedecinAstreinte();
				medecin.setId(id);
				medecin.setTitle(name);
				medecin.setBackgroundColor(couleur);
				//medecin.setStart("2021-06-11");
				list.add(medecin);
			}

			rs.close();
			loader.releaseClientPostgres(client);	
			return list; // Renvoie la liste de tous les médecins
		}

}
