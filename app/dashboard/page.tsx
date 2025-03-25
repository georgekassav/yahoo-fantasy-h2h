"use client";

import { useSeasons } from "@/hooks/useSeasons";

export default function Dashboard() {
  const { seasons, loading, error } = useSeasons();

  const seasonsToShow = seasons
    .filter((season) => {
      return season.code === "nba";
    })
    .sort((a, b) => {
      return parseInt(b.season) - parseInt(a.season);
    });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Fantasy Seasons</h1>

      {loading && <p>Loading seasons...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <ul className="space-y-2">
        {seasonsToShow.map((season) => (
          <li
            key={`season-${season.season}`}
            className="p-4 border rounded shadow"
          >
            <span className="text-lg font-bold">{`${season.name} - ${season.season}`}</span>
            {season.teams.team.map((team) => (
              <div
                key={`team-${team.team_key}`}
                className="flex items-center mt-2"
              >
                <img
                  src={team.team_logos.team_logo.url}
                  alt={team.name}
                  width={40}
                  height={40}
                />
                <div className="p-2 border rounded ml-2">{team.name}</div>
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}
