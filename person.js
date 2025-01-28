const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/ShopApp")
  .then((result) => {
    console.log("Connected to mongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const personSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
});

personSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

personSchema.pre("save", async function () {
  this.firstName = "Anjas";
  this.lastName = "Tabuni";
  console.log("persiapan menyimpan data");
});

personSchema.post("save", async function () {
  console.log("berhasil menyimpan data");
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  firstName: "ulla",
  lastName: "Tabuni",
});

console.log(person)

person
  .save()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });
