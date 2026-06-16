const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  // Don't ship source maps to production (smaller deploy, source stays private).
  productionSourceMap: false,
});
