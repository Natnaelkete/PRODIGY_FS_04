import mongoose from "mongoose";

const connectDB = async (retries = 5, delay = 5000) => {
  while (retries > 0) {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URL);
      console.log(`MongoDB Connected Successfully`);
      break;
    } catch (error) {
      console.error(`Error: ${error.message}`);
      retries -= 1;
      console.log(`Retries left: ${retries}`);

      if (retries === 0) {
        console.error("Max retries reached. Exiting.");
        process.exit(1);
      } else {
        console.log(`Retrying in ${delay / 1000} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }
};

export default connectDB;
