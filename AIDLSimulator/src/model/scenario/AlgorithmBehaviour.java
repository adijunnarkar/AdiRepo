package model.scenario;

import java.util.ArrayList;

public class AlgorithmBehaviour{
	
	private ArrayList<AlgorithmState> automationDefaultAction = new ArrayList<AlgorithmState>();
	private ArrayList<AlgorithmState> listOfAlgoStates = new ArrayList<AlgorithmState>();
	private ArrayList<Integer> automationFlags= new ArrayList<Integer>(); 
	public int productID;
	
	public AlgorithmBehaviour(){
		
	}
	
	public AlgorithmBehaviour (int _productID){
		productID = _productID;
	}
	
	public void addStateToAlgorithm (AlgorithmState as){
		
		listOfAlgoStates.add(as);
		
	}
	
	public AlgorithmState getCurrentAlgorithmState(){
		
		AlgorithmState as = new AlgorithmState();
		return as;
		
	}// getCurrentAlgorithmState
	
	
	public AlgorithmState getAlgorithmState(int stateID){
		
		for(int a=0; a<listOfAlgoStates.size(); a++){
			
			if(listOfAlgoStates.get(a).getStateID()==stateID){
				
				return listOfAlgoStates.get(a);
			}
		}//a loop
		
		return null;
			
	}//getAlgorithmState
	
	
	public ArrayList<AlgorithmState> getAlgoStateList(){
				
		return listOfAlgoStates; 
	}
		
	
	
}// AlgorithmBehavior