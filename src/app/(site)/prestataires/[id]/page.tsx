import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Banknote, Clock, ImagePlus, Lock, MapPin, MessageSquare, ShieldCheck, Wrench } from "lucide-react";
import { Avatar, Badge, BoutonLien, Card, Certifie, Note, PaiementDirect, PaiementSecurise } from "@/components/ui";
import { Jauge } from "@/components/charts";
import { PRESTATAIRE_DEMO, prestataires, trouverPrestataire } from "@/data/mock";
import { fcfa } from "@/lib/format";
import { BoutonDemande } from "./demande-modale";
import { BoutonFavori, BoutonSignaler, RealisationsProfil, ServicesAjoutes } from "./elements-profil";

export function generateStaticParams() {
  return prestataires.map((p) => ({ id: p.id }));
}

export async function generateMetadata(props: PageProps<"/prestataires/[id]">): Promise<Metadata> {
  const { id } = await props.params;
  return { title: trouverPrestataire(id)?.nom ?? "Prestataire" };
}

const avisDemo = [
  { auteur: "Christian N.", note: 5, texte: "Travail soigné, délais respectés. Le placard est exactement comme prévu.", service: "Placard sur mesure", date: "oct. 2026" },
  { auteur: "Nadège O.", note: 5, texte: "Très professionnel, chantier laissé propre.", service: "Étagères de bibliothèque", date: "sept. 2026" },
  { auteur: "Ruth A.", note: 4, texte: "Bon résultat, une journée de retard mais bien prévenue.", service: "Réparation de meuble", date: "août 2026" },
];

