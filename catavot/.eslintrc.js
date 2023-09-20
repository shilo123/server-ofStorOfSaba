module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential"],
  parserOptions: {
    parser: "@babel/eslint-parser",
  },
  rules: {
    "no-unused-vars": "off",
    "unused-imports/no-unused-imports": "off",
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "prettier/prettier": "off",
  },
};
