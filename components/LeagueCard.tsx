import Image from "next/image";
import { League } from "@/types/league";

type Props = {
  league: League;
};

export default function LeagueCard({ league }: Props) {
  return (
    <div className="bg-zinc-900 rounded-2xl border border-zinc-700 p-6 shadow-xl">

      <div className="flex justify-center mb-4 h-24 items-center">
        {league.logo ? (
          <Image
            src={league.logo}
            alt={league.sponsor}
            width={180}
            height={90}
            className="object-contain max-h-20"
          />
        ) : (
          <div className="text-zinc-500 text-xl">
            Nessuno sponsor
          </div>
        )}
      </div>

      <h2 className="text-2xl font-bold text-yellow-400 text-center">
        {league.league}
      </h2>

      {league.sponsor && (
        <p className="text-center text-zinc-400 mt-1">
          {league.sponsor}
        </p>
      )}

      <p className="text-center text-3xl font-bold mt-5">
        {league.teams.length}/20
      </p>

      <div className="mt-6 space-y-2">
        {league.teams.map((team) => (
          <div
            key={team}
            className="bg-zinc-800 rounded px-3 py-2 text-sm"
          >
            {team}
          </div>
        ))}
      </div>
    </div>
  );
}