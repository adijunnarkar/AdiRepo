package model.participant;

import java.util.*;

import model.scenario.*;

public class Portfolio{
	
	
	private static double accountBalance = 0.0;
	
	public Scenario scenarioInstance = Scenario.getInstance();  
	
	private static Portfolio portfolioInstance = null;
	
	public ArrayList<Asset> assetList = new ArrayList<Asset>();
	
	private Portfolio(){
		
		
	}
	
	public static Portfolio getInstance(){
		
		if(portfolioInstance==null){
		
			portfolioInstance = new Portfolio();
		}
	
		return portfolioInstance;
	
	}// getInstance()
	
	private void updateAssetQuantityHeld(int _productID, int _quantity_change){
		
		for(int k = 0; k < assetList.size(); ++k){
			
			
			if(assetList.get(k).getProductID() == _productID){
				assetList.get(k).updateQuantityHeld(_quantity_change);
				break;
			}
			
			
		}//k
		
	}
	
	private void updateAssetValue(int _productID){
		
		for(int k = 0; k < assetList.size(); ++k){
			
			
			if(assetList.get(k).getProductID() == _productID){
				assetList.get(k).updateAssetCurrentValue();
				break;
			}
			
			
		}//k
		
	}//updateAssetValue
	
	
	private void changeAccountBalance(double change){
		accountBalance = Math.floor((accountBalance + change)*100 +0.5)/100;

	}
	
	public int getAssetQuantityHeld(int _productID){
		
		for(int k = 0; k < assetList.size(); ++k){
			
			if(assetList.get(k).getProductID() ==_productID){
				return assetList.get(k).getQuantityHeld();
			}
			
			
		}//k
		
		return 0;
		
	}	
	
	public double getAssetCurrentValue(int _productID){
		
			for(int k = 0; k < assetList.size(); ++k){
				
				
				if(assetList.get(k).getProductID() ==_productID){
					return assetList.get(k).getAssetCurrentValue();
				}
				
				
			}//k
			
			return 0.0;
		
	} // getAssetCurrentValue
		
	public void reevaluateAssetsAfterTimestep(){
		
		for(int k = 0; k < assetList.size(); ++k){
			
			updateAssetValue(assetList.get(k).getProductID()); 

		
		}// k loop
	
	}
	
	public void loadPreexistingAsset (int ProductID, String tickerSymbol, int quantity) {
		// This loads share numbers considered as apriori conditions for a given scenario 
		
		double currPrice = 0.0;
		Asset AssetTemp;
		
	//	currPrice = scenarioInstance.getCurrentProductPrice(ProductID);
			

		AssetTemp = new Asset(ProductID, tickerSymbol, quantity);
		AssetTemp.updateAssetCurrentValue();
		this.assetList.add(AssetTemp);
		
		System.out.println("CurrPrice: "+ currPrice);
		System.out.println("Asset Value: "+AssetTemp.getAssetCurrentValue());
		
		
	}// loadPreexistingAsset
	
	public void setAccountBalance(double acctBalance){
		 accountBalance = acctBalance;	
	}
	
	
	public static double getAccountBalance(){
		return accountBalance;
		
	}
	
	
	public void buy(int _ProductID, int _quantity){
		
		double totalPrice= 0.0;
		
		totalPrice = scenarioInstance.getCurrentClosePrice(_ProductID) * _quantity;
		
		changeAccountBalance(-totalPrice);
		
		updateAssetQuantityHeld(_ProductID, _quantity);
		updateAssetValue(_ProductID);
		
		
	}// buy
	
	
	public void sell(int _ProductID, int _quantity){
		
		double totalPrice= 0.0;
		
		totalPrice = Math.abs( scenarioInstance.getCurrentClosePrice(_ProductID) * _quantity);
		changeAccountBalance(totalPrice);
		
		updateAssetQuantityHeld(_ProductID,-_quantity);
		updateAssetValue(_ProductID);
		
	}//sell
	
	
}//Portfolio