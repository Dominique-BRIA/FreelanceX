"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, FileText, Images, Mic, Paperclip, Play, Send, Square } from "lucide-react";
import { Avatar, Card, StatutDemandeBadge } from "@/components/ui";
import { lireImage } from "@/components/modale";
import { useDemo, type MessageEnvoye } from "@/components/demo-store";
import {
  conversations,
  lienDemande,
  messagesDemo,
  prestataires,
  realisations,
  trouverDemande,
  trouverPrestataire,
  type Conversation,
} from "@/data/mock";
import { cx, fcfa } from "@/lib/format";

const teinte = (nom: string) => prestataires.find((p) => p.nom === nom)?.teinte ?? "bg-brand";

function Vocal({ duree, recu }: { duree: string; recu?: boolean }) {
  return (
    <span className={cx("flex items-center gap-3 rounded-2xl px-4 py-2.5", recu ? "rounded-bl-sm bg-canvas" : "rounded-br-sm bg-brand text-white")}>
      <Play className="size-4" />
      <span className="flex items-end gap-0.5" aria-hidden>
        {[6, 10, 14, 8, 12, 5, 11, 7, 13, 9].map((h, i) => (
          <span key={i} className={cx("w-1 rounded-full", recu ? "bg-brand/50" : "bg-white/70")} style={{ height: h }} />
        ))}
      </span>
      <span className="text-xs tabular">{duree}</span>
    </span>
  );
}

