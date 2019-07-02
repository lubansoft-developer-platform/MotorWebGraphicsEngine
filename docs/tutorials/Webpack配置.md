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
    new CopyWebpackPlugin([{ from: path.join(motorSource, 'Workers'), to: path.join(motorDist, 'Workers') }]),
    new CopyWebpackPlugin([{ from: path.join(motorSource, 'images'), to: path.join(motorDist, 'images') }]),
    new CopyWebpackPlugin([{ from: path.join(motorSource, 'environmentMap'), to: path.join(motorDist, 'environmentMap') }]),
    new CopyWebpackPlugin([{ from: path.join(motorSource, 'Assets'), to: path.join(motorDist, 'Assets') }]),
    new CopyWebpackPlugin([{ from: path.join(motorSource, 'Widgets'), to: path.join(motorDist, 'Widgets')}]),
    new CopyWebpackPlugin([{ from: path.join(motorSource, 'ThirdParty'), to: path.join(motorDist, 'ThirdParty') }]),
    new CopyWebpackPlugin([{ from: path.join(motorSource, 'wasm'), to: path.join(motorDist, 'wasm') }]),
    /**设置全局变量，存放静态资源目录路径**/
    new webpack.DefinePlugin({
        MOTOR_BASE_URL: JSON.stringify(motorDist)
    }),
]
```

