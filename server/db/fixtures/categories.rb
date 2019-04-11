# coding: utf-8
seeds = [
{ id: 1, name_zh: '控件分类' },
{ id: 2, name_zh: '功能分类' },
]

Category.seed(:id, *seeds)

seeds = [
{ id: 3, name: 'ActivityIndicator', name_zh: '指示器' },
{ id: 4, name: 'AlertView', name_zh: '提醒对话框' },
{ id: 5, name: 'NavigationBar', name_zh: '导航条' },
{ id: 6, name: 'Calendar', name_zh: '日历' },
{ id: 7, name: 'Camera', name_zh: '相机' },
{ id: 8, name: 'HUD', name_zh: '透明指示层' },
{ id: 9, name: 'Image', name_zh: '图像' },
{ id: 10, name: 'Keyboard', name_zh: '键盘' },
{ id: 11, name: 'Label', name_zh: '标签' },
{ id: 12, name: 'Map', name_zh: '地图' },
{ id: 13, name: 'Menu', name_zh: '菜单' },
{ id: 14, name: 'Button', name_zh: '按钮' },
{ id: 15, name: 'Picker', name_zh: '选择器' },
{ id: 16, name: 'Progress', name_zh: '进度条' },
{ id: 17, name: 'ScrollView', name_zh: '滚动视图' },
{ id: 18, name: 'Segment', name_zh: '分段选择' },
{ id: 19, name: 'Slider', name_zh: '滑杆' },
{ id: 10, name: 'StatusBar', name_zh: '状态栏' },
{ id: 21, name: 'Switch', name_zh: '开关' },
{ id: 22, name: 'TabBar', name_zh: '选项卡' },
{ id: 23, name: 'Table', name_zh: '列表' },
{ id: 24, name: 'TextField', name_zh: '文字输入框' },
{ id: 25, name: 'TextView', name_zh: '文字视图' },
{ id: 26, name: 'Webview', name_zh: '网页' },
]
Category.seed(:id, *seeds.map{ |s| s.update(parent_id: 1) })

seeds = [
{ id: 27, name_zh: '完整项目' },
{ id: 28, name: 'Unity', name_zh: '游戏引擎' },
{ id: 29, name: 'Animation', name_zh: '动画' },
{ id: 30, name: 'Audio', name_zh: '音视频' },
{ id: 31, name: 'Database', name_zh: '数据库' },
{ id: 32, name: 'cocos2d', name_zh: '游戏引擎' },
{ id: 33, name: 'CoreMotion', name_zh: '重力感应' },
{ id: 34, name: 'Chart', name_zh: '图表' },
{ id: 35, name: 'Drawing', name_zh: '绘图' },
{ id: 36, name: 'eBook', name_zh: '电子书' },
{ id: 37, name: 'Gesture', name_zh: '手势交互' },
{ id: 38, name: 'Intro&GuideView', name_zh: '引导页' },
{ id: 39, name: 'Networking', name_zh: '网络' },
{ id: 40, name: 'PopupView', name_zh: '弹出视图' },
{ id: 41, name: 'Socialization', name_zh: '社交分享' },
{ id: 42, name: 'ViewEffects', name_zh: '视图效果' },
{ id: 43, name: 'ViewLayout', name_zh: '视图布局' },
{ id: 44, name: 'ViewTransition', name_zh: '视图切换' },
{ id: 45, name: 'Others', name_zh: '其他' },
]
Category.seed(:id, *seeds.map{ |s| s.update(parent_id: 2) })
