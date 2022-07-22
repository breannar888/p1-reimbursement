package com.skillstorm.servlets;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Set;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.exc.StreamReadException;
import com.fasterxml.jackson.databind.DatabindException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.skillstorm.beans.Expenses;
import com.skillstorm.data.ExpensesDAO;

@WebServlet(urlPatterns = "/expenses")
public class ServletController extends HttpServlet {

	private ExpensesDAO dao;

	@Override
	public void init() throws ServletException {
		try {
			dao = new ExpensesDAO();
		} catch (SQLException | ClassNotFoundException e) {
			e.printStackTrace();
		}
	}

	//read
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
		try {
			System.out.println("connected");
			String param = req.getParameter("id");
			resp.setContentType("application/json");
			if (param != null) {
				int index = Integer.parseInt(param);
				System.out.println(index);
				resp.getWriter().print(new ObjectMapper().writeValueAsString(dao.read().get(index)));
			} else {
				resp.getWriter().print(new ObjectMapper().writeValueAsString(dao.read()));
			}
		} catch (JsonProcessingException | SQLException e) {
			e.printStackTrace();
		}
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

		String param = req.getParameter("id");
		
		// update
		if (param != null) {
			int id = Integer.parseInt(param);
			try {
				dao.update(new ObjectMapper().readValue(req.getInputStream(), Expenses.class), id);
			} catch (SQLException e) {
				e.printStackTrace();
			}
		} else {
			// create
			try {
				dao.create(new ObjectMapper().readValue(req.getInputStream(), Expenses.class));
				System.out.println("created");
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}

	
	//delete
	@Override
	protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

		String param = req.getParameter("id");
		int index = Integer.parseInt(param);
		if (param != null) {
			try {
				dao.delete(index);
			} catch ( SQLException e) {
				e.printStackTrace();
			}
		}
	}

}
