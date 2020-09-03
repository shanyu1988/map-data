// vue.config.js
const path = require('path');
function resolve (dir) {
    return path.join(__dirname, dir)
}
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
module.exports = {
    pages: {
        index: {
            // page 的入口
            entry: 'src/main.js',
            // 模板来源
            //template: 'public/index.html',
            // 在 dist/index.html 的输出
            //filename: 'index.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            //title: '',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            //chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        // 当使用只有入口的字符串格式时，
        // 模板会被推导为 `public/subpage.html`
        // 并且如果找不到的话，就回退到 `public/index.html`。
        // 输出文件名会被推导为 `subpage.html`。
        //subpage: 'src/subpage/main.js'
    },
    // 基本路径
    //baseUrl: '/',
    // 输出文件目录
    outputDir: process.env.outputDir || 'dist', // 'dist', 生产环境构建文件的目录
    //根目录路径配置
    //使用相对路径
    //publicPath:IS_PROD ? process.env.VUE_APP_PUBLIC_PATH : "./", // 默认'/'，部署应用包时的基本 URL
    publicPath: '',
    lintOnSave: true,
    chainWebpack: (config) => {
        config.resolve.alias
            //.set('vue$', 'vue/dist/vue.esm.js')
            .set('@', resolve('src'))
            .set('@assets', resolve('src/assets'))
            .set('@scss', resolve('src/assets/scss'))
            .set('@components', resolve('src/components'))
            .set('@plugins', resolve('src/plugins'))
            .set('@views', resolve('src/views'))
            .set('@index', resolve('src/index'))
            .set('@store', resolve('src/store'))
            .set('@layouts', resolve('src/layouts'))
            .set('@static', resolve('src/static'));
            // .set('layout', resolve('src/layout'))
            // .set('base', resolve('src/base'))
            // .set('static', resolve('src/static'))
    },
    //默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
    //transpileDependencies: ["vue-splitpane"]
};
