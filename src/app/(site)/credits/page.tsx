import type { Metadata } from "next";
import Image from "next/image";
import { Card } from "@/components/ui";
import { creditsPhotos } from "@/data/credits";

export const metadata: Metadata = { title: "Crédits des photos" };

export default function Credits() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight text-brand">Crédits des photos</h1>
      <p className="mt-3 text-muted">
        Les photos de cette maquette proviennent de Wikimedia Commons et sont publiées sous licence libre. Elles illustrent des
        prestataires fictifs.
      </p>
      <Card className="mt-8 divide-y divide-line">
        {creditsPhotos.map((c) => (
          <div key={c.fichier} className="flex items-center gap-4 p-4">
            <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-canvas">
              <Image src={c.fichier} alt="" fill sizes="80px" className="object-cover" />
            </div>
            <div className="min-w-0 text-sm">
              <a href={c.source} target="_blank" rel="noopener noreferrer" className="block truncate font-semibold text-ink hover:text-brand hover:underline">
                {c.titre}
              </a>
              <p className="text-muted">
                {c.auteur} · {c.licence}
              </p>
            </div>
          </div>
        ))}
      </Card>
    </main>
  );
}
