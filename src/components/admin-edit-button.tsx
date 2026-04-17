import { Link } from "@tanstack/react-router";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = { citySlugUf: string };

/**
 * Botão flutuante visível em cada página de cidade. Leva o admin direto para
 * o editor da cidade. Não é "secreto" — qualquer um vê o botão, mas só
 * consegue editar após login na rota /admin.
 */
export function AdminEditButton({ citySlugUf }: Props) {
  return (
    <div className="fixed bottom-24 right-4 z-40">
      <Button
        asChild
        size="sm"
        variant="secondary"
        className="shadow-lg border border-border/60"
      >
        <Link to="/admin" search={{ city: citySlugUf } as never}>
          <Settings className="mr-2 h-4 w-4" />
          Editar anunciantes
        </Link>
      </Button>
    </div>
  );
}
