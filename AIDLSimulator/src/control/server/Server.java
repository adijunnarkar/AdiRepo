package control.server;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.json.*;

import sun.misc.Regexp;
import model.scenario.*;
import model.participant.*;
import control.server.*;
import control.simulator.*;

import com.google.gson.Gson;



@ServerEndpoint(value="/server_endpoint")
public class Server {
	
	private static Server server = null;
	
	private static Set<Session> clients = 
			    Collections.synchronizedSet(new HashSet<Session>());
	public static ArrayList<Session> sessionArray = new ArrayList<Session>();
	private static ArrayList<String> sessionIDarrays = new ArrayList<String>();
	public boolean isServerActive = false;
	
	public Simulator experimentSim = Simulator.getInstance();
	public ExperimentalSession experimentalSessionInstance = ExperimentalSession.getInstance();
	public ParticipantProfile participantProfileInstance = ParticipantProfile.getInstance();
	
	
	private static ArrayList<ManualTradeRequest_C2S> manualRequestBuffer = new ArrayList<ManualTradeRequest_C2S>();
	private static ArrayList<AlgorithmControlRequest_C2S> algoControlRequestBuffer = new ArrayList<AlgorithmControlRequest_C2S>();
	
	public Server(){
		
		
	}
	
	public static Server getInstance(){
		
		if(server == null)
		{
			server = new Server();
		}
		
		return server;
		
	}// getInstance()
	
	
	@OnOpen
	//method invoked when websocket connection is established 
	public void handleOpen(Session session){
		//print to console that connection has been established
		System.out.println("Websocket connection established.");
		System.out.println(session.getOpenSessions());
		sessionIDarrays.add(session.getId());
		System.out.println(sessionIDarrays.size());
		sessionArray.add(session);
		clients.add(session);
		System.out.println("No. of clients: " +clients.size());
	}
	
