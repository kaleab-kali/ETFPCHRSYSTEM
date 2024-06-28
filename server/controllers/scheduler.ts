import cron from "node-cron";
import Employee from "../models/employeeModel";
import LeaveBalanceModel from "../models/leaveBalanceModel";

// Function to update leave balances for the new year
const updateLeaveBalancesForNewYear = async (): Promise<void> => {
  try {
    const currentYear = new Date().getFullYear();

    // Fetch all employees
    const employees = await Employee.find({});

    if (!employees || employees.length === 0) {
      console.log("No employees found");
      return;
    }

    // Process each employee's leave balances
    for (const employee of employees) {
      // Check if employmentDate is defined
      if (!employee.employmentDate) {
        console.log(
          `Employee ${employee.empId} does not have an employment date`
        );
        continue;
      }

      // Find the latest year in the leave balances
      const latestLeaveBalance = employee.leaveBalances.reduce(
        (latest: any, balance: any) =>
          balance.year > latest.year ? balance : latest,
        { year: 0 }
      );

      // Increment year for testing purposes
      const newYear: any = latestLeaveBalance.year + 1;

      // Calculate the new year's leave balances
      const employmentYear = new Date(employee.employmentDate).getFullYear();
      const yearOffset: any = newYear - employmentYear;
      const leaveTypes = await LeaveBalanceModel.find(
        {},
        { leaveType: 1, credit: 1, _id: 0 }
      );

      const newBalances = leaveTypes.map((type) => {
        const previousLeave = latestLeaveBalance.balances.find(
          (balance: any) => balance.leaveType === type.leaveType
        );

        const previousAvailable = previousLeave ? previousLeave.available : 0;

        // Only add previousAvailable if the new year is an odd number from the employment year
        const includeAvailable = (newYear - employmentYear) % 2 !== 0;

        const newCredit: any =
          type.credit +
          yearOffset +
          (type.leaveType === "annual" && includeAvailable
            ? previousAvailable
            : 0);

        return {
          leaveType: type.leaveType,
          credit: newCredit,
          used: 0,
          available: newCredit,
        };
      });

      // Add the new year's leave balances to the employee's record
      employee.leaveBalances.push({
        year: newYear,
        balances: newBalances,
      });

      // Update the lastUpdated field
      employee.lastUpdated = new Date();

      // Save the updated employee record
      await employee.save();

      console.log(
        `Employee ${employee.empId}'s leave balances updated for the year ${newYear}`
      );
    }

    console.log("Leave balances for the new year updated successfully");
  } catch (error) {
    console.error("Error updating leave balances for the new year:", error);
  }
};
cron.schedule("0 0 1 1 *", updateLeaveBalancesForNewYear);

// Schedule the task to run every minute for testing
// cron.schedule("*/1 * * * *", updateLeaveBalancesForNewYear);

export default updateLeaveBalancesForNewYear;