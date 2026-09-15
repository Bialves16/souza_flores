import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton, Shell } from "@/app/components/storefront";
import { products } from "@/app/data/store";

export async function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return { title: "Produto não encontrado | Souza Flores" };
  }

  return {
    title: `${product.name} | Souza Flores`,
    description: product.description,
  };
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <Shell>
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3 text-sm text-[#516452]">
          <Link href="/">Home</Link>
          <span>›</span>
          <Link href="/catalog">Catálogo</Link>
          <span>›</span>
          <span className="text-[#1e2b20]">{product.name}</span>
        </div>

        <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="overflow-hidden rounded-[30px] border border-[#ebdfd6] bg-white p-4 shadow-[0_20px_60px_rgba(30,32,28,0.05)]">
            <img src={product.image} alt={product.name} className="h-[560px] w-full rounded-[24px] object-cover" />
          </div>

          <div className="rounded-[30px] border border-[#ebdfd6] bg-[#fffdfb] p-6 shadow-[0_20px_60px_rgba(30,32,28,0.05)] sm:p-8">
            <p className="text-xs uppercase tracking-[0.28em] text-[#6f856f]">{product.category}</p>
            <h1 className="mt-4 font-editorial text-4xl leading-none text-[#1d2a1e] sm:text-5xl">{product.name}</h1>
            <p className="mt-4 text-3xl font-semibold text-[#1d2a1e]">{product.price}</p>
            <p className="mt-5 text-base leading-7 text-[#4d5b4e]">{product.description}</p>

            <div className="mt-8 space-y-3 rounded-[24px] border border-[#e8ddd3] bg-[#f6f0ea] p-4 text-sm text-[#3d463d]">
              <div className="flex items-center justify-between">
                <span>Disponibilidade</span>
                <span className="font-medium text-[#21402c]">Disponível hoje</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Entrega</span>
                <span className="font-medium text-[#21402c]">Personalizável</span>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <AddToCartButton
                product={{
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                }}
              />
              <button className="inline-flex items-center justify-center rounded-full border border-[#d8d0c8] bg-white px-5 py-3.5 text-sm font-medium text-[#213627] transition hover:border-[#9caf9c]">
                ❤️ Favoritar
              </button>
            </div>

            <div className="mt-8 border-t border-[#e8dfd5] pt-6">
              <p className="text-xs uppercase tracking-[0.26em] text-[#6a7a65]">Mensagem especial</p>
              <p className="mt-3 text-sm leading-7 text-[#465845]">
                Você pode incluir uma mensagem para tornar o presente ainda mais pessoal.
              </p>
            </div>
          </div>
        </section>
      </main>
    </Shell>
  );
}
