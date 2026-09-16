import Resource from "../models/resourceModel.js";

export const getResources = async (req, res) => {
  try {
    const { search, category, tags, sort } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { summary: { $regex: search, $options: "i" } },
      ];
    }

    if (category) {
      query.category = category;
    }

    if (tags) {
      const tagArray = tags.split(",").map((tag) => tag.toLowerCase().trim());
      query.tags = { $in: tagArray };
    }

    let sortOption = { createdAt: -1 };
    if (sort === "Most Upvoted") {
      sortOption = { upvotes: -1, createdAt: -1 };
    }

    const resources = await Resource.find(query).sort(sortOption);
    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createResource = async (req, res) => {
  try {
    const newResource = await Resource.create(req.body);
    res.status(201).json(newResource);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateResource = async (req, res) => {
  try {
    const updatedResource = await Resource.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!updatedResource)
      return res.status(404).json({ message: "Không tìm thấy tài nguyên" });
    res.status(200).json(updatedResource);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteResource = async (req, res) => {
  try {
    const deletedResource = await Resource.findByIdAndDelete(req.params.id);
    if (!deletedResource)
      return res.status(404).json({ message: "Không tìm thấy tài nguyên" });
    res.status(200).json({ message: "Xóa thành công" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const upvoteResource = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndUpdate(
      req.params.id,
      { $inc: { upvotes: 1 } },
      { new: true },
    );
    if (!resource)
      return res.status(404).json({ message: "Không tìm thấy tài nguyên" });
    res.status(200).json({ upvotes: resource.upvotes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
