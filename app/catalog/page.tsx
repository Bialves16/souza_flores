import Link from "next/link";
import { Shell, ProductCard, SectionHeading } from "@/app/components/storefront";
import { products } from "@/app/data/store";

export default function CatalogPage() {
  return (
    <Shell>
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="mb-10 rounded-[32px] border border-[#e8dfd6] bg-[#fffdfb] p-8 shadow-[0_20px_60px_rgba(28,32,24,0.04)]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-[#73886d]">Catálogo</p>
              <h1 className="mt-3 font-serif text-4xl text-[#1d2a1e] sm:text-5xl">Flores para cada momento.</h1>
            </div>
            <div className="flex w-full max-w-xl items-center gap-3 rounded-full border border-[#d9d1c8] bg-[#f6f1ea] px-4 py-3">
              <span className="text-lg">⌕</span>
              <input
                aria-label="Buscar flores"
                placeholder="Busque flores, presentes, ocasiões..."
                className="w-full bg-transparent text-sm text-[#303b31] placeholder:text-[#788279] focus:outline-none"
              />
            </div>
          </div>
        </section>

        <div className="mb-8 flex flex-wrap gap-3 text-sm text-[#324233]">
          {[
            "Tudo",
            "Buquês",
            "Arranjos",
            "Cestas",
            "Presentes",
            "Amor",
            "Aniversário",
            "Parabéns",
          ].map((tag) => (
            <button
              key={tag}
              className="rounded-full border border-[#d9d4ce] bg-white px-4 py-2 transition hover:border-[#8fa58d]"
            >
              {tag}
            </button>
          ))}
        </div>

        <section className="mb-6">
          <SectionHeading
            eyebrow="Seleção"
            title="Os favoritos da Souza Flores"
            description="Pequenos presentes, grandes lembranças."
          />
        </section>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
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

        <div className="mt-12 rounded-[30px] border border-[#e5d9cf] bg-[#f5efe8] p-8">
          <Link href="/" className="inline-flex rounded-full bg-[#1d3d28] px-5 py-3 text-sm font-medium text-white">
            Voltar para home
          </Link>
        </div>
      </main>
    </Shell>
  );
}
