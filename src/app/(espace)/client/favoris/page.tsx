import type { Metadata } from "next";
import { TitrePage } from "@/components/espace";
import { ListeFavoris } from "./liste";

export const metadata: Metadata = { title: "Favoris" };

export default function PageFavoris() {
  return (
    <div className="space-y-6">
      <TitrePage titre="Favoris" sousTitre="Les prestataires et les réalisations que vous avez gardés." />
      <ListeFavoris />
    </div>
  );
}
