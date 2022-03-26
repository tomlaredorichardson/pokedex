import "./App.css";
import { useState } from "react";

const App = () => {
  const [pokemon, setPokemon] = useState("");
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonType, setPokemonType] = useState("");

  const searchPokemon = async () => {
    const toArray = [];
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    );
    const data = await response.json();
    toArray.push(data);
    setPokemonType(data.types[0].type.name);
    setPokemonData(toArray);

    console.log(data);
  };

  const handleChange = (e) => {
    setPokemon(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchPokemon();
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            onChange={handleChange}
            placeholder="Search Pokemon name"
          />
        </label>
      </form>
      {pokemonData.map((data) => {
        return (
          <div key={data.name} className="container">
            <img src={data.sprites["front_default"]} alt={data.name} />
            <div className="divTable">
              <div className="divTableBody"></div>
              <div className="divTableRow">
                <div className="divTableCell">Type</div>
                <div className="divTableCell">{pokemonType}</div>
              </div>
              <div className="divTableRow">
                <div className="divTableCell">Height</div>
                <div className="divTableCell">
                  {""}
                  {Math.round(data.height * 3.9)} "
                </div>
              </div>
              <div className="divTableRow">
                <div className="divTableCell">Weight</div>
                <div className="divTableCell">
                  {""}
                  {Math.round(data.weight / 4.3 / 2.2)} kgs
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default App;
