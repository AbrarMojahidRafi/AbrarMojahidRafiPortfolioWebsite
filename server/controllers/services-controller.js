const { validateServiceModel, ServiceModel } = require("../models/services"); 

const service = async (req, res) => {
    try {
        const response = await ServiceModel.find({});
        if (!response) {
            return res.status(404).json({ msg: "No services found" });
        }
        // console.log(response);
        
        return res.status(200).json({msg: response});
    } catch (error) {
        console.error("Error in service controller:", error);
    }
}

module.exports = { service };