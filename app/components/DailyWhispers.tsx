const whispers = [
  "tem algo escondido nessa data...",
  "nem toda surpresa aparece de uma vez.",
  "algumas lembranças ainda estão dormindo.",
  "o dia 26 sabe de uma coisa que você ainda não sabe.",
  "uma música vai explicar tudo.",
  "o tempo está guardando um segredo.",
  "quando chegar a hora, tudo vai fazer sentido.",
];

export default function DailyWhispers() {
  const today = new Date();
  const dayIndex = today.getDate() % whispers.length;
  const phrase = whispers[dayIndex];

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      <p className="absolute left-[8%] top-[18%] text-white/20 text-sm italic rotate-[-8deg]">
        {phrase}
      </p>

      <p className="absolute right-[10%] top-[30%] text-pink-200/20 text-xs italic rotate-[7deg]">
        talvez amanhã revele mais...
      </p>

      <p className="absolute bottom-[14%] left-[14%] text-white/15 text-xs italic rotate-[5deg]">
        26.05
      </p>
    </div>
  );
}