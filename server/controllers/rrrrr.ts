
import cron from "node-cron";
import Employee from "../models/employeeModel";
import LeaveBalanceModel from "../models/leaveBalanceModel";

// Function to update leave balances for the new year
const updateLeaveBalancesForNewYear = async () => {
  console.log("it will update wait")
  try {
    const currentYear = new Date().getFullYear();
    console.log(`Current year: ${currentYear}`);

    // Fetch all employees
    const employees = await Employee.find(
      {},
      "firstName empId leaveBalances lastUpdated employmentDate"
    );

    if (!employees || employees.length === 0) {
      console.log("No employees found");
      return;
    }

    for (const employee of employees) {
      const employmentDate = employee.employmentDate
        ? new Date(employee.employmentDate)
        : new Date();

      // Get the latest year in the leaveBalances array
      const latestBalanceYear = employee.leaveBalances.length
        ? Math.max(...employee.leaveBalances.map((balance) => balance.year))
        : null;

      if (latestBalanceYear && latestBalanceYear >= currentYear) {
        continue; // Skip if already updated for the current year
      }

      const leaveTypes = await LeaveBalanceModel.find(
        {},
        { leaveType: 1, credit: 1, _id: 0 }
      );

      const newBalances = leaveTypes.map((type) => ({
        leaveType: type.leaveType,
        credit: type.credit + (currentYear - employmentDate.getFullYear()),
        used: 0,
        available: type.credit + (currentYear - employmentDate.getFullYear()),
      }));

      employee.leaveBalances.push({ year: currentYear, balances: newBalances });
      employee.lastUpdated = new Date(currentYear, 11, 31); // Set lastUpdated to the end of the current year
      await employee.save();

      console.log(
        `Updated leave balances for employee ${employee.empId} for the year ${currentYear}`
      );
    }

    console.log(
      `Leave balances updated for the new year successfully at ${new Date().toISOString()}`
    );
    console.log("New year leave balance added");
  } catch (error) {
    console.error("Error updating leave balances:", error);
  }
};

// Schedule the task to run at the beginning of each year
// cron.schedule("0 0 1 1 *", updateLeaveBalancesForNewYear);
cron.schedule("*/1 * * * *", updateLeaveBalancesForNewYear);

export default updateLeaveBalancesForNewYear;