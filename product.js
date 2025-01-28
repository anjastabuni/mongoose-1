const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/ShopApp")
  .then((result) => {
    console.log("Connected to mongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  color: {
    type: String,
    required: true,
  },
  size: [
    {
      type: String,
      required: true,
    },
  ],
  description: {
    type: String,
    required: true,
    maxLength: 150,
  },
  condition: {
    type: String,
    enum: ["baru", "bekas"],
    default: "baru",
  },
  stock: {
    type: Number,
    required: true,
    min: [0, "Nilai tidak boleh minus"],
  },
  availability: {
    online: {
      type: Boolean,
      required: true,
    },
    offline: {
      type: Boolean,
      required: true,
    },
  },
});

productSchema.methods.outStock = function () {
  this.stock = 0;
  this.availability.online = false;
  this.availability.offline = false;
  return this.save();
};

productSchema.statics.closeStore = function () {
  return this.updateMany(
    {},
    {
      stock: 0,
      "availability.online": false,
      "availability.offline": false,
    }
  );
};

const Product = mongoose.model("Product", productSchema);

const changeStock = async (id) => {
  const foundProduct = await Product.findById(id);
  await foundProduct.outStock();
  console.log("Berhasil diubah");
};

Product.closeStore()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });

// changeStock("67983cc9c8e3049f9d4c01d9");

// const product = new Product({
//   name: "Kemeja Flanel",
//   brand: "Hollister",
//   price: 750000,
//   color: "biru muda",
//   size: ["S", "M", "L"],
//   description: "Kemeja flanel dengan warna yang cerah, terbuat dari bahan flanel yang nyaman dan berkualitas tinggi.",
//   condition: "baru",
//   stock: 25,
//   availability: {
//     online: true,
//     offline: true,
//   },
// });
// product
//   .save()
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// update
// Product.findOneAndUpdate(
//   { name: "Kemeja Flanel" },
//   {
//     name: "Kemeja Flanel",
//     brand: "Hollister",
//     price: -1500000,
//     color: "biru muda",
//     size: ["S", "M", "L"],
//     description: "Kemeja flanel dengan warna yang cerah, terbuat dari bahan flanel yang nyaman dan berkualitas tinggi.",
//     condition: "baru",
//     stock: -10,
//     availability: {
//       online: true,
//       offline: true,
//     },
//   },
//   { new: true, runValidators: true }
// )
// .then((result) => {
//   console.log(result);
// })
// .catch((err) => {
//   console.log(err.errors.stock.properties.message);
// });
