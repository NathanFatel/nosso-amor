"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import ParticlesBackground from "./components/ParticlesBackground";
import SpotifyPlayer from "./components/SpotifyPlayer";

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
        dias: Math.max(Math.floor(distance / (1000 * 60 * 60 * 24)), 0),
        horas: Math.max(Math.floor((distance / (1000 * 60 * 60)) % 24), 0),
        minutos: Math.max(Math.floor((distance / 1000 / 60) % 60), 0),
        segundos: Math.max(Math.floor((distance / 1000) % 60), 0),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-dvh bg-black text-white relative overflow-x-hidden overflow-y-auto px-5 py-8">
      <ParticlesBackground />

      <div className="absolute left-1/2 top-24 -translate-x-1/2 w-[320px] h-[320px] lg:w-[600px] lg:h-[600px] bg-pink-500/20 blur-[140px] rounded-full" />

      <div className="relative z-10 flex flex-col items-center gap-8 max-w-md mx-auto lg:max-w-6xl lg:flex-row lg:justify-center lg:gap-20">
        <section className="flex flex-col items-center text-center gap-5">
          <Image
            src="/photos/foto1.jpeg"
            alt="Nós dois"
            width={280}
            height={280}
            className="w-[150px] h-[150px] sm:w-[220px] sm:h-[220px] lg:w-[280px] lg:h-[280px] rounded-full object-cover border-4 border-pink-500 shadow-[0_0_35px_rgba(255,0,128,0.65)]"
          />

          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Nosso Amor ❤️
            </h1>

            <p className="text-gray-300 text-lg sm:text-xl mt-3">
              Contagem para 26 de Maio
            </p>

            <p className="mt-3 text-pink-200/60 text-sm italic max-w-[280px]">
              algumas coisas só fazem sentido na hora certa...
            </p>
          </div>
        </section>

        <section className="flex flex-col items-center gap-5 w-full">
          <div className="grid grid-cols-4 gap-2 w-full max-w-[360px]">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl py-4 text-center">
              <p className="text-3xl font-bold">{timeLeft.dias}</p>
              <span className="text-xs text-gray-300">Dias</span>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl py-4 text-center">
              <p className="text-3xl font-bold">{timeLeft.horas}</p>
              <span className="text-xs text-gray-300">Horas</span>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl py-4 text-center">
              <p className="text-3xl font-bold">{timeLeft.minutos}</p>
              <span className="text-xs text-gray-300">Min</span>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl py-4 text-center">
              <p className="text-3xl font-bold">{timeLeft.segundos}</p>
              <span className="text-xs text-gray-300">Seg</span>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-center w-full max-w-[340px]">
            <p className="text-white/45 text-sm">
              🔒 mensagem disponível em 26 de Maio
            </p>
          </div>

          <SpotifyPlayer />
        </section>
      </div>
    </main>
  );
}