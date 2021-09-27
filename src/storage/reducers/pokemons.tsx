import {ModelSliceSet} from '../../redux-toolkit-sliceset/SliceSets';

export interface Pokemon{
	id: number,
	name: string,
	url : string
}

//Hay que arreglar tipados con typescript
export const PokemonService = new ModelSliceSet<Pokemon>("pokemon", "/pokemon/", (state : any) => state.pokemon)
export const PokemonSlice = PokemonService.createSlice();