package control.simulator;

import java.util.*;

import control.server.Server;
import model.scenario.*;

public class ScheduleInitialScenarioVariables extends TimerTask{

	public ScheduleInitialScenarioVariables() {
		
	}

	public void run(){
		Server.getInstance().sendInitializationVariables(Scenario.getInstance().scenarioInitializer);
	}
}
