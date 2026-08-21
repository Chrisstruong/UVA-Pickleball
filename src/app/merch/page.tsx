"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Mail,
  ShoppingBag,
  BadgeDollarSign,
  Heart,
} from "lucide-react";

const products = [
  {
    name: "Watercolor Club Tee",
    price: "$31.99",
    color: "White",
    images: [
      "/images/merch/watercolor-front.png",
      "/images/merch/watercolor-back.png",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    name: "Split V Tee",
    price: "$29.99",
    color: "Light Blue",
    images: [
      "/images/merch/splitV-front.png",
      "/images/merch/splitV-back.png",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
];

const orderEmail =
  "https://mail.google.com/mail/?view=cm&fs=1&to=pickleatuva@gmail.com&su=UVA%20Pickleball%20Merch%20Order";

function ProductCard({
  product,
}: {
  product: (typeof products)[number];
}) {
  const [currentImage, setCurrentImage] = useState(0);

  function showPrevious() {
    setCurrentImage((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  }

  function showNext() {
    setCurrentImage((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  }

  return (
    <article className="w-full max-w-[430px] overflow-hidden rounded-2xl border border-[#e2e7ec] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Image Carousel */}
      <div className="relative h-[380px] w-full overflow-hidden bg-white">
        <Image
          src={product.images[currentImage]}
          alt={`${product.name} image ${currentImage + 1}`}
          fill
          className="object-contain p-2"
          sizes="(max-width: 768px) 100vw, 430px"
        />

        <button
          type="button"
          onClick={showPrevious}
          aria-label="Previous product image"
          className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white/90 shadow-sm transition hover:bg-white"
        >
          <ChevronLeft className="h-5 w-5 text-[#07192d]" />
        </button>

        <button
          type="button"
          onClick={showNext}
          aria-label="Next product image"
          className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white/90 shadow-sm transition hover:bg-white"
        >
          <ChevronRight className="h-5 w-5 text-[#07192d]" />
        </button>

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-[#07192d]/90 px-3 py-1 text-xs font-semibold text-white">
          {currentImage + 1} / {product.images.length}
        </div>
      </div>

      {/* Product Info */}
      <div className="border-t border-[#edf0f3] p-5">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-lg font-bold leading-snug text-[#07192d]">
            {product.name}
          </h2>

          <p className="shrink-0 text-base font-bold text-[#C45400]">
            {product.price}
          </p>
        </div>

        <p className="mt-2 text-sm text-[#596579]">
          Color:{" "}
          <span className="font-medium text-[#29384d]">
            {product.color}
          </span>
        </p>

        <div className="mt-4">
          <p className="mb-2 text-sm font-semibold text-[#07192d]">
            Sizes
          </p>

          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <span
                key={size}
                className="flex h-8 min-w-9 items-center justify-center rounded-md border border-[#cbd2da] px-2 text-xs font-medium text-[#26364b]"
              >
                {size}
              </span>
            ))}
          </div>
        </div>

        <Link
          href={orderEmail}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-[#E57200] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#c85f00]"
        >
          <Mail className="h-4 w-4" />
          Email to Order
        </Link>
      </div>
    </article>
  );
}

export default function MerchPage() {
  return (
    <main className="min-h-screen bg-[#f8f9fa]">
      <section className="mx-auto max-w-[1350px] px-6 py-14 md:px-10">
        {/* Heading */}
        <div className="mb-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.22em] text-[#E57200]">
            UVA Pickleball
          </p>

          <h1 className="text-4xl font-black tracking-tight text-[#07192d] sm:text-5xl">
            Official Merchandise
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-[#46556b]">
            Represent the club on and off the court. Shop UVA Pickleball gear and
            support our growing community.
          </p>
        </div>

        {/* Smaller Product Cards */}
        <div className="flex flex-wrap justify-start gap-6">
          {products.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>

        {/* How to Order */}
        <section className="mt-12 overflow-hidden rounded-2xl border border-[#f2c9aa] bg-[#fffaf6]">
          <div className="grid lg:grid-cols-[1.05fr_1fr_1fr]">
            <div className="flex gap-5 p-7 lg:border-r lg:border-[#efd4bf]">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#E57200] bg-white text-[#E57200]">
                <ShoppingBag className="h-6 w-6" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#07192d]">
                  How to Order
                </h2>

                <p className="mt-2 max-w-sm text-sm leading-6 text-[#566277]">
                  Our online shopping cart is coming soon. For now, follow
                  these steps to place your order.
                </p>
              </div>
            </div>

            <div className="border-t border-[#efd4bf] p-7 lg:border-r lg:border-t-0">
              <div className="flex gap-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#07192d] text-sm font-bold text-white">
                  1
                </div>

                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <Mail className="h-5 w-5 text-[#E57200]" />
                    <h3 className="font-bold text-[#07192d]">
                      Contact Us
                    </h3>
                  </div>

                  <p className="text-sm leading-6 text-[#566277]">
                    Email us your name, shirt selection, and size at{" "}
                    <Link
                      href={orderEmail}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-[#E57200] hover:underline"
                    >
                      pickleatuva@gmail.com
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-[#efd4bf] p-7 lg:border-t-0">
              <div className="flex gap-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#07192d] text-sm font-bold text-white">
                  2
                </div>

                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <BadgeDollarSign className="h-5 w-5 text-[#E57200]" />
                    <h3 className="font-bold text-[#07192d]">
                      Pay with Zelle
                    </h3>
                  </div>

                  <p className="text-sm leading-6 text-[#566277]">
                    Once your order is confirmed, send payment through Zelle
                    to{" "}
                    <span className="font-semibold text-[#E57200]">
                      pickleatuva@gmail.com
                    </span>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Support */}
        <div className="mt-5 flex gap-3 rounded-xl border border-[#dce2e8] bg-white px-6 py-5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#07192d] text-white">
            <Heart className="h-4 w-4" />
          </div>

          <p className="text-sm text-[#4e5b6e]">
            <span className="font-bold text-[#07192d]">
              Thank you for supporting UVA Pickleball Club!
            </span>{" "}
            Your purchase helps support club events, equipment, and our
            community.
          </p>
        </div>
      </section>
    </main>
  );
}