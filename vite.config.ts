import { UserConfig, ConfigEnv, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';

// @see: https://gitee.com/holysheng/vite2-config-description/blob/master/vite.config.ts
export default ({ mode }: ConfigEnv): UserConfig => {
  // 获取 .env 环境配置文件
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      vue(),
      // createSvgIconsPlugin({
      //   // 指定需要缓存的图标文件夹
      //   iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      //   // 指定symbolId格式
      //   symbolId: 'icon-[dir]-[name]'
      // })
    ],
    // 本地反向代理解决浏览器跨域限制
    server: {
      host: '0.0.0.0',
      port: Number(env.VITE_APP_PORT),
      open: true, // 运行自动打开浏览器
      proxy: {
        [env.VITE_APP_BASE_API]: {
          // target: 'http://172.18.195.129:16088/zuul',
          target: 'http://localhost:16000/zuul',
          changeOrigin: true,
          rewrite: path =>
            path.replace(new RegExp('^' + env.VITE_APP_BASE_API), '')
        },
        '/invoicePic/': {
          target: 'https://mallt-gztcsc-test.oss-cn-hangzhou.aliyuncs.com/',
          changeOrigin: true,
        },
        '/ecosp-console': {
          target: 'http://172.18.196.115:10003',
          changeOrigin: true,
        },
        '/emall/commodityPic/': {
          target: 'https://mallt-gztcsc-test.oss-cn-hangzhou.aliyuncs.com/commodityPic',
          changeOrigin: true,
          rewrite: path =>
            path.replace(new RegExp('^' + '/emall/commodityPic/'), '')
        },
        '/goodsApp': {
          // target: 'http://172.18.195.129:16003',
          target: 'http://localhost:16001',
          changeOrigin: true,
          rewrite: path =>
            path.replace(new RegExp('^' + '/goodsApp'), '')
        },
        '/userApp': {
          // target: 'http://172.18.195.129:16002',
          target: 'http://localhost:16002',
          changeOrigin: true,
          rewrite: path =>
            path.replace(new RegExp('^' + '/userApp'), '')
        },
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
