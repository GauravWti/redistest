const  mongoose=require('mongoose');

const refreshTokenSchema = new mongoose.Schema({
    refreshToken: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    userId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  });

  const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);

  module.exports={RefreshToken};