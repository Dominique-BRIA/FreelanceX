import type { Metadata } from "next";
import { Messagerie } from "./messagerie";

export const metadata: Metadata = { title: "Messagerie" };

export default function PageMessagerie() {
  return <Messagerie />;
}
