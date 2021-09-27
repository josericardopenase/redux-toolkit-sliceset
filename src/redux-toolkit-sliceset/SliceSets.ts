import { idRequired } from './types/general';
import { createSlice, CreateSliceOptions, Slice, SliceCaseReducers } from '@reduxjs/toolkit'
import { ListSliceSetMixin, CreateSliceSetMixin, DestroySliceSetMixin, UpdateSliceSetMixin, RetrieveSlicesetMixin, RequestSliceSetMixin } from './Mixins';
import { apiCallAction } from './types/middleware';



export class BaseSliceSet<T>{

	private resource  : string = ""
	private apiPoint : string = ""
	private storeRoute: (state: any) => any;
	
	private actions: SliceCaseReducers<any> = {};

	//arreglar el any del state añadiendole tipado
	constructor(resource: string, apiPoint: string, storeRoute : (state : any) => any) {
		this.resource = resource;
		this.apiPoint = apiPoint;
		this.storeRoute = storeRoute
	}

	protected getInitialState() : Object {
		return {
			list: [] as T[],
			loading : false
		}
	}

	protected createReducersObject(): SliceCaseReducers<any>{
		return this.actions
	}

	protected createSliceObject = (): CreateSliceOptions => {
			
		return (
			{
				name: this.resource,
				initialState: this.getInitialState(),
				reducers: this.createReducersObject()
			}
		)
	}

	public get selectors() {
		//FIXME : arreglar el any del state añadiendole tipado
		return {
			retrieve : (state : any, condition : (element : T) => boolean) => this.storeRoute(state).list.filter(condition),
			list: (state: any) => this.storeRoute(state).list,
			loading: (state: any) => this.storeRoute(state).loading,
			general : (state : any) => this.storeRoute(state)
		}
	}

	public createSlice = () : Slice => {

		return createSlice(this.createSliceObject())

	}
}


/**
 *  SliceSet:
 * 
 * Is a base slice set with all mixins applyed.
 * You can use it to create a slice in the store in
 * a general way without writting code.
 * 
 */
export const SliceSet =
	UpdateSliceSetMixin(
		DestroySliceSetMixin(
			ListSliceSetMixin(
				RetrieveSlicesetMixin(
					RequestSliceSetMixin(
						CreateSliceSetMixin(BaseSliceSet)
					)
				)
			)
		)
	)


/**
 *  ESTO ESTA FEO. Problemas con typescript. por eso hay que hacer herencia.
 *  Pero lo ideal es que los generic types se puedan meter a los mixins.
 */

export class ModelSliceSet<ModelType extends idRequired> extends SliceSet<ModelType>{

	
		protected getCreateRequest(data: ModelType) : apiCallAction {
			return super.getCreateRequest(data)
		}

		public create(data : ModelType){
			return super.create(data)
		}

		protected getUpdateRequest(data : ModelType) : apiCallAction {
			return super.getUpdateRequest(data);
		}

		public upate(data : ModelType){
			return super.update(data)
		}

}

/**
 *  FUTURA IMPLEMENTACIÓN: hereda de model slice set y se meten nuevos attr a states etc...
 */
export class PagedModelSliceSet<ModelType extends idRequired> extends ModelSliceSet<ModelType>{}

/**
 *  FUTURA IMPLEMENTACIÓN: hereda de model slice set y se meten nuevos attr a states etc...
 */
export class CashedModelSliceSet<ModelType extends idRequired> extends ModelSliceSet<ModelType>{}