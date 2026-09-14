import Link from "next/link";
import { Shell } from "@/app/components/storefront";

const schedulingOptions = [
  "Entrega em data específica",
  "Presente para hoje",
  "Presente para amanhã",
  "Presente para data especial",
  "Entrega com cartão e mensagem",
];

export default function SchedulingPage() {
  return (
    <Shell>
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3 text-sm text-[#526152]">
          <Link href="/">Home</Link>
          <span>›</span>
          <span className="text-[#1d2a1e]">Agendamento</span>
        </div>

        <section className="grid gap-8 overflow-hidden rounded-[34px] border border-[#e8dcd0] bg-[#fffdfb] p-6 shadow-[0_30px_80px_rgba(32,28,22,0.04)] lg:grid-cols-[1.05fr_0.95fr] lg:p-8">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#72866d]">Agende seu presente</p>
            <h1 className="mt-4 font-serif text-xl leading-none text-[#1d2a1e] sm:text-6xl">
              Escolha o momento ideal para surpreender.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-[#495c49]">
              Defina quando você quer que o presente chegue e personalize a experiência com flores, mensagem e entrega.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {schedulingOptions.map((option) => (
                <div key={option} className="rounded-[20px] border border-[#e8dfd8] bg-[#f7f2ed] px-4 py-3 text-sm text-[#2d3d30]">
                  {option}
                </div>
              ))}
            </div>
          </div>

          <form className="rounded-[28px] border border-[#e7ddd4] bg-[#f6f0ea] p-5 sm:p-6">
            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.24em] text-[#6d7a67]">Quem receberá?</label>
                <input
                  type="text"
                  placeholder="Nome"
                  className="w-full rounded-full border border-[#d9cec3] bg-white px-4 py-3 text-sm text-[#1d2a1e] outline-none focus:border-[#8ea38f]"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.24em] text-[#6d7a67]">Telefone</label>
                <input
                  type="tel"
                  placeholder="(75) 9 1234-5678"
                  className="w-full rounded-full border border-[#d9cec3] bg-white px-4 py-3 text-sm text-[#1d2a1e] outline-none focus:border-[#8ea38f]"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.24em] text-[#6d7a67]">Data desejada</label>
                <input
                  type="date"
                  className="w-full rounded-full border border-[#d9cec3] bg-white px-4 py-3 text-sm text-[#1d2a1e] outline-none focus:border-[#8ea38f]"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.24em] text-[#6d7a67]">Mensagem</label>
                <textarea
                  rows={4}
                  placeholder="Escreva uma mensagem especial para a pessoa querida..."
                  className="w-full rounded-[20px] border border-[#d9cec3] bg-white px-4 py-3 text-sm text-[#1d2a1e] outline-none focus:border-[#8ea38f]"
                />
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-full bg-[#1d3d28] px-5 py-3.5 text-sm font-medium text-white transition hover:bg-[#163122]"
              >
                Confirmar agendamento
              </button>
            </div>
          </form>
        </section>
      </main>
    </Shell>
  );
}
