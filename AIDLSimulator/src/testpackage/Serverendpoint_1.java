/*package testpackage;

import java.io.IOException;



import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import model.scenario.Event;

import com.google.gson.Gson;

@ServerEndpoint(value = "/serverend_parsing")
public class Serverendpoint_1{      //Server endpoint class
	
	@OnOpen
	//method invoked when websocket connection is established 
	public void handleOpen(Session session){
		//print to console that connection has been established
		System.out.println("Websocket connection established.");
		String jsonstring = convertEventObject();
		System.out.println(jsonstring);
		 try {
	            session.getBasicRemote().sendText(jsonstring);
	        } catch (IOException e) {
	            throw new RuntimeException(e);
	        }
		
		
	}
	
	@OnMessage
	//method invoked when server receives message from client 
	public String handleMessage(String message){
		//print to console that server has received message from client 
		System.out.println("Message is received from client.");
		
		//print received message from client to console
		System.out.println("Client message before parsing: " + message);
		
	
		/*
		 * Handle message and convert json string to java object
		 */
	
		//create new Gson object
/*		Gson gson1 = new Gson();
		System.out.println(JSONUtils.isJSONValid(message));
		if(JSONUtils.isJSONValid(message)){
			//create new java object that has value of json string 
			Order java_ord_obj = gson1.fromJson(message, Order.class);
			System.out.println("Java order object created");
			System.out.println("Name: " + java_ord_obj.getName() + ", Quantity: " + java_ord_obj.getQuantity()
				+ ", Price: " + java_ord_obj.getPrice() + ", Type: " + java_ord_obj.getType() 
			);
		} else{
			System.out.println("Order object could not be created");
		}
		//print new java object to console 
		 
		
		//define and initialize reply string to returned json doc
		String reply = convertOrderObject();
				
		//return reply (json document string) to client 
		return reply;
	}
	
	@OnError
	//method invoked when error occurs 
	public void handleError(Throwable err){
		err.printStackTrace();
	}
	
	//Order class definition
	public class Order { 
		//define private variables of order class 
		private String prod_name; 
		private int quantity; 
		private double price; 
		private String type;
		
		
		
		//define getters and setters
			
		//get, set order name 
		public String getName(){
			return prod_name;
		}
			
		public void setName(String prod_name){
			this.prod_name = prod_name;
		}
			
		//get, set order price
		public double getPrice(){
			return price;
		}
			
		public void setPrice(double price){
			this.price = price;
		}
			
		//get, set order quantity 
		public int getQuantity(){
			return quantity;
		}
			
		public void setQuantity(int quantity){
			this.quantity = quantity;
		}
			
		//get, set order type
		public String getType(){
			return type;
		}
			
		public void setType(String type){
			this.type = type;
		}
	}
	
	/*
	 * method that converts java object to json document
	 * and then returns the document in a string format
	 */
/*	public String convertOrderObject(){
		//create new Product object
		Order gm = new Order();
		
		//set values for gm object 
		
		//set product name 
		gm.setName("GM");
		
		//set order quantity
		gm.setQuantity(100);
		
		//set order price 
		gm.setPrice(54.50);
		
		//set order type 
		gm.setType("Limit");
		
		//create new gson object
		Gson gson = new Gson();
		
		/*
		 * define and initialize string variable 
		 * to converted java object; convert java
		 * object using gson.toJson() method
		 */
/*		String json = gson.toJson(gm);
		
		//print converted object to console 
		System.out.println("Java object converted to json message: "+ json);
		
		//return json string 
		return json;
	}
	
	
	public String convertEventObject(){
		//create new Product object
		Event[] E = new Event[4];

		//set values for E object 
		for( int i = 0; i < 4; i++){
		
			E[i]= new Event();
			//set event name 
			E[i].setName("Event " + (char)(i+65));
		
			//set event description
			E[i].setDesc("Event "+(char)(i+65) + " Description");
		}
		for( int j = 0; j < 4; j++){
		System.out.println(E[j].getName());
		System.out.println(E[j].getDesc());
		} 
		//create new gson object
		Gson gson = new Gson();
		
		/*
		 * define and initialize string variable 
		 * to converted java object; convert java
		 * object using gson.toJson() method
		 */
/*		String json = gson.toJson(E);
		
		//print converted object to console 
		System.out.println("Java object converted to json message: "+ json);
		
		//return json string 
		return json;
	}
	
	public final static class JSONUtils {
		 
		 private static final Gson gson = new Gson();
		  private JSONUtils(){}

		  public static boolean isJSONValid(String JSON_STRING) {
		      try {
		          gson.fromJson(JSON_STRING, Order.class);
		          return true;
		      } catch(com.google.gson.JsonSyntaxException ex) { 
		          return false;
		      }
		  }
		}
	  

}  */