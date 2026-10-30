import type { Metadata } from "next";
import { Suspense } from "react";
import { Messagerie } from "./messagerie";

export const metadata: Metadata = { title: "Messagerie" };

export default function PageMessagerie() {
  return (
    <Suspense>
      <Messagerie />
    </Suspense>
  );
}
