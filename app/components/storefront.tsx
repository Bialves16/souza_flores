import Link from "next/link";
import type { ReactNode } from "react";
import { brand, navItems } from "@/app/data/store";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#e9e3dc] bg-[#f6f1ea]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Souza Flores home">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c8d3c0] bg-[#eef4ea] text-lg font-semibold text-[#23472b]">
            S
          </div>
          <div>
            <p className="font-serif text-2xl leading-none text-[#1e2b20]">Souza Flores</p>
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#667267]">{brand.tagline}</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-[#3d463d] md:flex">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="transition hover:text-[#23472b]">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 text-sm text-[#243527]">
          <button className="hidden rounded-full border border-[#d8d0c8] bg-white px-3 py-2 transition hover:border-[#93a68d] sm:inline-flex">
            Buscar
          </button>
          <button className="inline-flex rounded-full border border-[#d8d0c8] bg-white px-3 py-2 transition hover:border-[#93a68d]">
            Carrinho (0)
          </button>
        </div>
      </div>
    </header>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-xl"}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.28em] text-[#6c7d68]">{eyebrow}</p>
      ) : null}
      <h2 className="font-serif text-4xl leading-none text-[#1d2a1e] sm:text-5xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-7 text-[#4d5b4e]">{description}</p> : null}
    </div>
  );
}

export function ProductCard({
  name,
  category,
  price,
  description,
  image,
  href,
  accent,
}: {
  name: string;
  category: string;
  price: string;
  description: string;
  image: string;
  href: string;
  accent: string;
}) {
  return (
    <article className="group overflow-hidden rounded-[30px] border border-[#ecdfd7] bg-white shadow-[0_20px_60px_rgba(34,33,31,0.05)] transition hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(34,33,31,0.08)]">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-80 w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <button
          type="button"
          className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/80 bg-white/80 text-lg text-[#2d4134] shadow-sm backdrop-blur-sm"
          aria-label={`Favoritar ${name}`}
        >
          ♡
        </button>
        <div
          className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-full border border-white/70 bg-white/75 px-3 py-2 text-xs font-medium uppercase tracking-[0.22em] text-[#1d2a1e] backdrop-blur-sm"
        >
          <span>{category}</span>
          <span className={`inline-block h-2.5 w-2.5 rounded-full ${accentClass(accent)}`} />
        </div>
      </div>
      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.26em] text-[#7c8677]">{category}</p>
            <h3 className="mt-2 font-serif text-3xl text-[#1c241d]">{name}</h3>
          </div>
          <span className="text-lg font-semibold text-[#1d2a1e]">{price}</span>
        </div>
        <p className="text-sm leading-6 text-[#536154]">{description}</p>
        <div className="flex items-center justify-between gap-3 pt-2">
          <Link
            href={href}
            className="inline-flex items-center justify-center rounded-full bg-[#1d3d28] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#163122]"
          >
            Ver presente
          </Link>
          <button className="inline-flex items-center justify-center rounded-full border border-[#d3c8be] bg-[#fbf8f4] px-4 py-2.5 text-sm font-medium text-[#213626] transition hover:border-[#9caf9c]">
            + Adicionar
          </button>
        </div>
      </div>
    </article>
  );
}

function accentClass(accent: string) {
  const colors: Record<string, string> = {
    rose: "bg-[#dc6a63]",
    sunflower: "bg-[#e9c75b]",
    green: "bg-[#7da06b]",
    pink: "bg-[#d69caa]",
  };

  return colors[accent] ?? "bg-[#d5c7b7]";
}

export function InstagramTile({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="group overflow-hidden rounded-[24px] border border-[#e7ddd4] bg-[#f4efe9]">
      <img
        src={src}
        alt={alt}
        className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
      />
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-[#e7dfd5] bg-[#f8f4ef]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.5fr_1fr_1fr_1.5fr] lg:px-8">
        <div>
          <p className="font-serif text-4xl text-[#1d2a1e]">Souza Flores</p>
          <p className="mt-3 text-base text-[#58655b]">{brand.tagline}</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[#6d7a6a]">Comprar</p>
          <ul className="mt-4 space-y-3 text-sm text-[#3d463d]">
            <li><Link href="/catalog?category=buques">Buquês</Link></li>
            <li><Link href="/catalog?category=arranjos">Arranjos</Link></li>
            <li><Link href="/catalog?category=cestas">Cestas</Link></li>
            <li><Link href="/catalog?category=presentes">Presentes</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[#6d7a6a]">Ajuda</p>
          <ul className="mt-4 space-y-3 text-sm text-[#3d463d]">
            <li><Link href="/catalog">Pedidos</Link></li>
            <li><Link href="/catalog">Entrega</Link></li>
            <li><Link href="/catalog">Pagamento</Link></li>
            <li><Link href="/catalog">Contato</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[#6d7a6a]">Contato</p>
          <ul className="mt-4 space-y-3 text-sm text-[#3d463d]">
            {brand.phones.map((phone) => (
              <li key={phone}>{phone}</li>
            ))}
            <li><a href={brand.instagramUrl} target="_blank" rel="noreferrer">{brand.instagram}</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f7f3ee] text-[#18241a]">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
