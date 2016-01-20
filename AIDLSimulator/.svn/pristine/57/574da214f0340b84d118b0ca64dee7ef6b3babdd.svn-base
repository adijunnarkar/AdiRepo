package control.simulator;

import model.scenario.*;

import java.util.ArrayList;
import java.util.List;
import java.util.TimerTask;

import control.server.Server;

public class MarketDataUpdate extends TimerTask{


public Server server = Server.getInstance();

public static Scenario experimentalScenario = Scenario.getInstance();
	
//public ProductCurrentPrice dataObj;
//public List<ProductMarketData> marketData = new ArrayList<ProductMarketData>();
public ArrayList<ProductCurrentPrice_S2C> currentPriceData= new ArrayList<ProductCurrentPrice_S2C>();
//public List<ProductCurrentPrice> marketData = new ArrayList<ProductCurrentPrice>();	
	
	public MarketDataUpdate(){
		
	}
	
	public MarketDataUpdate(ProductCurrentPrice_S2C _dataObj){
		
	//	this.dataObj = _dataObj;
	}	
	
	
	public void run(){
		
		for (int j = 0; j < experimentalScenario.marketDataByProduct.size(); ++j){
		//	this.marketData.get(j).setCurrentPrice();
			System.out.println("j=" + j);
		}
		
		//double[] curr_price = new double[experimentalScenario.marketDataByProduct.size()];
		double[] curr_open_price = new double[experimentalScenario.marketDataByProduct.size()];
		double[] curr_close_price = new double[experimentalScenario.marketDataByProduct.size()];
		double[] curr_high_price = new double[experimentalScenario.marketDataByProduct.size()];
		double[] curr_low_price = new double[experimentalScenario.marketDataByProduct.size()];
		String[] tickSym = new String[experimentalScenario.marketDataByProduct.size()];
		int[] prod_id = new int[experimentalScenario.marketDataByProduct.size()];
		
		if(!currentPriceData.isEmpty()){
			currentPriceData.clear();
		}
		
		for (int j = 0; j < this.experimentalScenario.marketDataByProduct.size(); j++){
				
		//	experimentalScenario.marketDataByProduct.get(j).updateCurrentPrice();
			experimentalScenario.marketDataByProduct.get(j).updatePrices();
			//curr_price[j] = experimentalScenario.marketDataByProduct.get(j).getCurrentPrice();	
			curr_open_price[j] = experimentalScenario.marketDataByProduct.get(j).getCurrentOpenPrice();
			curr_close_price[j] = experimentalScenario.marketDataByProduct.get(j).getCurrentClosePrice();
			curr_high_price[j] = experimentalScenario.marketDataByProduct.get(j).getCurrentHighPrice();
			curr_low_price[j] = experimentalScenario.marketDataByProduct.get(j).getCurrentLowPrice();
			tickSym[j] = experimentalScenario.marketDataByProduct.get(j).getTickerSymbol();
			prod_id[j] = experimentalScenario.marketDataByProduct.get(j).getID();
			ProductCurrentPrice_S2C obj = new ProductCurrentPrice_S2C(prod_id[j], tickSym[j], curr_open_price[j], curr_close_price[j], curr_high_price[j], curr_low_price[j]);
			currentPriceData.add(obj);
			
		}
		
		// This section will call the Server class to send the event
		server.sendMarketData(currentPriceData);
		
		for(int i=0; i< currentPriceData.size(); ++i){
			System.out.println("Sending price data: "+"Product ID: "+ currentPriceData.get(i).getID()+ "Product Name: "+ currentPriceData.get(i).getTickerSymbol()+ " Open Price: "+ currentPriceData.get(i).curr_open_price+ " Close Price: "+ currentPriceData.get(i).curr_close_price+ " High Price: "+ currentPriceData.get(i).curr_high_price+ " Low Price: "+ currentPriceData.get(i).curr_low_price);
		}	
	}
	
	
}
