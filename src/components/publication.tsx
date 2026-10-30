"use client";

import Link from "next/link";
import { useState } from "react";
import { Bookmark, Heart, MessageCircle, Send, UserRound } from "lucide-react";
import { Avatar, Badge, BoutonLien, Card, Certifie } from "@/components/ui";
import { VisuelRealisation } from "@/components/visuels";
import { useDemo } from "@/components/demo-store";
import {
  commentairesExistants,
  prestataires,
  PRESTATAIRE_DEMO,
  trouverPrestataire,
  UTILISATEUR_DEMO,
  type Realisation,
} from "@/data/mock";
import { cx, fcfa } from "@/lib/format";


const teinteDe = (nom: string) => prestataires.find((p) => p.nom === nom)?.teinte ?? "bg-brand";

/** Publication du fil : J'aime, commentaires, enregistrement et message fonctionnent. */
export function Publication({ realisation, compacte = false }: { realisation: Realisation; compacte?: boolean }) {
  const r = realisation;
  const auteur = trouverPrestataire(r.prestataireId)!;
  const { aimes, basculerAime, enregistres, basculerEnregistre, commentaires, commenter } = useDemo();
  const [ouverts, setOuverts] = useState(false);
  const [texte, setTexte] = useState("");

  const ajoutes = commentaires[r.id] ?? [];
  const liste = [...(commentairesExistants[r.id] ?? []), ...ajoutes];
  const aime = !!aimes[r.id];
  const enregistre = !!enregistres[r.id];

  return (
    <Card className={cx("overflow-hidden", compacte ? "p-4" : "p-5")}>
      <div className="flex items-center gap-3">
        <Avatar nom={auteur.nom} teinte={auteur.teinte} taille={compacte ? "sm" : "md"} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Link href={`/prestataires/${auteur.id}`} className="truncate font-semibold text-ink hover:text-brand">
              {auteur.nom}
            </Link>
            {!compacte && auteur.certifie && <Certifie court />}
          </div>
          <p className="truncate text-xs text-muted sm:text-sm">
            {compacte ? auteur.ville : `${auteur.metier} · ${auteur.ville}`} · {r.date}
          </p>
        </div>
        {compacte && auteur.certifie && <Certifie court />}
      </div>

      {!compacte && <h2 className="mt-4 text-lg font-bold leading-snug text-ink">{r.titre}</h2>}
      {!compacte && <p className="mt-1 text-sm leading-6 text-slate-600">{r.description}</p>}
      <div className="mt-4">
        <VisuelRealisation realisation={r} hauteur={compacte ? "h-44" : "h-72"} />
      </div>
      {compacte && <h3 className="mt-4 font-bold leading-snug text-ink">{r.titre}</h3>}
      {r.budget && !compacte && (
        <div className="mt-3">
          <Badge ton="neutre">Budget du chantier : {fcfa(r.budget)}</Badge>
        </div>
      )}
      {!compacte && r.prestataireId !== PRESTATAIRE_DEMO && (
        <div className="mt-4 flex flex-col gap-3 rounded-xl bg-brand-50/70 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-ink">Vous avez un projet similaire ?</p>
            <p className="text-xs text-muted">{auteur.nom.split(" ")[0]} recevra la référence de cette réalisation.</p>
          </div>
          <BoutonLien href={`/messagerie?avec=${auteur.id}&realisation=${r.id}`} variante="primaire" taille="sm">
            Demander sur ce modèle
          </BoutonLien>
        </div>
      )}

      <div className={cx("mt-3 flex items-center justify-between gap-2", !compacte && "border-t border-line pt-3")}>
        <div className="-ml-2 flex items-center">
          <button
            type="button"
            onClick={() => basculerAime(r.id)}
            aria-pressed={aime}
            aria-label={aime ? "Je n'aime plus" : "J'aime"}
            className={cx("flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium hover:bg-canvas", aime ? "text-accent" : "text-muted")}
          >
            <Heart className={cx("size-[18px]", aime && "fill-accent")} /> {r.jaime + (aime ? 1 : 0)}
          </button>
          <button
            type="button"
            onClick={() => setOuverts((v) => !v)}
            aria-expanded={ouverts}
            aria-label={`${r.commentaires + ajoutes.length} commentaires`}
            className={cx("flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium hover:bg-canvas", ouverts ? "text-brand" : "text-muted")}
          >
            <MessageCircle className="size-[18px]" /> {r.commentaires + ajoutes.length}
          </button>
          <button
            type="button"
            onClick={() => basculerEnregistre(r.id)}
            aria-pressed={enregistre}
            aria-label={enregistre ? "Retirer des enregistrements" : "Enregistrer"}
            className={cx("rounded-lg px-2 py-1.5 hover:bg-canvas", enregistre ? "text-brand" : "text-muted")}
          >
            <Bookmark className={cx("size-[18px]", enregistre && "fill-brand")} />
          </button>
        </div>
        {compacte ? (
          r.budget && <Badge ton="neutre">{fcfa(r.budget)}</Badge>
        ) : r.prestataireId === PRESTATAIRE_DEMO ? (
          <Badge ton="brand">Votre publication</Badge>
        ) : (
          <BoutonLien href={`/prestataires/${auteur.id}`} variante="contour" taille="sm">
            <UserRound className="size-4" /> Voir le profil
          </BoutonLien>
        )}
      </div>

      {ouverts && (
        <div className="mt-3 space-y-3 border-t border-line pt-3">
          {liste.length === 0 && <p className="text-sm text-muted">Soyez le premier à commenter.</p>}
          {liste.map((c) => (
            <div key={c.id} className="flex gap-2.5">
              <Avatar nom={c.auteur} teinte={teinteDe(c.auteur)} taille="sm" />
              <div className="min-w-0 rounded-2xl bg-canvas px-3 py-2">
                <p className="text-xs font-semibold text-ink">
                  {c.auteur} <span className="font-normal text-muted">· {c.date}</span>
                </p>
                <p className="text-sm leading-6 text-slate-700">{c.texte}</p>
              </div>
            </div>
          ))}
          {r.commentaires > (commentairesExistants[r.id]?.length ?? 0) && (
            <p className="text-xs text-muted">Et {r.commentaires - (commentairesExistants[r.id]?.length ?? 0)} autres commentaires plus anciens.</p>
          )}
          <form
            className="flex items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (!texte.trim()) return;
              commenter(r.id, UTILISATEUR_DEMO, texte.trim());
              setTexte("");
            }}
          >
            <input
              value={texte}
              onChange={(e) => setTexte(e.target.value)}
              placeholder="Écrire un commentaire…"
              className="h-10 min-w-0 flex-1 rounded-xl bg-canvas px-3 text-sm outline-none focus:ring-2 focus:ring-brand/20"
            />
            <button type="submit" disabled={!texte.trim()} className="flex size-10 items-center justify-center rounded-xl bg-brand text-white disabled:opacity-40" aria-label="Publier le commentaire">
              <Send className="size-4" />
            </button>
          </form>
        </div>
      )}
    </Card>
  );
}
