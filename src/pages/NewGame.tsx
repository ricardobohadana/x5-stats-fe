import React from 'react';
import { ChampionSelector } from '../component/ChampionsSelector';

export const NewGame: React.FC = () => {
 

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-6 sm:px-6 lg:px-8">
        <ChampionSelector/>
      </div>
  );
};
