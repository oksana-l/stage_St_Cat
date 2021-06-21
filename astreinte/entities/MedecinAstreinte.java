package isc.appli.administratif.planning.astreinte.entities;
/**
 * 
 * @author loksan
 *
 */
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;


@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class MedecinAstreinte {
	private Integer id;
	private String title;
	private boolean astr1;
	private boolean astr2;
	private boolean onco;
	private String backgroundColor;

}
//private String start;
