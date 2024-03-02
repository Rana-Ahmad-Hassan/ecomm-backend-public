import { Categories } from "../../models/category.model.js";



export const createCategory = async (req, res) => {
    const name = req.body;
    if (!name) {
        res.status(400).json({
            success: false,
            message: "Category NAme is required"
        })
    }
    try {
        await Categories.create(name)
        return res.status(201).json({
            success: true,
            message: "Category is created successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "An error is ocurred while creating the category"
        })
    }
}


export const getAllCategory = async (req, res) => {
    try {
        const allCategories = await Categories.findOne({})
        if (allCategories) {
            return res.status(201).json({
                success: true,
                message: "All categories are fetched",
                allCategories
            })
        }
        else {
            return res.status(404).json({
                success: false,
                message: "Categories are not fetched"
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(501).json({
            success: false,
            message: "An error is occured"
        })
    }
}


export const deleteCategory = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(404).json({
            success: false,
            message: "id is required"
        })
    }
    try {
        await Categories.findByIdAndDelete(id)
        return res.status(201).json({
            success: false,
            message: "Category is deleted successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "An error is occured"
        })
    }
}


export const updateCategory = async (req, res) => {
    try {

        const { newName } = req.body;
        const { id } = req.params;

        if (!newName) {
            return res.status(400).json({
                success: false,
                message: "New name is required"
            });
        }
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "id is required"
            });
        }


        const updatedCategory = await Categories.findByIdAndUpdate(id, { name: newName }, { new: true });

        if (!updatedCategory) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Category is updated successfully",
            category: updatedCategory
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred"
        });
    }
};
