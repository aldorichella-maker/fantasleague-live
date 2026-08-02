"use client";

import { useState } from "react";
import UploadExcel from "@/components/UploadExcel";
import LeagueCard from "@/components/LeagueCard";
import { readExcel } from "@/lib/readExcel";
import { drawTeam } from "@/lib/draw";
import { LEAGUES } from "@/data/leagues";
import { League } from "@/types/league";

export default function Home() {
  const [availableTeams, setAvailableTeams] = useState<string[]>([]);
  const [lastTeam, setLastTeam] = useState("");
  const [lastLeague, setLastLeague] = useState("");
  const [liveMode, setLiveMode] = useState(false);

  const [leagues, setLeagues] = useState<League[]>(
    LEAGUES.map((l) => ({
      ...l,
      teams: [],
    }))
  );

  async function handleFile(file: File) {
    const teams = await readExcel(file);

    setAvailableTeams(teams);

    setLeagues(
      LEAGUES.map((l) => ({
        ...l,
        teams: [],
      }))
    );

    setLastTeam("");
    setLastLeague("");
  }

  function handleDraw() {
    const result = drawTeam(availableTeams, leagues);

    if (!result) return;

    const newTeams = [...availableTeams];

    newTeams.splice(result.teamIndex, 1);

    const newLeagues = leagues.map((l) => ({
      ...l,
      teams: [...l.teams],
    }));

    const leagueIndex = newLeagues.findIndex(
      (l) => l.id === result.leagueId
    );

    newLeagues[leagueIndex].teams.push(result.team);

    setAvailableTeams(newTeams);

    setLeagues(newLeagues);

    setLastTeam(result.team);

    setLastLeague(newLeagues[leagueIndex].league);
  }

  async function toggleLiveMode() {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
      setLiveMode(true);
    } else {
      await document.exitFullscreen();
      setLiveMode(false);
    }
  }

  const extracted = 160 - availableTeams.length;

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white">
      <div className="mx-auto max-w-7xl p-8">
        <div className="text-center">
          <h1
            className={`font-black tracking-widest text-yellow-400 transition-all ${
              liveMode ? "text-7xl" : "text-6xl"
            }`}
          >
            FANTASLEAGUE 26/27
          </h1>

          <p className="mt-3 uppercase tracking-[10px] text-zinc-400">
            OFFICIAL DRAW CEREMONY
          </p>
        </div>

        <div className="grid grid-cols-4 gap-5 mt-10">
          <div
            className={`rounded-xl bg-zinc-900 border border-zinc-800 p-5 text-center transition-all ${
              liveMode ? "scale-105" : ""
            }`}
          >
            <p className="text-zinc-400">Squadre</p>

            <p
              className={`font-bold ${
                liveMode ? "text-5xl" : "text-4xl"
              }`}
            >
              {availableTeams.length}
            </p>
          </div>

          <div
            className={`rounded-xl bg-zinc-900 border border-zinc-800 p-5 text-center transition-all ${
              liveMode ? "scale-105" : ""
            }`}
          >
            <p className="text-zinc-400">Estratte</p>

            <p
              className={`font-bold text-yellow-400 ${
                liveMode ? "text-5xl" : "text-4xl"
              }`}
            >
              {extracted}
            </p>
          </div>

          <div
            className={`rounded-xl bg-zinc-900 border border-zinc-800 p-5 text-center transition-all ${
              liveMode ? "scale-105" : ""
            }`}
          >
            <p className="text-zinc-400">Rimanenti</p>

            <p
              className={`font-bold text-green-400 ${
                liveMode ? "text-5xl" : "text-4xl"
              }`}
            >
              {availableTeams.length}
            </p>
          </div>

          <div
            className={`rounded-xl bg-zinc-900 border border-zinc-800 p-5 text-center transition-all ${
              liveMode ? "scale-105" : ""
            }`}
          >
            <p className="text-zinc-400">Campionati</p>

            <p
              className={`font-bold ${
                liveMode ? "text-5xl" : "text-4xl"
              }`}
            >
              {leagues.length}
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-5 mt-10">
          {!liveMode && (
            <UploadExcel onFileSelect={handleFile} />
          )}

          <button
            onClick={handleDraw}
            disabled={availableTeams.length === 0}
            className={`rounded-xl bg-yellow-500 font-black text-black hover:bg-yellow-400 disabled:bg-zinc-700 transition ${
              liveMode
                ? "px-16 py-5 text-2xl"
                : "px-12 py-4 text-xl"
            }`}
          >
            ▶ INIZIA ESTRAZIONE
          </button>

          <button
            onClick={toggleLiveMode}
            className={`rounded-xl px-8 py-4 font-black transition ${
              liveMode
                ? "bg-red-600 hover:bg-red-500 text-white"
                : "bg-zinc-800 hover:bg-zinc-700 text-white"
            }`}
          >
            {liveMode ? "🔴 LIVE ATTIVA" : "🎥 Modalità Live"}
          </button>
        </div>

        <div
          className={`mt-12 rounded-2xl border border-yellow-500 bg-zinc-900 text-center transition-all ${
            liveMode ? "p-12" : "p-10"
          }`}
        >
          <p className="uppercase tracking-[8px] text-zinc-400">
            Ultima Estrazione
          </p>

          <h2
            className={`mt-6 font-black text-yellow-400 ${
              liveMode ? "text-7xl" : "text-6xl"
            }`}
          >
            {lastTeam || "---"}
          </h2>

          <p
            className={`mt-4 text-zinc-300 ${
              liveMode ? "text-3xl" : "text-2xl"
            }`}
          >
            {lastLeague || "In attesa"}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-2 xl:grid-cols-4">
          {leagues.map((league) => (
            <LeagueCard
              key={league.id}
              league={league}
            />
          ))}
        </div>
      </div>
    </main>
  );
}