# day1
## 什么是JavaScript
 JS一门动态脚本语言 主要运行在浏览器里，nodejs 也可以让JS运行在服务端

## JS中的引入方式
- 内嵌式
- 外链式
- 行内式

## JS中的变量、常量

- 变量和常量都是 用来存储值
- 变量是可变的 
- 常量的值 不能被修改

### 如何定义变量、常量
- var 变量名 = 值
- const 常量名 = 值

### 变量的命名规范
- 1.变量名组合 字母 数字 _ $
- 2.数字不能作为变量名的开头
- 3.严格区分大小写
- 4.驼峰式命名法
- 5.不能使用关键字和保留字

### 数据类型
- 基本数据类型
  Number String Boolean null undefined

- 引用数据类型
  - 对象数据类型
   object {} Array [] RegExp /\d/ Date Math...
  - 函数数据类型 function 

- 基本数据类型 代表是具体的值 var a = 1
- 引用数据类型 代表的是数据集合 var arr = [1, '1', true]

#### 数据类型检测
- typeof
- constrcutor
- instanceof
- Object.prototype.toString.call()

### JS中输出方式
#### 弹窗形式输出
- alert()
- confirm()
- prompt()

#### 页面中输出
- document.write()
- innerHTML/innerText

#### 控制台输出
- console.log()
- console.dir()

### 字符串
#### 字符串拼接
`${变量名/表达式}`

### 重点
#### 如何定义变量 作用
#### 数据类型都有哪些
#### 如何检测数据类型
#### 输出方式 页面中输出、控制台输出
#### 字符串拼接