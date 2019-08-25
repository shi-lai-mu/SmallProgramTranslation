import {
  Process
} from '../interface/packProcess'

const processData: Process[] = [
  {
    title: '检查TREE',
    desc: '如果我们的数据准备就绪, 它将会发往服务器。',
    action: 'checkTreeDom',
  },
  {
    title: '云签收',
    desc: '服务器并非繁忙状态, 且允许我们进行此操作。',
    action: 'emitCloud',
  },
  {
    title: '编译对象指定[微信]',
    desc: '树符合指定平台编译规范, 我们即将进入编译状态!',
    action: '',
  },
  {
    title: '云编译',
    desc: '请耐心等待, 我们的服务器正在处理...',
    action: '',
  },
  {
    title: '云压缩',
    desc: '正在压缩代码...',
    action: '',
  },
  {
    title: '云测试',
    desc: '正在尝试启动您的项目, 检测它是否异常!',
    action: '',
  },
  {
    title: '云打包',
    desc: '即将处理完成!',
    action: '',
  },
  {
    title: '完成啦',
    desc: '感谢您的耐心等待!',
    action: '',
  },
];

export {
  processData
}