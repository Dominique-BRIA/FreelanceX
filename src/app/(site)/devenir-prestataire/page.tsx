import type { Metadata } from "next";
import { Activation } from "./activation";

export const metadata: Metadata = { title: "Devenir prestataire" };

export default function PageDevenirPrestataire() {
  return <Activation />;
}
