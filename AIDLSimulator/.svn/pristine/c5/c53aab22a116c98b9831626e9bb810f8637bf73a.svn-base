package control.simulator;

public class Feedback_S2C {
	
	public int feedbackID;
	private String feedback;
	public int productID;
	private int isAlgorithmPanel; // 1 for algorithmic trading, 0 for manual trading
	
	public Feedback_S2C(){
		
	}
	
	public Feedback_S2C(String _feedback, int _productID, int _isAlgorithmPanel){
		
		feedback = _feedback;
		productID = _productID;
		isAlgorithmPanel = _isAlgorithmPanel;
		
	}// Feedback_S2C
	
	
	public void setFeedbackText(String _feed){
		feedback = _feed;
	}
	
	public String getFeedbackText(){
		return feedback;
	}
	
	public int isMessageForAlgorithm(){
		return isAlgorithmPanel;
	}
	
	public void setAlgorithmOrManual(int _algoOrManual){
		
		isAlgorithmPanel = _algoOrManual;
	}
	

}// Feedback_S2C
