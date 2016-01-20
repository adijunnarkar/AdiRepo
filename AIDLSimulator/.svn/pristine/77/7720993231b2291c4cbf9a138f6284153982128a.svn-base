package model.scenario;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(namespace="testconversion.Scenario")  
public class Pause_S2C{
	
	private int intervalID;
	private int dispatchTime;// in timesteps. Pause-Times get priority over other discrete-time-events when dispatchtimes are equal
	private int duration; // in timesteps
	
	public Pause_S2C(){
		
	}
	
	public Pause_S2C(int _intervalID, int _dispatchTime, int _duration){
		
		this.intervalID = _intervalID;
		this.dispatchTime = _dispatchTime;
		this.duration = _duration;
	}
	
	public int getIntervalID(){
		return intervalID;
	}
	
	@XmlElement(name="intervalID")
	public void setIntervalID(int _intervalID){
		this.intervalID = _intervalID;
	}
	
	public int getDispatchTime(){
		return dispatchTime;
	}	
	
	@XmlElement(name="dispatchTime")
	public void setDispatchTime(int _dispatchTime){
		this.dispatchTime = _dispatchTime;
	}
	
	public int getDuration(){
		return duration;
		
	}	
	
	@XmlElement(name="duration")
	public void setDuration(int _duration){
		this.duration = _duration;
	}
	
}// Pause