export default async function ProfilPrestataire(props: PageProps<"/prestataires/[id]">) {
  const { id } = await props.params;
  const p = trouverPrestataire(id);
  if (!p) notFound();
  const estMoi = p.id === PRESTATAIRE_DEMO;
  const prenom = p.nom.split(" ")[0];

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Card className="overflow-hidden">
        <div className="relative h-44 bg-gradient-to-br from-brand to-brand-dark sm:h-56">
          {p.couverture && (
            <Image src={p.couverture} alt={`Activité de ${p.nom}`} fill priority sizes="(min-width: 1280px) 1216px, 100vw" className="object-cover" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
        </div>
        <div className="flex flex-col gap-6 p-6 sm:p-8 md:flex-row md:items-start">
          <div className="relative z-10 -mt-20 w-fit rounded-full border-4 border-white sm:-mt-24">
            <Avatar nom={p.nom} teinte={p.teinte} taille="xl" verifie={p.certifie} />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-3xl font-extrabold tracking-tight text-ink">{p.nom}</h1>
              {p.certifie && <Certifie />}
              {/* Cahier des charges v1.1, section 3.4 : mode de paiement du prestataire. */}
              {p.modePaiement === "securise" && <PaiementSecurise />}
              {p.modePaiement === "direct" && <PaiementDirect />}
            </div>
            <p className="mt-1 text-lg font-medium text-accent-text">{p.metier}</p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
              <Note note={p.note} avis={p.avis} />
              <span className="flex items-center gap-1.5"><MapPin className="size-4" /> {p.zone}</span>
              <span className="flex items-center gap-1.5"><Clock className="size-4" /> {p.reponse}</span>
            </div>
            <p className="mt-4 max-w-2xl leading-7 text-slate-600">{p.description}</p>
          </div>
          {estMoi ? (
            <div className="flex w-full flex-col gap-2 md:w-64">
              <p className="rounded-xl bg-brand-50 px-3 py-2 text-center text-sm font-medium text-brand">C&apos;est votre profil public</p>
              <BoutonLien href="/prestataire/services" variante="contour" className="w-full">
                <Wrench className="size-4" /> Gérer mes services
              </BoutonLien>
              <BoutonLien href="/prestataire/publier" variante="action" className="w-full">
                <ImagePlus className="size-4" /> Publier une réalisation
              </BoutonLien>
            </div>
          ) : (
            <div className="flex w-full flex-col gap-2 md:w-64">
              <BoutonDemande prestataire={p.nom} />
              <BoutonLien href={`/messagerie?avec=${p.id}`} variante="contour" className="w-full">
                <MessageSquare className="size-4" /> Envoyer un message
              </BoutonLien>
              <BoutonFavori prestataireId={p.id} />
            </div>
          )}
        </div>
      </Card>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-10">
          <section id="services">
            <h2 className="text-xl font-bold text-ink">Services et tarifs</h2>
            <div className="mt-4 space-y-3">
              {p.services.map((s) => (
                <Card key={s.id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
                  <div className="flex-1">
                    <p className="font-bold text-ink">{s.titre}</p>
                    <p className="mt-1 text-sm text-muted">{s.description}</p>
                    <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-slate-500">
                      <Clock className="size-3.5" /> {s.delai}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 sm:flex-col sm:items-end">
                    <p className="font-bold text-ink tabular">
                      {s.prix ? `${s.prix >= 50000 ? "Dès " : ""}${fcfa(s.prix)}${s.unite ? ` ${s.unite}` : ""}` : "Sur proposition"}
                    </p>
                    {!estMoi && <BoutonDemande prestataire={p.nom} service={s.titre} />}
                  </div>
                </Card>
              ))}
              <ServicesAjoutes prestataireId={p.id} />
            </div>
          </section>

          <RealisationsProfil prestataireId={p.id} />

          <section id="avis">
            <div className="flex items-end justify-between">
              <h2 className="text-xl font-bold text-ink">Avis clients</h2>
              <Note note={p.note} avis={p.avis} />
            </div>
            {/* Cahier des charges v1.1 : un seul avis, par le client d'une prestation terminée. */}
            <p className="mt-1 text-sm text-muted">Seul le client d&apos;une prestation terminée peut laisser un avis, une seule fois.</p>
            <div className="mt-4 space-y-3">
              {avisDemo.map((a) => (
                <Card key={a.auteur} className="p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-semibold text-ink">{a.auteur}</p>
                    <Badge ton="trust"><ShieldCheck className="size-3.5" /> Prestation terminée</Badge>
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-xs text-muted">
                    <Note note={a.note} /> · {a.service} · {a.date}
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{a.texte}</p>
                </Card>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-4">
          <Card className="p-5">
            <p className="font-bold text-ink">Confiance</p>
            <div className="mt-4 space-y-4 text-sm">
              <div>
                <div className="flex justify-between">
                  <span className="text-muted">Score de confiance</span>
                  <span className="font-bold text-ink tabular">{p.scoreConfiance} / 100</span>
                </div>
                <div className="mt-2"><Jauge valeur={p.scoreConfiance} /></div>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Prestations réalisées</span>
                <span className="font-bold text-ink tabular">{p.prestations}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Disponibilité</span>
                <span className="font-semibold text-trust-dark">{p.disponibilite}</span>
              </div>
            </div>
            {p.certifie && (
              <Link href="/certification" className="mt-5 block rounded-xl bg-trust-50 p-3 text-sm text-trust-dark hover:underline">
                Identité vérifiée par FreelanceX. Que garantit ce badge ?
              </Link>
            )}
          </Card>
          {p.modePaiement === "securise" && (
            <Card className="p-5">
              <p className="flex items-center gap-2 font-bold text-ink"><Lock className="size-4 text-trust" /> Paiement sécurisé</p>
              <p className="mt-2 text-sm leading-6 text-muted">
                Votre paiement reste bloqué sur FreelanceX et n&apos;est versé à {prenom} qu&apos;après votre confirmation. En
                cas de désaccord, l&apos;équipe arbitre.
              </p>
            </Card>
          )}
          {p.modePaiement === "direct" && (
            <Card className="p-5">
              <p className="flex items-center gap-2 font-bold text-ink"><Banknote className="size-4 text-muted" /> Paiement direct</p>
              <p className="mt-2 text-sm leading-6 text-muted">
                Vous payez {prenom} directement, comme convenu ensemble. FreelanceX ne garde pas l&apos;argent, mais vous pouvez
                signaler un problème.
              </p>
            </Card>
          )}
          {!estMoi && <BoutonSignaler />}
        </aside>
      </div>

      {/* Barre d'action mobile : collante en bas de l'écran, elle s'arrête à la fin de <main> et ne cache pas le pied de page. */}
      {!estMoi && (
        <div className="sticky bottom-0 z-40 -mx-4 mt-8 flex gap-3 border-t border-line bg-white px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] sm:-mx-6 sm:px-6 md:hidden">
          <BoutonLien href={`/messagerie?avec=${p.id}`} variante="contour" className="w-11 shrink-0 px-0!" aria-label={`Envoyer un message à ${prenom}`}>
            <MessageSquare className="size-5" />
          </BoutonLien>
          <div className="flex-1">
            <BoutonDemande prestataire={p.nom} />
          </div>
        </div>
      )}
    </main>
  );
}
