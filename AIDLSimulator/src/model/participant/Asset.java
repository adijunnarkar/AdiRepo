package model.participant;

import model.scenario.Scenario;

public class Asset {

	private int ProductID;
	private String tickerSymbol;
	private int quantityHeld;
	public double assetCurrentValue;

	
	public static Scenario scenarioInstance = Scenario.getInstance();

	public Asset(){
		
	}
	
	public Asset(int _ProductID, String _tickerSymbol, int _quantityHeld){
		
		this.ProductID = _ProductID;
		this.tickerSymbol = _tickerSymbol;
		this.quantityHeld = _quantityHeld;
	
	}
	
	public int getProductID(){
		return this.ProductID;
		
	}
	
	public String getTickerSymbol(){
		return this.tickerSymbol;
	}
	
	public double getAssetCurrentValue(){
		
	//	this.updateAssetCurrentValue();
			
		return this.assetCurrentValue;
		
	}// updateAssetCurrentValue
	
	
	public void updateAssetCurrentValue(){
		
		this.assetCurrentValue = (double)(Math.floor(this.quantityHeld * this._getCurrentClosePrice()  * 100 + 0.5)/100);
	
	}
	
	
	public void updateQuantityHeld (int quantityChange){
		
		this.quantityHeld = this.quantityHeld + quantityChange;
		
	}//updateQuantityHeld
	
	public double _getCurrentClosePrice(){
		
		double productPrice = 0.0;
		
		productPrice = scenarioInstance.getCurrentClosePrice(this.ProductID);
		
		return productPrice;
		
	}// _getCurrentClosePrice
	
	/*public double _getCurrentProductPrice(){
		
		double productPrice = 0.0;
		
		productPrice = scenarioInstance.getCurrentProductPrice(this.ProductID);
		
		return productPrice;
		
	}// getCurrentValue*/
	
	
	public int getQuantityHeld(){
		
		return this.quantityHeld;
		
	}// getCurrentValue
	
	
}//Asset
