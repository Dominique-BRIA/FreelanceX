const nombre = new Intl.NumberFormat("fr-FR");

/** 150000 -> "150 000 FCFA" */
export function fcfa(montant: number): string {
  return `${nombre.format(montant).replace(/ | /g, " ")} FCFA`;
}

export function compact(valeur: number): string {
  return nombre.format(valeur).replace(/ | /g, " ");
}

export function initiales(nom: string): string {
  return nom
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((mot) => mot[0]?.toUpperCase())
    .join("");
}

export function cx(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
