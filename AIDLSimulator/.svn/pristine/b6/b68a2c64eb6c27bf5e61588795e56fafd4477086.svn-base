package model.participant;

public class ParticipantProfile{
	
	private String participantID;
	private static ParticipantProfile participantProfileInstance = null;	
	public static Performance performanceInstance = Performance.getInstance();
	public static Portfolio portfolioInstance = Portfolio.getInstance();
	
	
	private ParticipantProfile(){
		
		
		
	}//ParticipantProfile
	
	
	public static ParticipantProfile getInstance(){
		
		if(participantProfileInstance==null){
			participantProfileInstance = new ParticipantProfile();
		}
		
		return participantProfileInstance;
		
	}
	

	
	public String getID(){
		return participantID;
	}
	
	public void setID(String p_id){
		participantID= p_id;
	}
	
	
	
}//ParticipantProfile