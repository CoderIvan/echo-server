## Echo Server

## 1. 使用方式

### 1.1 服务器

#### 使用node启动
  * 安装node与git
  * 配置`config.js`
  * 执行`npm i`安装依赖
  * `node .` 或 `npm start` 启动服务

#### 使用docker启动
  * 安装docker
  * 使用`docker build .`创建镜像并运行
  * 配置`docker-compose.yml`，使用`docker-compose up`

### 1.2 模拟器
  * 进行文件目录执行`npm i`安装依赖
  * `node index.js` 或 `npm start` 启动服务

### 1.3 客户端

#### 1.2.1 HTTP
  * 客户端使用HTTP协议POST方向，发送数据
  * Body内容可以为`application/json`，也可以为`text/plain`，建议使用JSON格式，方便解析与统计
  * tagName标记为'http-server'
  * 在服务地址后可以追加`项目名(projectName)`，即`http://localhost/:projectName`
    * 例如`http://localhost/ivan`，则项目名为`ivan`

#### 1.2.2 UDP
  * 客户端使用UDP发送数据
  * 服务器接收到的二进制内容均使用`UTF-8`解码成文本，建议文本内容使用JSON格式，方便解析与统计
  * tagName标记为'udp-server'
  * 在UDP包前可以追加`$ + 项目名(projectName) + #`，即`${{projectName}}#{{内容}}`
    * 例如`"$ivan#{\"sn\":\"0000000004\",\"iccid\":\"90000000000000000004\",\"imei\":\"900000000000004\",\"random\":\"Some bytes:0.17507057398090065\"}"`，则项目名为`ivan`

### 1.3 数据查询
  * 直接在阿里云的日志服务中[查询](https://sls.console.aliyun.com/lognext/project/docker-alpha/logsearch/echo-server?encode%3Dbase64%26queryString%3D%26queryTimeType%3D99%26startTime%3D1610985600%26endTime%3D1611045940)
