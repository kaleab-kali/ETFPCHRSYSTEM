import { Router } from "express";
import {
  getAllRegions,
  getSubCitiesByRegionId,
  getWoredasByRegionAndSubCityId,
  createRegion,
  addSubCityToRegion,
  addWoredaToSubCity,
  updateRegion,
  updateSubCity,
  updateWoreda,
  deleteRegion,
  deleteSubCity,
  deleteWoreda,
  getAllWoredas,
  getAllSubCities,
} from "../../controllers/dynamicControllers/addressController";
const router = Router();

router.get("/", getAllRegions);
router.get("/:regionId/subcities", getSubCitiesByRegionId);
router.get(
  "/:regionId/subcities/:subId/woredas",
  getWoredasByRegionAndSubCityId
);
router.get("/allWoredas", getAllWoredas);
router.get("/allSubCities", getAllSubCities);
router.post("/", createRegion);
router.post("/:regionId/subcities", addSubCityToRegion);
router.post("/:regionId/subcities/:subId/woredas", addWoredaToSubCity);

router.put("/:regionId", updateRegion);
router.put("/:regionId/subcities/:subId", updateSubCity);
router.put("/:regionId/subcities/:subId/woredas/:woredaId", updateWoreda);

router.delete("/:regionId", deleteRegion);
router.delete("/:regionId/subcities/:subId", deleteSubCity);
router.delete("/:regionId/subcities/:subId/woredas/:woredaId", deleteWoreda);

export default router;