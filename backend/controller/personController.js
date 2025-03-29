const person = require("../models/personModel");

exports.addUser = async (req, res) => {
    try {
        const { name, age, gender, phone } = req.body;
        
        if (!name || !age || !gender || !phone) {
            return res.status(400).json({
                success: false,
                message: "Give complete Data"
            });
        }

        const existingPerson = await person.findOne({ name, age, gender, phone });
        if (existingPerson) {
            return res.status(409).json({ // 409 = Conflict
                success: false,
                message: "User already exists"
            });
        }

        const person1 = await person.create({ name, phone, age, gender });

        return res.status(200).json({
            success: true,
            person: person1,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Internal Server Error"
        });
    }
}

exports.deleteUser = async(req, res) => {
    try {
        const { id } = req.params;
        const person1 = await person.findByIdAndDelete(id);
        if (!person1) {
            return res.status(404).json({
                success: false,
                message: "Person not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Person deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Internal Server error"
        });
    }
}

exports.editUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, age, gender, phone } = req.body;

        const existingPerson = await person.findOne({
            _id: { $ne: id }, 
            name,
            age,
            gender,
            phone
        });

        if (existingPerson) {
            return res.status(400).json({
                success: false,
                message: "Another person with the same details already exists"
            });
        }

        const person1 = await person.findByIdAndUpdate(
            id,
            { name, age, gender, phone },
            { new: true, runValidators: true }
        );

        if (!person1) {
            return res.status(404).json({
                success: false,
                message: "Person not found"
            });
        }

        return res.status(200).json({
            success: true,
            person1
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Internal Server error"
        });
    }
}

exports.showUsers = async (req, res) => {
    try {
        const persons = await person.find();
        return res.status(200).json({
            success: true,
            persons
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Internal Server Error"
        });
    }
}
