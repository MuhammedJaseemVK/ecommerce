const sellerModel = require('../models/seller');
const userModel = require('../models/user');

const getAllSellersController = async (req, res) => {
    try {
        const sellers = await sellerModel.find({});
        res.status(200).send({ success: true, message: "Sellers data", data: sellers });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Error fetching sellers data", error });
    }
}

const getAllUsersController = async (req, res) => {
    try {
        const users = await userModel.find({});
        res.status(200).send({ success: true, message: "Users data", data: users });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Error fetching users data", error });
    }
}

const changeAccountStatusController = async (req, res) => {
    try {
        const { sellerId, status } = req.body;
        const seller = await sellerModel.findByIdAndUpdate( sellerId , { status });
        const user = await userModel.findOne({ _id: seller.userId });

        const notification = user.notification;
        notification.push({
            type: `seller account request approved`,
            message: `Your seller account request has ${status}`,
            onClickPath: '/notification'
        });

        user.role = status === 'approved' ? 'seller' : 'user'
        await user.save();
        
        res.status(201).send({ success: true, message: "Account status updated", data: seller })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Error changing account status", error });
    }
}


module.exports = {
    getAllSellersController,
    getAllUsersController,
    changeAccountStatusController
}