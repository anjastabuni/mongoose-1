const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/movie_db")
  .then((result) => {
    console.log("Connected to mongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  genre: String,
  director: String,
  rating: Number,
});

const Movie = mongoose.model("Movie", movieSchema);

// Movie.findOne({ year: { $gte: 2018 }, genre: "Drama" })
//   .then((result) => {
//     console.log("Query result", result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// Movie.findById("6796f97ef9f5447b1fa1907e")
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// Movie.updateMany({ year: { $lt: 2020 } }, { rating: 8 })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// Movie.findByIdAndUpdate("6796eaa7e874863c4acb2999", { rating: 10 }, { new: true })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// Movie.deleteOne({ title: "Avengers: Infinity War" })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

Movie.findByIdAndDelete("6796f97ef9f5447b1fa1907c")
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });

// const movie = new Movie({
//   title: "Black Panther",
//   genre: "Action",
//   director: "Ryan Coogler",
//   year: 2025,
//   rating: Number,
// });

// Movie.insertMany([
//   {
//     title: "Black Panther",
//     genre: "Action",
//     director: "Ryan Coogler",
//     year: 2018,
//     rating: 7.3,
//   },
//   {
//     title: "Avengers: Infinity War",
//     genre: "Action",
//     director: "Anthony Russo, Joe Russo",
//     year: 2018,
//     rating: 8.4,
//   },
//   {
//     title: "Joker",
//     genre: "Crime",
//     director: "Todd Phillips",
//     year: 2019,
//     rating: 8.4,
//   },
//   {
//     title: "Parasite",
//     genre: "Drama",
//     director: "Bong Joon Ho",
//     year: 2019,
//     rating: 8.6,
//   },
//   {
//     title: "Spider-Man: Into the Spider-Verse",
//     genre: "Animation",
//     director: "Bob Persichetti, Peter Ramsey, Rodney Rothman",
//     year: 2018,
//     rating: 8.4,
//   },
// ])
//   .then((result) => {
//     console.log("it works");
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// movie.save();
// console.log(Movie);
