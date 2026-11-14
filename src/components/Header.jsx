export default function Header() {
  return (
    <header className="flex items-center gap-4">
      <span
        aria-hidden="true"
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-sky-500 to-cyan-400 text-2xl shadow-lg shadow-sky-950"
      >
        ✦
      </span>
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Planet X and SPHEREx
        </h1>
        <p className="text-sm text-slate-300 sm:text-base">
          Explora y configura regiones del cielo
        </p>
      </div>
    </header>
  );
}
