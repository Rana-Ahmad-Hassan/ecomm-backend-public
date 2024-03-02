import { bestSellerModel } from "../../models/bestSeller.model.js"

export const createBestSeller = async (req, res) => {
    const { productName, price, description, category } = req.body
    const photo = req.file.originalname
    console.log(req.file)
    try {
        if (!productName || !price || !description || !category) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const existingProduct = await bestSellerModel.findOne({ productName })
        if (existingProduct) {
            return res.status(404).json({
                success: false,
                message: "Product is already in the best seller"
            })
        }

        const bestSellerProduct = await bestSellerModel.create({
            productName,
            price,
            description,
            category,
            photo
        })

        if (bestSellerProduct) {
            return res.status(200).json({
                success: true,
                message: "Product is added as a best Seller",
                bestSellerProduct
            })
        } else {
            return res.status(500).json({
                success: false,
                message: "Something wemt wrong"
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            mesage: "An error is occured"
        })
    }

}





export const getAllBestSeller = async (req, res) => {
    try {
        const allBestSellerProducts = await bestSellerModel.find({});

        // Handle empty results
        if (!allBestSellerProducts || allBestSellerProducts.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No best seller products found"
            });
        }

        // Return successful response with data
        return res.status(200).json({
            success: true,
            count: allBestSellerProducts.length,
            message: "All best seller products fetched successfully",
            allBestSellerProducts
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};





export const deleteBestSellerById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({
            success: false,
            message: "Id is required"
        })
    }

    try {
        await bestSellerModel.findByIdAndDelete(id)
        return res.status(200).json({
            success: true,
            message: "The best Seller product is deleted successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "An error is ocuured"
        })
    }
}