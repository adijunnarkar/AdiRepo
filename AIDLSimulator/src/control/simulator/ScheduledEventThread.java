package control.simulator;
import model.scenario.*;

import java.util.TimerTask;

import control.server.Server;

public class ScheduledEventThread extends TimerTask {
	
	
	public Event_S2C eventObj;
	
	public ScheduledEventThread(){
		
	}
	
	public ScheduledEventThread(Event_S2C _eventObj){
		
		this.eventObj = _eventObj;
	}	
	
		
	public void run(){
		
		
		// This section will call the Server class to send the event		
		System.out.println("Sending event: "+"Event Name: "+eventObj.getName()+" Event Description: "+eventObj.getDesc());
		Server.getInstance().sendEvent(eventObj);
		Server.getInstance().sendTestString("Event "+eventObj.getName()+" launched");
	}
	
	public Event_S2C getEvent(){
		return eventObj;
	}
	

}//ScheduledEventThread
