package jdbc;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.sql.SQLException;
import java.util.List;
import java.util.Set;

import org.junit.BeforeClass;
import org.junit.Test;

import com.skillstorm.beans.Expenses;
import com.skillstorm.beans.Status;
import com.skillstorm.data.ExpensesDAO;

public class ExpenseDAOTest {

	static ExpensesDAO dao;

	@BeforeClass
	public static void setup() throws ClassNotFoundException {
		try {
			dao = new ExpensesDAO();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	
	@Test
	public void create() {
		try {
			Expenses object = dao.create(new Expenses("test", 40.5, "target trip", 2));
			System.out.println(object);
		} catch (SQLException e) {
			e.printStackTrace();
			fail();
		}
	}

	
	@Test
	public void read() {
		try {
			List<Expenses> expenses = dao.read();
			assertTrue(!expenses.isEmpty());
			System.out.println(expenses);
		} catch (SQLException e) {
			e.printStackTrace();
			fail();
		}
	}
	
	
	@Test
	public void getStatus() {
		try {
			List<Status> status = dao.getStatus();
			assertTrue(!status.isEmpty());
			System.out.println(status);
		} catch (SQLException e) {
			e.printStackTrace();
			fail();
		}
	}

	
	@Test
	public void update() {
		try {
			dao.update(new Expenses(2, "Todd", 0, null, 0), 4);
		} catch (SQLException e) {

			e.printStackTrace();
			fail();
		}
	}
	

	
	@Test
	public void delete() {
		try {
			boolean deleted = dao.delete(2);
			assertTrue(deleted);
			System.out.println("deleted");
		} catch (SQLException e) {

			e.printStackTrace();
			fail();
		}

	}

}
