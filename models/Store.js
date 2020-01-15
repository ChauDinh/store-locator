const mongoose = require("mongoose");

const geocoder = require("../utils/geocoder");

const StoreSchema = new mongoose.Schema({
  storeId: {
    type: String,
    required: [true, "Please add a store ID"],
    unique: true,
    trim: true,
    maxlength: [10, "Store ID must be shorter than 10 characters"]
  },
  address: {
    type: String,
    required: [true, "Please add an address for this store"]
  },
  location: {
    type: {
      type: String,
      enum: ["Point"]
    },
    coordinates: {
      type: [Number],
      index: "2dsphere" // 2dsphere supports queries caculating geometries on an earth-like-sphere
    },
    formattedAddress: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Geocode & create location
StoreSchema.pre("save", async function(next) {
  const location = await geocoder.geocode(this.address);
  this.location = {
    type: "Point",
    coordinates: [location[0].longitude, location[0].latitude],
    formattedAddress: location[0].formattedAddress
  };

  // Don't save address
  this.address = undefined;
  next();
});

module.exports = mongoose.model("Store", StoreSchema, "stores");
