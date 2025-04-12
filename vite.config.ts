import { UserConfig, ConfigEnv, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';

import { fileURLToPath } from 'url';

// @see: https://gitee.com/holysheng/vite2-config-description/blob/master/vite.config.ts
export default ({ mode }: ConfigEnv): UserConfig => {
  // 获取 .env 环境配置文件
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      vue()

    ],
    // 本地反向代理解决浏览器跨域限制
    server: {
      host: '0.0.0.0',
      port: Number(env.VITE_APP_PORT),
      open: true, // 运行自动打开浏览器
      proxy: {
        [env.VITE_APP_BASE_API]: {
          // target: 'http://172.18.195.129:16088/zuul',
          target: 'http://localhost:8002',
          changeOrigin: true,
          rewrite: path =>
            path.replace(new RegExp('^' + env.VITE_APP_BASE_API), '')
        }
        // '/goodsApp': {
        //   // target: 'http://172.18.195.129:16003',
        //   target: 'http://localhost:16001',
        //   changeOrigin: true,
        //   rewrite: path =>
        //     path.replace(new RegExp('^' + '/goodsApp'), '')
        // },
        // '/userApp': {
        //   // target: 'http://172.18.195.129:16002',
        //   target: 'http://localhost:16002',
        //   changeOrigin: true,
        //   rewrite: path =>
        //     path.replace(new RegExp('^' + '/userApp'), '')
        // },
      }
    },
    resolve: {
      // Vite路径别名配置
      alias: {
        '@': path.resolve('./src')
      }
    }
  };
};




/************************************** */
// @see: https://gitee.com/holysheng/vite2-config-description/blob/master/vite.config.ts


// const __dirname = path.dirname(fileURLToPath(import.meta.url));

// export default defineConfig({
//   plugins: [vue()],
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, './src')
//     },
//   },
//   server: {
//     port: Number(env.VITE_APP_PORT),
//     open: true,
//     proxy: {
//       [env.VITE_APP_BASE_API]: {
//         target: '127.0.0.1:8002',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, '')
//       }
//     }
//   }
// });
