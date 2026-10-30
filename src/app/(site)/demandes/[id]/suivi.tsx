"use client";

import Link from "next/link";
import { useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  Check,
  Clock,
  CreditCard,
  FileText,
  Lock,
  MessageSquare,
  Smartphone,
  Star,
  Unlock,
  X,
} from "lucide-react";
import { Avatar, Badge, Bouton, BoutonLien, Card, Certifie, Note, StatutDemandeBadge } from "@/components/ui";
import type { Demande, Prestataire, StatutDemande } from "@/data/mock";
import { cx, fcfa } from "@/lib/format";

const etapes = ["Proposition", "Paiement", "Travail", "Validation", "Terminé"];

function etapeActive(statut: StatutDemande): number {
  switch (statut) {
    case "envoyee":
    case "proposition":
      return 0;
    case "acceptee":
      return 1;
    case "en_cours":
      return 2;
    case "livree":
    case "en_litige":
      return 3;
    default:
      return 4;
  }
}

export function SuiviDemande({ demande, prestataire }: { demande: Demande; prestataire: Prestataire }) {
  const [statut, setStatut] = useState<StatutDemande>(demande.statut);
  const [modale, setModale] = useState<null | "paiement" | "litige">(null);
  const [moyen, setMoyen] = useState<"momo" | "carte">("momo");
  const [note, setNote] = useState(0);
  const [avisEnvoye, setAvisEnvoye] = useState(false);
  const montant = demande.montant ?? 0;
  const active = etapeActive(statut);

  const fonds =
    statut === "en_cours" || statut === "livree" || statut === "en_litige"
      ? { libelle: "Bloqués sur la plateforme", ton: "brand" as const, icone: Lock }
      : statut === "terminee"
        ? { libelle: "Versés au prestataire", ton: "trust" as const, icone: Unlock }
        : statut === "remboursee"
          ? { libelle: "Remboursés", ton: "neutre" as const, icone: Unlock }
          : { libelle: "Rien n'a été payé", ton: "neutre" as const, icone: Clock };

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Link href="/client" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-brand">
        <ArrowLeft className="size-4" /> Mon espace
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-muted">{demande.id}</p>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{demande.titre}</h1>
        </div>
        <StatutDemandeBadge statut={statut} />
      </div>

      {/* Étapes */}
      <ol className="mt-8 grid grid-cols-5 gap-2">
        {etapes.map((e, i) => (
          <li key={e}>
            <div className={cx("h-1.5 rounded-full", i < active ? "bg-trust" : i === active ? "bg-accent" : "bg-slate-200")} />
            <p className={cx("mt-2 text-xs font-semibold sm:text-sm", i === active ? "text-ink" : "text-muted")}>{e}</p>
          </li>
        ))}
      </ol>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          {/* Une seule action à la fois, mise en avant */}
          <Card className="border-brand/20 p-6">
            {statut === "proposition" && (
              <Action
                titre="Une proposition vous attend"
                texte={`${prestataire.nom} propose ${fcfa(montant)} pour ce travail. ${demande.echeance ?? ""}.`}
              >
                <Bouton variante="action" onClick={() => setStatut("acceptee")}>Accepter la proposition</Bouton>
                <Bouton variante="contour">Demander une modification</Bouton>
              </Action>
            )}
            {statut === "acceptee" && (
              <Action
                titre="Payez pour lancer le travail"
                texte="Votre argent reste bloqué sur la plateforme. Il ne sera versé au prestataire qu'après votre validation."
              >
                <Bouton variante="action" onClick={() => setModale("paiement")}>
                  <Lock className="size-4" /> Payer {fcfa(montant)}
                </Bouton>
                <Bouton variante="discret" onClick={() => setStatut("hors_plateforme")}>Régler hors plateforme</Bouton>
              </Action>
            )}
            {statut === "en_cours" && (
              <Action titre="Le travail est en cours" texte={`${demande.echeance ?? "Le prestataire vous préviendra à la fin du travail"}. Vos fonds sont bloqués en sécurité.`}>
                <Bouton variante="contour" onClick={() => setStatut("livree")}>Simuler la fin du travail</Bouton>
              </Action>
            )}
            {statut === "livree" && (
              <Action
                titre="Le prestataire a terminé : vérifiez le travail"
                texte="Validez pour lui verser le paiement. Sans réponse de votre part, il sera versé automatiquement dans 4 jours."
              >
                <Bouton variante="action" onClick={() => setStatut("terminee")}>
                  <Check className="size-4" /> Valider et payer le prestataire
                </Bouton>
                <Bouton variante="danger" onClick={() => setModale("litige")}>Signaler un problème</Bouton>
              </Action>
            )}
            {statut === "en_litige" && (
              <Action
                titre="Litige ouvert"
                texte={`${prestataire.nom} a 3 jours pour répondre. L'équipe Freelance X examinera ensuite les preuves. Les fonds restent bloqués.`}
                icone={<AlertTriangle className="size-5" />}
                ton="danger"
              />
            )}
            {statut === "terminee" &&
              (avisEnvoye ? (
                <Action titre="Merci pour votre avis" texte="Il est publié sur le profil avec la mention « Prestation confirmée »." icone={<Check className="size-5" />} ton="trust" />
              ) : (
                <div>
                  <h2 className="text-lg font-bold text-ink">Prestation terminée. Votre avis ?</h2>
                  <p className="mt-1 text-sm text-muted">Le paiement a été versé à {prestataire.nom}. Notez la prestation.</p>
                  <div className="mt-4 flex gap-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button key={n} type="button" onClick={() => setNote(n)} aria-label={`${n} étoile${n > 1 ? "s" : ""}`}>
                        <Star className={cx("size-8", n <= note ? "fill-accent text-accent" : "text-slate-300")} />
                      </button>
                    ))}
                  </div>
                  <textarea rows={3} placeholder="Votre commentaire (facultatif)" className="mt-3 w-full rounded-xl border border-line p-3 text-sm outline-none focus:border-brand" />
                  <Bouton className="mt-3" disabled={!note} onClick={() => setAvisEnvoye(true)}>Publier mon avis</Bouton>
                </div>
              ))}
            {statut === "hors_plateforme" && (
              <Action
                titre="Réglée hors plateforme"
                texte="Vous avez choisi de payer directement le prestataire. Freelance X n'intervient pas : pas de séquestre, pas de litige ni d'avis officiel."
              />
            )}
            {statut === "remboursee" && <Action titre="Vous avez été remboursé" texte="Le litige a été tranché en votre faveur." />}
            {statut === "envoyee" && <Action titre="Demande envoyée" texte="Le prestataire va vous répondre avec une proposition de prix." />}
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2">
              <FileText className="size-5 text-brand" />
              <h2 className="font-bold text-ink">Proposition acceptée</h2>
            </div>
            <dl className="mt-5 grid gap-5 sm:grid-cols-3">
              <div>
                <dt className="text-sm text-muted">Montant</dt>
                <dd className="mt-1 text-xl font-bold text-ink tabular">{demande.montant ? fcfa(montant) : "À venir"}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted">Délai</dt>
                <dd className="mt-1 text-xl font-bold text-ink">{demande.delai}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted">Commission</dt>
                <dd className="mt-1 text-sm font-medium text-ink">Payée par le prestataire</dd>
              </div>
            </dl>
            <div className="mt-5 rounded-xl bg-canvas p-4">
              <p className="text-sm font-semibold text-ink">Travail attendu</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">{demande.livrable}</p>
            </div>
            <p className="mt-3 text-xs text-muted">
              C&apos;est cette proposition qui sert de référence en cas de litige. Elle n&apos;a pas valeur de contrat.
            </p>
          </Card>
        </div>

        <aside className="space-y-4">
          <Card className="p-5">
            <div className="flex items-center gap-3">
              <Avatar nom={prestataire.nom} teinte={prestataire.teinte} />
              <div className="min-w-0">
                <Link href={`/prestataires/${prestataire.id}`} className="block truncate font-bold text-ink hover:text-brand">
                  {prestataire.nom}
                </Link>
                <p className="truncate text-sm text-muted">{prestataire.metier}</p>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {prestataire.certifie && <Certifie court />}
              <Note note={prestataire.note} avis={prestataire.avis} />
            </div>
            <BoutonLien href="/messagerie" variante="contour" taille="sm" className="mt-4 w-full">
              <MessageSquare className="size-4" /> Messagerie
            </BoutonLien>
          </Card>
          <Card className="p-5">
            <p className="text-sm font-medium text-muted">Votre argent</p>
            <p className="mt-2 text-2xl font-bold text-ink tabular">{demande.montant ? fcfa(montant) : "—"}</p>
            <Badge ton={fonds.ton} className="mt-2">
              <fonds.icone className="size-3.5" /> {fonds.libelle}
            </Badge>
          </Card>
        </aside>
      </div>

      {modale === "paiement" && (
        <Modale onFermer={() => setModale(null)} titre={`Payer ${fcfa(montant)}`}>
          <p className="text-sm text-muted">Le montant sera bloqué jusqu&apos;à votre validation du travail.</p>
          <div className="mt-5 space-y-2">
            {[
              { id: "momo" as const, libelle: "Mobile Money", detail: "MTN ou Orange", icone: Smartphone },
              { id: "carte" as const, libelle: "Carte bancaire", detail: "Visa, Mastercard", icone: CreditCard },
            ].map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMoyen(m.id)}
                className={cx(
                  "flex w-full items-center gap-3 rounded-xl border p-4 text-left",
                  moyen === m.id ? "border-brand bg-brand-50" : "border-line hover:border-brand/40",
                )}
              >
                <m.icone className="size-5 text-brand" />
                <span className="flex-1">
                  <span className="block text-sm font-semibold text-ink">{m.libelle}</span>
                  <span className="block text-xs text-muted">{m.detail}</span>
                </span>
                <span className={cx("size-4 rounded-full border-2", moyen === m.id ? "border-brand bg-brand" : "border-slate-300")} />
              </button>
            ))}
          </div>
          {moyen === "momo" && (
            <input placeholder="Numéro Mobile Money" inputMode="tel" className="mt-4 h-11 w-full rounded-xl border border-line px-3 text-sm outline-none focus:border-brand" />
          )}
          <Bouton
            variante="action"
            className="mt-5 w-full"
            onClick={() => {
              setStatut("en_cours");
              setModale(null);
            }}
          >
            <Lock className="size-4" /> Confirmer le paiement
          </Bouton>
        </Modale>
      )}

      {modale === "litige" && (
        <Modale onFermer={() => setModale(null)} titre="Signaler un problème">
          <p className="text-sm text-muted">
            Les fonds restent bloqués. Le prestataire pourra répondre, puis un membre de l&apos;équipe tranchera.
          </p>
          <label className="mt-5 block">
            <span className="text-sm font-semibold text-ink">Motif</span>
            <select className="mt-1.5 h-11 w-full rounded-xl border border-line px-3 text-sm outline-none focus:border-brand">
              <option>Le travail ne correspond pas à la proposition</option>
              <option>Le travail n&apos;est pas terminé</option>
              <option>Retard important</option>
              <option>Autre</option>
            </select>
          </label>
          <label className="mt-4 block">
            <span className="text-sm font-semibold text-ink">Expliquez</span>
            <textarea rows={3} className="mt-1.5 w-full rounded-xl border border-line p-3 text-sm outline-none focus:border-brand" />
          </label>
          <div className="mt-4 rounded-xl border border-dashed border-line p-4 text-center text-sm text-muted">
            Ajoutez vos preuves : photos, vidéos, documents
          </div>
          <Bouton
            variante="danger"
            className="mt-5 w-full"
            onClick={() => {
              setStatut("en_litige");
              setModale(null);
            }}
          >
            Ouvrir le litige
          </Bouton>
        </Modale>
      )}
    </main>
  );
}

