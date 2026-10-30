"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, CheckCircle2, Lock, Upload } from "lucide-react";
import { Badge, Bouton, Card, StatutDemandeBadge } from "@/components/ui";
import { useDemo } from "@/components/demo-store";
import type { Demande, StatutDemande } from "@/data/mock";
import { fcfa } from "@/lib/format";

const champ = "mt-1.5 h-11 w-full rounded-xl border border-line bg-white px-3 text-sm outline-none focus:border-brand focus:ring-4 focus:ring-brand/10";

export function SuiviPrestataire({ demande }: { demande: Demande }) {
  const { statuts, changerStatut } = useDemo();
  const statut = statuts[demande.id] ?? demande.statut;
  const setStatut = (s: StatutDemande) => changerStatut(demande.id, s);
  const [reponduLitige, setReponduLitige] = useState(false);
  const commission = demande.montant ? Math.round(demande.montant * 0.05) : 0;

  return (
    <div className="space-y-6">
      <Link href="/prestataire/demandes" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-brand">
        <ArrowLeft className="size-4" /> Demandes reçues
      </Link>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm text-muted">
            {demande.id} · {demande.clientNom}, {demande.clientVille}
          </p>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-ink">{demande.titre}</h1>
        </div>
        <StatutDemandeBadge statut={statut} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <Card className="p-6">
          {statut === "envoyee" && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStatut("proposition");
              }}
            >
              <h2 className="text-lg font-bold text-ink">Envoyer une proposition de prix</h2>
              <p className="mt-1 text-sm text-muted">Une fois acceptée, elle fixe le montant bloqué et sert de référence en cas de litige.</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-semibold text-ink">Montant (FCFA)</span>
                  <input required defaultValue="850 000" className={champ} />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-ink">Délai</span>
                  <input required defaultValue="4 semaines" className={champ} />
                </label>
              </div>
              <label className="mt-4 block">
                <span className="text-sm font-semibold text-ink">Travail prévu</span>
                <textarea required rows={3} defaultValue={demande.livrable} className={`${champ} h-auto py-2`} />
              </label>
              <label className="mt-4 block">
                <span className="text-sm font-semibold text-ink">Validité de la proposition</span>
                <select className={champ}>
                  <option>7 jours</option>
                  <option>15 jours</option>
                </select>
              </label>
              <Bouton type="submit" variante="action" className="mt-6">Envoyer la proposition</Bouton>
            </form>
          )}
          {statut === "proposition" && (
            <Etat titre="Proposition envoyée" texte={`${demande.clientNom} doit l'accepter puis payer. Vous serez prévenu dès que les fonds sont bloqués.`} />
          )}
          {statut === "en_cours" && (
            <div>
              <h2 className="text-lg font-bold text-ink">Travail terminé ?</h2>
              <p className="mt-1 text-sm text-muted">
                Déclarez la fin en joignant vos justificatifs. Le client aura 7 jours pour valider ; sans réponse, vous serez payé
                automatiquement.
              </p>
              <div className="mt-5 flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-line p-8 text-sm text-muted">
                <Upload className="size-6" /> Photos du travail, bon de livraison…
              </div>
              <Bouton variante="action" className="mt-5" onClick={() => setStatut("livree")}>Déclarer la fin du travail</Bouton>
            </div>
          )}
          {statut === "livree" && (
            <Etat titre="En attente de validation du client" texte={demande.echeance ?? "Validation automatique dans 7 jours."} />
          )}
          {statut === "en_litige" &&
            (reponduLitige ? (
              <Etat titre="Réponse envoyée" texte="L'équipe FreelanceX examine les preuves des deux parties. Vous serez notifié de la décision." />
            ) : (
              <div>
                <Badge ton="danger">Litige LIT-208</Badge>
                <h2 className="mt-3 text-lg font-bold text-ink">{demande.clientNom} conteste la prestation</h2>
                <blockquote className="mt-3 rounded-xl bg-danger-50 p-4 text-sm leading-6 text-slate-700">
                  « Les portes ont été posées avec deux semaines de retard et deux d&apos;entre elles frottent au sol. »
                </blockquote>
                <label className="mt-5 block">
                  <span className="text-sm font-semibold text-ink">Votre réponse</span>
                  <textarea rows={4} className={`${champ} h-auto py-2`} placeholder="Expliquez votre version et proposez une solution." />
                </label>
                <div className="mt-4 flex flex-col items-center gap-2 rounded-xl border border-dashed border-line p-6 text-sm text-muted">
                  <Upload className="size-5" /> Ajoutez vos preuves
                </div>
                <Bouton className="mt-5" onClick={() => setReponduLitige(true)}>Contester et envoyer mes preuves</Bouton>
              </div>
            ))}
          {(statut === "terminee" || statut === "acceptee") && (
            <Etat titre={statut === "terminee" ? "Prestation terminée et payée" : "Proposition acceptée"} texte={statut === "terminee" ? "Le montant a été versé sur votre compte." : "En attente du paiement du client."} />
          )}
        </Card>

        <aside className="space-y-4">
          <Card className="p-5">
            <p className="text-sm font-medium text-muted">Montant de la prestation</p>
            <p className="mt-2 text-2xl font-bold text-ink tabular">{demande.montant ? fcfa(demande.montant) : "À proposer"}</p>
            {demande.montant && (
              <dl className="mt-4 space-y-2 border-t border-line pt-4 text-sm">
                <div className="flex justify-between"><dt className="text-muted">Commission (5 %)</dt><dd className="tabular">− {fcfa(commission)}</dd></div>
                <div className="flex justify-between font-semibold"><dt>Vous recevrez</dt><dd className="tabular">{fcfa(demande.montant - commission)}</dd></div>
              </dl>
            )}
            {["en_cours", "livree", "en_litige"].includes(statut) && (
              <Badge ton="brand" className="mt-4"><Lock className="size-3.5" /> Fonds bloqués</Badge>
            )}
          </Card>
          <Card className="p-5">
            <p className="text-sm font-semibold text-ink">Demande du client</p>
            <p className="mt-2 text-sm leading-6 text-muted">{demande.livrable}</p>
          </Card>
        </aside>
      </div>
    </div>
  );
}

function Etat({ titre, texte }: { titre: string; texte: string }) {
  return (
    <div className="flex items-start gap-4">
      <CheckCircle2 className="size-6 shrink-0 text-trust" />
      <div>
        <h2 className="text-lg font-bold text-ink">{titre}</h2>
        <p className="mt-1 text-sm leading-6 text-muted">{texte}</p>
      </div>
    </div>
  );
}
