import { League } from "@/types/league";

export function drawTeam(
  availableTeams: string[],
  leagues: League[]
) {
  if (availableTeams.length === 0) return null;

  const availableLeagues = leagues.filter(
    (league) => league.teams.length < 20
  );

  if (availableLeagues.length === 0) return null;

  const teamIndex = Math.floor(
    Math.random() * availableTeams.length
  );

  const leagueIndex = Math.floor(
    Math.random() * availableLeagues.length
  );

  return {
    team: availableTeams[teamIndex],
    teamIndex,
    leagueId: availableLeagues[leagueIndex].id,
  };
}