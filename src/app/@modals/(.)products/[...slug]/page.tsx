"use client";
import { Modal } from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/lib/contexts/CartContext";
import { useShoppingCart } from "@/lib/hooks/useShoppingCart";
import { getProducts } from "@/lib/products";
import { useLocalStorage } from "@uidotdev/usehooks";
import { MinusIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";



export async function generateStaticParams() {
    
    return getProducts().map((prod) => ({
      slug: prod.id,
    }))
  }

export default function Page({ params: { slug } }: { params: { slug: string[] } }) {
    const product = getProducts().find
        (p => p.id.toString() == slug[0]);
    console.log(slug[0])
    const { cart, setProduct } = useCart();
    if (!product) return redirect('/')
    let item = cart.find(p => p.id == product.id);

    if (!item) item = { count: 0, id: product.id, price: (product.price - (product.price * (product.discountPercentage / 100))) }


    return <Modal><Card className="w-[65ch]">
        <CardHeader>
            <CardTitle className="flex flex-row items-center">
                {product.title}</CardTitle>
            <Image alt={`${product.title} thumbnail`} src={product.thumbnail} width={64} height={64}></Image>
            <CardDescription>{product.description}</CardDescription>
        </CardHeader>
        <CardContent>
            <CardDescription className="px-10 my-5">
                <CardDescription>Rating: {product.rating}</CardDescription>
                <Carousel
                    opts={{
                        align: "center",
                        loop: true,

                    }}>
                    <CarouselContent>
                        {product.reviews.map(r => <CarouselItem key={r.reviewerEmail}><Card><CardHeader><CardTitle>{r.reviewerName}{new Date(r.date).toLocaleString()}</CardTitle><CardDescription>{r.rating} - {r.comment}</CardDescription></CardHeader></Card></CarouselItem>)}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </CardDescription>
            <CardDescription>
                {product.returnPolicy}
            </CardDescription>
            <CardDescription>
                {product.shippingInformation}
            </CardDescription>
                <Separator orientation="horizontal" className="my-5"/>

            {product.brand ? <CardDescription>Brand: {product.brand}</CardDescription> : <></>}
            <CardDescription>Category: {product.category}</CardDescription>


            <CardDescription>SKU: #{product.sku}</CardDescription>
            <CardDescription>Dimensions: {product.dimensions.width}x{product.dimensions.height}x{product.dimensions.depth}</CardDescription>
        </CardContent>
        <CardFooter>
            <div className="flex w-full flex-row items-center justify-between">
                <span className="flex flex-row items-center justify-start gap-1">
                    $<span className="[text-decoration:line-through] text-red-500 text-sm">{product.price.toFixed(2)}</span>
                    <span className="text-green-500">{(product.price - (product.price * (product.discountPercentage / 100))).toFixed(2)}</span>
                </span>
                <div className="flex items-center gap-1">
                    <Button disabled={item.count <= 0} variant="ghost" size="icon" onClick={() => setProduct(product.id, { add: -1 }, (product.price - (product.price * (product.discountPercentage / 100))))}>
                        <MinusIcon className="h-4 w-4" />
                    </Button>
                    <span>{item?.count ?? 0}</span>
                    <Button variant="ghost" size="icon" onClick={() => setProduct(product.id, { add: 1 }, (product.price - (product.price * (product.discountPercentage / 100))))}>
                        <PlusIcon className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </CardFooter>
    </Card>
    </Modal>
}