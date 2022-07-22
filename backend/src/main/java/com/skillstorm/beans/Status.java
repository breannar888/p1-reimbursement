package com.skillstorm.beans;

import java.util.HashSet;
import java.util.Set;

public class Status {

	private int statID;
	private String statCode;
	
	public Status() {
		super();
	}

	public Status(int statID, String statCode) {
		super();
		this.statID = statID;
		this.statCode = statCode;
	}

	public Status(int statID) {
		super();
		this.statID = statID;
	}

	@Override
	public String toString() {
		return "Status [statID=" + statID + ", statCode=" + statCode + "]";
	}

	public int getStatID() {
		return statID;
	}

	public void setStatID(int statID) {
		this.statID = statID;
	}

	public String getStatCode() {
		return statCode;
	}

	public void setStatCode(String statCode) {
		this.statCode = statCode;
	}
	
	
	
}
