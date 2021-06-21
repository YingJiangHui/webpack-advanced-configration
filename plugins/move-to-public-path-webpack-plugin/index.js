const path = require('path')
const fs = require('fs-extra')

class WebpackPluginDeleteSourcemap {
  apply(compiler){
    compiler.hooks.done.tap('move-to-public-path-webpack-plugin',(stats)=>{
      const {compilation} = stats
      if(!(typeof compilation.outputOptions.publicPath==='string')||compilation.outputOptions.publicPath==='auto')return;
      const publicPath = /^[/]/.test(compilation.outputOptions.publicPath)?'.'+compilation.outputOptions.publicPath:compilation.outputOptions.publicPath
      const outputPath = compilation.outputOptions.path
      console.log(compilation.outputOptions.publicPath)
      const oldPath = path.resolve(outputPath)
      const newPath = path.resolve(outputPath,publicPath)
      if(oldPath===newPath) return;

      Object.keys(compilation.assets).filter((filename)=>(/[^index.html]/.test(filename))).map(async (filename)=>{
        await fs.move(path.resolve(oldPath,filename),path.resolve(newPath,filename),{overwrite:true})
      })
    })
  }
}
module.exports = WebpackPluginDeleteSourcemap