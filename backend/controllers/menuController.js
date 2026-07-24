const Menu = require("../models/Menu");

// Add Menu Item
exports.addMenuItem = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      image,
      available,
    } = req.body;

    // Validate required fields
    if (!name || !description || !price || !category) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const menu = await Menu.create({
      name,
      description,
      price,
      category,
      image,
      available,
    });

    res.status(201).json({
      message: "Menu item added successfully",
      menu,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Menu Items with Search & Category Filter
exports.getAllMenuItems = async (req, res) => {
  try {

    const { search, category } = req.query;

    const filter = {};

    // Search by name
    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }

    // Filter by category
    if (category && category !== "All") {
      filter.category = {
        $regex: `^${category}$`,
        $options: "i",
      };
    }

    const menuItems = await Menu.find(filter);

    res.status(200).json({
      success: true,
      count: menuItems.length,
      menuItems,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Get Menu Item By ID
exports.getMenuItemById = async (req, res) => {
  try {
    const menuItem = await Menu.findById(req.params.id);

    if (!menuItem) {
      return res.status(404).json({
        message: "Menu item not found",
      });
    }

    res.status(200).json(menuItem);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Menu Item
exports.updateMenuItem = async (req, res) => {
  try {
    const menuItem = await Menu.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!menuItem) {
      return res.status(404).json({
        message: "Menu item not found",
      });
    }

    res.status(200).json({
      message: "Menu item updated successfully",
      menuItem,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Menu Item
exports.deleteMenuItem = async (req, res) => {
  try {
    const menuItem = await Menu.findByIdAndDelete(req.params.id);

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Menu item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Search Menu Items by Name
exports.searchMenuItems = async (req, res) => {
  try {
    const { name } = req.query;

    const menuItems = await Menu.find({
      name: { $regex: name, $options: "i" }
    });

    res.status(200).json({
      success: true,
      count: menuItems.length,
      menuItems
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Filter Menu by Category
exports.filterMenuByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const menuItems = await Menu.find({
      category: { $regex: `^${category}$`, $options: "i" }
    });

    res.status(200).json({
      success: true,
      count: menuItems.length,
      menuItems
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


