Gulp Workflow
=============
# Directory
```
yourProj/
    │
    ├── package.json                // 项目依赖定义
    ├── gulp.js                     // gulp配置任务入口
    │
    ├── src/                        // 开发目录
    │    ├── css/
    │    │    └── global.css        // 经过sass编译后的出口css文件
    │    ├── sass/                  // sass源文件
    │    ├── img/                   // 仅 Copy 不做操作
    │    ├── js/                    // 仅 Copy 不做操作
    │    ├── tpl/                   // 仅 Copy 不做操作，用来存放ejs模板
    │    └── index.html
    │
    └── dist/                       // 发布目录，执行 `gulp build` 生成
          ├── css/
          │    └── global.css
          ├── img/
          ├── js/
          └── index.html
```
