# coding: utf-8
seeds = [
  { id: 1, name: "图片" },
  { id: 2, name: "组件" },
  { id: 3, name: "UI", parent_id: 2 },
  { id: 4, name: "动画", parent_id: 2 }, 
]

categories = Category.seed(:id, *seeds)
