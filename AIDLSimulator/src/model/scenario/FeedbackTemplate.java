package model.scenario;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

@XmlRootElement(namespace="testconversion.Scenario") 
public class FeedbackTemplate {
	
	@XmlTransient
	public int feedbackID;
	private boolean forManualRequest;
	private String message;
	
	
	public FeedbackTemplate(){
		
	}
	
	public FeedbackTemplate(int _feedbackID, boolean _forManualRequest, String _message){
		
		forManualRequest = _forManualRequest;
		message = _message;
		feedbackID = _feedbackID;
	
	}// Feedback_S2C
	
	@XmlElement(name="message")
	public void setMessage(String msg){
		message = msg;
	}
	
	@XmlElement(name="feedbackID")
	public void setMsgIndex(int index){
		feedbackID = index;
	}
	
	@XmlElement(name="forManualRequest")
	public void setManualAutomatic(boolean _forManualReq){
		forManualRequest = _forManualReq;
	}
	
	public String getMessage(){
		return message;
	}
	
	public int getMsgIndex(){
		return feedbackID;
	}
	
	public boolean forManualTrade(){
		return forManualRequest;
	}
	

 }// FeedbackTemplate
