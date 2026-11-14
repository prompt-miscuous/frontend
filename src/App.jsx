import ConfigForm from './components/ConfigForm.jsx';
import FramePlayer from './components/FramePlayer.jsx';
import ObjectCard from './components/ObjectCard.jsx';
import SummaryPanel from './components/SummaryPanel.jsx';
import Navbar from './components/Navbar.jsx';
import { useSkyConfig } from './hooks/useSkyConfig.js';

function App() {
  const config = useSkyConfig();
  const playable =
    config.manifest?.frames?.length > 0 &&
    config.manifest.frames.every((frame) => frame.png_url);
  return (
    <div className="space-bg min-h-screen px-4 pb-12 text-slate-100 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <Navbar />
        <header id="inicio" className="page-intro">
          <div>
            <p className="eyebrow">Exploración infrarroja</p>
            <h1>
              Planet X <span>and</span> SPHEREx
            </h1>
          </div>
          <p>
            Configura una región del cielo
            <br className="hidden sm:block" /> y explora sus observaciones.
          </p>
        </header>
        {config.urlWarning ? (
          <p
            role="status"
            className="rounded-xl border border-amber-300/40 bg-amber-400/10 px-4 py-3 text-sm text-amber-100"
          >
            {config.urlWarning}
          </p>
        ) : null}
        <main className="grid items-start gap-5 lg:grid-cols-[0.94fr_1.06fr]">
          <div className="flex flex-col gap-5">
            <ConfigForm
              inputs={config.inputs}
              band={config.band}
              errors={config.errors}
              isValid={config.isValid}
              status={config.status}
              copied={config.copied}
              onInput={config.setInput}
              onBand={config.changeBand}
              onReset={config.reset}
              onGenerate={config.generate}
              onCopy={config.copyLink}
            />
            <ObjectCard onSelect={config.reset} />
          </div>
          <div className="flex flex-col gap-5">
            {playable ? (
              <FramePlayer key={config.requestId} manifest={config.manifest} />
            ) : null}
            <SummaryPanel
              manifest={config.manifest}
              errorMessage={config.errorMessage}
            />
          </div>
        </main>
        <footer className="text-center text-xs text-slate-500">
          Reto Planet X and SPHEREx · NASA Space Apps Challenge 2026 · Fase 1:
          configuración sin backend
        </footer>
      </div>
    </div>
  );
}

export default App;
