"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ParticlesBackground from "./components/ParticlesBackground";
import SpotifyPlayer from "./components/SpotifyPlayer";
import DailyWhispers from "./components/DailyWhispers";

export default function Home() {

  const targetDate = new Date("2026-05-26T00:00:00");

  const [started, setStarted] = useState(false);

  const [isUnlocked, setIsUnlocked] = useState(false);

  const [timeLeft, setTimeLeft] = useState({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  useEffect(() => {

    const interval = setInterval(() => {

      const now = new Date();

      const difference =
        targetDate.getTime() - now.getTime();

      if (difference <= 0) {

        setIsUnlocked(true);

        setTimeLeft({
          dias: 0,
          horas: 0,
          minutos: 0,
          segundos: 0,
        });

        return;
      }

      const dias = Math.floor(
        difference / (1000 * 60 * 60 * 24)
      );

      const horas = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
      );

      const minutos = Math.floor(
        (difference / 1000 / 60) % 60
      );

      const segundos = Math.floor(
        (difference / 1000) % 60
      );

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

    <main className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden px-4 py-10">

      <ParticlesBackground />
      {!isUnlocked && <DailyWhispers />}

      {/* Glow */}
      <div className={`absolute w-[500px] h-[500px] rounded-full blur-[150px] transition-all duration-[3000ms]
      
        ${
          isUnlocked
            ? "bg-red-500 opacity-10"
            : "bg-pink-500 opacity-20"
        }
      
      `} />

      {!started ? (

        <div className="z-10 flex flex-col items-center justify-center text-center px-6">

          <p className="text-pink-300 text-xl mb-4">
            Antes de continuar...
          </p>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            vamos nos conectar
            <br />
            pela música?
          </h1>

          <p className="text-gray-300 text-xl max-w-2xl mb-10 leading-relaxed">
            Cada canção guarda um pedacinho do que eu sinto por você.
          </p>

          <button
            onClick={() => setStarted(true)}
            className="
              px-10 py-5
              rounded-full
              bg-pink-500
              hover:bg-pink-400
              text-2xl
              font-semibold
              transition-all
              duration-300
              hover:scale-110
              shadow-[0_0_40px_rgba(255,0,128,0.7)]
            "
          >
            🎵 Começar
          </button>

        </div>

      ) : (

        <div className="z-10 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 max-w-6xl w-full px-6 lg:px-8">

          {/* ESQUERDA */}
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-10 text-center lg:text-left">

            <div className="flex justify-center">

              <Image
                src="/photos/foto1.jpeg"
                alt="Nós dois"
                width={280}
                height={280}
                className={`
                  w-[220px]
                  h-[220px]
                  lg:w-[280px]
                  lg:h-[280px]
                  lg:min-w-[280px]
                  rounded-full
                  object-cover
                  border-4
                  transition-all
                  duration-[3000ms]

                  ${
                    isUnlocked
                      ? "border-red-500 shadow-red-500/20"
                      : "border-pink-500 shadow-pink-500/40"
                  }

                  shadow-2xl
                `}
              />

            </div>

            <div>

              <h1 className="text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                Nosso
                <br />
                Amor
                <br />❤️
              </h1>

              {

                !isUnlocked && (

                  <>
                    <p className="text-gray-300 text-2xl font-light">
                      Contagem para
                      <br />
                      26 de Maio
                    </p>

                    <p className="mt-5 text-pink-200/60 text-sm italic max-w-[260px]">
                      algumas coisas só fazem sentido na hora certa...
                    </p>
                  </>

                )

              }

              {

                isUnlocked && (

                  <div className="space-y-5 animate-pulse">

                    <p className="text-red-300 text-2xl italic">
                      finalmente chegou o nosso momento...
                    </p>

                    <p className="text-white/70 max-w-[320px] leading-relaxed">
                      algumas músicas não são apenas músicas.
                      elas guardam histórias inteiras.
                    </p>

                  </div>

                )

              }

            </div>

          </div>

          {/* DIREITA */}
          <div className="flex flex-col items-center gap-8">

            {

              !isUnlocked && (

                <>
                  {/* CONTADOR */}
                  <div className="grid grid-cols-2 lg:flex gap-4 text-center">

                    <div className="bg-white/10 backdrop-blur-md p-5 rounded-3xl min-w-[90px]">
                      <h2 className="text-4xl font-bold">
                        {timeLeft.dias}
                      </h2>

                      <p className="text-sm">
                        Dias
                      </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md p-5 rounded-3xl min-w-[90px]">
                      <h2 className="text-4xl font-bold">
                        {timeLeft.horas}
                      </h2>

                      <p className="text-sm">
                        Horas
                      </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md p-5 rounded-3xl min-w-[90px]">
                      <h2 className="text-4xl font-bold">
                        {timeLeft.minutos}
                      </h2>

                      <p className="text-sm">
                        Min
                      </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md p-5 rounded-3xl min-w-[90px]">
                      <h2 className="text-4xl font-bold">
                        {timeLeft.segundos}
                      </h2>

                      <p className="text-sm">
                        Seg
                      </p>
                    </div>

                  </div>

                  {/* DICA */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-center">
                    <p className="text-white/40 text-sm">
                      🔒 mensagem disponível em 26 de Maio
                    </p>
                  </div>
                </>

              )

            }

            {/* PLAYER */}
            <SpotifyPlayer
              autoPlay={true}
            />

          </div>

        </div>

      )}

    </main>

  );
}