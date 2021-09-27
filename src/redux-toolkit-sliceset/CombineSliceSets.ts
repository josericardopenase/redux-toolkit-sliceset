import { Slice } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

export default function CombineSliceSets(SliceSets : Slice[]) {
	/**
	 * Refactorizar con tipados y cambiando la lógica
	 */

	let reducers : any = {}

	for (const x of SliceSets) {
		reducers[x.name] = x.reducer
	}

	return combineReducers(reducers)
}