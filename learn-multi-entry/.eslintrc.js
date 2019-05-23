module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard', //使用standard做代码规范
    'prettier',
  ],
  rules: {
    'prettier/prettier': 'error',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'one-var': 'off',
    eqeqeq: 'off',
    'multiline-comment-style': 'off',
  },
  plugins: ['prettier'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2018,
    parser: 'babel-eslint',
  },
}
