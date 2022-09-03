import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import PokemonDetail from './pages/pokedex/PokemonDetail';
import { NavbarLayout, PokedexLayout } from './layouts';

const UnderConstruction = () => {
  return (
    <div>
      <h1>Under Construction</h1>
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route element={<NavbarLayout />}>
        <Route path="/" element={<Navigate to="/pokedex" replace={true} />} />
        <Route path="/pokedex" element={<PokedexLayout />}>
          <Route path="/pokedex/:id" element={<PokemonDetail />} />
        </Route>
        <Route path="*" element={<UnderConstruction />} />
      </Route>
    </Routes>
  );
}
export default App;
