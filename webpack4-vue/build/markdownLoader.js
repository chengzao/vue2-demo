const markdown = require('markdown-it')
const mdInclude = require('./markdown')

module.exports = function(src) {

  let md = markdown()

  md.use(mdInclude)

  const html = md.render(src)
  return (
    `<template>\n` +
      `<div class="markdown">${html}</div>\n` +
    `</template>\n`
  )
}
