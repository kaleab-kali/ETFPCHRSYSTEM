export interface LeaveTypeInfo {
    leaveType: string;
    credit: string;
    _id?: string;

}
export interface LeaveInfo {
  [x: string]: any;
  employeeId?: string;
  from?: Date;
  to?: Date;
  leaveType?: string;
  reason?: string;
  status?: string;
  leaveFlag?: Boolean;
  delegatedTo?: string;
  leaveId?: string;
  employee?: {
    firstName?: string;
    email?: string;
    gender?: string;
    department?: string;
  };
}

export interface ColumnGroupType {
  credit: number;
  used: number;
  available: number;
}

export interface LeaveBalance {
  key?: React.Key;
  empId: string;
  name: string;
  year: string;
  leaveBalances?: [
    {
      year: number;
      balances: [
        {
          leaveType: string;
          credit: number;
          used: number;
          available: number;
        }
      ];
    }
  ];
}