package control.simulator;

public class MarketDataView_DB {

	
	private String timestamp;
	private String tickerSymbol;
	private String type;
	
	public MarketDataView_DB() {
		
	}
	
	public String getTimestamp(){
		return timestamp;
	}
	
	public void setTimestamp(String _timestamp){
		timestamp = _timestamp;
	}
    
	public String getTickerSymbol(){
		return tickerSymbol;
		
	}

   public void setTickerSymbol(String _tickerSymbol){
	   tickerSymbol = _tickerSymbol;
   }
   
   public String getType(){
		return type;
		
	}

  public void setType(String _type){
	   type = _type;
  }
   
}
