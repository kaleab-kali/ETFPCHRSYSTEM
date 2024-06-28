
export interface Appraisal {
  employeeId?: string;
  fullName?: string;
  currentLevel?: string;
  desiredLevel?: string;
  yearsOfWork?: number;
  positionOfWork?: string;
  previousPromotionDate?: Date;
}

export interface Appraisal2 {
  employeeId?: string;
  currentLevel?: string;
  nextLevel?: string;
  scores?: {
    education?: number;
    service?: number;
    attitude?: number;
    behaviour?: number;
    workEfficiency?: number;
    disciplinary?: number;
  };
  totalScore?: number;
  status?: string;
  employee?: {
    fullName?: string;
    position?: string;
    promotionDate?: Date;
  };
}
