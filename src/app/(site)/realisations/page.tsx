import type { Metadata } from "next";
import { Fil } from "./fil";

export const metadata: Metadata = { title: "Réalisations" };

export default function PageRealisations() {
  return <Fil />;
}
