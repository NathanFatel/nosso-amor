"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const songs = [
  {
    title: "Tudo começa em silêncio.",
    artist: "26 de maio",
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
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const song = songs[currentSong];

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.load();
    audio.volume = 1;

    if (currentSong === 2) {
      audio.currentTime = 5;
      setCurrentTime(5);
    } else {
      audio.currentTime = 0;
      setCurrentTime(0);
    }

    if (isPlaying) {
      audio.play();
    }
  }, [currentSong]);

  useEffect(() => {
    const interval = setInterval(() => {
      const audio = audioRef.current;

      if (!audio) return;

      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);

      if (audio.ended) {
        nextSong();
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  function togglePlay() {
    const audio = audioRef.current;

    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  }

  function nextSong() {
    setCurrentSong((prev) => (prev + 1) % songs.length);
  }

  function prevSong() {
    setCurrentSong((prev) => (prev === 0 ? songs.length - 1 : prev - 1));
  }

  function changeTime(event: React.ChangeEvent<HTMLInputElement>) {
    const audio = audioRef.current;

    if (!audio) return;

    const newTime = Number(event.target.value);

    audio.currentTime = newTime;
    setCurrentTime(newTime);
  }

  function formatTime(time: number) {
    if (!time) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="bg-white/10 backdrop-blur-2xl border border-white/10 p-4 rounded-[28px] w-full max-w-[340px] shadow-[0_0_35px_rgba(255,0,128,0.25)]">
      <audio ref={audioRef} src={song.src} />

      <div className="relative mb-4 overflow-hidden rounded-2xl h-[210px]">
        <Image
          src={song.cover}
          alt="Capa da música"
          fill
          className="object-cover transition-all duration-1000"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-bold leading-tight">{song.title}</h2>

        <p className="text-gray-300 mt-1">{song.artist}</p>
      </div>

      <div className="mb-2">
        <input
          type="range"
          min={0}
          max={duration || 0}
          value={currentTime}
          onChange={changeTime}
          className="music-slider w-full"
          style={{
            background: `linear-gradient(to right, #ec4899 ${progress}%, rgba(255,255,255,0.15) ${progress}%)`,
          }}
        />
      </div>

      <div className="flex justify-between text-xs text-gray-400 mb-5">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      <div className="flex items-center justify-center gap-7">
        <button
          onClick={prevSong}
          className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white flex items-center justify-center transition-all hover:scale-110"
        >
          <span className="text-lg">‹</span>
        </button>

        <button
          onClick={togglePlay}
          className="w-20 h-20 rounded-full bg-pink-500 hover:bg-pink-400 text-white flex items-center justify-center transition-all hover:scale-110 shadow-[0_0_35px_rgba(255,0,128,0.75)]"
        >
          <span className="text-3xl leading-none">
            {isPlaying ? "Ⅱ" : "▶"}
          </span>
        </button>

        <button
          onClick={nextSong}
          className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white flex items-center justify-center transition-all hover:scale-110"
        >
          <span className="text-lg">›</span>
        </button>
      </div>
    </div>
  );
}