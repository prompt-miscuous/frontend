import ConfigForm from '../components/ConfigForm.jsx';
import FramePlayer from '../components/FramePlayer.jsx';
import ObjectCard from '../components/ObjectCard.jsx';
import PlayerPlaceholder from '../components/PlayerPlaceholder.jsx';
import SummaryPanel from '../components/SummaryPanel.jsx';

export default function DemoPage({ config }) {
  const playable =
    config.manifest?.frames?.length > 0 &&
    config.manifest.frames.every((frame) => frame.png_url);
  return (
    <div className="flex flex-col gap-8">
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
      <div className="grid items-start gap-5 lg:grid-cols-[0.94fr_1.06fr]">
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
          ) : (
            <PlayerPlaceholder status={config.status} />
          )}
          <SummaryPanel
            manifest={config.manifest}
            errorMessage={config.errorMessage}
          />
        </div>
      </div>
    </div>
  );
}
