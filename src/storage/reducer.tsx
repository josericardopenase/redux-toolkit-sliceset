import CombineSliceSets from '../redux-toolkit-sliceset/CombineSliceSets'
import { PokemonSlice } from './reducers/pokemons'


export default CombineSliceSets([
    PokemonSlice
])
