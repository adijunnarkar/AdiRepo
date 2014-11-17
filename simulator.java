package control.simulator;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.SQLRecoverableException;
import java.sql.Statement;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

import model.participant.ParticipantProfile;
import model.scenario.*;
import control.server.*;


public class Simulator{
	
	// A singleton class
	private static Simulator simulator = new Simulator();
	
	private static int currentTimeStep = 0;
	
	private static final int timeStepLength = 3000; // time-step length in milliseconds
	
	public static Timer simControlTimer = new Timer();
	
	public static WebsocketServer serverInstance = WebsocketServer.getInstance();
	public static Scenario experimentalScenario = Scenario.getInstance();
	public static ExperimentalSession experimentalSessionInstance = ExperimentalSession.getInstance();
	public static ParticipantProfile profileInstance = ParticipantProfile.getInstance();
	
	
	private static ArrayList<Algorithm> listOfAlgorithms = new ArrayList<Algorithm>();
    private static ArrayList<Feedback_S2C> feedbackQueue = new ArrayList<Feedback_S2C>();
	
	private Simulator(){
		
	}
	
	public static Simulator getInstance(){
		
		return simulator;
		
	}
	
	
	public int getCurrentTimeStep(){
		return currentTimeStep;
	}
	
	
	public static int getTimeStepLength(){
		return timeStepLength;
	}
	
	
	public void simulatorStart(){
		
		experimentalScenario.loadScenario();
		scheduleInitialScenarioVariables();
		scheduleMarketData();
	//	scheduleEvents();
		scheduleInterrupts();
		schedulePauses();
		scheduleStateUpdateControl();	
		
	}
	
	public void simulatorStop(){
		
		
	}
	
	
	public void instantiateScaledWorld(){
		
		// this is where any instantiation operators would take place
		
		
	}// instantiateScaledWorld()
	
	
	public static void scheduleInitialScenarioVariables(){
		
		simControlTimer.schedule(new ScheduleInitialScenarioVariables(), 0);
	}
	
	
	public static void scheduleMarketData(){
		
		// schedule market data
				for (int k = 0; k < experimentalScenario.getMarketDataForProduct(0).close_price_list.size(); ++k){
				
					simControlTimer.schedule(new MarketDataUpdate(), timeStepLength * (k + experimentalScenario.getPauseDelaysAccumulation(k)));
				//	System.out.println("time: "+timeStepLength * (k + experimentalScenario.getPauseDelaysAccumulation(k)));
					System.out.println("timestep:"+currentTimeStep);
				}//k loop
	}
	
	public static void scheduleEvents(){
		// schedule events
		
		for (int k = 0; k < experimentalScenario.getNumOfEvents(); k++){
			System.out.println(experimentalScenario.eventList.get(k));
			
			int dispatchTime = (int)experimentalScenario.eventList.get(k).getDispatchTime();
			int delay = getTimeStepLength()*(dispatchTime + experimentalScenario.getPauseDelaysAccumulation(dispatchTime));
			
			simControlTimer.schedule(new ScheduledEventThread((Event_S2C)experimentalScenario.eventList.get(k)), delay);
			
		}// ending k loop
	}
	
	public static void schedulePauses(){
		
		//schedule pause objects
		for( int k = 0; k < experimentalScenario.pauseList.size(); ++k){
		
			int dispatchTime = (int)experimentalScenario.pauseList.get(k).getDispatchTime();
			int delay = getTimeStepLength()*(dispatchTime + experimentalScenario.getPauseDelaysAccumulation(dispatchTime) - experimentalScenario.pauseList.get(k).getDuration() - k);
			simControlTimer.schedule(new ScheduledPauseThread((Pause_S2C) experimentalScenario.pauseList.get(k)), delay);
		//	System.out.println("del" + delay/4);
		}
	} //  schedulePauses
	
