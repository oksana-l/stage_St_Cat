package isc.appli.administratif.planning.astreinte.entities;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author loksan
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlanningAstreinte {
	private Integer year;
	private Integer month;
	private Integer day;
	private Integer fk_medecin_onco;
	private Integer fk_medecin_astr1;
	private Integer fk_medecin_astr2;
	private Date date_change;
}
