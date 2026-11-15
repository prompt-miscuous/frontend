import { useEffect, useRef, useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const REPLIES = [
  {
    id: 'move',
    q: '¿Se mueve WISE 0855?',
    a: 'Sí, y rápido: es una enana marrón con un movimiento propio altísimo. Entre dos épocas de SPHEREx separadas por meses cambia de posición; es el candidato perfecto para parpadear.',
  },
  {
    id: 'cold',
    q: '¿Por qué es especial?',
    a: 'Es una de las enanas marrones más frías conocidas (apenas ~250 K) y está a solo ~7 años luz de nosotros. Se descubrió en 2014 con datos de WISE: justo el tipo de objeto que este reto quiere cazar.',
  },
  {
    id: 'look',
    q: '¿Qué miro en BlinkX?',
    a: 'Compara las épocas de esta región en banda D3: todo queda quieto salvo WISE 0855. Si un punto salta entre cuadros, ese es tu candidato.',
  },
];

const GREETING = {
  from: 'bot',
  text: 'Hola, soy el asistente de BlinkX. Estás mirando WISE 0855 (RA 133.7951, Dec −7.2451). Pregúntame por él.',
};

export default function ChatMock() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([GREETING]);
  const [used, setUsed] = useState([]);
  const [typing, setTyping] = useState(false);
  const timers = useRef([]);

  useEffect(
    () => () => {
      timers.current.forEach((t) => clearTimeout(t));
    },
    []
  );

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  function ask(reply) {
    setUsed((prev) => [...prev, reply.id]);
    setMessages((prev) => [...prev, { from: 'user', text: reply.q }]);
    setTyping(true);
    const timer = setTimeout(() => {
      setMessages((prev) => [...prev, { from: 'bot', text: reply.a }]);
      setTyping(false);
    }, 700);
    timers.current.push(timer);
  }

  const pending = REPLIES.filter((r) => !used.includes(r.id));

  return (
    <>
      {open ? (
        <section
          role="dialog"
          aria-label="Chat con el asistente de BlinkX"
          className="fixed bottom-24 left-5 z-[60] flex max-h-[70vh] w-[min(92vw,360px)] flex-col overflow-hidden rounded-2xl border border-[var(--panel-border)] bg-[var(--panel)] shadow-2xl backdrop-blur-md"
        >
          <header className="flex items-center justify-between bg-[var(--inset)] px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-[var(--text)]">
                Asistente BlinkX
              </p>
              <p className="text-xs text-[var(--muted)]">
                En línea · WISE 0855
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar el chat"
              className="rounded-full p-1 text-[var(--muted)] hover:bg-[var(--control)]"
            >
              <X className="h-5 w-5" />
            </button>
          </header>

          <div className="flex flex-1 flex-col gap-2 overflow-y-auto px-3 py-3">
            {messages.map((m, i) => (
              <p
                key={i}
                className={
                  m.from === 'user'
                    ? 'max-w-[80%] self-end rounded-2xl rounded-br-sm bg-[var(--accent)] px-3 py-2 text-sm text-[var(--accent-text)]'
                    : 'max-w-[85%] self-start rounded-2xl rounded-bl-sm bg-[var(--inset)] px-3 py-2 text-sm text-[var(--text)]'
                }
              >
                {m.text}
              </p>
            ))}
            {typing ? (
              <p className="self-start rounded-2xl rounded-bl-sm bg-[var(--inset)] px-3 py-2 text-sm text-[var(--muted)]">
                escribiendo…
              </p>
            ) : null}
          </div>

          {pending.length > 0 ? (
            <div className="flex flex-wrap gap-2 px-3 pb-2">
              {pending.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => ask(r)}
                  className="rounded-full border border-[var(--accent)] bg-transparent px-3 py-1 text-xs text-[var(--accent-hover)]"
                >
                  {r.q}
                </button>
              ))}
            </div>
          ) : null}

          <div className="flex items-center gap-2 border-t border-[var(--panel-border)] px-3 py-2">
            <input
              type="text"
              disabled
              placeholder="Escribe tu pregunta… (demo)"
              aria-label="Escribe tu pregunta (demo)"
              className="flex-1 rounded-full bg-[var(--control)] px-3 py-2 text-sm text-[var(--text)] placeholder:text-[var(--subtle)]"
            />
          </div>
        </section>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={
          open ? 'Cerrar el chat del asistente' : 'Abrir el chat del asistente'
        }
        className="fixed bottom-5 left-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--accent-text)] shadow-xl hover:bg-[var(--accent-hover)]"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    </>
  );
}
