# coding: utf-8
seeds = [
  { id: 1, name: "组件" },
  { id: 2, name: "UI", parent_id: 1 },
  { id: 3, name: "动画", parent_id: 1 }, 
]

categories = Category.seed(:id, *seeds)