function Action({
  titre,
  texte,
  children,
  icone,
  ton = "brand",
}: {
  titre: string;
  texte: string;
  children?: React.ReactNode;
  icone?: React.ReactNode;
  ton?: "brand" | "danger" | "trust";
}) {
  const fonds = { brand: "bg-brand-50 text-brand", danger: "bg-danger-50 text-danger", trust: "bg-trust-50 text-trust" };
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
      <span className={cx("flex size-11 shrink-0 items-center justify-center rounded-xl", fonds[ton])}>{icone ?? <Clock className="size-5" />}</span>
      <div className="flex-1">
        <h2 className="text-lg font-bold text-ink">{titre}</h2>
        <p className="mt-1 text-sm leading-6 text-muted">{texte}</p>
        {children && <div className="mt-5 flex flex-wrap gap-3">{children}</div>}
      </div>
    </div>
  );
}

function Modale({ titre, onFermer, children }: { titre: string; onFermer: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4" role="dialog" aria-modal>
      <button type="button" aria-label="Fermer" className="absolute inset-0 bg-slate-900/50" onClick={onFermer} />
      <div className="relative w-full max-w-md rounded-t-3xl bg-white p-6 shadow-lift sm:rounded-3xl">
        <button type="button" onClick={onFermer} className="absolute right-4 top-4 rounded-lg p-1 text-muted hover:bg-canvas" aria-label="Fermer">
          <X className="size-5" />
        </button>
        <h2 className="pr-8 text-xl font-bold text-ink">{titre}</h2>
        <div className="mt-2">{children}</div>
      </div>
    </div>
  );
}
