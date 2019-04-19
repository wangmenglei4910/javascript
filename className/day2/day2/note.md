# day2

## Boolean类型

### Boolean值
- true 真，对
- false 假，错

1 > 2 // false

2 > 1 // true

### 其他类型转换为Boolean值
> 0 '' null undefined NaN 这五个值转换为Boolean值都是false 其余都是true

### Boolean类型转换方法
- Boolean(val)  

```
Boolean(0) // false
```  

- !! 等价于Boolean() 的作用
```
!!0 // false
```
- ! 取反（先转换成Boolean值 然后再取反）

```
!0 // true
```

## 对象
### 如何创建一个对象

语法：

{
  属性名：属性值
}

```
var obj = {
  name: 'zhangsan',
  age: 123
}
```

### 对象的操作

#### 查询（获取）
- 对象名.属性名 （不支持获取数字属性）
- 对象名['属性名']

#### 增加或修改
- 对象名.属性名 = 新的值
- 对象名['属性名'] = 新的值

#### 删除
- 真删除
delete 对象名.属性名
delete 对象名['属性名']

- 假删除
对象名.属性名 = null
对象名['属性名'] = null

## 元素获取

### 根据id名获取
返回的是一个元素对象

document.getElementById('id名')

### 根据class名获取
返回的是一个元素集合 [元素对象, 元素对象]

docment.getElementsByClassName('class名')

### 根据标签名获取
返回的是一个元素集合 [元素对象, 元素对象]

document.getElmenetsByTagName('标签名')




## Number类型
### 什么是number类型
 正数 小数 负数 0 NaN

### 数字类型转换

#### Number()方法
- 1.字符串中只要包含非数字字符，直接返回NaN

```
Number('10') // 10
Number('1a0') // NaN

```


- 2.对于数组 先转换为字符串 再转换为数字

```
Number([1]) => Number('1') => 1

Number([1, 2, 3]) => Number('1,2,3') => NaN
```

- 3.特殊记

```
Number(null) // 0
Number('') // 0
Number([]) // 0
Number(false) // 0
Number(true) // 1
```

#### 数字的提取
> 从左往右 依次进行提取 只要中途遇上非数字字符 就停止提取，将提取到内容以数字形式返回

```
- parseInt() 不能识别小数点 通常用来取整
  parseInt('10.5px') // 10
- parseFloat() 支持小数
  parseFloat('10.5px') // 10.5

```