	@OnMessage
	//method invoked when server receives message from client 
	public void handleMessage(String message, Session session) throws IOException{
		//print to console that server has received message from client 
		isServerActive = true;
		System.out.println("Message is received from client.");

		//print received message from client to console
		System.out.println("Client message: " + message);
		
	if(!JSONUtils.isJSONValid(message)){
			if(message.equals("Begin login.")){
				synchronized(clients){
					for (Session client : clients){
						if(!client.equals(session)){
							client.getBasicRemote().sendText("make_active");
						}
					}
				}
    
	    } else if (message.contains("PID")){
	    	String part_ID  = message.substring(6);
	    	System.out.println(part_ID);
	    	
	    	participantProfileInstance.setID(part_ID);
	    	synchronized(clients){
	    		for (Session client : clients){
	    			if(!client.equals(session)){
	    				client.getBasicRemote().sendText("P_ID is " + part_ID);
	    			}
	    		}
	    	}
	    	
			} else if (message.equals("push preview")){
					synchronized(clients){
						for (Session client : clients){
							if(!client.equals(session)){
								client.getBasicRemote().sendText("load URL");
							}
						}
					}
	    	
	    } else if( message.equals("Preview completed")){
				synchronized(clients){
					for (Session client : clients){
						if(!client.equals(session)){
							System.out.println(message+participantProfileInstance.getID());
							client.getBasicRemote().sendText(message+". ID is "+ participantProfileInstance.getID());
						}
					}
				}
			} else if( message.equals("Load main frontend")){
				synchronized(clients){
					for (Session client : clients){
						if(!client.equals(session)){
							client.getBasicRemote().sendText(message);
						}
					}
				}
			
			} else if(message.equals("Participant interface loaded.")){
				synchronized(clients){
					for (Session client : clients){
						if(!client.equals(session)){
							client.getBasicRemote().sendText(message);
						}
					}
				}
			} else if(message.equals("Stopping simulator")) {
					
				synchronized(clients){
					for (Session client : clients){
						if(!client.equals(session)){
							client.getBasicRemote().sendText("Stop simulator");
						}
					}
				};
				
				this.StopServer();
			}
			
		} else {
				JSONObject java_obj = new JSONObject(message);
				
				if((java_obj).has("scenario_file")){
					synchronized(clients){
						for (Session client : clients){
							if(client.equals(session)){
								client.getBasicRemote().sendText("Simulator started");
							}
						}
					}
					sendTestString("Simulator started");
					experimentalSessionInstance.setExperimenterID(java_obj.getString("experimenterID"));
					experimentalSessionInstance.setScenarioFilename(java_obj.getString("scenario_file"));
					experimentalSessionInstance.setCSVFilename(java_obj.getString("csv_file"));
					experimentalSessionInstance.setDatabaseName(java_obj.getString("database"));
					this.startSimulator();
					
					
				} else if((java_obj).has("manualTradeType")){
					//manualRequestBuffer = convertJSONManualRequest(message);
						
						ManualTradeRequest_C2S mtr= new ManualTradeRequest_C2S();
								
						mtr.setManualTradeType(java_obj.getString("manualTradeType"));
						mtr.setProductID(java_obj.getInt("ProductID"));
						mtr.setProductName(java_obj.getString("manualProduct"));
						mtr.setQuantity(java_obj.getInt("quantityManual"));
						mtr.setRequestedPriceManual(java_obj.getDouble("requestedPriceManual"));
						mtr.setTimeInForce(java_obj.getString("timeInForce"));
						mtr.setTimestamp(java_obj.getString("timestampManualOrder"));
						experimentSim.saveManualTradeRequestData(mtr);
						this.addManualTradeRequest(mtr);
						
						System.out.println("TRADE Product-Name: "+mtr.getProductName());
						System.out.println("PRODUCT ID: "+mtr.ProductID);
						System.out.println("TRADE Trade Type: "+mtr.getManualTradeType());
						System.out.println("TRADE Trade Qty: "+mtr.getQuantity());
						
				
				} else if((java_obj).has("entryThreshold")){
						
						AlgorithmControlRequest_C2S ac_req = new AlgorithmControlRequest_C2S();
					
						ac_req.setProductID(java_obj.getInt("ProductID"));
						ac_req.setTickerSymbol(java_obj.getString("autoProduct"));
						ac_req.setIfStrategyLong(java_obj.getInt("isLong"));
						ac_req.setEntryThresholdPct(java_obj.getDouble("entryThreshold"));
						ac_req.setExitThresholdPct(java_obj.getDouble("exitThreshold"));
					//	algoControlRequestBuffer.setRequestedPrice(java_obj.getDouble("requestedPrice"));
						ac_req.setStateChangeRequested(java_obj.getString("stateChangeRequest"));
						ac_req.setRequestedQuantity(java_obj.getInt("quantityAlgo"));
						ac_req.setTimeInForce(java_obj.getString("timeInForce"));
						//ac_req.setUpdatePresent(java_obj.getInt("isUpdatePresent"));
						ac_req.setIterations(java_obj.getInt("iterations"));
						ac_req.setTimestamp(java_obj.getString("timestampAlgorithmRequest"));
						
						experimentSim.saveAlgorithmControlRequestData(ac_req);
						this.addAlgoTradeRequest(ac_req);
						
						System.out.println("Strategy Long? : "+ac_req.isStrategyLong());
						System.out.println("ProductID : "+ac_req.ProductID);
						//System.out.println("update Present? : "+ac_req.checkForIncomingControlRequest());
						System.out.println("quantity : "+ac_req.getRequestedQuantity());
						System.out.println("entry threshold : "+ac_req.getEntryThresholdPct());
						System.out.println("exit threshold: "+ac_req.getExitThresholdPct());
				
				} else if((java_obj).has("product") && (java_obj).has("type")){
					
					MarketDataView_DB market_data_view = new MarketDataView_DB();
					market_data_view.setTimestamp(java_obj.getString("timestamp"));
					market_data_view.setTickerSymbol(java_obj.getString("product"));
					market_data_view.setType(java_obj.getString("type"));
					experimentSim.saveMarketViewData(market_data_view);
				}
		}
	    	    
	    
	}//handleMessage
	
