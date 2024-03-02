import dotenv from "dotenv"
import { connection } from "./src/db/db.js"
import { app } from "./app.js"


dotenv.config()



connection()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Sever is running on PORT", process.env.PORT)
        })
    })
    .catch((error) => {
        console.log("Server is not starting", error)
        throw error
    })