export function Messagerie() {
  const params = useSearchParams();
  const { messages, envoyerMessage, publiees, statuts } = useDemo();

  // Conversation ouverte depuis une publication ou un profil (?avec=…&realisation=…)
  const avecId = params.get("avec");
  const realisationId = params.get("realisation");
  const invite = avecId ? trouverPrestataire(avecId) : undefined;
  const realisation = realisationId ? [...publiees, ...realisations].find((r) => r.id === realisationId) : undefined;
  const existante = invite ? conversations.find((c) => c.avec === invite.nom) : undefined;
  const nouvelle: Conversation | undefined =
    invite && !existante
      ? { id: `nouvelle-${invite.id}`, avec: invite.nom, sujet: realisation?.titre ?? "Nouvelle conversation", dernier: "", heure: "", nonLus: 0 }
      : undefined;
  const liste = nouvelle ? [nouvelle, ...conversations] : conversations;

  // Le choix manuel ne vaut que pour l'adresse en cours : un nouveau lien « Message » rouvre la bonne conversation.
  const [choix, setChoix] = useState<{ pour: string | null; id: string } | null>(null);
  const active = choix && choix.pour === avecId ? choix.id : (existante ?? nouvelle ?? conversations[0]).id;
  const setActive = (id: string) => setChoix({ pour: avecId, id });
  const [brouillon, setBrouillon] = useState("");
  const [enregistrement, setEnregistrement] = useState<number | null>(null);
  const fichier = useRef<HTMLInputElement>(null);
  const finFil = useRef<HTMLDivElement>(null);

  const conv = liste.find((c) => c.id === active) ?? liste[0];
  const demande = conv.demandeId ? trouverDemande(conv.demandeId) : undefined;
  const base = conv.id === "c1" ? messagesDemo : conv.dernier ? [{ moi: false, texte: conv.dernier, heure: conv.heure }] : [];
  const envoyes = messages[conv.id] ?? [];
  const contexte =
    conv.id === "c1"
      ? "Dressing en iroko pour une chambre parentale"
      : realisation && conv.id === `nouvelle-${invite?.id}`
        ? realisation.titre
        : null;
  const demandeStatut = demande ? (statuts[demande.id] ?? demande.statut) : undefined;

  useEffect(() => {
    finFil.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [envoyes.length, conv.id]);

  // Chronomètre de l'enregistrement vocal simulé
  useEffect(() => {
    if (enregistrement === null) return;
    const t = setInterval(() => setEnregistrement((s) => (s === null ? null : s + 1)), 1000);
    return () => clearInterval(t);
  }, [enregistrement]);

  const envoyer = (m: Omit<MessageEnvoye, "id" | "heure">) => {
    const premier = envoyes.filter((e) => !e.recu).length === 0;
    envoyerMessage(conv.id, m);
    // Réponse simulée au premier message, pour rendre la démonstration vivante
    if (premier) {
      const prenom = conv.avec.split(" ")[0];
      setTimeout(
        () => envoyerMessage(conv.id, { type: "texte", contenu: `Bien reçu, merci ! Je regarde et je reviens vers vous très vite. ${prenom}`, recu: true }),
        1500,
      );
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight text-brand">Messagerie</h1>
      <div className="mt-6 grid gap-4 lg:grid-cols-[320px_1fr]">
        <Card className="h-fit p-2">
          {liste.map((c) => {
            const derniers = messages[c.id];
            const dernier = derniers?.length ? derniers[derniers.length - 1] : undefined;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setActive(c.id)}
                className={cx("flex w-full items-start gap-3 rounded-xl p-3 text-left", conv.id === c.id ? "bg-brand-50" : "hover:bg-canvas")}
              >
                <Avatar nom={c.avec} teinte={teinte(c.avec)} />
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-semibold text-ink">{c.avec}</span>
                    <span className="shrink-0 text-xs text-muted">{dernier?.heure ?? c.heure}</span>
                  </span>
                  <span className="block truncate text-xs font-medium text-brand">{c.sujet}</span>
                  <span className="block truncate text-sm text-muted">
                    {dernier ? (dernier.type === "texte" ? dernier.contenu : dernier.type === "image" ? "Photo" : "Message vocal") : c.dernier || "Nouvelle conversation"}
                  </span>
                </span>
                {c.nonLus > 0 && conv.id !== c.id && <span className="mt-1 rounded-full bg-accent px-1.5 text-xs font-bold text-white">{c.nonLus}</span>}
              </button>
            );
          })}
        </Card>

        <Card className="flex min-h-[600px] flex-col">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line p-4">
            <div className="flex items-center gap-3">
              <Avatar nom={conv.avec} teinte={teinte(conv.avec)} taille="sm" />
              <div>
                <p className="font-semibold text-ink">{conv.avec}</p>
                <p className="text-xs text-muted">{conv.sujet}</p>
              </div>
            </div>
            {demande && (
              <Link href={lienDemande(demande)} className="flex items-center gap-3 rounded-xl bg-canvas px-3 py-2 text-sm hover:bg-brand-50">
                <FileText className="size-4 text-brand" />
                <span className="font-medium text-ink">{demande.id}</span>
                <StatutDemandeBadge statut={demandeStatut ?? demande.statut} />
                <ArrowRight className="size-4 text-muted" />
              </Link>
            )}
          </div>

          {contexte && (
            <div className="mx-4 mt-4 flex items-center gap-2 rounded-xl bg-trust-50 px-3 py-2 text-xs font-medium text-trust-dark">
              <Images className="size-4 shrink-0" /> Conversation commencée depuis la réalisation « {contexte} »
            </div>
          )}

          <div className="flex-1 space-y-4 p-4">
            {base.length === 0 && envoyes.length === 0 && (
              <p className="py-10 text-center text-sm text-muted">Présentez votre besoin à {conv.avec.split(" ")[0]} : il vous répondra ici.</p>
            )}
            {base.map((m, i) => {
              const moi = m.moi;
              return (
                <div key={i} className={cx("flex", moi ? "justify-end" : "justify-start")}>
                  <div className="max-w-[80%]">
                    {"proposition" in m && m.proposition && demande ? (
                      <div className="rounded-2xl border border-accent/30 bg-accent-50 p-4">
                        <p className="text-xs font-bold uppercase tracking-wide text-accent-dark">Proposition de prix</p>
                        <p className="mt-1 text-xl font-bold text-ink tabular">{fcfa(demande.montant ?? 0)}</p>
                        <p className="text-sm text-slate-600">Délai : {demande.delai}</p>
                      </div>
                    ) : (
                      <p className={cx("rounded-2xl px-4 py-2.5 text-sm leading-6", moi ? "rounded-br-sm bg-brand text-white" : "rounded-bl-sm bg-canvas text-ink")}>
                        {m.texte}
                      </p>
                    )}
                    <p className={cx("mt-1 text-xs text-muted", moi && "text-right")}>{m.heure}</p>
                  </div>
                </div>
              );
            })}
            {envoyes.map((m) => (
              <div key={m.id} className={cx("flex", m.recu ? "justify-start" : "justify-end")}>
                <div className="max-w-[80%]">
                  {m.type === "texte" && (
                    <p className={cx("rounded-2xl px-4 py-2.5 text-sm leading-6", m.recu ? "rounded-bl-sm bg-canvas text-ink" : "rounded-br-sm bg-brand text-white")}>
                      {m.contenu}
                    </p>
                  )}
                  {m.type === "image" && (
                    // eslint-disable-next-line @next/next/no-img-element -- photo choisie par l'utilisateur, gardée dans le navigateur
                    <img src={m.contenu} alt="Photo envoyée" className="max-h-64 rounded-2xl object-cover" />
                  )}
                  {m.type === "vocal" && <Vocal duree={m.contenu} recu={m.recu} />}
                  <p className={cx("mt-1 text-xs text-muted", !m.recu && "text-right")}>{m.heure}</p>
                </div>
              </div>
            ))}
            <div ref={finFil} />
          </div>

          <form
            className="flex items-center gap-2 border-t border-line p-3"
            onSubmit={(e) => {
              e.preventDefault();
              if (!brouillon.trim()) return;
              envoyer({ type: "texte", contenu: brouillon.trim() });
              setBrouillon("");
            }}
          >
            <input
              ref={fichier}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (e) => {
                const f = e.target.files?.[0];
                if (f) envoyer({ type: "image", contenu: await lireImage(f, 700) });
                e.target.value = "";
              }}
            />
            <button type="button" onClick={() => fichier.current?.click()} className="rounded-lg p-2 text-muted hover:bg-canvas hover:text-brand" aria-label="Envoyer une photo">
              <Paperclip className="size-5" />
            </button>
            {enregistrement === null ? (
              <>
                <button type="button" onClick={() => setEnregistrement(0)} className="rounded-lg p-2 text-muted hover:bg-canvas hover:text-brand" aria-label="Enregistrer un message vocal">
                  <Mic className="size-5" />
                </button>
                <input
                  value={brouillon}
                  onChange={(e) => setBrouillon(e.target.value)}
                  placeholder={`Écrire à ${conv.avec.split(" ")[0]}…`}
                  className="h-11 min-w-0 flex-1 rounded-xl bg-canvas px-4 text-sm outline-none focus:ring-2 focus:ring-brand/20"
                />
                <button type="submit" className="flex size-11 items-center justify-center rounded-xl bg-brand text-white hover:bg-brand-dark" aria-label="Envoyer">
                  <Send className="size-4" />
                </button>
              </>
            ) : (
              <>
                <span className="flex h-11 flex-1 items-center gap-2 rounded-xl bg-danger-50 px-4 text-sm font-medium text-danger">
                  <span className="size-2.5 animate-pulse rounded-full bg-danger" /> Enregistrement… 0:{String(enregistrement).padStart(2, "0")}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const duree = Math.max(1, enregistrement);
                    envoyer({ type: "vocal", contenu: `0:${String(duree).padStart(2, "0")}` });
                    setEnregistrement(null);
                  }}
                  className="flex h-11 items-center gap-2 rounded-xl bg-brand px-4 text-sm font-semibold text-white"
                >
                  <Square className="size-3.5 fill-white" /> Envoyer
                </button>
              </>
            )}
          </form>
        </Card>
      </div>
    </main>
  );
}
