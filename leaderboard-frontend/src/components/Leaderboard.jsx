import React from 'react';
import { useQuery } from 'react-query';
import useStore  from '../store';
import apiClient  from '../api/client';

const Leaderboard = () => {
  const { players, isLoggedIn, isAdmin, currentPlayerId } = useStore();
  const { data: topPlayers, isLoading, isError } = useQuery(
    'topPlayers',
    async () => {
      const response = await apiClient.get('/players/top');
      return response.data;
    }
  );

  const handleAddPlayer = (name, score) => {
    useStore.getState().addPlayer({ name, score });
  };

  const handleUpdateScore = (id, score) => {
    useStore.getState().updateScore(id, score);
  };

  const getRank = (id) => {
    return 42; 
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading leaderboard</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Leaderboard</h1>
      {isLoggedIn && (
        <div className="mb-4">
          <button
            onClick={() => handleAddPlayer('New Player', 100)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add New Player
          </button>
        </div>
      )}
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border-b-2 pb-3 pr-4 text-left">Rank</th>
            <th className="border-b-2 pb-3 pr-4 text-left">Name</th>
            <th className="border-b-2 pb-3 pr-4 text-left">Score</th>
            {isLoggedIn && <th className="border-b-2 pb-3 pr-4 text-left">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {topPlayers?.map((player, index) => (
            <tr key={player.id}>
              <td className="py-2 pr-4">{index + 1}</td>
              <td className="py-2 pr-4">{player.name}</td>
              <td className="py-2 pr-4">{player.score}</td>
              {isLoggedIn && (
                <td className="py-2 pr-4">
                  <button
                    onClick={() => handleUpdateScore(player.id, player.score + 10)}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
                  >
                    +10
                  </button>
                  {isAdmin && (
                    <button
                      onClick={() => handleUpdateScore(player.id, player.score - 10)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    >
                      -10
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {currentPlayerId && (
        <div className="mt-4">
          <p>Your current rank: {getRank(currentPlayerId)}</p>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
