import { merge } from 'webpack-merge';
import common from './webpack.common';

export default merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    open: true,
    port: 3000,
    // 모듈 전체를 다시 로드하지 않고 변경사항만 확인하여 로드
    hot: true,
  },
});