	@OnError
	//method invoked when error occurs 
	public void handleError(Throwable err){
		err.printStackTrace();
	}
	
	@OnClose
	//method invoked when error occurs 
	public void handleClose(Session session){
		System.out.println("Websocket connection closed");
		sessionArray.remove(session);
		clients.remove(session);
		System.out.println("size: "+ clients.size());
	}
	
	public void startSimulator(){
		
		System.out.println("sim started");
		experimentSim.simulatorStart();
		
	}
	
	
	public void stopSimulator(){
		
		// this will be used for stopping the simulator
		System.out.println("sim stopped");
		experimentSim.simulatorStop();
	}
	
	
	public void loadScenario (/* XML file argument */){
	
		// loading scenario from the front end
		
		// 1. convert XML file to an object here
		
		
	
	}
	
	
	/*public void saveData (String fileNameSuffix, String participantID, String experimenterID){
		
		// function called from front end to save data
	
	}*/
	
	public void sendEvent(Event_S2C E){
		
		String json_eventstring = convertEventObject(E);
		
		System.out.println(json_eventstring);
		//System.out.println(sessionIDarrays.get(0));
	 	try {
	           //sessionArray.get(1).getBasicRemote().sendText(json_eventstring);
	 		synchronized(clients){
	    		for (Session client : clients){
	    				client.getBasicRemote().sendText(json_eventstring);
	    		}
    		}
        } catch (IOException e) {
	            e.printStackTrace();
	        	//throw new RuntimeException(e)         
        }     
	}  
	
	public void sendMarketData(List<ProductCurrentPrice_S2C> D){
		String json_datastring = convertDataObject(D);
		System.out.println(json_datastring);
		try {
			synchronized(clients){
	    		for (Session client : clients){
	    				client.getBasicRemote().sendText(json_datastring);
	    		}
    		}
        } catch (IOException e) {
	            e.printStackTrace();
	        	//throw new RuntimeException(e)         
        }      
		
	}
	
	public void sendAsset(AssetUpdate_S2C asset){
		String json_assetstring = convertAssetObject(asset);
		System.out.println(json_assetstring);
		try {
			synchronized(clients){
	    		for (Session client : clients){
	    				client.getBasicRemote().sendText(json_assetstring);
	    				System.out.println("String sent");
	    		}
    		}
        } catch (IOException e) {
	            e.printStackTrace();
	        	//throw new RuntimeException(e)         
        }      
	}
	
	public void sendAssetList(ArrayList<Asset> _assetlist){
		String json_assetliststring = convertAssetListObject(_assetlist);
		System.out.println(json_assetliststring);
		try {
			synchronized(clients){
	    		for (Session client : clients){
	    				client.getBasicRemote().sendText(json_assetliststring);
	    				System.out.println("String sent");
	    		}
    		}
        } catch (IOException e) {
	            e.printStackTrace();
	        	//throw new RuntimeException(e)         
        }   
	}
	
	public void sendAccountInfo(AccountUpdate_S2C account_info){
		String json_accountstring = convertAccountObject(account_info);
		System.out.println(json_accountstring);
		try {
			synchronized(clients){
	    		for (Session client : clients){
	    				client.getBasicRemote().sendText(json_accountstring);
	    				System.out.println("String sent");
	    		}
    		}
        } catch (IOException e) {
	            e.printStackTrace();
	        	//throw new RuntimeException(e)         
        }      
	}
	
	public void sendPauseObject(Pause_S2C pause_obj){
		String json_pauseobjstring = convertPauseObject(pause_obj);
		System.out.println(json_pauseobjstring);
		try {
			synchronized(clients){
	    		for (Session client : clients){
	    				client.getBasicRemote().sendText(json_pauseobjstring);
	    				System.out.println("String sent");
	    		}
    		}
        } catch (IOException e) {
	            e.printStackTrace();
	        	        
        }      
	}
	
