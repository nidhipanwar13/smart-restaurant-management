const Order = require("../models/Order");
const Menu = require("../models/Menu");

const getDashboardStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();

    const pendingOrders = await Order.countDocuments({
      status: "Pending",
    });

    const totalMenuItems = await Menu.countDocuments();

    const revenueResult = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
    ]);

    const totalRevenue =
      revenueResult.length > 0
        ? revenueResult[0].totalRevenue
        : 0;

    const recentOrders = await Order.find()
      .populate("items.menuItem")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      totalOrders,
      pendingOrders,
      totalMenuItems,
      totalRevenue,
      recentOrders,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  getDashboardStats,
};