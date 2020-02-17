## 答题小程序

## 文档

设计图蓝湖地址：https://lanhuapp.com/web/#/item/project/board?pid=756cb0c5-8aef-4534-8a93-d3958ff74829

## 开发说明

### CSS样式

小程序使用了colorui的样式库，放在`colorui`文件夹下, 并在`App.vue`中引用。

#### scss使用

在`uni.scss`定义了颜色相关的变量，在`main.scss`中使用这些变量。

添加新的变量：

- 安装HBuilder的`scss`插件（如果安装跳过）
- `uni.scss`中定义新变量。
- 在`main.scss`或其他样式文件中使用变量。
- 在`main.scss`上点击右键，`外部命令` -> `scss` -> `编译scss/sass`
- 通过`@import`在需要样式的文件中引入`main.css`。（如果已引用则跳过）
