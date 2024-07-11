import { Product } from "@/lib/products";
import { FunctionComponent } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import Link from "next/link";

interface ProductListingProps {
    product: Product;
}

const ProductListing: FunctionComponent<ProductListingProps> = ({ product }) => {
    return (<div className="flex flex-row w-full grow items-center justify-center"><Card className="flex-col grow flex max-w-[65ch]">
        <CardHeader>
            <CardTitle className="flex flex-row items-center">
                <Image alt={`${product.title} thumbnail`} src={product.thumbnail} width={64} height={64}></Image>
                {product.title}</CardTitle>
            <CardDescription>{product.description}</CardDescription>
        </CardHeader>
        <CardFooter className="flex flex-row items-center justify-between"><span className="flex flex-row items-center justify-start gap-1">${/* <span className="[text-decoration:line-through] text-red-500 text-sm">{product.price.toFixed(2)}</span> */}<span/*  className="text-green-500" */>{(product.price - (product.price * (product.discountPercentage / 100))).toFixed(2)}</span></span><Link href={`/products/${product.id}`}>View Details</Link></CardFooter>
    </Card></div>);
}

export default ProductListing;