	public void sendInterruptObject(Interrupt_S2C interrupt_object){
		
		String json_interruptstring = new Gson().toJson(interrupt_object);
		System.out.println(json_interruptstring);
		
		try {
			synchronized(clients){
	    		for (Session client : clients){
	    				client.getBasicRemote().sendText(json_interruptstring);
	    		}
    		}
        } catch (IOException e) {
	            e.printStackTrace();   	         
    	}     
			
	}// sendInterruptObject

	public void sendAutomatedAssetInfo(AlgorithmUpdate_S2C automated_asset){
		String json_automated_assetstring = convertAutomatedAssetObject(automated_asset);
		System.out.println(json_automated_assetstring);
		try {
			synchronized(clients){
	    		for (Session client : clients){
	    				client.getBasicRemote().sendText(json_automated_assetstring);
	    				System.out.println("String sent");
	    		}
    		}
        } catch (IOException e) {
	            e.printStackTrace();
	        	//throw new RuntimeException(e)         
        }      
	}
	
	public String convertEventObject(Event_S2C E){


		//create new gson object
		Gson gson = new Gson();
		
		/*
		 * define and initialize string variable 
		 * to converted java object; convert java
		 * object using gson.toJson() method
		 */
		String json = gson.toJson(E);
		
		//print converted object to console 
		System.out.println("Java object converted to json message: "+ json);
		
		//return json string 
		return json;
	}
	
	public String convertDataObject(List<ProductCurrentPrice_S2C> P){


		//create new gson object
		Gson gson = new Gson();
		
		/*
		 * define and initialize string variable 
		 * to converted java object; convert java
		 * object using gson.toJson() method
		 */
		String json = gson.toJson(P);
		
		//print converted object to console 
		System.out.println("Java object converted to json message: "+ json);
		
		//return json string 
		return json;
	}
	
	public String convertAssetObject(AssetUpdate_S2C A){
		
		//create new gson object
		Gson gson = new Gson();
				
		/*
		 * define and initialize string variable 
		 * to converted java object; convert java
		 * object using gson.toJson() method
		 */
		String json = gson.toJson(A);
				
		//print converted object to console 
		System.out.println("Java object converted to json message: "+ json);
				
		//return json string 
		return json;
	}
	
	public String convertAssetListObject(ArrayList<Asset> _assetlist){
		
		//create new gson object
		Gson gson = new Gson();
				
		/*
		 * define and initialize string variable 
		 * to converted java object; convert java
		 * object using gson.toJson() method
		 */
		String json = gson.toJson(_assetlist);
				
		//print converted object to console 
		System.out.println("Java object converted to json message: "+ json);
				
		//return json string 
		return json;
	}
	
	public String convertPauseObject(Pause_S2C _pauseObj){
		
		//create new gson object
		Gson gson = new Gson();
				
		/*
		 * define and initialize string variable 
		 * to converted java object; convert java
		 * object using gson.toJson() method
		 */
		String json = gson.toJson( _pauseObj);
				
		//print converted object to console 
		System.out.println("Java object converted to json message: "+ json);
				
		//return json string 
		return json;
	}
	
	public String convertAccountObject(AccountUpdate_S2C A){
		
		//create new gson object
		Gson gson = new Gson();
				
		/*
		 * define and initialize string variable 
		 * to converted java object; convert java
		 * object using gson.toJson() method
		 */
		String json = gson.toJson(A);
				
		//print converted object to console 
		System.out.println("Java object converted to json message: "+ json);
				
		//return json string 
		return json;
	}
	
	public String convertAutomatedAssetObject(AlgorithmUpdate_S2C automated_asset){


		//create new gson object
		Gson gson = new Gson();
		
		/*
		 * define and initialize string variable 
		 * to converted java object; convert java
		 * object using gson.toJson() method
		 */
		String json = gson.toJson(automated_asset);
		
		//print converted object to console 
		System.out.println("Java object converted to json message: "+ json);
		
		//return json string 
		return json;
	}
	
	public ManualTradeRequest_C2S convertJSONManualRequest(String jsonstring){
		
		/*
		 * define and initialize string variable 
		 * to converted java object; convert java
		 * object using gson.toJson() method
		 */
		ManualTradeRequest_C2S manualrequest_obj = new Gson().fromJson(jsonstring, ManualTradeRequest_C2S.class);
		return manualrequest_obj;
		
	}
	
