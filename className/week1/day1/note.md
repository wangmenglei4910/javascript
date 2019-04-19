# 第一天

## 用Git上传文件
在仓库文件夹里 打开命令行git bash here

```
// 将工作区所有文件上传到暂存区
git add .  

// 将暂存区所有文件提交到历史区
git commit -m "备注信息"

// 上传到远程仓库
git push origin master

```

## 拉取更新

```
git pull origin master
```

## 克隆（下载）远程仓库

```
git clone 远程仓库地址
```

## 查看仓库状态

```
git status

// 红色 文件在工作区
// 绿色 文件在暂存区
// nothing to commit, working tree clean 当前没有任何需要提交改动

```

## 如何拉取每天讲义

进入老师的仓库文件夹 打开命令行
```
git pull origin master
```

重新克隆老师讲义仓库

```
git clone https://github.com/Lwenli1224/201902JS-.git
```