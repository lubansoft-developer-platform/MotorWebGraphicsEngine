### 1. 安装`copy-webpack-plugin`插件
安装完插件后在webpack配置文件中引用
```javascript
const CopyWebpackPlugin = require('copy-webpack-plugin');
```

### 2. 设置motor静态资源在源码库中的路径和打包后的路径

```javascript
//motor在源码库中的位置
const motorSource = '../library';
//打包后motor静态资源存放的位置
const motorDist = 'motor';
```

### 3. 复制静态资源、设置静态资源路径的全局变量
```javascript
plugins: [
    /**复制motorSource中的静态资源到打包后根目录的motor文件夹下**/
    new CopyWebpackPlugin([{ from: motorSource, to: motorDist, ignore: '/*.js'}]),
    /**设置全局变量，存放静态资源目录路径**/
    new webpack.DefinePlugin({
        MOTOR_BASE_URL: JSON.stringify(motorDist)
    }),
]
```

