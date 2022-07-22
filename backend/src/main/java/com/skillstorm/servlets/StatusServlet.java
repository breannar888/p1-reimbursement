package com.skillstorm.servlets;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.skillstorm.data.ExpensesDAO;

@WebServlet(urlPatterns = "/manage")
public class StatusServlet extends HttpServlet {

	private ExpensesDAO dao;

	@Override
	public void init() throws ServletException {
		try {
			dao = new ExpensesDAO();
		} catch (SQLException | ClassNotFoundException e) {
			e.printStackTrace();
		}
	}

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

		try {
			resp.setContentType("application/json");
			resp.getWriter().print(new ObjectMapper().writeValueAsString(dao.getStatus()));
		} catch (JsonProcessingException | SQLException e) {
			e.printStackTrace();
		}
	}

}
