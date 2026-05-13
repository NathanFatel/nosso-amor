"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const songs = [
  {
    title: "Tudo começa em silêncio.",
    artist: "26 de Maio",
    src: "/music/music1.mp3",
    cover: "/covers/cover1.jpeg",
  },
  {
    title: "Algumas datas mudam tudo.",
    artist: "Memórias",
    src: "/music/music2.mp3",
    cover: "/covers/cover2.jpeg",
  },
  {
    title: "Você ainda não sabe o motivo.",
    artist: "Suspense",
    src: "/music/music3.mp3",
    cover: "/covers/cover3.jpeg",
  },
];

export default function SpotifyPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.load();
    audioRef.current.volume = 1;

    if (currentSong === 2) {
      audioRef.current.currentTime = 5;
    }

    if (isPlaying) {
      audioRef.current.play();
    }
  }, [currentSong]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!audioRef.current) return;

      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration || 1;

      setProgress((current / duration) * 100);

      if (audioRef.current.ended) {
        nextSong();
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  function togglePlay() {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }

  function nextSong() {
    setCurrentSong((prev) => (prev + 1) % songs.length);
  }

  function prevSong() {
    setCurrentSong((prev) =>
      prev === 0 ? songs.length - 1 : prev - 1
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-2xl border border-white/10 p-4 sm:p-5 rounded-[32px] w-[300px] sm:w-[380px] shadow-[0_0_40px_rgba(255,0,128,0.2)]">
      <audio ref={audioRef} src={songs[currentSong].src} />

      <div className="relative mb-5 overflow-hidden rounded-3xl h-[190px] sm:h-[240px]">
        <Image
          src={songs[currentSong].cover}
          alt="Capa da música"
          fill
          className="object-cover transition-all duration-1000"
        />
      </div>

      <div className="mb-5">
        <h2 className="text-2xl font-bold leading-tight">
          {songs[currentSong].title}
        </h2>

        <p className="text-gray-300 mt-1">
          {songs[currentSong].artist}
        </p>
      </div>

      <div className="mb-5">
        <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-pink-500 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-center gap-6">
        <button onClick={prevSong} className="text-2xl">
          ⏮
        </button>

        <button
          onClick={togglePlay}
          className="bg-pink-500 hover:bg-pink-600 transition-all rounded-full w-16 h-16 text-2xl shadow-[0_0_25px_rgba(255,0,128,0.6)]"
        >
          {isPlaying ? "⏸" : "▶"}
        </button>

        <button onClick={nextSong} className="text-2xl">
          ⏭
        </button>
      </div>
    </div>
  );
}