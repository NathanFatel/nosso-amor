"use client";

import { useEffect, useState } from "react";

import SpotifyPlayer from "./components/SpotifyPlayer";

import Image from "next/image";
import ParticlesBackground from "./components/ParticlesBackground";
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
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      const dias = Math.floor(difference / (1000 * 60 * 60 * 24));
      const horas = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutos = Math.floor((difference / 1000 / 60) % 60);
      const segundos = Math.floor((difference / 1000) % 60);

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
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden">
<ParticlesBackground />

      {/* Fundo Glow */}
      <div className="absolute w-[500px] h-[500px] bg-pink-500 rounded-full blur-[150px] opacity-20"></div>

      {/* Conteúdo */}
<div className="z-10 flex items-center justify-center gap-24 max-w-6xl w-full px-8">

  {/* Lado esquerdo */}
  <div className="flex items-center gap-10">
    <div className="flex justify-center">
     <div className="flex justify-center">
  <Image
    src="/photos/foto1.jpeg"
    alt="Nós dois"
    width={280}
    height={280}
    className="w-[280px] h-[280px] min-w-[280px] rounded-full object-cover border-4 border-pink-500 shadow-2xl shadow-pink-500/40"
  />
</div>
    </div>

    <div>
      <h1 className="text-6xl font-bold mb-4">
        Nosso Amor ❤️
      </h1>

      <p className="text-gray-300 text-2xl font-light">
        Contagem para 26 de Maio
      </p>
    </div>
  </div>

  {/* Lado direito */}
  <div className="flex flex-col items-center gap-8">

    <div className="flex gap-4 text-center">
      <div className="bg-white/10 backdrop-blur-md p-5 rounded-3xl min-w-[90px]">
        <h2 className="text-4xl font-bold">{timeLeft.dias}</h2>
        <p className="text-sm">Dias</p>
      </div>

      <div className="bg-white/10 backdrop-blur-md p-5 rounded-3xl min-w-[90px]">
        <h2 className="text-4xl font-bold">{timeLeft.horas}</h2>
        <p className="text-sm">Horas</p>
      </div>

      <div className="bg-white/10 backdrop-blur-md p-5 rounded-3xl min-w-[90px]">
        <h2 className="text-4xl font-bold">{timeLeft.minutos}</h2>
        <p className="text-sm">Min</p>
      </div>

      <div className="bg-white/10 backdrop-blur-md p-5 rounded-3xl min-w-[90px]">
        <h2 className="text-4xl font-bold">{timeLeft.segundos}</h2>
        <p className="text-sm">Seg</p>
      </div>
    </div>

    <SpotifyPlayer />

  </div>

</div>
    </main>
  );
}