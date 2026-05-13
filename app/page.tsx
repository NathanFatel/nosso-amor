"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import ParticlesBackground from "./components/ParticlesBackground";
import SpotifyPlayer from "./components/SpotifyPlayer";
import DailyWhispers from "./components/DailyWhispers";

export default function Home() {
  const targetDate = new Date("2026-05-26T00:00:00");

  const [timeLeft, setTimeLeft] = useState({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      const dias = Math.floor(distance / (1000 * 60 * 60 * 24));
      const horas = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutos = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60)
      );
      const segundos = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        dias,
        horas,
        minutos,
        segundos,
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-dvh bg-black text-white flex items-center justify-center relative overflow-x-hidden overflow-y-auto px-4 py-10">
      <ParticlesBackground />
      <DailyWhispers />

      {/* Glow */}
      <div className="absolute w-[500px] h-[500px] bg-pink-500/20 blur-[160px] rounded-full" />

      {/* Conteúdo */}
      <div className="z-10 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-24 max-w-6xl w-full px-4 lg:px-8">
        {/* Lado esquerdo */}
        <div className="flex flex-col sm:flex-row items-center gap-8">
          <Image
            src="/photos/foto1.jpeg"
            alt="Nós dois"
            width={280}
            height={280}
            className="w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] rounded-full object-cover border-4 border-pink-500 shadow-[0_0_40px_rgba(255,0,128,0.7)]"
          />

          <div className="text-center sm:text-left">
            <h1 className="text-5xl sm:text-6xl font-bold leading-none">
              Nosso
              <br />
              Amor ❤️
            </h1>

            <p className="text-gray-300 text-xl mt-6 font-light">
              Contagem para 26 de Maio
            </p>
          </div>
        </div>

        {/* Lado direito */}
        <div className="flex flex-col items-center gap-6 w-full lg:w-auto">
          {/* Contador */}
          <div className="grid grid-cols-4 gap-3 sm:gap-5">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl px-4 py-4 sm:px-6 sm:py-5 text-center min-w-[70px]">
              <p className="text-3xl font-bold">{timeLeft.dias}</p>
              <span className="text-sm text-gray-300">Dias</span>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-3xl px-4 py-4 sm:px-6 sm:py-5 text-center min-w-[70px]">
              <p className="text-3xl font-bold">{timeLeft.horas}</p>
              <span className="text-sm text-gray-300">Horas</span>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-3xl px-4 py-4 sm:px-6 sm:py-5 text-center min-w-[70px]">
              <p className="text-3xl font-bold">{timeLeft.minutos}</p>
              <span className="text-sm text-gray-300">Min</span>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-3xl px-4 py-4 sm:px-6 sm:py-5 text-center min-w-[70px]">
              <p className="text-3xl font-bold">{timeLeft.segundos}</p>
              <span className="text-sm text-gray-300">Seg</span>
            </div>
          </div>

          {/* Spotify */}
          <SpotifyPlayer />
        </div>
      </div>
    </main>
  );
}