import { useNavigate } from 'react-router-dom';
import { Card } from '../../../components';

function PokemonDetail() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="border relative h-6 bg-red-400">
        <button className="absolute top-1 right-1" onClick={() => navigate('/pokedex')}>
          <Card className="p-2 w-10 h-10 rounded-full">X</Card>
        </button>
      </div>
    </div>
  );
}

export default PokemonDetail;
