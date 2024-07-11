import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CircleUser, Menu, Package2, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


export function Header() {
    return <header className="sticky top-0 left-0 w-full bg-background flex flex-row items-center justify-between p-2 lg:p-4 shadow-md">
        <nav className="hidden flex-col gap-6 text-lg font-medium lg:flex lg:flex-row lg:items-center lg:gap-5 lg:text-sm lg:gap-6">
            <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold lg:text-base"
            >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
            </Link>
            <Link
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
            >
                Dashboard
            </Link>
            <Link
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
            >
                Orders
            </Link>
            <Link
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
            >
                Products
            </Link>
            <Link
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
            >
                Customers
            </Link>
            <Link
                href="#"
                className="text-foreground transition-colors hover:text-foreground"
            >
                Settings
            </Link>
        </nav>
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 lg:hidden"
                >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <nav className="grid gap-6 text-lg font-medium">
                    <Link
                        href="#"
                        className="flex items-center gap-2 text-lg font-semibold"
                    >
                        <Package2 className="h-6 w-6" />
                        <span className="sr-only">Acme Inc</span>
                    </Link>
                    <Link
                        href="#"
                        className="text-muted-foreground hover:text-foreground"
                    >
                        Dashboard
                    </Link>
                    <Link
                        href="#"
                        className="text-muted-foreground hover:text-foreground"
                    >
                        Orders
                    </Link>
                    <Link
                        href="#"
                        className="text-muted-foreground hover:text-foreground"
                    >
                        Products
                    </Link>
                    <Link
                        href="#"
                        className="text-muted-foreground hover:text-foreground"
                    >
                        Vendors
                    </Link>
                    <Link href="#" className="hover:text-foreground">
                        Settings
                    </Link>
                </nav>
            </SheetContent>
        </Sheet>
    </header>
}