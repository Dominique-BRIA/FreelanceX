"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, FileText, Images, Mic, Paperclip, Send } from "lucide-react";
import { Avatar, Card, StatutDemandeBadge } from "@/components/ui";
import { conversations, messagesDemo, prestataires, trouverDemande } from "@/data/mock";
import { cx, fcfa } from "@/lib/format";

const teinte = (nom: string) => prestataires.find((p) => p.nom === nom)?.teinte ?? "bg-brand";

export function Messagerie() {
  const [active, setActive] = useState(conversations[0].id);
  const [brouillon, setBrouillon] = useState("");
  const [envoyes, setEnvoyes] = useState<string[]>([]);
  const conv = conversations.find((c) => c.id === active)!;
  const demande = conv.demandeId ? trouverDemande(conv.demandeId) : undefined;
  const fil = conv.id === "c1" ? messagesDemo : [{ de: "prestataire" as const, texte: conv.dernier, heure: conv.heure }];

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight text-brand">Messagerie</h1>
      <div className="mt-6 grid gap-4 lg:grid-cols-[320px_1fr]">
        <Card className="p-2">
          {conversations.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                setActive(c.id);
                setEnvoyes([]);
              }}
              className={cx("flex w-full items-start gap-3 rounded-xl p-3 text-left", active === c.id ? "bg-brand-50" : "hover:bg-canvas")}
            >
              <Avatar nom={c.avec} teinte={teinte(c.avec)} />
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-2">
                  <span className="truncate text-sm font-semibold text-ink">{c.avec}</span>
                  <span className="shrink-0 text-xs text-muted">{c.heure}</span>
                </span>
                <span className="block truncate text-xs font-medium text-brand">{c.sujet}</span>
                <span className="block truncate text-sm text-muted">{c.dernier}</span>
              </span>
              {c.nonLus > 0 && <span className="mt-1 rounded-full bg-accent px-1.5 text-xs font-bold text-white">{c.nonLus}</span>}
            </button>
          ))}
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
              <Link href={`/demandes/${demande.id}`} className="flex items-center gap-3 rounded-xl bg-canvas px-3 py-2 text-sm hover:bg-brand-50">
                <FileText className="size-4 text-brand" />
                <span className="font-medium text-ink">{demande.id}</span>
                <StatutDemandeBadge statut={demande.statut} />
                <ArrowRight className="size-4 text-muted" />
              </Link>
            )}
          </div>

          {conv.id === "c1" && (
            <div className="mx-4 mt-4 flex items-center gap-2 rounded-xl bg-trust-50 px-3 py-2 text-xs font-medium text-trust-dark">
              <Images className="size-4" /> Conversation commencée depuis la réalisation « Dressing en iroko pour une chambre parentale »
            </div>
          )}

          <div className="flex-1 space-y-4 p-4">
            {fil.map((m, i) => {
              const moi = m.de === "client";
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
            {envoyes.map((t, i) => (
              <div key={`e${i}`} className="flex justify-end">
                <p className="max-w-[80%] rounded-2xl rounded-br-sm bg-brand px-4 py-2.5 text-sm leading-6 text-white">{t}</p>
              </div>
            ))}
          </div>

          <form
            className="flex items-center gap-2 border-t border-line p-3"
            onSubmit={(e) => {
              e.preventDefault();
              if (!brouillon.trim()) return;
              setEnvoyes((l) => [...l, brouillon.trim()]);
              setBrouillon("");
            }}
          >
            <button type="button" className="rounded-lg p-2 text-muted hover:bg-canvas" aria-label="Joindre un fichier">
              <Paperclip className="size-5" />
            </button>
            <button type="button" className="rounded-lg p-2 text-muted hover:bg-canvas" aria-label="Message vocal">
              <Mic className="size-5" />
            </button>
            <input
              value={brouillon}
              onChange={(e) => setBrouillon(e.target.value)}
              placeholder={`Écrire à ${conv.avec.split(" ")[0]}…`}
              className="h-11 flex-1 rounded-xl bg-canvas px-4 text-sm outline-none focus:ring-2 focus:ring-brand/20"
            />
            <button type="submit" className="flex size-11 items-center justify-center rounded-xl bg-brand text-white hover:bg-brand-dark" aria-label="Envoyer">
              <Send className="size-4" />
            </button>
          </form>
        </Card>
      </div>
    </main>
  );
}