	public static void scheduleInterrupts(){
		//schedule interrupt objects
		for( int k = 0; k < experimentalScenario.interruptList.size(); ++k){
					int dispatchTime = (int)experimentalScenario.interruptList.get(k).getDispatchTime() ;
					int delay = getTimeStepLength()* (dispatchTime + experimentalScenario.getPauseDelaysAccumulation(dispatchTime));
					simControlTimer.schedule(new ScheduledInterruptThread((Interrupt_S2C) experimentalScenario.interruptList.get(k)), delay);
				//	System.out.println("del" + delay/4);
		}
		
	} //scheduleInterrupts

	
	public static void scheduleStateUpdateControl(){
				
		for(int timeStep = 0; timeStep < experimentalScenario.getScenarioDuration(); ++timeStep){
			simControlTimer.schedule(new StateUpdateControl(), timeStepLength * (timeStep + experimentalScenario.getPauseDelaysAccumulation(timeStep)));
			
		}//timeStep
		
		
	}//scheduleStateUpdateControl
	
	
	
	public void updateCurrentTimeStep(){
		
		if(currentTimeStep < experimentalScenario.getScenarioDuration()){
			++currentTimeStep;
		}
	}//updateCurrentTimeStep
	
	
	public Algorithm getAlgorithm(int productID){
		
		for(int y = 0; y < listOfAlgorithms.size(); y++){
			
			if(listOfAlgorithms.get(y).productID == productID){
				return listOfAlgorithms.get(y);
			}
			
		}//y loop
		
		return null;
		
	} // getAlgorithm
	
	
	public void addAlgorithm (Algorithm _algorithm){
		
		listOfAlgorithms.add(_algorithm);
		
	}//addAlgorithm
	
	
	public void addToFeebackQueue(Feedback_S2C feedBack){
		feedbackQueue.add(feedBack);
	}
	
	public Feedback_S2C popFromFeedbackQueue (){
		
		Feedback_S2C f;
		f = feedbackQueue.get(0);
		feedbackQueue.remove(0);
		
		return f;
	}
	
	public int getFeedbackQueueSize(){
		return feedbackQueue.size();
	}
	
	public String getCurrentDate(){     //to store in db
		DateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
		Date date = new Date();
		return dateFormat.format(date);
	}
	
	public void saveMarketViewData(MarketDataView_DB mdv){  //save market data view to oracle database

		Connection con = null;
        PreparedStatement ps = null;
        Statement stmt = null;
	    ResultSet rs = null;
	       
        try {
	            Class.forName("oracle.jdbc.driver.OracleDriver");
	            con = DriverManager.getConnection("jdbc:oracle:thin:"+experimentalSessionInstance.getDatabaseName()+"/aidl@129.97.72.51");
	            
	            ps = con.prepareStatement("insert into MARKET_DATA_VIEW_LOG(p_id, experimenter_id, experiment_date, scenario_file, system_time_est, sim_timestep, product_requested, type) values(?, ?, ?, ?, ?, ?, ?, ? )");
	            ps.setString(1, profileInstance.getID());
	            ps.setString(2,experimentalSessionInstance.getExperimenterID());
	            ps.setString(3, this.getCurrentDate());
	            ps.setString(4, experimentalSessionInstance.getScenarioFilename());
	            ps.setString(5, mdv.getTimestamp());
	            ps.setInt(6, currentTimeStep);
	            ps.setString(7,  mdv.getTickerSymbol());
	            ps.setString(8, mdv.getType());    
	        
	            ps.executeUpdate();
	   /*         stmt = con.createStatement();
	            rs = stmt.executeQuery("SELECT * from market_data_view_log order by s_no");
	         
	            while(rs.next()) {
	            	
            		System.out.print(rs.getInt(1) + "\t");
            		System.out.print(rs.getString(2) + "\t");
            		System.out.print(rs.getString(3) + "\t");
            		System.out.print(rs.getString(4)+ "\t");
            		System.out.print(rs.getString(5)+ "\t");
	                System.out.print(rs.getString(6) + "\t");
	                System.out.print(rs.getInt(7) + "\t");
	                System.out.print(rs.getString(8) + "\t");
	                System.out.println(rs.getString(9));	
	           
	            }*/
	        
        } catch (ClassNotFoundException e) {
	            e.printStackTrace();
	            serverInstance.sendErrorString(e.getMessage());
        } catch (SQLException e) {
	            e.printStackTrace();
	            serverInstance.sendErrorString(e.getMessage());
        } finally {
            try {
	            	
	            //	rs.close();
	                ps.close();
	              //  stmt.close();
	                con.close();
            }
            catch (SQLException e) {
	                e.printStackTrace();
	                serverInstance.sendErrorString(e.getMessage());
            }
        }
	}  //saveMarketViewData
		
