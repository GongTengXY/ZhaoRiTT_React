import { ThunkAction } from 'redux-thunk'
import store from '../store'

export type RootState = ReturnType<typeof store.getState> // 所有redux状态的类型

export type RootAction = unknown // 项目中所有action类型

export type AppDispatch = ReturnType <typeof store.dispatch>

export type RootThunkAction = ThunkAction<void, RootState, unknown, RootAction>
