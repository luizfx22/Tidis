import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

console.log(process.env.DB_PASS);

export default function () {
  mongoose.connect(
    `mongodb+srv://tidisDEV:${process.env.DB_PASS}@shortendb.mnjto.mongodb.net/shorten?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  );
}
