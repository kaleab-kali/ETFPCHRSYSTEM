import { Request, Response } from "express";
import RegionModel from "../../models/dynamicModel/addressModel"; // Adjust the path as necessary

const getAllRegions = async (req: Request, res: Response) => {
  try {
    const regions = await RegionModel.find();
    console.log("Fetched all regions");
    res.status(200).json({
      message: "Fetched all regions successfully",
      data: regions,
    });
  } catch (error) {
    console.error("Error fetching regions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getSubCitiesByRegionId = async (req: Request, res: Response) => {
  try {
    const { regionId } = req.params;
    const region = await RegionModel.findOne({ regionId });
    if (!region) {
      console.log("Region not found");
      return res.status(404).json({ message: "Region not found" });
    }
    console.log("Fetched subcities for region:", regionId);
    res.status(200).json(region.subCities);
  } catch (error) {
    console.error("Error fetching subcities:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllSubCities = async (req: Request, res: Response) => {
  try {
    const regions = await RegionModel.find();
    const subCities = regions.flatMap((region) => region.subCities);
    console.log("Fetched all subcities");

    // sendMessage("+251940547268", "Fetched all subcities successfully");

    res.status(200).json({
      message: "Fetched all subcities successfully",
      data: subCities,
    });
  } catch (error) {
    console.error("Error fetching subcities:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllWoredas = async (req: Request, res: Response) => {
  try {
    const regions = await RegionModel.find();
    const woredas = regions.flatMap((region) =>
      region.subCities.flatMap((subCity) => subCity.woredas)
    );
    console.log("Fetched all woredas");
    res.status(200).json({
      message: "Fetched all woredas successfully",
      data: woredas,
    });
  } catch (error) {
    console.error("Error fetching woredas:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getWoredasByRegionAndSubCityId = async (req: Request, res: Response) => {
  try {
    const { regionId, subId } = req.params;
    const region = await RegionModel.findOne({ regionId });
    if (!region) {
      console.log("Region not found");
      return res.status(404).json({ message: "Region not found" });
    }
    const subCity = region.subCities.find((subCity) => subCity.subId === subId);
    if (!subCity) {
      console.log("SubCity not found");
      return res.status(404).json({ message: "SubCity not found" });
    }
    console.log("Fetched woredas for subcity:", subId);
    res.status(200).json(subCity.woredas);
  } catch (error) {
    console.error("Error fetching woredas:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createRegion = async (req: Request, res: Response) => {
  try {
    const newRegion = new RegionModel(req.body);
    await newRegion.save();
    console.log("Region added successfully:", newRegion);
    res.status(201).json({
      message: "Region added successfully",
      data: newRegion,
    });
  } catch (error) {
    console.error("Error creating region:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addSubCityToRegion = async (req: Request, res: Response) => {
  try {
    const { regionId } = req.params;
    const { subCityName, subCityAbb } = req.body;
    const region: any = await RegionModel.findOne({ regionId });
    if (!region) {
      console.log("Region not found");
      return res.status(404).json({ message: "Region not found" });
    }
    region.subCities.push({ subCityName, subCityAbb });
    await region.save();
    console.log("SubCity added to region successfully:", region);
    res.status(201).json({
      message: "SubCity added to region successfully",
      data: region,
    });
  } catch (error) {
    console.error("Error adding subcity to region:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addWoredaToSubCity = async (req: Request, res: Response) => {
  try {
    const { regionId, subId } = req.params;
    const { woredaName, woredaAbb } = req.body;
    const region = await RegionModel.findOne({ regionId });
    if (!region) {
      console.log("Region not found");
      return res.status(404).json({ message: "Region not found" });
    }
    const subCity: any = region.subCities.find(
      (subCity) => subCity.subId === subId
    );
    if (!subCity) {
      console.log("SubCity not found");
      return res.status(404).json({ message: "SubCity not found" });
    }
    subCity.woredas.push({ woredaName, woredaAbb });
    await region.save();
    console.log("Woreda added to subcity successfully:", subCity);
    res.status(201).json({
      message: "Woreda added to subcity successfully",
      data: subCity,
    });
  } catch (error) {
    console.error("Error adding woreda to subcity:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateRegion = async (req: Request, res: Response) => {
  try {
    const { regionId } = req.params;
    const { regionAbb } = req.body;
    const updatedRegion = await RegionModel.findOneAndUpdate(
      { regionId },
      { regionAbb },
      { new: true }
    );
    if (!updatedRegion) {
      console.log("Region not found");
      return res.status(404).json({ message: "Region not found" });
    }
    console.log("Region updated successfully:", updatedRegion);
    res.status(200).json({
      message: "Region updated successfully",
      data: updatedRegion,
    });
  } catch (error) {
    console.error("Error updating region:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateSubCity = async (req: Request, res: Response) => {
  try {
    const { regionId, subId } = req.params;
    const { subCityName, subCityAbb } = req.body;
    const region = await RegionModel.findOne({ regionId });
    if (!region) {
      console.log("Region not found");
      return res.status(404).json({ message: "Region not found" });
    }
    const subCity = region.subCities.find((subCity) => subCity.subId === subId);
    if (!subCity) {
      console.log("SubCity not found");
      return res.status(404).json({ message: "SubCity not found" });
    }
    subCity.subCityName = subCityName;
    subCity.subCityAbb = subCityAbb;
    await region.save();
    console.log("SubCity updated successfully:", subCity);
    res.status(200).json({
      message: "SubCity updated successfully",
      data: subCity,
    });
  } catch (error) {
    console.error("Error updating subcity:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const updateWoreda = async (req: Request, res: Response) => {
  try {
    const { regionId, subId, woredaId } = req.params;
    const { woredaName, woredaAbb } = req.body;
    const region = await RegionModel.findOne({ regionId });
    if (!region) {
      console.log("Region not found");
      return res.status(404).json({ message: "Region not found" });
    }
    const subCity = region.subCities.find((subCity) => subCity.subId === subId);
    if (!subCity) {
      console.log("SubCity not found");
      return res.status(404).json({ message: "SubCity not found" });
    }
    const woreda = subCity.woredas.find(
      (woreda) => woreda.woredaId === woredaId
    );
    if (!woreda) {
      console.log("Woreda not found");
      return res.status(404).json({ message: "Woreda not found" });
    }
    woreda.woredaName = woredaName;
    woreda.woredaAbb = woredaAbb;
    await region.save();
    console.log("Woreda updated successfully:", woreda);
    res.status(200).json({
      message: "Woreda updated successfully",
      data: woreda,
    });
  } catch (error) {
    console.error("Error updating woreda:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteRegion = async (req: Request, res: Response) => {
  try {
    const { regionId } = req.params;
    const deletedRegion = await RegionModel.findOneAndDelete({ regionId });
    if (!deletedRegion) {
      console.log("Region not found");
      return res.status(404).json({ message: "Region not found" });
    }
    console.log("Region deleted successfully:", deletedRegion);
    res.status(200).json({ message: "Region deleted successfully" });
  } catch (error) {
    console.error("Error deleting region:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteSubCity = async (req: Request, res: Response) => {
  try {
    const { regionId, subId } = req.params;
    const region = await RegionModel.findOne({ regionId });
    if (!region) {
      console.log("Region not found");
      return res.status(404).json({ message: "Region not found" });
    }
    const subCityIndex = region.subCities.findIndex(
      (subCity) => subCity.subId === subId
    );
    if (subCityIndex === -1) {
      console.log("SubCity not found");
      return res.status(404).json({ message: "SubCity not found" });
    }
    region.subCities.splice(subCityIndex, 1);
    await region.save();
    console.log("SubCity deleted successfully");
    res.status(200).json({ message: "SubCity deleted successfully" });
  } catch (error) {
    console.error("Error deleting subcity:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteWoreda = async (req: Request, res: Response) => {
  try {
    const { regionId, subId, woredaId } = req.params;
    const region = await RegionModel.findOne({ regionId });
    if (!region) {
      console.log("Region not found");
      return res.status(404).json({ message: "Region not found" });
    }
    const subCity = region.subCities.find((subCity) => subCity.subId === subId);
    if (!subCity) {
      console.log("SubCity not found");
      return res.status(404).json({ message: "SubCity not found" });
    }
    const woredaIndex = subCity.woredas.findIndex(
      (woreda) => woreda.woredaId === woredaId
    );
    if (woredaIndex === -1) {
      console.log("Woreda not found");
      return res.status(404).json({ message: "Woreda not found" });
    }
    subCity.woredas.splice(woredaIndex, 1);
    await region.save();
    console.log("Woreda deleted successfully");
    res.status(200).json({ message: "Woreda deleted successfully" });
  } catch (error) {
    console.error("Error deleting woreda:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  createRegion,
  deleteRegion,
  deleteSubCity,
  deleteWoreda,
  updateWoreda,
  updateRegion,
  updateSubCity,
  addSubCityToRegion,
  addWoredaToSubCity,
  getSubCitiesByRegionId,
  getWoredasByRegionAndSubCityId,
  getAllRegions,
  getAllSubCities,
  getAllWoredas,
};