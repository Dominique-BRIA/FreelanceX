import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Avatar, Bouton, Card, Certifie, Note, PaiementDirect, PaiementSecurise, StatutDemandeBadge } from "@/components/ui";
import { libellesStatut, UTILISATEUR_DEMO, type StatutDemande } from "@/data/mock";

export const metadata: Metadata = { title: "Charte graphique FreelanceX" };

const couleurs = [
  { groupe: "Bleu (marque)", teintes: [["brand", "#0b3a86"], ["brand-dark", "#01295f"], ["brand-50", "#eef3fb"], ["brand-100", "#d6e2f5"]] },
  {
    groupe: "Orange (action)",
    teintes: [["accent", "#f2770c"], ["accent-hover", "#f58f3a"], ["accent-50", "#fff2e6"], ["accent-text", "#9a4508"]],
  },
  { groupe: "Turquoise (confiance seulement)", teintes: [["trust", "#0d9488"], ["trust-dark", "#0f766e"], ["trust-50", "#e6f6f4"]] },
  { groupe: "Neutres", teintes: [["ink", "#1e293b"], ["muted", "#5b6577"], ["line", "#e2e8f0"], ["canvas", "#f3f5f7"]] },
  { groupe: "Erreur", teintes: [["danger", "#dc2626"], ["danger-50", "#fef2f2"]] },
];

const statuts = Object.keys(libellesStatut) as StatutDemande[];

function Section({ titre, children }: { titre: string; children: ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold tracking-tight text-ink">{titre}</h2>
      <Card className="mt-4 p-5">{children}</Card>
    </section>
  );
}

export default function Charte() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight text-brand">Charte graphique FreelanceX</h1>
      <p className="mt-3 text-muted">Les couleurs et les composants à réutiliser dans toute la maquette.</p>

      <Section titre="Couleurs">
        <div className="space-y-6">
          {couleurs.map(({ groupe, teintes }) => (
            <div key={groupe}>
              <h3 className="text-sm font-bold text-ink">{groupe}</h3>
              <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {teintes.map(([nom, code]) => (
                  <li key={nom} className="flex items-center gap-3">
                    <span className="size-10 shrink-0 rounded-xl border border-line" style={{ backgroundColor: `var(--color-${nom})` }} />
                    <span className="min-w-0 text-sm">
                      <span className="block truncate font-semibold text-ink">{nom}</span>
                      <span className="font-mono text-xs text-muted">{code}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section titre="Boutons">
        <div className="flex flex-wrap gap-3">
          <Bouton variante="primaire">Primaire</Bouton>
          <Bouton variante="action">Action</Bouton>
          <Bouton variante="contour">Contour</Bouton>
          <Bouton variante="discret">Discret</Bouton>
          <Bouton variante="danger">Danger</Bouton>
        </div>
      </Section>

      <Section titre="Statuts de demande">
        <ul className="flex flex-wrap gap-2">
          {statuts.map((s) => (
            <li key={s}>
              <StatutDemandeBadge statut={s} />
            </li>
          ))}
        </ul>
      </Section>

      <Section titre="Confiance et paiement">
        <div className="flex flex-wrap items-center gap-3">
          <Certifie />
          <Certifie court />
          <PaiementSecurise />
          <PaiementDirect />
        </div>
      </Section>

      <Section titre="Note">
        <Note note={4.9} avis={38} />
      </Section>

      <Section titre="Avatar">
        <div className="flex flex-wrap items-end gap-6">
          {[
            { libelle: "Initiales", avatar: <Avatar nom={UTILISATEUR_DEMO} teinte="bg-amber-600" taille="lg" /> },
            { libelle: "Photo", avatar: <Avatar nom={UTILISATEUR_DEMO} photo="/images/profil-brice-tchoumi.jpg" taille="lg" /> },
            { libelle: "Photo + vérifié", avatar: <Avatar nom={UTILISATEUR_DEMO} photo="/images/profil-brice-tchoumi.jpg" taille="lg" verifie /> },
          ].map(({ libelle, avatar }) => (
            <div key={libelle} className="flex flex-col items-center gap-2">
              {avatar}
              <span className="text-xs text-muted">{libelle}</span>
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}
