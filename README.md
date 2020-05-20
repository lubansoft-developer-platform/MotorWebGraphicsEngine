# MotorWebGraphicsEngine

## 文件夹结构

根目录
* docs
* example
* library

`docs`: API文档的教程（包含`html`和`markdown`）[Markdown文档](./docs/README.md)

`example`: 前端使用示例代码

`library`: UMD规范打包的代码库，在webpack环境调用

## example(cim_example或bim_example)运行
- 在根目录下，启动命令行工具，执行`serve -p 3000`指令; (serve指令需提前安装serve插件: 如 npm install serve -g)
- 打开本地浏览器，在地址栏键入`eg. localhost:3000/example/bim_example/` 或 `eg. localhost:3000/example/cim_example/`
- 不使用上面方式, 或者自行将本地保存的文件部署到服务器上, 比如Tomcat或者nginx, 然后浏览器中访问index.html

## webpack + react环境搭建示例

- 在根目录下，启动命令行工具，执行`cd example/webpack+react`
- 执行`npm install` 或 `yarn install`
- 执行`npm run start`或`yarn start`运行