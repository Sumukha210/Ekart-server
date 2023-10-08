import mongoose from 'mongoose';

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE__ROUTE__SRC!);
    console.log('CONNECTED TO DB');
  } catch (error) {
    console.log('FAILED TO CONNECT DB', error);
  }
};
