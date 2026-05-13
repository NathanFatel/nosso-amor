"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type SpotifyPlayerProps = {
  autoPlay?: boolean;
  unlocked?: boolean;
};

const songs = [
  {
    title: "Um pedacinho de nós.",
    artist: "Memórias",
    src: "/music/music1.mp3",
    cover: "/covers/cover1.jpeg",
  },
  {
    title: "Te amar virou meu lugar seguro.",
    artist: "Sentimentos",
    src: "/music/music2.mp3",
    cover: "/covers/cover2.jpeg",
  },
  {
    title: "Entre tantos caminhos, eu escolheria você.",
    artist: "Nós dois",
    src: "/music/music3.mp3",
    cover: "/covers/cover3.jpeg",
    startAt: 5,
  },
];

const CROSSFADE_SECONDS = 5;

export default function SpotifyPlayer({
  autoPlay = false,
  unlocked = false,
}: SpotifyPlayerProps) {
  const [currentSongIndex, setCurrentSongIndex] = useState(() =>
    Math.floor(Math.random() * songs.length)
  );

  const [nextSongIndex, setNextSongIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCrossfading, setIsCrossfading] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const mainAudioRef = useRef<HTMLAudioElement | null>(null);
  const nextAudioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const monitorIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentSongIndexRef = useRef(currentSongIndex);
  const isPlayingRef = useRef(false);
  const isCrossfadingRef = useRef(false);

  const currentSong = songs[currentSongIndex];
  const nextSong = nextSongIndex !== null ? songs[nextSongIndex] : null;

  function getStartTime(index: number) {
    return songs[index].startAt ?? 0;
  }

  function getNextIndex() {
    return currentSongIndexRef.current === songs.length - 1
      ? 0
      : currentSongIndexRef.current + 1;
  }

  function getPreviousIndex() {
    return currentSongIndexRef.current === 0
      ? songs.length - 1
      : currentSongIndexRef.current - 1;
  }

  function stopFade() {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
  }

  function stopAllExtraAudio() {
    if (nextAudioRef.current) {
      nextAudioRef.current.pause();
      nextAudioRef.current.src = "";
      nextAudioRef.current = null;
    }
  }

  function loadSong(index: number, shouldPlay: boolean) {
    stopFade();
    stopAllExtraAudio();

    if (mainAudioRef.current) {
      mainAudioRef.current.pause();
      mainAudioRef.current.src = "";
    }

    const audio = new Audio(songs[index].src);
    audio.volume = 1;
    audio.currentTime = getStartTime(index);

    mainAudioRef.current = audio;
    currentSongIndexRef.current = index;

    setCurrentSongIndex(index);
    setCurrentTime(getStartTime(index));
    setDuration(0);
    setNextSongIndex(null);
    setIsCrossfading(false);
    isCrossfadingRef.current = false;

    if (shouldPlay) {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          isPlayingRef.current = true;
        })
        .catch(() => {
          setIsPlaying(false);
          isPlayingRef.current = false;
        });
    } else {
      setIsPlaying(false);
      isPlayingRef.current = false;
    }
  }

  function startCrossfade(targetIndex: number) {
    const currentAudio = mainAudioRef.current;

    if (!currentAudio || isCrossfadingRef.current) return;

    stopFade();
    stopAllExtraAudio();

    const nextAudio = new Audio(songs[targetIndex].src);
    nextAudio.volume = 0;
    nextAudio.currentTime = getStartTime(targetIndex);

    nextAudioRef.current = nextAudio;

    setNextSongIndex(targetIndex);
    setIsCrossfading(true);
    isCrossfadingRef.current = true;

    nextAudio
      .play()
      .then(() => {
        const steps = 60;
        let step = 0;

        fadeIntervalRef.current = setInterval(() => {
          step++;

          const progress = step / steps;

          currentAudio.volume = Math.max(1 - progress, 0);
          nextAudio.volume = Math.min(progress, 1);

          if (step >= steps) {
            stopFade();

            const continuedTime = nextAudio.currentTime;

            currentAudio.pause();
            currentAudio.src = "";

            nextAudio.volume = 1;

            mainAudioRef.current = nextAudio;
            nextAudioRef.current = null;

            currentSongIndexRef.current = targetIndex;

            setCurrentSongIndex(targetIndex);
            setNextSongIndex(null);
            setCurrentTime(continuedTime);
            setDuration(nextAudio.duration || 0);
            setIsCrossfading(false);
            setIsPlaying(true);

            isCrossfadingRef.current = false;
            isPlayingRef.current = true;
          }
        }, (CROSSFADE_SECONDS * 1000) / steps);
      })
      .catch(() => {
        stopFade();
        stopAllExtraAudio();

        setNextSongIndex(null);
        setIsCrossfading(false);
        isCrossfadingRef.current = false;
      });
  }

  function nextSongManual() {
    const next = getNextIndex();

    if (isPlayingRef.current) {
      startCrossfade(next);
    } else {
      loadSong(next, false);
    }
  }

  function previousSongManual() {
    const previous = getPreviousIndex();

    if (isPlayingRef.current) {
      startCrossfade(previous);
    } else {
      loadSong(previous, false);
    }
  }

  function togglePlay() {
    const audio = mainAudioRef.current;

    if (!audio) return;

    if (isPlayingRef.current) {
      audio.pause();
      stopFade();
      stopAllExtraAudio();

      audio.volume = 1;

      setIsPlaying(false);
      setIsCrossfading(false);
      setNextSongIndex(null);

      isPlayingRef.current = false;
      isCrossfadingRef.current = false;
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          isPlayingRef.current = true;
        })
        .catch(() => {
          setIsPlaying(false);
          isPlayingRef.current = false;
        });
    }
  }

  function changeMusicTime(event: React.ChangeEvent<HTMLInputElement>) {
    const audio = mainAudioRef.current;

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

  useEffect(() => {
    loadSong(currentSongIndex, autoPlay);

    monitorIntervalRef.current = setInterval(() => {
      const audio = mainAudioRef.current;

      if (!audio) return;

      setCurrentTime(audio.currentTime);

      if (audio.duration) {
        setDuration(audio.duration);
      }

      const secondsLeft = audio.duration - audio.currentTime;

      if (
        isPlayingRef.current &&
        !isCrossfadingRef.current &&
        audio.duration &&
        secondsLeft <= CROSSFADE_SECONDS &&
        secondsLeft > 0
      ) {
        startCrossfade(getNextIndex());
      }
    }, 300);

    return () => {
      if (monitorIntervalRef.current) {
        clearInterval(monitorIntervalRef.current);
      }

      stopFade();
      stopAllExtraAudio();

      if (mainAudioRef.current) {
        mainAudioRef.current.pause();
        mainAudioRef.current.src = "";
      }
    };
  }, []);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const displaySong = isCrossfading && nextSong ? nextSong : currentSong;

  return (
    <div className="bg-white/10 backdrop-blur-2xl border border-white/10 p-5 rounded-[32px] w-[330px] sm:w-[380px] shadow-[0_0_40px_rgba(255,0,128,0.2)]">
      <div className="relative mb-5 overflow-hidden rounded-3xl h-[240px]">
        <Image
          src={currentSong.cover}
          alt="Capa da música atual"
          width={400}
          height={400}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1800ms] ease-in-out ${
            isCrossfading
              ? "opacity-0 scale-110 blur-sm"
              : "opacity-100 scale-100 blur-0"
          }`}
        />

        {nextSong && (
          <Image
            src={nextSong.cover}
            alt="Próxima capa"
            width={400}
            height={400}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1800ms] ease-in-out ${
              isCrossfading
                ? "opacity-100 scale-100 blur-0"
                : "opacity-0 scale-95 blur-sm"
            }`}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {!unlocked ? (
            <svg width="180" height="120" viewBox="0 0 180 120" className="opacity-40">
              <path
                d="M30 70 C50 20, 80 110, 105 55 S150 40, 155 80"
                stroke="white"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="8 10"
              />
              <path
                d="M65 85 C85 65, 105 65, 125 85"
                stroke="#f9a8d4"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg width="200" height="140" viewBox="0 0 200 140" className="opacity-80">
              <circle cx="70" cy="45" r="14" stroke="white" strokeWidth="3" fill="none" />
              <circle cx="130" cy="45" r="14" stroke="white" strokeWidth="3" fill="none" />

              <path d="M70 60 L70 95" stroke="white" strokeWidth="3" strokeLinecap="round" />
              <path d="M130 60 L130 95" stroke="white" strokeWidth="3" strokeLinecap="round" />

              <path
                d="M70 72 L100 88 L130 72"
                stroke="#f9a8d4"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />

              <path d="M70 95 L55 125" stroke="white" strokeWidth="3" strokeLinecap="round" />
              <path d="M70 95 L88 125" stroke="white" strokeWidth="3" strokeLinecap="round" />
              <path d="M130 95 L112 125" stroke="white" strokeWidth="3" strokeLinecap="round" />
              <path d="M130 95 L145 125" stroke="white" strokeWidth="3" strokeLinecap="round" />

              <path
                d="M92 35 C100 22, 115 22, 108 38 C103 48, 92 55, 92 55 C92 55, 81 48, 76 38 C69 22, 84 22, 92 35"
                fill="#ec4899"
              />
            </svg>
          )}
        </div>

        {isCrossfading && (
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-xs text-pink-200/80 uppercase tracking-[0.3em]">
              próxima lembrança chegando...
            </p>
          </div>
        )}
      </div>

      <div className="mb-5">
        <h2 className="text-2xl font-bold leading-snug">
          {displaySong.title}
        </h2>

        <p className="text-gray-400 mt-1">{displaySong.artist}</p>
      </div>

      <div className="mb-2">
        <input
          type="range"
          min={0}
          max={duration || 0}
          value={currentTime}
          onChange={changeMusicTime}
          className="music-slider w-full"
          style={{
            background: `linear-gradient(to right, #ec4899 ${progress}%, rgba(255,255,255,0.15) ${progress}%)`,
          }}
        />
      </div>

      <div className="flex justify-between text-sm text-gray-400 mb-6">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      <div className="flex items-center justify-center gap-8">
        <button
          onClick={previousSongManual}
          className="text-2xl hover:scale-110 transition"
        >
          ⏮
        </button>

        <button
          onClick={togglePlay}
          className="w-16 h-16 rounded-full bg-pink-500 hover:bg-pink-400 transition text-2xl shadow-[0_0_25px_rgba(255,0,128,0.5)]"
        >
          {isPlaying ? "⏸" : "▶"}
        </button>

        <button
          onClick={nextSongManual}
          className="text-2xl hover:scale-110 transition"
        >
          ⏭
        </button>
      </div>
    </div>
  );
}