
export default {
    mode: 'spa',
    /*
    ** Headers of the page
    */
    head: {
        title: '...',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ],
        script: [
            {
                src: 'https://static.line-scdn.net/liff/edge/2.1/sdk.js'
            },
        ],
    },
    /*
    ** Customize the progress-bar color
    */
    loading: { color: '#fff' },
    /*
    ** Global CSS
    */
    css: [ {
        src: '~/assets/scss/main.scss',
        lang: 'scss'
    } ],
    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
    ],
    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [
    ],
    /*
    ** Nuxt.js modules
    */
    modules: [
    ],
    /*
    ** Build configuration
    */
    build: {
        babel: {
            "plugins": [
                [ "import", { "libraryName": "ant-design-vue", "libraryDirectory": "es", "style": "css" } ],
                [ "@babel/plugin-proposal-optional-chaining" ]
            ]
        },
        extend (config, ctx) {
            if (ctx.isDev && ctx.isClient) {
                config.module.rules.push({
                    enforce: "pre",
                    test: /\.(js|vue)$/,
                    loader: "eslint-loader",
                    exclude: /(node_modules)/
                })
            }
        }
    }
}
