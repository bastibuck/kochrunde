module.exports = {
  extends: "next/core-web-vitals",
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
    eqeqeq: "error",
  },
};
