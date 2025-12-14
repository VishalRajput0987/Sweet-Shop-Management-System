// module.exports = {
//   testEnvironment: "node",
//   testMatch: ["**/tests/**/*.test.js"]
// };


// sweet-shop-backend/jest.config.js

module.exports = {
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.js"],
  // ADD THIS LINE
  setupFiles: ["./jest.setup.js"], 
};

