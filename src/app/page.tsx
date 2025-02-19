import ProductListing from "@/components/ProductListing";
import ShoppingCart from "@/components/ShoppingCart";
import { getProducts } from "@/lib/products";

export default function Home() {
  const products = getProducts();


  return (
    <>
      <main className="flex min-h-screen w-full flex-col bg-background">
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 lg:gap-8 lg:grid-cols-3 xl:grid-cols-3">
            <div className="flex flex-col items-center gap-4 lg:gap-8 lg:col-span-2">
              {products.map(p => <ProductListing key={p.id} product={p} />)}
            </div>
            <div className="w-full sticky bottom-5 rounded-md lg:top-20">
              <ShoppingCart />
            </div>
          </main>
        </div>
      </main></>
  );
}
