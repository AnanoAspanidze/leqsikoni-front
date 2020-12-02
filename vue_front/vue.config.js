const PrerenderSPAPlugin = require('prerender-spa-plugin') // Introducing plug-ins
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer
const path = require('path')

module.exports = {
  configureWebpack: () => {
    if (process.env.NODE_ENV !== 'production') return
    return {
      plugins: [
        new PrerenderSPAPlugin({
          // The path to generate the file can also be consistent with the webpakc package.
          // This directory can only have one level, if the directory level is higher than one level, there will be no error prompt when it is generated, and it will only stick when it is pre-rendered.
          staticDir: path.join(__dirname, './dist'),
          // If you have parameters for your own routing file, such as about, you need to write / about/param1.
          routes: ['/', '/about', '/contact', '/alphabet'],
          renderer: new Renderer({
            inject: {
              foo: 'bar'
            }
          })
        })
      ]
    }
  }
}
