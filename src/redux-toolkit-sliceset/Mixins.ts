import { callBegan, callFailed } from './apiActions';
import { Class, idRequired } from './types/general';
import { apiCallAction } from './types/middleware';

export function ListSliceSetMixin<T extends Class>(base: T) {

	return class extends base {

		constructor(...args : any[]) {

			super(...args)
			this.actions['list'] = (state : Object, action : { type: string, payload : any }) => {
				this.performList(state, action)	
			}

		}


		protected getListRequest()  : apiCallAction{
			return {
				url : this.apiPoint,
				method : "get",
				onSuccess : `${this.resource}/list`,
				onBegin : `${this.resource}/request`
			}
		}

		public list(){
			return callBegan(this.getListRequest())
		}

		protected performList(state: any, action : { type: string, payload : any }) {
			try {
				state.loading = false;
				state.list = action.payload
			} catch {

			}
		}


	};
}

export function CreateSliceSetMixin<T extends Class, S>(base: T) {

	return class extends base{

		constructor(...args : any[]) {
			super(...args)
			this.actions['create'] = (state : Object, action : { type: string, payload : any }) => {
				this.performCreate(state, action)	
			}
		}
		
		protected getCreateRequest(data: S) : apiCallAction {
			return {
				url : this.apiPoint,
				onSuccess : `${this.resource}/create`,
				method : 'post',
				onError : callFailed.type,
				data : data,
			}

		}

		public create(data : S){
			return callBegan(this.getCreateRequest(data))
		}

		protected performCreate(state: any, action : { type: string, payload : any }){
			try {
				state.loading = false;
				state.list.unshift(action.payload);
			} catch {

			}
		}


	};
}

export function UpdateSliceSetMixin<T extends Class>(base: T) {

	return class extends base {

		constructor(...args : any[]) {

			super(...args)
			this.actions['update'] = (state : Object, action : { type: string, payload : any }) => {
				this.performUpdate(state, action)	
			}
		}
		
		protected getUpdateRequest(data : idRequired) : apiCallAction {
				return {
					url: `${this.apiPoint}${data.id}/`,
					onBegin: `${this.resource}/update`,
					method: 'patch',
					data: data,
					onError: callFailed.type,
					payload: data
				}
		}

		public update(data : idRequired){
			return callBegan(this.getUpdateRequest(data))
		}

		protected performUpdate(state: any, action : { type: string, payload : any }){
			try {
				const index = state.list.findIndex((group: any) => action.payload.id === group.id);
				state.placeholderList[index] = { ...state.list[index], ...action.payload };
			} catch {

			}
		}


	};
}

export function DestroySliceSetMixin<T extends Class>(base: T) {

	return class extends base {

		constructor(...args : any[]) {

			super(...args)
			this.actions['destroy'] = (state : Object, action : { type: string, payload : any }) => {
				this.performDestroy(state, action)	
			}
		}
		
		protected getDestroyRequest (id : number | string) : apiCallAction {
			return {
					url : `${this.apiPoint}${id}/`,
					onBegin : `${this.resource}/destroy`,
					onError : callFailed.type,
					method : 'delete',
					payload : {
						id : id
					}
				}
		}

		public destroy(id : number | string){
			return callBegan(this.getDestroyRequest(id))
		}

		protected performDestroy(state: any, action : { type: string, payload : any }){
			try {
				const index = state.list.findIndex((group: any) => action.payload.id === group.id);
				state.placeholderList[index] = { ...state.list[index], ...action.payload };
			}catch{

			}
		}


	};
}

export function RetrieveSlicesetMixin<T extends Class>(base: T) {

	return class extends base {

		constructor(...args : any[]) {

			super(...args)
			this.actions['retrieve'] = (state : Object, action : { type: string, payload : any }) => {
				this.performRetrieve(state, action)	
			}
		}
		
		protected getRetrieveRequest (id : number | string) : apiCallAction {
			return {
					url : `${this.apiPoint}${id}/`,
					onBegin : `${this.resource}/retrieve`,
					onError : callFailed.type,
					method : 'get',
				}
		}

		public retrieve(id : number | string){
			return callBegan(this.getRetrieveRequest(id))
		}

		protected performRetrieve(state: any, action : { type: string, payload : any }){
			try {
				state.loading = false;
				state.list.unshift(action.payload);
			} catch {

			}
		}


	};
}
export function RequestSliceSetMixin<T extends Class>(base: T) {

	return class extends base {

		constructor(...args : any[]) {

			super(...args)
			this.actions['request'] = (state : Object, action : { type: string, payload : any }) => {
				this.performRequest(state, action)	
			}

		}


		protected performRequest(state: any, action : { type: string, payload : any }) {
			try {
				state.loading = true;
			} catch {

			}
		}


	};
}