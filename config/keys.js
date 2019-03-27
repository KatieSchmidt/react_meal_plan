module.exports = {
  mongoURI: process.env.URI || "mongodb://localhost:27017/mealplan",
  secretOrKey: process.env.PORT || "secret",
  port: process.env.PORT || 5000
};
