package control.simulator;

import java.util.*;
import model.scenario.*;
import model.participant.*;

public class ManualTradeRequest_C2S {

	
	public static Scenario scenarioInstance = Scenario.getInstance(); 
	public static ParticipantProfile profileInstance = ParticipantProfile.getInstance();
	public static Simulator simulatorInstance = Simulator.getInstance();
	
	private String manualTradeType;
	private int quantityManual;
	private String manualProduct;
	public int ProductID;
	public int currentValue;
	public String timeInForce;
	public double requestedPriceManual;
	private String timestamp;
	
	public ManualTradeRequest_C2S() {
		
	}

	public int getProductID(){
		return ProductID;
	}
	
	public String getManualTradeType(){
		return manualTradeType;
	}
	
	public int getQuantity(){
		return quantityManual;
	}
	
	public String getProductName(){
		return manualProduct;
	}
	
	public String getTimeInForce(){
		return timeInForce;
	}
	
	public double getRequestedPrice(){
		return requestedPriceManual;
	}
	
	public String getTimestamp(){
		return timestamp;
	}
	
	public void setProductID(int _ProductID){
		this.ProductID= _ProductID;
	}
	
	public void setProductName(String _manualProduct){
		this.manualProduct= _manualProduct;
	}
	
	public void setManualTradeType(String _manualTradeType){
		this.manualTradeType= _manualTradeType;
	}
	
	public void setQuantity(int _quantityManual){
		this.quantityManual= _quantityManual;
	}
	
	
	public void setTimeInForce(String _timeInForce){
		this.timeInForce= _timeInForce;
	}
	
	public void setRequestedPriceManual(double _requestedPriceManual){
		this.requestedPriceManual = _requestedPriceManual;
	}
	
	public void setTimestamp(String _timestamp){
		this.timestamp = _timestamp;
	}
	
	/*public void updateModel(){
		
		// Ideally this function should be called in the StateUpdateControl function
		
		int productID = (int)ProductID;
		boolean isBuy = true;
		String buy = ""+"buy";
		int quantityChange = 0;
		
		if(manualTradeType.equals(buy)){
			isBuy = true;
			quantityChange = quantityManual;
		} else 	{
				isBuy = false;
				quantityChange = quantityManual;
		}
		
		if(this.requestedPriceManual<scenarioInstance.getCurrentClosePrice(ProductID)){
			simulatorInstance.addToFeebackQueue(new Feedback_S2C("Requested price lower than current price. Specified order at current price", ProductID, 0));
		}

		if(isBuy)
		profileInstance.portfolioInstance.buy(productID, quantityChange);
		else
		profileInstance.portfolioInstance.sell(productID, quantityChange);
		
		
		this.isUpdatePresent = 0;
		
	}*/
	
	
}

