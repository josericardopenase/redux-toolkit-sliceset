import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import reducer from './reducer'
import api from  '../redux-toolkit-sliceset/middleware/api'
import error from  '../redux-toolkit-sliceset/middleware/error'

const store = configureStore({
    reducer,
    middleware: [api, error, ...getDefaultMiddleware()]
})

export type RootState = ReturnType<typeof store.getState>

export default store
