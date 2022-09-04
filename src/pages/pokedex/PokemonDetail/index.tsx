import { useNavigate } from 'react-router-dom';
import { Card } from '../../../components';

function PokemonDetail() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="border relative h-6 bg-red-400">
        <button className="absolute top-1 left-1" onClick={() => navigate('/pokedex')}>
          <Card className="py-2 px-4 rounded-full shadow-md hover:shadow-lg">
            <i className="fa-solid fa-arrow-left"></i>
          </Card>
        </button>
      </div>
    </div>
  );
}

export default PokemonDetail;
