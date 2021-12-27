// postcss的配置文件
// module.exports = {
//     plugins: {
//         //autoprefixer插件是为css添加浏览器前缀，能够让开发者放心使用更高级的css语法
//         //因为vue-cli内部已经配置了autoprefixer的选项，所以这里冲突了需要注释掉
//         // 'autoprefixer': {
//         //     browsers: ['Android >= 4.0', 'iOS >= 8']
//         // },
//         'postcss-pxtorem': {
//             //     rootValue({ file }) {
//             //         return file.indexof('vant') !== -1 ? 37.5 : 75
//             //     },
//             rootValue: 37.5,
//             propList: ['*']
//         }
//     }
// }
module.exports = {
    plugins: {
        // postcss-pxtorem 插件的版本需要 >= 5.0.0
        'postcss-pxtorem': {
            rootValue({ file }) {
                return file.indexOf('vant') !== -1 ? 37.5 : 75;
            },
            propList: ['*'],
            //配置不转换Markdown-css资源
            exclude: 'github-markdown'
        },
    },
};