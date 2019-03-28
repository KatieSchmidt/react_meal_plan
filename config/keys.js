module.exports = {
  mongoURI: process.env.URI || "mongodb://localhost:27017/mealplan",
  secretOrKey: process.env.SECRET || "secret",
  port: process.env.PORT || 5000
};
