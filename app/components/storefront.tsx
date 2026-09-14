"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Minus, Plus, Search, ShoppingCart, X } from "lucide-react";
import { brand, navItems } from "@/app/data/store";

type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  isCartOpen: boolean;
  cartCount: number;
  subtotal: number;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: { id: string; name: string; price: string; image: string }) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);
const STORAGE_KEY = "souza-flores-cart";

function parsePrice(value: string) {
  const sanitized = Number(value.replace(/[^\d,.-]/g, "").replace(",", "."));
  return Number.isFinite(sanitized) ? sanitized : 0;
}

function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as CartItem[];
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      } catch {
        setItems([]);
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (product: { id: string; name: string; price: string; image: string }) => {
    setItems((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [
        ...current,
        {
          id: product.id,
          name: product.name,
          price: parsePrice(product.price),
          image: product.image,
          quantity: 1,
        },
      ];
    });

    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((current) =>
      current
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  const cartCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );

  return (
    <CartContext.Provider
      value={{
        items,
        isCartOpen,
        cartCount,
        subtotal,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        addItem,
        updateQuantity,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}

function CartDrawer() {
  const { items, isCartOpen, closeCart, updateQuantity, removeItem, subtotal } = useCart();

  if (!isCartOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#1f251f]/35 backdrop-blur-[1px]">
      <div className="ml-auto flex h-full w-full max-w-md flex-col bg-[#fffdfb] p-5 shadow-[0_0_40px_rgba(20,23,19,0.12)]">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-lg font-medium text-[#1d2a1e]">Carrinho</p>
          <button
            type="button"
            onClick={closeCart}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#d8d0c8] bg-white text-[#243527]"
            aria-label="Fechar carrinho"
          >
            <X size={16} strokeWidth={2.1} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="mt-8 flex flex-1 items-center justify-center rounded-[24px] border border-dashed border-[#d9cec3] bg-[#f8f4f0] p-5 text-center text-sm text-[#536154]">
            Seu carrinho está vazio.
          </div>
        ) : (
          <div className="flex flex-1 flex-col gap-3 overflow-y-auto pb-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3 rounded-[20px] border border-[#eadfd5] bg-[#f7f1eb] p-3">
                <img src={item.image} alt={item.name} className="h-20 w-20 rounded-[16px] object-cover" />
                <div className="flex min-w-0 flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium text-[#1d2a1e]">{item.name}</p>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-[10px] uppercase tracking-[0.14em] text-[#6f7f6f]"
                    >
                      Remover
                    </button>
                  </div>

                  <div className="mt-2 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 rounded-full border border-[#d8d0c8] bg-white px-2 py-1">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="inline-flex h-6 w-6 items-center justify-center text-[#243527]"
                        aria-label={`Diminuir quantidade de ${item.name}`}
                      >
                        <Minus size={12} strokeWidth={2.2} />
                      </button>
                      <span className="min-w-5 text-center text-xs text-[#1d2a1e]">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="inline-flex h-6 w-6 items-center justify-center text-[#243527]"
                        aria-label={`Aumentar quantidade de ${item.name}`}
                      >
                        <Plus size={12} strokeWidth={2.2} />
                      </button>
                    </div>
                    <span className="text-sm font-medium text-[#1d2a1e]">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 border-t border-[#e7dfd5] pt-4">
          <div className="mb-3 flex items-center justify-between text-sm text-[#495b49]">
            <span>Subtotal</span>
            <span className="font-medium text-[#1d2a1e]">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(subtotal)}
            </span>
          </div>
          <button
            type="button"
            className="inline-flex w-full items-center justify-center rounded-full bg-[#1d3d28] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#163122]"
          >
            Finalizar pedido
          </button>
        </div>
      </div>
    </div>
  );
}

export function AddToCartButton({
  product,
  compact = false,
}: {
  product: { id: string | number; name: string; price: string; image: string };
  compact?: boolean;
}) {
  const { addItem } = useCart();

  return (
    <button
      type="button"
      onClick={() =>
        addItem({
          id: String(product.id),
          name: product.name,
          price: product.price,
          image: product.image,
        })
      }
      className={compact
        ? "inline-flex items-center justify-center rounded-full border border-[#d3c8be] bg-[#fbf8f4] px-3.5 py-2 text-xs font-medium text-[#213626] transition hover:border-[#9caf9c]"
        : "inline-flex flex-1 items-center justify-center rounded-full bg-[#1d3d28] px-5 py-3.5 text-sm font-medium text-white transition hover:bg-[#163122]"}
    >
      {compact ? "+ Adicionar" : "Adicionar ao meu presente"}
    </button>
  );
}

export function Header() {
  const { cartCount, openCart } = useCart();

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
          <Link
            href="/catalog"
            aria-label="Buscar"
            title="Buscar"
            className="hidden rounded-full border border-[#d8d0c8] bg-white p-2.5 text-[#243527] transition hover:border-[#93a68d] hover:text-[#23472b] sm:inline-flex"
          >
            <Search size={16} strokeWidth={2.2} aria-hidden="true" />
          </Link>
          <button
            type="button"
            aria-label="Carrinho"
            title="Carrinho"
            onClick={openCart}
            className="relative inline-flex rounded-full border border-[#d8d0c8] bg-white p-2.5 text-[#243527] transition hover:border-[#93a68d] hover:text-[#23472b]"
          >
            <ShoppingCart size={16} strokeWidth={2.2} aria-hidden="true" />
            {cartCount > 0 ? (
              <span className="absolute -right-1.5 -top-1.5 inline-flex min-h-4 min-w-4 items-center justify-center rounded-full bg-[#23472b] px-1 text-[9px] font-semibold text-white">
                {cartCount}
              </span>
            ) : null}
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
    <article className="group overflow-hidden rounded-[26px] border border-[#ecdfd7] bg-white shadow-[0_16px_50px_rgba(34,33,31,0.04)] transition hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(34,33,31,0.08)]">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <button
          type="button"
          className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/80 bg-white/80 text-base text-[#2d4134] shadow-sm backdrop-blur-sm"
          aria-label={`Favoritar ${name}`}
        >
          ♡
        </button>
        <div
          className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-full border border-white/70 bg-white/75 px-2.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-[#1d2a1e] backdrop-blur-sm"
        >
          <span>{category}</span>
          <span className={`inline-block h-2 w-2 rounded-full ${accentClass(accent)}`} />
        </div>
      </div>
      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#7c8677]">{category}</p>
            <h3 className="mt-2 font-serif text-2xl leading-none text-[#1c241d]">{name}</h3>
          </div>
          <span className="text-base font-semibold text-[#1d2a1e]">{price}</span>
        </div>
        <p className="text-sm leading-6 text-[#536154]">{description}</p>
        <div className="flex items-center justify-between gap-3 pt-1">
          <Link
            href={href}
            className="inline-flex items-center justify-center rounded-full bg-[#1d3d28] px-3.5 py-2 text-xs font-medium text-white transition hover:bg-[#163122]"
          >
            Ver presente
          </Link>
          <AddToCartButton
            product={{ id: name, name, price, image }}
            compact
          />
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
    <CartProvider>
      <div className="min-h-screen bg-[#f7f3ee] text-[#18241a]">
        <Header />
        {children}
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}