	public void saveManualTradeRequestData(ManualTradeRequest_C2S mtr){  //save manual trade request order to oracle database
		Connection con = null;
        PreparedStatement ps = null;
        Statement stmt = null;
	    ResultSet rs = null;
	       
        try {
	            Class.forName("oracle.jdbc.driver.OracleDriver");
	            con = DriverManager.getConnection("jdbc:oracle:thin:"+experimentalSessionInstance.getDatabaseName()+"/aidl@129.97.72.51");
	            
	            ps = con.prepareStatement("insert into MANUAL_TRADE_REQUEST(p_id, experimenter_id, experiment_date, scenario_file, system_time_est, sim_timestep, requested_product, requested_qty, requested_price, market_price) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ? )");
	            ps.setString(1, profileInstance.getID());
	            ps.setString(2, experimentalSessionInstance.getExperimenterID());
	            ps.setString(3, this.getCurrentDate());
	            ps.setString(4, experimentalSessionInstance.getScenarioFilename());
	            ps.setString(5, mtr.getTimestamp());
	            ps.setInt(6, currentTimeStep);
	            ps.setString(7, mtr.getProductName());
	            ps.setInt(8, mtr.getQuantity());    
	            ps.setDouble(9, mtr.getRequestedPrice());  
	            ps.setDouble(10, mtr.getCurrentPrice());  
	         
	            ps.executeUpdate();
	       /*     stmt = con.createStatement();
	            rs = stmt.executeQuery("SELECT * from MANUAL_TRADE_REQUEST order by s_no");
	         
	            while(rs.next()) {
	            	
            		System.out.print(rs.getInt(1) + "\t");
            		System.out.print(rs.getString(2) + "\t");
            		System.out.print(rs.getString(3) + "\t");
            		System.out.print(rs.getString(4) + "\t");
            		System.out.print(rs.getString(5) + "\t");
	                System.out.print(rs.getString(6) + "\t");
	                System.out.print(rs.getInt(7) + "\t");
	                System.out.print(rs.getString(8) + "\t");
	                System.out.print(rs.getInt(9) + "\t");	
	                System.out.print(rs.getDouble(10)+ "\t");
	                System.out.println(rs.getDouble(11));
	           
	            }*/
	        
        } catch (ClassNotFoundException e) {
	            e.printStackTrace();
	            serverInstance.sendErrorString(e.getMessage());
        } catch (SQLException e) {
	            e.printStackTrace();
	            serverInstance.sendErrorString(e.getMessage());
        } finally {
            try {
	            	
	            	//rs.close();
	                ps.close();
	               // stmt.close();
	                con.close();
            }
            catch (SQLException e) {
	                e.printStackTrace();
	                serverInstance.sendErrorString(e.getMessage());
            }
        }
	} //saveManualTradeRequestData
	
