import { Products } from "../../models/product.model.js";
import cloudinary from "../../utils/uploader.js";


export const createProduct = async (req, res) => {
    try {
        const { productName, price, description, category } = req.body;
        console.log(req.file)

        if (!req.file || !productName || !price || !description || !category) { 
            return res.status(400).json({
                success: false,
                message: "All fields and a photo are required",
            });
        }

        
        if (!req.file.mimetype.startsWith('image/')) {
            return res.status(400).json({
                success: false,
                message: "Invalid file type. Only images are allowed.",
            });
        }

     
        const existedProduct = await Products.findOne({ productName });
        if (existedProduct) {
            return res.status(409).json({
                success: false,
                message: "Product with the same name already exists",
            });
        }



        const photoUrl = await cloudinary.v2.uploader.upload(req.file.path, {

            resource_type: "auto"

        });
       



        const product = await Products.create({
            productName,
            price,
            description,
            category,
            photo: photoUrl.secure_url, 
        });

        return res.status(201).json({
            success: true,
            message: "Product is added successfully",
            product
            
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while creating the product",
        });
    }
};










export const getAllProducts = async (req, res) => {
    try {
        const allProducts = await Products.find({})
        return res.status(201).json({
            success: true,
            count: allProducts.length,
            message: "All products are fetched",
            products: allProducts,

        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "an error is occured while fetchning the all products"
        })
    }
}







export const deleteOneProduct = async (req, res) => {
    try {
        const { id } = req.params;



        if (!id) {
            return res.status(400).json({
                success: false,
                message: "id is required"
            });
        }

        const deletedProduct = await Products.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while deleting the product"
        });
    }
};






export const updateProductById = async (req, res) => {

    try {
        const { id } = req.params
        const { productName, price, description } = req.body;


        if (!productName || !price || !description || !id) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }


        const updatedProduct = await Products.findByIdAndUpdate(id, {
            productName,
            price,
            description,
        }, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }


        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product: updatedProduct,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An error occurred while updating the product",
        });
    }
};



export const getProductById = async (req, res) => {
    try {

        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "The id is required"
            });
        }


        const product = await Products.findById(id);

        if (product) {
            return res.status(200).json({
                success: true,
                message: "Product is fetched successfully",
                product
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "Product is not found"
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred"
        });
    }
};


export const getProductByCategory = async (req, res) => {
    try {
        
        const {id} = req.params;
        if (!id || id.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: "Category ID is required and cannot be empty."
            });
        }

        
        const productByCategory = await Products.findById(id);

        if (!productByCategory) {
            return res.status(404).json({
                success: false,
                message: "No products found for the specified category."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Products by category are fetched successfully.",
            productByCategory
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({
            success: false,
            message: "An internal server error occurred."
        });
    }
};






