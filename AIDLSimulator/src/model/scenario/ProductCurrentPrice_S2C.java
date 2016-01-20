package model.scenario;


public class ProductCurrentPrice_S2C {

	public int productID;
	public String tickerSymbol;
	public double curr_open_price;
	public double curr_close_price;
	public double curr_high_price;
	public double curr_low_price;
	
	public  ProductCurrentPrice_S2C (int p_id, String tick_symbol, double _curr_open_price, double _curr_close_price, double _curr_high_price, double _curr_low_price){
		this.productID = p_id;
		this.tickerSymbol = tick_symbol;
		this.curr_open_price = _curr_open_price;
		this.curr_close_price = _curr_close_price;
		this.curr_high_price = _curr_high_price;
		this.curr_low_price = _curr_low_price;

	}
	
	public int getID(){
		return this.productID;
	}
	
	public String getTickerSymbol(){
		return this.tickerSymbol;
	}
	
}