	public void saveAlgorithmControlRequestData(AlgorithmControlRequest_C2S ac_req){  //save algorithm control request to oracle database
		Connection con = null;
        PreparedStatement ps = null;
        Statement stmt = null;
	    ResultSet rs = null;
	       
        try {
	            Class.forName("oracle.jdbc.driver.OracleDriver");
	            con = DriverManager.getConnection("jdbc:oracle:thin:"+experimentalSessionInstance.getDatabaseName()+"/aidl@129.97.72.51");
	            
	            ps = con.prepareStatement("insert into ALGORITHM_CONTROL_REQUEST(p_id, experimenter_id, experiment_date, scenario_file, system_time_est, sim_timestep, requested_product, requested_qty, market_price, entry_threshold, exit_threshold, state_change_requested, requested_iterations ) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )");
	            ps.setString(1, profileInstance.getID());
	            ps.setString(2, experimentalSessionInstance.getExperimenterID());
	            ps.setString(3,  this.getCurrentDate());
	            ps.setString(4, experimentalSessionInstance.getScenarioFilename());
	            ps.setString(5, ac_req.getTimestamp());
	            ps.setInt(6, currentTimeStep);
	            ps.setString(7,  ac_req.getTickerSymbol());
	            ps.setInt(8, ac_req.getRequestedQuantity());    
	            ps.setDouble(9, ac_req.getBenchmarkPrice());  
	            ps.setDouble(10, ac_req.getEntryThresholdPct());  
	            ps.setDouble(11, ac_req.getExitThresholdPct()); 
	            ps.setString(12, ac_req.getStateChangeRequested() ); 
	            ps.setInt(13, ac_req.getIterations()); 
	         
	            
	            ps.executeUpdate();
	     /*     stmt = con.createStatement();
	            rs = stmt.executeQuery("SELECT * from ALGORITHM_CONTROL_REQUEST order by s_no");
	         
	            while(rs.next()) {
	            	
            		System.out.print(rs.getInt(1) + "\t");
            		System.out.print(rs.getString(2) + "\t");
            		System.out.print(rs.getString(3) + "\t");
            		System.out.print(rs.getString(4) + "\t" );
            		System.out.print(rs.getString(5) + "\t");
	                System.out.print(rs.getString(6) + "\t");
	                System.out.print(rs.getInt(7) + "\t");
	                System.out.print(rs.getString(8) + "\t");
	                System.out.print(rs.getInt(9) + "\t");	
	                System.out.print(rs.getDouble(10) + "\t");
	                System.out.print(rs.getDouble(11) + "\t");
	                System.out.print(rs.getDouble(12) + "\t");
	                System.out.print(rs.getString(13) + "\t");
	                System.out.println(rs.getInt(14));
	               
	            }  */
	        
        } catch (ClassNotFoundException e) {
	            e.printStackTrace();
	            serverInstance.sendErrorString(e.getMessage());
	            
        } catch (SQLException e) {
	            e.printStackTrace();
	            serverInstance.sendErrorString(e.getMessage());
	            
        } finally {    
        	try {    	
	            //	rs.close();
	                ps.close();
	            //  stmt.close();
	                con.close();
            }
            catch (SQLException e) {
	                e.printStackTrace();
	                serverInstance.sendErrorString(e.getMessage());
            }
        }
	} //saveAlgorithmControlRequestData
	
	public void saveDebugLogsToFile(String debugLogs){   //write debug logs to text file
		
		debugLogs = "\nParticipant ID : "+profileInstance.getID()+"\nExperimenter ID : "+experimentalSessionInstance.getExperimenterID()+"\n\n" + debugLogs;
		String user = System.getProperty("user.dir").replace("\\", "\\\\").split("\\\\")[4];   // get username from the working directory
		try {
			 
			File file = new File("", "Users\\"+user+"\\workspace\\AIDLSimulator\\WebContent\\text\\DebugLogs.txt" );
 
			// if file doesnt exists, then create it
			if (!file.exists()) {
				file.createNewFile();
			}
 
			FileWriter fw = new FileWriter(file.getAbsoluteFile(), true);
			BufferedWriter bw = new BufferedWriter(fw);
			bw.write(debugLogs);
			bw.close();
 
			System.out.println("Done");
 
		} catch (IOException e) {
			e.printStackTrace();
			serverInstance.sendErrorString(e.getMessage());
		}  
	}    //saveDebugLogsToFile
	
}// Simulator
