package model.scenario;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

@XmlRootElement(namespace="testscenario.Scenario")  
public class Product {
	@XmlTransient
	public int ProductID = -1;
	private String sector;
	private boolean isAutomated = false;
	private String tickerSymbol = "";
	
	public Product(){
		
	}
	
	public Product (int _ProductID, String _sector, boolean _isAutomated, String _tickerSymbol){
		
		this.ProductID = _ProductID;
		this.sector = _sector;
		this.isAutomated = _isAutomated;
		this.tickerSymbol = _tickerSymbol;
	}
	
	
	public int getProductID(){
		return this.ProductID;
	}
	
	@XmlElement(name="ProductID")
    public void setProductID(int _ProductID){
    	this.ProductID= _ProductID;
    }
	
	public String getProductSector(){
		return this.sector;
	}
	
	@XmlElement(name="sector")
	public void setProductSector(String _sector){
		this.sector = _sector;
	}
	
	public String getTickerSymbol(){
		return this.tickerSymbol;
	}
	
	//@XmlElement
	public void setTickerSymbol(String _tickerSymbol){
		this.tickerSymbol = _tickerSymbol;
	}
	
	public boolean isAutomated(){
		return this.isAutomated;
	}
	
	@XmlElement(name="isAutomated")
	public void setIsAutomated(boolean _isautomated){
		this.isAutomated = _isautomated;
	}
	
}// class Product