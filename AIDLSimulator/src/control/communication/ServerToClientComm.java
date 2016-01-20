/*package control.communication;

import java.io.IOException;

import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import model.scenario.Event;

import com.google.gson.Gson;

@ServerEndpoint(value="/server_endpoint")
public class ServerToClientComm{
	
	
	
	public void sendEvent(Event E){
		Session session;
		String json_eventstring = convertEventObject(E);
		
		 try {
	            session.getBasicRemote().sendText(json_eventstring);
	        } catch (IOException e) {
	            throw new RuntimeException(e);
	        }
	}
	
	
	public String convertEventObject(Event E){


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
	
	
	
	
	
	
	
	
	
	
	}
	
	
	
	
}  */