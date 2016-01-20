package model.scenario;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(namespace="testconversion.Scenario")  
public class Event_S2C{
	
		//class properties	
		private String name;
		private String description;
		private int ProductID;
		private String tickerSymbol;
		private int dispatchTime;
		private int duration; // for point events this is irrelevant
		boolean isPositive = true;
		
		public Event_S2C(){
			
		}
		
		public Event_S2C(String _name, String _desc, String _tickerSymbol, int _dispatchTime, int _ProductID){
			 this.name = _name;
			 this.description = _desc;
			 this.tickerSymbol = _tickerSymbol;
			 this.dispatchTime = _dispatchTime;
			 this.ProductID = _ProductID;
		}
	
		//class methods declaration	
		public String getName(){
			return name;
		}
		
		public void setName(String name){
			this.name = name;
		}
	
		public String getTickerSymbol(){
			return tickerSymbol;
		}
		
		public void setTickerSymbol(String _tickerSymbol){
			this.tickerSymbol = _tickerSymbol;
		}
		
		public String getDesc(){
			return description;
		}
		
		@XmlElement(name="description")
		public void setDesc(String description){
			this.description = description;
		}
	

		
	/*	public int getDuration(){
			return duration;
		}*/
	
	    public int getDispatchTime(){
	    	return dispatchTime;
	    }
	    
	    public void setDispatchTime(int _dispatchTime){
	    	this.dispatchTime= _dispatchTime;
	    }
	    
	    public int getProductID(){
	    	return ProductID;
	    }

	    @XmlElement(name="ProductID")
	    public void setProductID(int _ProductID){
	    	this.ProductID= _ProductID;
	    }


}