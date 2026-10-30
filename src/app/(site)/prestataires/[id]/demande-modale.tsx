"use client";

import { useState } from "react";
import { CheckCircle2, X } from "lucide-react";
import { Bouton, BoutonLien } from "@/components/ui";

export function BoutonDemande({ prestataire, service }: { prestataire: string; service?: string }) {
  const [ouvert, setOuvert] = useState(false);
  const [envoye, setEnvoye] = useState(false);

  return (
    <>
      <Bouton variante={service ? "contour" : "action"} taille={service ? "sm" : "md"} onClick={() => setOuvert(true)} className={service ? "" : "w-full"}>
        {service ? "Demander" : "Demander une prestation"}
      </Bouton>
      {ouvert && (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4" role="dialog" aria-modal>
          <button type="button" aria-label="Fermer" className="absolute inset-0 bg-slate-900/50" onClick={() => setOuvert(false)} />
          <div className="relative w-full max-w-lg rounded-t-3xl bg-white p-6 shadow-lift sm:rounded-3xl">
            <button type="button" onClick={() => setOuvert(false)} className="absolute right-4 top-4 rounded-lg p-1 text-muted hover:bg-canvas" aria-label="Fermer">
              <X className="size-5" />
            </button>
            {envoye ? (
              <div className="py-6 text-center">
                <CheckCircle2 className="mx-auto size-12 text-trust" />
                <h2 className="mt-4 text-xl font-bold text-ink">Demande envoyée</h2>
                <p className="mt-2 text-sm text-muted">
                  {prestataire} va vous répondre dans la messagerie, puis vous envoyer une proposition de prix. Vous ne payez
                  rien avant de l&apos;accepter.
                </p>
                <BoutonLien href="/client" className="mt-6">
                  Suivre dans mon espace
                </BoutonLien>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setEnvoye(true);
                }}
              >
                <h2 className="text-xl font-bold text-ink">Demande à {prestataire}</h2>
                <p className="mt-1 text-sm text-muted">Décrivez votre besoin, le prestataire vous fera une proposition.</p>
                <div className="mt-5 space-y-4">
                  <label className="block">
                    <span className="text-sm font-semibold text-ink">Service</span>
                    <input defaultValue={service ?? ""} placeholder="Ex. placard sur mesure" className="mt-1.5 h-11 w-full rounded-xl border border-line px-3 text-sm outline-none focus:border-brand focus:ring-4 focus:ring-brand/10" />
                  </label>
                  <label className="block">
                    <span className="text-sm font-semibold text-ink">Votre besoin</span>
                    <textarea required rows={4} placeholder="Dimensions, délais, contraintes…" className="mt-1.5 w-full rounded-xl border border-line px-3 py-2 text-sm outline-none focus:border-brand focus:ring-4 focus:ring-brand/10" />
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="block">
                      <span className="text-sm font-semibold text-ink">Quartier, ville</span>
                      <input placeholder="Bonamoussadi, Douala" className="mt-1.5 h-11 w-full rounded-xl border border-line px-3 text-sm outline-none focus:border-brand" />
                    </label>
                    <label className="block">
                      <span className="text-sm font-semibold text-ink">Budget indicatif</span>
                      <input placeholder="FCFA" inputMode="numeric" className="mt-1.5 h-11 w-full rounded-xl border border-line px-3 text-sm outline-none focus:border-brand" />
                    </label>
                  </div>
                </div>
                <Bouton type="submit" variante="primaire" className="mt-6 w-full">
                  Envoyer la demande
                </Bouton>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
