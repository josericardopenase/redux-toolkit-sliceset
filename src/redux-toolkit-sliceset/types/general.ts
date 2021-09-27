import { Action } from '@reduxjs/toolkit'

export interface sliceApiCalls {
	list(): Action,
	get(id : number): Action,
	patch(data : Object): Action,
	post(data : Object): Action,
	delete(id : number): Action
}

export interface reducerObject {
	list: (state: any, action : { type: string, payload : any }) => void,
	retrieve: (state: any, action : { type: string, payload : any }) => void,
	create: (state: any, action : { type: string, payload : any }) => void,
	request: (state: any, action : { type: string, payload : any }) => void,
	destroy: (state: any, action : { type: string, payload : any }) => void,
	update: (state: any, action : { type: string, payload : any }) => void,
	[key: string]: (state: any, action : { type: string, payload : any }) => void
}

export interface extraActions {
	[key: string]: (state: any, action : { type: string, payload : any }) => void
}

export interface idRequired{
    id ?: number | string;
    [key: string]: any;
}


export type Class = new (...args: any[]) => any;

