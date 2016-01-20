package control.simulator;


public class ExperimentalSession {

	private String experimenterID;
	private String scenarioFile;   //scenario file to load scenario variables
	private String csvFile;       //csv file to load market data
	private String database;      //online database or test database
	private static ExperimentalSession experimentalSessionInstance = null;	
	
	public ExperimentalSession() {
		
	}

	public static ExperimentalSession getInstance(){
		
		if(experimentalSessionInstance==null){
			experimentalSessionInstance = new ExperimentalSession();
		}
		
		return experimentalSessionInstance;
		
	}
	
	public void setExperimenterID(String _experimenterID){
		experimenterID = _experimenterID;
	}
	
	public String getExperimenterID(){
		return experimenterID;
	}
	
	public void setScenarioFilename(String _scenarioFile){
		scenarioFile = _scenarioFile;
	}
	
	public String getScenarioFilename(){
		return scenarioFile;
	}
	
	public void setCSVFilename(String _csvFile){
		csvFile = _csvFile;
		
	}
	
	public String getCSVFilename(){
		return csvFile;
	}
	
	public void setDatabaseName(String _database){
		database = _database;
	}
	
	public String getDatabaseName(){
		return database;
	}
	
}
