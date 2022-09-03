import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components';

const Pokedex = () => {
  const navigate = useNavigate();

  return (
    <div className="border block">
      <div>Pokedex</div>
      <div>
        <button onClick={() => navigate('bulbasaur')}>
          <Card className="px-4 py-2">open side content</Card>
        </button>
      </div>
    </div>
  );
};

export default Pokedex;
