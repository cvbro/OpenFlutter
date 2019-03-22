import { observable, action } from 'mobx'

export default class AppState {

  @observable count

  constructor() {
    this.count = 0
  }

  @action increment() {
    this.count++
  }
}
