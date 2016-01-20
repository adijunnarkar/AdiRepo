package control.simulator;

import java.util.TimerTask;

import model.scenario.Interrupt_S2C;
import control.server.Server;

public class ScheduledInterruptThread extends TimerTask{

	public Interrupt_S2C interruptObj;
	
	public ScheduledInterruptThread() {
		
	}

	public ScheduledInterruptThread(Interrupt_S2C _interruptObj){
		
		this.interruptObj = _interruptObj;
	}	
	
		
	public void run(){
		
		// This section will call the Server class to send the event		
		System.out.println("Sending interrupt: "+"Interrupt ID: "+ interruptObj.getInterruptID() +" Interval duration: "+ interruptObj.getDuration());
		Server.getInstance().sendInterruptObject(interruptObj);
		Server.getInstance().sendTestString("Interrupt with ID " + interruptObj.getInterruptID()+" sent.");
	}
	
	public Interrupt_S2C getInterruptObject(){
		return interruptObj;
	}
	

}
