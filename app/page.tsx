import Link from "next/link";
import { Shell, ProductCard, SectionHeading, InstagramTile } from "@/app/components/storefront";
import { brand, occasions, products, instagramPosts, editorialHighlights } from "@/app/data/store";

export default function HomePage() {
  return (
    <Shell>
      <main>
        <section className="mx-auto flex min-h-[calc(100vh-50px)] max-w-7xl items-center px-4 pb-8 pt-4 sm:px-6 lg:px-8 lg:pb-10">
          <div className="w-full overflow-hidden rounded-[36px] border border-[#e9e1d7] bg-[#f4efe8] shadow-[0_30px_80px_rgba(34,26,18,0.06)]">
            <div className="grid items-center gap-6 px-5 py-5 md:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-10 lg:py-6">
              <div className="max-w-xl">
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.34em] text-[#697a68]">
                  {brand.tagline}
                </p>
                <h1 className="font-editorial text-4xl leading-[0.95] text-[#1b261d] sm:text-5xl lg:text-[4rem]">
                  Flores para dizer
                  <span className="block text-[#23472b]">o que palavras não conseguem.</span>
                </h1>
                <p className="mt-5 max-w-lg text-base leading-7 text-[#4e5f4f] sm:text-lg">
                  Buquês, arranjos e presentes para transformar momentos especiais em lembranças.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/catalog"
                    className="inline-flex items-center justify-center rounded-full bg-[#1d3d28] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[#163122]"
                  >
                    Ver catálogo
                  </Link>
                  <a
                    href="https://wa.me/5575981074550"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-[#d6cdc0] bg-white px-6 py-3.5 text-sm font-medium text-[#1f3328] transition hover:border-[#9db09a]"
                  >
                    Falar no WhatsApp
                  </a>
                </div>

                <div className="mt-4 flex items-center gap-4 text-sm text-[#465745]">
                  <div className="flex items-center gap-2 rounded-full border border-[#d9d2c8] bg-white/70 px-3 py-2">
                    <span className="inline-block h-2 w-2.5 rounded-full bg-[#7fa06e]" />
                    Feira de Santana • BA
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-6 top-12 hidden h-28 w-28 rounded-full border border-[#d5c9bf] bg-[#f7f0d4] lg:block" />
                <div className="relative overflow-hidden rounded-[32px] border border-[#e6dacd] bg-[#e8e2d6] p-3">
                  <img
                    src="https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=1200&q=80"
                    alt="Buquê floral de rosas e flores naturais"
                    className="h-[430px] w-full rounded-[26px] object-cover lg:h-[470px]"
                  />
                </div>
                <div className="absolute -bottom-4 left-5 rounded-[24px] border border-white/80 bg-white/80 px-4 py-3 shadow-[0_20px_40px_rgba(44,37,30,0.12)] backdrop-blur-sm">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-[#6f7d67]">Presente ideal</p>
                  <p className="mt-1 font-serif text-3xl text-[#1d2a1e]">Rosas & vida</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="ocasiões" className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Ocasiões"
            title="Para qual momento?"
            description="Escolha o que você quer dizer. A gente cuida das flores."
          />

          <div className="mt-8 overflow-x-auto pb-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex min-w-max gap-5">
              {occasions.map((occasion, index) => (
                <Link
                  key={occasion.id}
                  href={`/catalog?occasion=${occasion.id}`}
                  className="group block w-[280px] shrink-0 overflow-hidden rounded-[28px] border border-[#eadfd5] bg-[#fffdfc] shadow-[0_20px_60px_rgba(32,28,22,0.04)] transition hover:-translate-y-1 sm:w-[300px]"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={occasion.image}
                      alt={occasion.title}
                      className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                      style={{ filter: index % 2 === 0 ? "saturate(1.05)" : "contrast(1.03)" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1b221d]/55 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                      <p className="text-[10px] uppercase tracking-[0.26em] text-[#eef3ee]">Ocasião</p>
                      <h3 className="mt-2 font-serif text-4xl leading-none">{occasion.title}</h3>
                    </div>
                  </div>
                  <div className="p-4 text-sm text-[#4f5a4d]">{occasion.description}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Seleção"
            title="Os favoritos da Souza Flores"
            description="Veja as combinações mais desejadas para presentear com presença e afeto."
          />
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                category={product.category}
                price={product.price}
                description={product.description}
                image={product.image}
                href={`/produto/${product.slug}`}
                accent={product.accent}
              />
            ))}
          </div>
        </section>

        <section className="bg-[#efe8df] py-16">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
            <div className="rounded-[32px] border border-[#e2d8cf] bg-[#f9f5f1] p-5 shadow-[0_30px_80px_rgba(45,39,30,0.04)] sm:p-8">
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#6d7e69]">Entrega</p>
              <h2 className="mt-4 font-serif text-5xl leading-none text-[#1b251d]">A experiência continua até a entrega.</h2>
              <div className="mt-8 space-y-5 text-[#455a49]">
                <div className="flex gap-4 rounded-[20px] border border-[#e4d8cd] bg-white p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#edf3ea] text-xl text-[#21402c]">01</div>
                  <div>
                    <p className="font-semibold text-[#1c2b1f]">Personalize o presente</p>
                    <p className="mt-1 text-sm leading-6">Adicione flores, detalhes e uma mensagem especial.</p>
                  </div>
                </div>
                <div className="flex gap-4 rounded-[20px] border border-[#e4d8cd] bg-white p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#edf3ea] text-xl text-[#21402c]">02</div>
                  <div>
                    <p className="font-semibold text-[#1c2b1f]">Escolha a entrega</p>
                    <p className="mt-1 text-sm leading-6">Defina o destino, a data e os detalhes do endereço.</p>
                  </div>
                </div>
                <div className="flex gap-4 rounded-[20px] border border-[#e4d8cd] bg-white p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#edf3ea] text-xl text-[#21402c]">03</div>
                  <div>
                    <p className="font-semibold text-[#1c2b1f]">Finalize com confiança</p>
                    <p className="mt-1 text-sm leading-6">Checkout simples e comunicação clara em cada etapa.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[32px] border border-[#e4d7cc] bg-[#dfe8d6] p-4 shadow-[0_30px_80px_rgba(45,39,30,0.05)]">
              <img
                src="https://images.unsplash.com/photo-1468327768560-75b778cbb551?auto=format&fit=crop&w=1200&q=80"
                alt="Presentes florais em cenário acolhedor"
                className="h-full min-h-[430px] w-full rounded-[24px] object-cover"
              />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[36px] border border-[#e8dbcf] bg-[#fefdfb] p-6 shadow-[0_30px_80px_rgba(38,31,24,0.04)] lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-[#6a7a68]">Storytelling</p>
                <h2 className="mt-4 font-serif text-5xl leading-none text-[#1b251d] sm:text-6xl">
                  Alguns presentes são esquecidos.
                  <span className="block text-[#2f5637]">Outros viram memória.</span>
                </h2>
              </div>
              <div className="relative overflow-hidden rounded-[30px] border border-[#eadbcf] bg-[#f4efe8] p-3">
                <img
                  src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80"
                  alt="Composição floral editorial"
                  className="h-[420px] w-full rounded-[22px] object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Local"
              title="De Feira de Santana para todos os momentos."
              description="Uma floricultura com identidade local, acolhedora e presente em cada gesto."
            />
            <Link href="/catalog" className="hidden rounded-full border border-[#d8d0c6] bg-white px-5 py-3 text-sm font-medium text-[#1d3327] transition hover:border-[#9cb29d] sm:inline-flex">
              Ver catálogo
            </Link>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {editorialHighlights.map((item) => (
              <div key={item.title} className="rounded-[28px] border border-[#e7dccd] bg-[#fffdfb] p-6 shadow-[0_18px_50px_rgba(33,29,22,0.04)]">
                <p className="font-serif text-4xl text-[#1f2b23]">{item.title}</p>
                <p className="mt-4 text-sm leading-7 text-[#4d5d4e]">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[34px] border border-[#e7dacd] bg-[#1d3d28] p-6 text-white shadow-[0_30px_80px_rgba(22,42,26,0.12)] sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-center">
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-[#dfead8]">Agendamento</p>
                <h2 className="mt-4 font-serif text-5xl leading-none text-white sm:text-6xl">
                  Seu presente pode ser agendado com a gente.
                </h2>
                <p className="mt-4 max-w-xl text-base leading-7 text-[#e4eee1]">
                  Fale com a Souza Flores para escolher o momento ideal, personalizar o presente e confirmar a entrega com atenção.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/agendamento"
                    className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3.5 text-sm font-medium text-[#173a25] transition hover:bg-[#f1f6ef]"
                  >
                    Agendar pelo site
                  </Link>
                  <a
                    href={brand.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-white/30 bg-transparent px-5 py-3.5 text-sm font-medium text-white transition hover:border-white/60"
                  >
                    Conversar no Instagram
                  </a>
                </div>
              </div>

              <div className="rounded-[28px] border border-white/15 bg-white/6 p-5 backdrop-blur-sm">
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#d9e3d5]">Contatos</p>
                <ul className="mt-5 space-y-3 text-sm text-[#eef5ee]">
                  {brand.phones.map((phone) => (
                    <li key={phone} className="rounded-full border border-white/15 bg-[#ffffff0a] px-4 py-3">
                      <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="hover:text-white">
                        {phone}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 rounded-[20px] border border-white/15 bg-[#f3f7f0] p-4 text-[#173a25]">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-[#5c6f5d]">Instagram</p>
                  <p className="mt-2 text-lg font-medium">{brand.instagram}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Instagram"
              title="Mais Souza Flores"
              description="A presença digital da marca, em fotos e histórias que traduzem a energia do dia a dia."
            />
            <a
              href={brand.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-full bg-[#1d3d28] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#163122] sm:inline-flex"
            >
              Conhecer nosso Instagram
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {instagramPosts.map((src, index) => (
              <InstagramTile key={src + index} src={src} alt={`${brand.instagram} image ${index + 1}`} />
            ))}
          </div>
        </section>

        <section className="border-t border-[#e7ddd0] bg-[#f2eee9]">
          <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#6d7d68]">Atendimento</p>
              <h2 className="mt-2 font-serif text-5xl text-[#1d2a1e]">Flores para todas as ocasiões.</h2>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-[#36473a]">
              {brand.phones.map((phone) => (
                <span key={phone} className="rounded-full border border-[#d9d0c3] bg-white px-4 py-2">
                  {phone}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Shell>
  );
}
