import mongoose from 'mongoose';

export default function () {
  mongoose.connect(
    `mongodb+srv://tidisDEV:${process.env.DB_PASS}@shortendb.mnjto.mongodb.net/shorten?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  );
}
