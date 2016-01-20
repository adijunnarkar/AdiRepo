package model.scenario;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(namespace="testconversion.Scenario") 
public class Interrupt_S2C {

	private int interruptID;
	private int dispatchTime;// in timesteps. Pause-Times get priority over other discrete-time-events when dispatchtimes are equal
	private int duration; // in timesteps
	
	public Interrupt_S2C() {
		// TODO Auto-generated constructor stub
	}

	public Interrupt_S2C(int _interruptID, int _dispatchTime, int _duration){
		
		this.interruptID = _interruptID;
		this.dispatchTime = _dispatchTime;
		this.duration = _duration;
	}


	
	
	public int getInterruptID(){
		return interruptID;
	}
	
	@XmlElement(name="interruptID")
	public void setInteruptID(int _interruptID){
		this.interruptID = _interruptID;
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
	
	
}
