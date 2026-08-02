const Order = require("../models/Order");
const Menu = require("../models/Menu");

const getDashboardStats = async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments();

        const pendingOrders = await Order.countDocuments({
            status: "Pending",
        });
        const preparingOrders = await Order.countDocuments({
            status: "Preparing",
        });

        const readyOrders = await Order.countDocuments({
            status: "Ready",
        });

        const servedOrders = await Order.countDocuments({
            status: "Served",
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

        // const recentOrders = await Order.find()
        //   .populate("items.menuItem")
        //   .sort({ createdAt: -1 })
        //   .limit(5);
        const recentOrders = await Order.find()
            .populate("items.menuItem", "name")
            .sort({ createdAt: -1 })
            .limit(5)
            .select(
                "customerName customerPhone items totalAmount status specialInstructions createdAt"
            );

        res.status(200).json({
            totalOrders,
            pendingOrders,
            preparingOrders,
            readyOrders,
            servedOrders,
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