const path = require("path");

module.exports = {
  async rewrites() {
    return [
      {
        source: "/:path",
        destination: "/api/resolver/:path",
      },
    ];
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};