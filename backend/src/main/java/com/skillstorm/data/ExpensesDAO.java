package com.skillstorm.data;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArrayList;

import com.mysql.cj.jdbc.result.ResultSetMetaData;
import com.skillstorm.beans.Expenses;
import com.skillstorm.beans.Status;

public class ExpensesDAO {

	private Connection connection;

	public ExpensesDAO() throws SQLException, ClassNotFoundException {
		Class.forName("com.mysql.cj.jdbc.Driver");
		String url = "jdbc:mysql://localhost:3306/expensereimbursement";
		String username = "root";
		String password = "newtable";
		this.connection = DriverManager.getConnection(url, username, password);
	}

	// create
	public Expenses create(Expenses expense) throws SQLException {
		String query = "insert into Expenses(Name, Amount, Reason, Status_id) values (?, ?, ?, ?)";
		PreparedStatement statement = connection.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);
		statement.setString(1, expense.getName());
		statement.setDouble(2, expense.getPrice());
		statement.setString(3, expense.getReason());
		statement.setInt(4, expense.getStatusid());
		statement.executeUpdate();

		ResultSet rs = statement.getGeneratedKeys();

		rs.next();
		int generatedId = rs.getInt(1);
		expense.setId(generatedId);

		return expense;
	}

	// read
	public List<Expenses> read() throws SQLException {
		List<Expenses> expenseValues = new CopyOnWriteArrayList<>();
		String query = "select e.exp_id, e.name, e.amount, e.reason, s.statusid, s.StatusCode from expenses e inner join status s on e.status_id = s.statusid";

		Statement statement = connection.createStatement();
		ResultSet resultSet = statement.executeQuery(query);

		while (resultSet.next()) {

			Expenses row = new Expenses();
			Status status = new Status();
			int id = resultSet.getInt("Exp_ID");
			String name = resultSet.getString("Name");
			double price = resultSet.getDouble("Amount");
			String reason = resultSet.getString("Reason");
			int statusid = resultSet.getInt("statusid");
			String statCode = resultSet.getString("StatusCode");
			

			row.setId(id);
			row.setName(name);
			row.setPrice(price);
			row.setReason(reason);
			row.setStatusid(statusid);
			row.setStatus(new Status(statusid, statCode));

			expenseValues.add(row);
		}
		return expenseValues;
	}

	// update
	public boolean update(Expenses expense, int id) throws SQLException {
		String query = "Update Expenses Set Name = ?, Reason = ?, Amount = ?, Status_ID = ? Where EXP_ID = ?";
		PreparedStatement statement = connection.prepareStatement(query);
		statement.setString(1, expense.getName());
		statement.setString(2, expense.getReason());
		statement.setDouble(3, expense.getPrice());
		statement.setInt(4, expense.getStatusid());
		statement.setInt(5, id);
		return statement.executeUpdate() == 1;
	}

	// delete
	public boolean delete(int id) throws SQLException {
		String query = "Delete from Expenses where EXP_ID = ?";
		PreparedStatement statement = connection.prepareStatement(query);
		statement.setInt(1, id);
		return statement.executeUpdate() == 1;
	}

	// read status
	public List<Status> getStatus() throws SQLException {
		List<Status> status = new CopyOnWriteArrayList<>();
		String query = "select StatusID, StatusCode from Status";

		Statement statement = connection.createStatement();
		ResultSet resultSet = statement.executeQuery(query);

		while (resultSet.next()) {
			Status row = new Status();
			int statID = resultSet.getInt("StatusID");
			String statCode = resultSet.getString("StatusCode");

			row.setStatID(statID);
			row.setStatCode(statCode);

			status.add(row);
		}
		return status;
	}
}
