package com.skillstorm.beans;

public class Expenses {

	private int id;
	private String name;
	private double amount;
	private String reason;
	private int status_id;
	
	//store in object
	private Status status;

	public Expenses() {
	}

	public Expenses(String name, double amount, String reason, int status_id) {
		super();
		this.name = name;
		this.amount = amount;
		this.reason = reason;
		this.status_id = status_id;
	}

	public Expenses(int id, String name, double amount, String reason, int status_id) {
		super();
		this.id = id;
		this.name = name;
		this.amount = amount;
		this.reason = reason;
		this.status_id = status_id;
	}

	public Expenses(int id, String name, double amount, String reason, int status_id, Status status) {
		super();
		this.id = id;
		this.name = name;
		this.amount = amount;
		this.reason = reason;
		this.status_id = status_id;
		this.status = status;
	}
	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "Expenses [id=" + id + ", name=" + name + ", amount=" + amount + ", reason=" + reason + ", status_id="
				+ status_id + ", status=" + status + "]";
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public double getPrice() {
		return amount;
	}

	public void setPrice(double price) {
		this.amount = price;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public int getStatusid() {
		return status_id;
	}

	public void setStatusid(int status_id) {
		this.status_id = status_id;
	}

}
