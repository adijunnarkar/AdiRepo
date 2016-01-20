package model.participant;

public class Performance{
	
	private static Performance performanceInstance = null;
	
	public double dollars_gained;

	
	private Performance(){
		
	}
	
	public static Performance getInstance(){
		
		if(performanceInstance==null){
			
			performanceInstance = new Performance();
		}
		
		return performanceInstance;
		
	}
		
	
}//Performance