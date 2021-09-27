import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { Pokemon, PokemonService } from './storage/reducers/pokemons';
import { RootState } from './storage/store';

function App() {
  

  const {loading , list} : {loading : boolean, list: Pokemon[]} = useSelector(PokemonService.selectors.general)

  const dispatch = useDispatch()




  const addPokemon = () => {
    dispatch(PokemonService.create({id : list.length + 1 , name : "Charmander", url : "Hello world" }))
  }

  const destroyPokemon = (id : number) => {
    dispatch(PokemonService.destroy(id))
  }

  useEffect(() => {

    dispatch(PokemonService.list());

  }, [])




  return (
    <div className="App">
      <div onClick={addPokemon}>Añadir nuevo pokemon</div>
      
      {
        loading ?
          <h1> loading</h1>
          :
        list.map((pokemon) => 
          <div>
            <h4>{pokemon.name}</h4>
            <div>{pokemon.url}</div>
            <div onClick={() => pokemon.id ? destroyPokemon(pokemon.id) : null}>DESTRUIR POKEMON</div>
          </div>
        ) 
      }
    </div>
  );
}

export default App;
