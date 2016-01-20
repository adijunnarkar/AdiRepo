package model.scenario;
import java.util.*;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

import control.simulator.*;

@XmlRootElement(name="ProductMarketData", namespace="testconversion.Scenario")  
@XmlAccessorType(XmlAccessType.FIELD)
public class ProductMarketData {
	
	public int productID;
	
	@XmlTransient
	public String tickerSymbol;
	public List<Double> open_price_list = new ArrayList<Double>(); 
	public List<Double> close_price_list = new ArrayList<Double>(); 
	public List<Double> high_price_list = new ArrayList<Double>(); 
	public List<Double> low_price_list = new ArrayList<Double>(); 
//	public List<Integer> temp = new ArrayList<Integer>();
	//private double curr_price;
	
	@XmlTransient
	private double open_price;
	@XmlTransient
	private double close_price;
	@XmlTransient
	private double high_price;
	@XmlTransient
	private double low_price;
	
	public static Simulator simulatorInstance = Simulator.getInstance();
	
	//public Map<Date, Integer> price = new HashMap<Date, Integer>(); 
	//public int price;
//	public ArrayList<Integer> volume = new ArrayList<Integer>(); 
//	public ArrayList<Double> volatility = new ArrayList<Double>(); 
	
	public ProductMarketData(){
		
	}
	
	public ProductMarketData(int _productID, String tick_symbol, List<Double> _open_price_list, List<Double> _close_price_list,List<Double>  _high_price_list,List<Double> _low_price_list/*_price*/){
		this.productID = _productID;
		this.tickerSymbol = tick_symbol;
		//this.price = _price;
		this.open_price_list = _open_price_list;
		this.close_price_list = _close_price_list;
		this.high_price_list = _high_price_list;
		this.low_price_list = _low_price_list;

	}
	
	public int getID(){
		return this.productID;
	}
	
	@XmlElement(name="productID")
	public void setID(int _productID){
		this.productID = _productID;
	}
	
	public String getTickerSymbol(){
		return this.tickerSymbol;
	}
	
	@XmlElement(name="tickerSymbol")
	public void setTickerSymbol(String _tickerSymbol){
		this.tickerSymbol = _tickerSymbol;
	}
	
	public List<Double> getOpenPriceList(){
		return open_price_list;
	}

	public List<Double> getClosePriceList(){
		return close_price_list;
	}
	
	public List<Double> getHighPriceList(){
		return high_price_list;
	}
	
	public List<Double> getLowPriceList(){
		return low_price_list;
	}
	public double getCurrentOpenPrice(){
		return open_price;
	}
	
	public double getCurrentClosePrice(){
		return close_price;
	}
	
	public double getCurrentHighPrice(){
		return high_price;
	}
	
	public double getCurrentLowPrice(){
		return low_price;
	}
	
	public void updatePrices(){
		open_price = open_price_list.get(simulatorInstance.getCurrentTimeStep());
		close_price = close_price_list.get(simulatorInstance.getCurrentTimeStep());
		high_price = high_price_list.get(simulatorInstance.getCurrentTimeStep());
		low_price = low_price_list.get(simulatorInstance.getCurrentTimeStep());
	}
	
	/*public double getCurrentPrice(){

		updateCurrentPrice();
		
		return curr_price;
	}
	
	
	public void updateCurrentPrice(){
		
			curr_price = price.get(simulatorInstance.getCurrentTimeStep());
		
	}*/
	
	
	
}// ProductMarketData