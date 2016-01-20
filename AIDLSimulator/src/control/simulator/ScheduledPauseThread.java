package control.simulator;
import model.scenario.*;

import java.util.TimerTask;

import control.server.Server;

public class ScheduledPauseThread extends TimerTask {
	
	
	public Pause_S2C pauseObj;
	
	public ScheduledPauseThread(){
		
	}
	
	public ScheduledPauseThread(Pause_S2C _pauseObj){
		
		this.pauseObj = _pauseObj;
	}	
	
		
	public void run(){
		
		// This section will call the Server class to send the event		
		System.out.println("Sending pause: "+"Interval ID: "+pauseObj.getIntervalID() +" Pause duration: "+ pauseObj.getDuration());
		Server.getInstance().sendPauseObject(pauseObj);
		Server.getInstance().sendTestString("Pause with ID "+pauseObj.getIntervalID()+ " sent.");
	}
	
	public Pause_S2C getPauseObject(){
		return pauseObj;
	}
	

}//ScheduledEventThread