import mongoose from 'mongoose';
import denv from 'dotenv';

denv.config();

export default function () {
  mongoose.connect(
    `mongodb+srv://tidis:${process.env.DB_PASS}@shortendb.mnjto.mongodb.net/shorten?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  );
}
