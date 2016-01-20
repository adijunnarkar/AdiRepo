package model.scenario;


public class AlgorithmState {

	public int ProductID;
	private int StateID;
	private String stateDescription;
	
	
	public AlgorithmState(){
		
	}
	
	public AlgorithmState(int _StateID, int _productID, String _description){
		StateID = _StateID;
		ProductID = _productID;
		stateDescription = _description;
	}
	
	public int getStateID(){
		return StateID;
	}
	
	public String getDescription(){
		return stateDescription;
	}
	
	public void setStateID(int _stateID){
		StateID=_stateID;
	}
	
	public void setDescription(String _description){
		stateDescription = _description;
	}
	
}//AlgorithmState
