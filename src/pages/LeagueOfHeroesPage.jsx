import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LeagueOfHeroesPage() {
  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const result = await axios.get('/api/heroes');
        setHeroes(result.data);
      } catch (error) {
        console.error('Error fetching heroes:', error);
      }
    };

    fetchHeroes();
  }, []);

  return (
    <div>
      <h1>League of Heroes Page</h1>
      {heroes.map(hero => (
        <div key={hero.id}>
          <h3>{hero.name}</h3>
          {/* Render other hero details as needed */}
        </div>
      ))}
    </div>
  );
}

export default LeagueOfHeroesPage;
