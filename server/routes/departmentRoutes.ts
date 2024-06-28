import express from 'express';
import {
  createDepartment,
  getDepartmentById,
  getAllDepartments,
  updateOrAssignDepartmentHead,
  deleteDepartment,
  assignManagers,
  assignManagerToEmployee,
} from '../controllers/departmentController';

import authAdminProtect from '../middleware/adminMiddleware/authAdminMiddleware';
import checkHrStaffRole from '../middleware/adminMiddleware/authHrstaffMiddleware';

const router = express.Router();

router.post('/', authAdminProtect, checkHrStaffRole, createDepartment);
router.get('/:id', authAdminProtect, getDepartmentById);
router.get('/', authAdminProtect, getAllDepartments);
router.put('/department-head/:id', authAdminProtect, checkHrStaffRole, updateOrAssignDepartmentHead);
router.delete('/:id', authAdminProtect, checkHrStaffRole, deleteDepartment);
router.post('/assign-manager', authAdminProtect, checkHrStaffRole, assignManagers);
router.post('/assign-manager-to-employee', authAdminProtect, checkHrStaffRole, assignManagerToEmployee);

export default router;
