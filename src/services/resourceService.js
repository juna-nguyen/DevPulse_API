import Resource from "../models/resourceModel.js";

export const createResource = async (data) => {
  return await Resource.create(data);
};

export const getAllResources = async () => {
  return await Resource.find({});
};
