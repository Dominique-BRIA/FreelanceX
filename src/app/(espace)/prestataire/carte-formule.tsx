"use client";

import Link from "next/link";
import { Badge, Card } from "@/components/ui";
import { useDemo } from "@/components/demo-store";
import { formules } from "@/data/mock";

export function CarteFormule() {
  const { formule } = useDemo();
  const f = formules.find((x) => x.id === formule)!;
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted">Formule</p>
        <Badge ton={f.id === "classique" ? "neutre" : "accent"}>{f.nom}</Badge>
      </div>
      <p className="mt-2 text-sm text-ink">
        Commission de {f.commission} % · {f.prix ? "renouvelée le 14 nov." : "gratuite"}
      </p>
      <Link href="/prestataire/abonnement" className="mt-3 inline-block text-sm font-semibold text-brand hover:underline">
        Gérer l&apos;abonnement
      </Link>
    </Card>
  );
}
