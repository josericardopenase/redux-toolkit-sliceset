
import { createAction } from '@reduxjs/toolkit'
import { apiCallAction } from './types/middleware'

export const callBegan = createAction<apiCallAction>("api/callBegan")
export const callSuccess = createAction<apiCallAction>("api/callSuccess")
export const callFailed = createAction<apiCallAction>("api/callFailed")