"use client";

import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";

/** Fenêtre modale : se ferme avec Échap, le fond ou la croix. En bas d'écran sur mobile. */
export function Modale({ titre, onFermer, children }: { titre: string; onFermer: () => void; children: ReactNode }) {
  useEffect(() => {
    const echap = (e: KeyboardEvent) => e.key === "Escape" && onFermer();
    document.addEventListener("keydown", echap);
    return () => document.removeEventListener("keydown", echap);
  }, [onFermer]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4" role="dialog" aria-modal aria-label={titre}>
      <button type="button" aria-label="Fermer" className="absolute inset-0 bg-slate-900/50" onClick={onFermer} />
      <div className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-white p-6 shadow-lift sm:rounded-3xl">
        <button type="button" onClick={onFermer} className="absolute right-4 top-4 rounded-lg p-1 text-muted hover:bg-canvas" aria-label="Fermer">
          <X className="size-5" />
        </button>
        <h2 className="pr-8 text-xl font-bold text-ink">{titre}</h2>
        <div className="mt-2">{children}</div>
      </div>
    </div>
  );
}

/** Lit une image choisie par l'utilisateur et la réduit (pour la garder dans le navigateur). */
export function lireImage(fichier: File, largeurMax = 900): Promise<string> {
  return new Promise((resolve, reject) => {
    const lecteur = new FileReader();
    lecteur.onerror = () => reject(lecteur.error);
    lecteur.onload = () => {
      const img = new window.Image();
      img.onerror = () => reject(new Error("Image illisible"));
      img.onload = () => {
        const echelle = Math.min(1, largeurMax / img.width);
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * echelle);
        canvas.height = Math.round(img.height * echelle);
        canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.72));
      };
      img.src = lecteur.result as string;
    };
    lecteur.readAsDataURL(fichier);
  });
}
