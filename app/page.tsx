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

      setTimeLeft({
        dias: Math.floor(distance / (1000 * 60 * 60 * 24)),
        horas: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutos: Math.floor((distance / 1000 / 60) % 60),
        segundos: Math.floor((distance / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-dvh bg-black text-white relative overflow-x-hidden overflow-y-auto px-4 pt-10 pb-24">
      <ParticlesBackground />

      <div className="hidden sm:block">
        <DailyWhispers />
      </div>

      <div className="absolute left-1/2 top-40 -translate-x-1/2 w-[420px] h-[420px] bg-pink-500/20 blur-[150px] rounded-full" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-20 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 text-center sm:text-left">
          <Image
            src="/photos/foto1.jpeg"
            alt="Nós dois"
            width={240}
            height={240}
            className="w-[170px] h-[170px] sm:w-[260px] sm:h-[260px] rounded-full object-cover border-4 border-pink-500 shadow-[0_0_40px_rgba(255,0,128,0.7)]"
          />

          <div>
            <h1 className="text-4xl sm:text-6xl font-bold leading-tight">
              Nosso
              <br />
              Amor ❤️
            </h1>

            <p className="text-gray-300 text-xl sm:text-2xl mt-4 font-light">
              Contagem para
              <br />
              26 de Maio
            </p>

            <p className="mt-4 text-pink-200/60 text-sm italic max-w-[260px] mx-auto sm:mx-0">
              algumas coisas só fazem sentido na hora certa...
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 w-full lg:w-auto">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl px-8 py-6 min-w-[135px]">
              <p className="text-5xl font-bold">{timeLeft.dias}</p>
              <span className="text-lg text-gray-300">Dias</span>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-3xl px-8 py-6 min-w-[135px]">
              <p className="text-5xl font-bold">{timeLeft.horas}</p>
              <span className="text-lg text-gray-300">Horas</span>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-3xl px-8 py-6 min-w-[135px]">
              <p className="text-5xl font-bold">{timeLeft.minutos}</p>
              <span className="text-lg text-gray-300">Min</span>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-3xl px-8 py-6 min-w-[135px]">
              <p className="text-5xl font-bold">{timeLeft.segundos}</p>
              <span className="text-lg text-gray-300">Seg</span>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-center w-full max-w-[340px]">
            <p className="text-white/45 text-sm">
              🔒 mensagem disponível em 26 de Maio
            </p>
          </div>

          <SpotifyPlayer />
        </div>
      </div>
    </main>
  );
}