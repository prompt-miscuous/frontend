export default function Header() {
  return (
    <header className="flex items-center gap-4">
      <img
        src="/space-apps-cochabamba-white.webp"
        alt="NASA Space Apps Cochabamba"
        className="h-12 w-auto shrink-0"
      />
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
