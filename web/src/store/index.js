import AppState from './AppState'
import { configure } from 'mobx';

configure({ enforceActions: 'observed' })

const store = new AppState()

export default store
