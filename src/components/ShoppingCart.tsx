"use client";
import { FunctionComponent, useEffect } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { getProducts } from "@/lib/products";
import { ChevronDown, ChevronDownIcon, Divide, MinusIcon, PlusIcon, Trash } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useCart } from "@/lib/contexts/CartContext";
import { ScrollArea } from "./ui/scroll-area";

interface ShoppingCartProps {

}

const ShoppingCart: FunctionComponent<ShoppingCartProps> = () => {

    const products = getProducts();
  const { cart, total, setCart, empty, setProduct } = useCart();


    return (<div className="w-full max-w-2xl mx-auto">
        <Collapsible className="border-2 border-foreground/60 rounded-lg" defaultOpen>
            <CollapsibleTrigger className="flex items-center rounded-md justify-end px-4 py-3 w-full bg-background hover:bg-muted">
                <div className="flex items-center gap-2">
                    <span className="font-semibold">Total: ${total().toFixed(2)}</span>
                    <Button variant="ghost" size="icon">
                        <ChevronDownIcon className="h-4 w-4" />
                    </Button>
                </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-6 text-sm rounded-md bg-background">
                <div className="grid gap-3">

                    <div className="font-semibold">Order Items</div>
                    <ScrollArea className="max-h-32 lg:max-h-64">
                        {cart.map(i => {
                            const item = products.find(it => it.id == i.id);
                            if (!item) return <>Invalid Item</>
                            return (<div key={item.id} className="flex items-center justify-between">
                                    <span className="text-muted-foreground">{item.title}</span>
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1">
                                        <Button variant="ghost" size="icon" onClick={() => setProduct(item.id, { add: -1 }, (item.price - (item.price * (item.discountPercentage/100))))}>
                                            <MinusIcon className="h-4 w-4" />
                                        </Button>
                                        <span>{i.count}</span>
                                        <Button variant="ghost" size="icon" onClick={() => setProduct(item.id, {add: 1}, (item.price - (item.price * (item.discountPercentage/100))))}>
                                            <PlusIcon className="h-4 w-4" />
                                        </Button>
                                    </div>
                                <span>$<span className="[text-decoration:line-through] text-red-500 text-sm">{(i.count * item.price).toFixed(2)}</span><span className="text-green-500">{(i.count * item.price - (item.price * (item.discountPercentage / 100))).toFixed(2)}</span></span>
                                </div>
                            </div>)
                        })}
                    </ScrollArea>
                    <Separator className="my-2" />
                    <div className="flex items-center justify-between font-semibold">
                        <span className="text-muted-foreground">Total</span>
                        <span>${total().toFixed(2)}</span>
                        
                    </div>
                    <Button variant={"text"} className="w-fit text-red-500 ml-auto" onClick={() => empty()}><Trash /></Button>
                </div>
            </CollapsibleContent>
        </Collapsible>
    </div>
    );
}

export default ShoppingCart;