module.exports = {
  'presets': [
    ['@babel/preset-env', {
      'useBuiltIns': 'usage',
      'corejs': 2,
      'modules': 'commonjs',
      'targets': {
        'browsers': ['> 1%', 'last 2 versions', 'not ie <= 8'],
        'node': 'current'
      }
    }]
  ],
  plugins: [
    // 添加这个
    '@babel/plugin-syntax-dynamic-import'
  ]
}
