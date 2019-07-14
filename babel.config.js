const presets = [
  [
    "@babel/preset-env",
    {
      targets: {
        firefox: "60",
        chrome: "67"
      }
    }
  ],
  // "@babel/typescript",
  "@babel/preset-typescript"
  // ["@babel/env", { modules: false }]
];

const plugins = ["@babel/plugin-proposal-class-properties"];

module.exports = {
  presets,
  plugins
};
