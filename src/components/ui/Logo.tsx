type MarkProps = { className?: string };

/**
 * Marca do Espaço Cuide-se Bem — uma flor de lótus estilizada,
 * símbolo de bem-estar e autocuidado. Usa currentColor para herdar
 * a cor do container (dourado/escuro conforme o contexto).
 */
export function LotusMark({ className = "" }: MarkProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M32 11c3.7 7.4 3.7 18.6 0 31.2-3.7-12.6-3.7-23.8 0-31.2Z" />
      <path d="M32 42.2C23.4 39 17.1 31 15.7 21.2c8.8 2.7 14.7 9.6 16.3 21Z" />
      <path d="M32 42.2c8.6-3.2 14.9-11.2 16.3-21-8.8 2.7-14.7 9.6-16.3 21Z" />
      <path d="M31.4 45.8C20.5 46.3 10.3 40.8 5.3 30.7c10.8-1.1 20.7 4.6 26.1 15.1Z" />
      <path d="M32.6 45.8c10.9.5 21.1-5 26.1-15.1-10.8-1.1-20.7 4.6-26.1 15.1Z" />
    </svg>
  );
}

/** Logo completa (marca + nome) usada no header. */
export function Logo({ className = "" }: MarkProps) {
  return (
    <span className={`flex shrink-0 items-center gap-2.5 ${className}`}>
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-olive-grad text-white shadow-soft">
        <LotusMark className="h-6 w-6" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[0.6rem] uppercase tracking-[0.3em] text-olive">
          Espaço
        </span>
        <span className="font-display text-lg font-semibold">Cuide-se Bem</span>
      </span>
    </span>
  );
}
