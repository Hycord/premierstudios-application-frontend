"use client"

import { useLocalStorage } from "@uidotdev/usehooks"
import { useEffect, useMemo } from "react";

export function useCurrency() {
    const [value, set] = useLocalStorage<"USD" | "EUR">("currency", "USD");

    return { currency: value, setCurrency: set}
}