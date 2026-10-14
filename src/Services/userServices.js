//src/Services/userServices.js
import user from "../models/user.js";
import { Create, GetAllWithFilter } from "../Controller/commonController.js";

const UserCreate = async (req, res) => {

    try {
        const newUser = await Create(req, req, user)
        if (!newUser) {
            res.status(400).json({ message: "succes", data: [] })
        }
        return res.status(200).json({ message: "succes", data: newUser })

    } catch (error) {
        return res.status(500).json(error)
    }
};
const UserFilter = async (req, res) => {
    try {
        const users = await GetAllWithFilter(req, res, user)
        if (!users) {
            res.status(400).json({ message: "succes", data: [] })
        }
        return res.status(200).json({ message: "succes", data: users })

    } catch (error) {
        return res.status(500).json(error)
    }
};

export default { UserCreate, UserFilter }