	public void sendTestString(String testmessage){
		try {
			synchronized(clients){
	    		for (Session client : clients){
	    				client.getBasicRemote().sendText("TEST STRING: " + testmessage);
	    		}
    		}
        } catch (IOException e) {
	            e.printStackTrace();
	        	         
        }    	
	}
	
	public void sendErrorString(String errormessage){
		try {
			synchronized(clients){
	    		for (Session client : clients){
	    				client.getBasicRemote().sendText("ERROR STRING: " + errormessage);
	    		}
    		}
        } catch (IOException e) {
	            e.printStackTrace();
	        	         
        }      	
	}
	
	public void sendCurrentTimestep(int timestep){
		try {
			synchronized(clients){
	    		for (Session client : clients){
	    				client.getBasicRemote().sendText("TIMESTEP: " + timestep);
	    		}
    		}
        } catch (IOException e) {
	            e.printStackTrace();
	        	         
        }      	
	}
	
	public void sendInitializationVariables (ScenarioInitializer_S2C scenario_initial_object){
		
		String json_initialdata = new Gson().toJson(scenario_initial_object);
		System.out.println(json_initialdata);
		try {
			synchronized(clients){
	    		for (Session client : clients){
	    				client.getBasicRemote().sendText(json_initialdata);
	    		}
    		}
        } catch (IOException e) {
	            e.printStackTrace();
	        	         
        }      	
			
	}// sendInitializationVariables
	
	public void sendFeedback(Feedback_S2C feedback_object){
		
		String json_feedbackstring = new Gson().toJson(feedback_object);
		System.out.println(json_feedbackstring);
		
		try {
			synchronized(clients){
	    		for (Session client : clients){
	    				client.getBasicRemote().sendText(json_feedbackstring);
	    		}
    		}
        } catch (IOException e) {
	            e.printStackTrace();   	         
    	}     
			
	}// sendFeedback
	
	public void sendFeedbackTemplate(FeedbackTemplate feedback_object){
		
		String json_feedbackstring = new Gson().toJson(feedback_object);
		System.out.println(json_feedbackstring);
		
		try {
			synchronized(clients){
	    		for (Session client : clients){
	    				client.getBasicRemote().sendText(json_feedbackstring);
	    		}
    		}
        } catch (IOException e) {
	            e.printStackTrace();   	         
    	}     
			
	}// sendFeedback
	
	public void StopServer(){
		System.out.println("sim stopped");
		isServerActive= false;
		//close all websocket connections etc
		
	}
	
	
	public void addManualTradeRequest(ManualTradeRequest_C2S mRequest){
		this.manualRequestBuffer.add(mRequest);
	}
	
	public ManualTradeRequest_C2S popManualTradeRequest(){
		
		if (manualRequestBuffer.size()!=0){
			
			ManualTradeRequest_C2S m = manualRequestBuffer.get(0);
			manualRequestBuffer.remove(0);
			
			return m;
		}
		
		return null;
		
		
	}//popManualTradeRequest
	
	public boolean isManualRequestBufferEmpty(){
		
		if(manualRequestBuffer.size()==0) return true;
		else return false;
	}// isManualRequestBufferEmpty
	
	
	
	
	public void addAlgoTradeRequest(AlgorithmControlRequest_C2S algoRequest){
		
		this.algoControlRequestBuffer.add(algoRequest);	
	}
	
	public AlgorithmControlRequest_C2S popAlgorithmControlTradeRequest(){
		
		if (algoControlRequestBuffer.size()!=0){
			
			AlgorithmControlRequest_C2S acr = algoControlRequestBuffer.get(0);
			algoControlRequestBuffer.remove(0);
			
			return acr;
		}
		
		return null;
		
	}//popManualTradeRequest
		
	
	public boolean isAlgoControlRequestBufferEmpty(){
		
		if(algoControlRequestBuffer.size()==0) return true;
		
		else return false;
		
	}// isAlgoControlRequestBufferEmpty
	
}// Server