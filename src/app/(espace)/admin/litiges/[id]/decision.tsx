"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { Bouton, Card } from "@/components/ui";
import type { Litige } from "@/data/mock";
import { cx, fcfa } from "@/lib/format";

type Issue = "prestataire" | "client" | "partage";

export function Decision({ litige }: { litige: Litige }) {
  const [issue, setIssue] = useState<Issue>("partage");
  const [partClient, setPartClient] = useState(30);
  const [mauvaiseFoi, setMauvaiseFoi] = useState<"" | "demandeur" | "defendeur">("");
  const [rendue, setRendue] = useState(litige.etat === "resolu");
  const [complement, setComplement] = useState(false);

  const client = litige.demandeurRole === "client" ? litige.demandeur : litige.defendeur;
  const prestataire = litige.demandeurRole === "client" ? litige.defendeur : litige.demandeur;
  const rembourse = issue === "client" ? litige.montant : issue === "prestataire" ? 0 : Math.round((litige.montant * partClient) / 100);
  const verse = litige.montant - rembourse;

  if (rendue) {
    return (
      <Card className="h-fit p-6">
        <CheckCircle2 className="size-8 text-trust" />
        <h2 className="mt-3 text-lg font-bold text-ink">Décision rendue</h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          {litige.etat === "resolu"
            ? litige.delai
            : `${fcfa(rembourse)} remboursés à ${client}, ${fcfa(verse)} versés à ${prestataire}. Les deux parties ont été notifiées.`}
        </p>
        {mauvaiseFoi && (
          <p className="mt-3 rounded-xl bg-danger-50 p-3 text-sm text-danger">
            Avertissement attribué à {mauvaiseFoi === "demandeur" ? litige.demandeur : litige.defendeur}.
          </p>
        )}
      </Card>
    );
  }

  return (
    <Card className="h-fit p-6 lg:sticky lg:top-8">
      <h2 className="text-lg font-bold text-ink">Décision</h2>
      <p className="mt-1 text-sm text-muted">Répartition des {fcfa(litige.montant)} bloqués.</p>

      <fieldset className="mt-5 space-y-2">
        <legend className="sr-only">Issue</legend>
        {(
          [
            { id: "prestataire", libelle: `En faveur de ${prestataire}`, detail: "Tout est versé au prestataire" },
            { id: "client", libelle: `En faveur de ${client}`, detail: "Le client est remboursé" },
            { id: "partage", libelle: "Partage", detail: "Vous fixez la répartition" },
          ] as const
        ).map((o) => (
          <label
            key={o.id}
            className={cx(
              "flex cursor-pointer items-start gap-3 rounded-xl border p-3",
              issue === o.id ? "border-brand bg-brand-50" : "border-line hover:border-brand/40",
            )}
          >
            <input type="radio" name="issue" checked={issue === o.id} onChange={() => setIssue(o.id)} className="mt-1 accent-brand" />
            <span>
              <span className="block text-sm font-semibold text-ink">{o.libelle}</span>
              <span className="block text-xs text-muted">{o.detail}</span>
            </span>
          </label>
        ))}
      </fieldset>

      {issue === "partage" && (
        <div className="mt-4">
          <label className="flex items-center justify-between text-sm">
            <span className="font-medium text-ink">Part remboursée au client</span>
            <span className="font-bold tabular">{partClient} %</span>
          </label>
          <input type="range" min={0} max={100} step={5} value={partClient} onChange={(e) => setPartClient(Number(e.target.value))} className="mt-2 w-full accent-brand" />
        </div>
      )}

      <dl className="mt-4 space-y-1.5 rounded-xl bg-canvas p-3 text-sm">
        <div className="flex justify-between"><dt className="text-muted">Remboursé au client</dt><dd className="font-semibold tabular">{fcfa(rembourse)}</dd></div>
        <div className="flex justify-between"><dt className="text-muted">Versé au prestataire</dt><dd className="font-semibold tabular">{fcfa(verse)}</dd></div>
      </dl>

      <label className="mt-4 block">
        <span className="text-sm font-semibold text-ink">Motif de la décision</span>
        <textarea rows={3} className="mt-1.5 w-full rounded-xl border border-line p-3 text-sm outline-none focus:border-brand" placeholder="Visible par les deux parties" />
      </label>

      <label className="mt-4 block">
        <span className="flex items-center gap-1.5 text-sm font-semibold text-ink">
          <AlertTriangle className="size-4 text-danger" /> Mauvaise foi constatée
        </span>
        <select
          value={mauvaiseFoi}
          onChange={(e) => setMauvaiseFoi(e.target.value as typeof mauvaiseFoi)}
          className="mt-1.5 h-11 w-full rounded-xl border border-line bg-white px-3 text-sm outline-none focus:border-brand"
        >
          <option value="">Non : désaccord de bonne foi</option>
          <option value="demandeur">Oui : {litige.demandeur}</option>
          <option value="defendeur">Oui : {litige.defendeur}</option>
        </select>
      </label>
      {mauvaiseFoi && (
        <p className="mt-2 text-xs text-danger">
          Un avertissement sera ajouté. Au 3ᵉ, le compte est bloqué et la personne inscrite sur la liste noire.
        </p>
      )}

      <Bouton className="mt-5 w-full" onClick={() => setRendue(true)}>Rendre la décision</Bouton>
      {complement ? (
        <p className="mt-3 rounded-xl bg-brand-50 p-3 text-sm text-brand">
          Complément demandé aux deux parties. Elles ont 3 jours pour déposer de nouvelles preuves.
        </p>
      ) : (
        <Bouton variante="discret" className="mt-2 w-full" onClick={() => setComplement(true)}>
          Demander un complément de preuve
        </Bouton>
      )}
    </Card>
  );
}
