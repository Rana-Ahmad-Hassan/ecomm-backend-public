import mongoose from "mongoose";


export const connection = async () => {
    try {
        const connec = await mongoose.connect(process.env.MONGO_URL)
        console.log("Connection successfull with database", connec.connection.host)
    } catch (error) {
        console.log("An error is occured while connectiog to the dataBase", error)
    }
}