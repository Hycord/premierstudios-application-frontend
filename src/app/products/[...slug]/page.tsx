import { Card } from "@/components/ui/card";
import { getProducts } from "@/lib/products"
import { redirect } from "next/navigation";


export async function generateStaticParams() {
    
    return getProducts().map((prod) => ({
      slug: prod.id,
    }))
  }

export default function Page() {
    return redirect('/')
}