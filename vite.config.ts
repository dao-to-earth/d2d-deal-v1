import * as path from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import ViteComponents from 'unplugin-vue-components/vite'
import visualizer from 'rollup-plugin-visualizer'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import rollupNodePolyFill from 'rollup-plugin-polyfill-node'
import GlobalsPolyfills  from '@esbuild-plugins/node-globals-polyfill'
// import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
// import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  return defineConfig({
    define: {
      // global: 'window',
      'process.env': process.env,
    },
    plugins: [
      vue({
        reactivityTransform: true,
        template: { transformAssetUrls }
      }),
      ViteComponents({
        directoryAsNamespace: true
      }),
      visualizer({
        filename: './dist/stats.html',
        template: 'sunburst',
        gzipSize: true
      }),
      quasar({
        sassVariables: 'src/quasar-variables.sass'
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        process: 'process',
        // util: 'rollup-plugin-node-polyfills/polyfills/util',
        sys: 'util',
        // events: 'rollup-plugin-node-polyfills/polyfills/events',
        stream: 'rollup-plugin-node-polyfills/polyfills/stream',
        path: 'rollup-plugin-node-polyfills/polyfills/path',
        querystring: 'rollup-plugin-node-polyfills/polyfills/qs',
        punycode: 'rollup-plugin-node-polyfills/polyfills/punycode',
        url: 'rollup-plugin-node-polyfills/polyfills/url',
        // string_decoder:
        //     'rollup-plugin-node-polyfills/polyfills/string-decoder',
        http: 'rollup-plugin-node-polyfills/polyfills/http', 
        https: 'rollup-plugin-node-polyfills/polyfills/http',
        os: 'rollup-plugin-node-polyfills/polyfills/os',
        assert: 'rollup-plugin-node-polyfills/polyfills/assert',
        constants: 'rollup-plugin-node-polyfills/polyfills/constants',
        _stream_duplex:
            'rollup-plugin-node-polyfills/polyfills/readable-stream/duplex',
        _stream_passthrough:
            'rollup-plugin-node-polyfills/polyfills/readable-stream/passthrough',
        // _stream_readable:
        //     'rollup-plugin-node-polyfills/polyfills/readable-stream/readable',
        _stream_writable:
            'rollup-plugin-node-polyfills/polyfills/readable-stream/writable',
        _stream_transform:
            'rollup-plugin-node-polyfills/polyfills/readable-stream/transform',
        timers: 'rollup-plugin-node-polyfills/polyfills/timers',
        console: 'rollup-plugin-node-polyfills/polyfills/console',
        vm: 'rollup-plugin-node-polyfills/polyfills/vm',"@esbuild-plugins/node-modules-polyfill": "^0.1.4",
        zlib: 'rollup-plugin-node-polyfills/polyfills/zlib',
        tty: 'rollup-plugin-node-polyfills/polyfills/tty',
        domain: 'rollup-plugin-node-polyfills/polyfills/domain'
      }
    },
    build: {
      sourcemap: true,
      commonjsOptions: {
        transformMixedEsModules: true,
      },
      rollupOptions: {
        plugins: [
          rollupNodePolyFill()
        ]
      }
    },
    optimizeDeps: {
      esbuildOptions: {
        define: {
          global: 'globalThis'
        },
        plugins: [
          // NodeGlobalsPolyfillPlugin({
          //   process: true,
          //   buffer: true
          // }),
          GlobalsPolyfills({
            process: true,
            buffer: true
          }),
          // NodeModulesPolyfillPlugin()
        ]
      },
    }
    // test: {
    //   open: true,
    //   environment: 'happy-dom'
    // }
  })
}
