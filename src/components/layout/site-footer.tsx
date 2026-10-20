import { getStoreSettings } from "@/features/catalog/queries";
import { formatOpenDays } from "@/lib/format";

export async function SiteFooter() {
  const settings = await getStoreSettings();

  return (
    <footer className="on-dark mt-16 bg-ink text-cream">
      <div className="page-container grid gap-8 py-10 sm:grid-cols-3">
        <div>
          <p className="font-display text-2xl text-gold">
            El Palacio de las Papas
          </p>
          <p className="mt-2 text-base">Coma sin vergüenza</p>
        </div>
        {settings && (
          <>
            <div className="space-y-4">
              <div>
                <h2 className="font-bold text-gold">Horarios</h2>
                <p>
                  {formatOpenDays(settings.openDays)}, de {settings.opensAt} a{" "}
                  {settings.closesAt} hs
                </p>
              </div>
              <div>
                <h2 className="font-bold text-gold">Retiro por el local</h2>
                <p>{settings.pickupAddress}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h2 className="font-bold text-gold">WhatsApp</h2>
                <p>{settings.whatsapp}</p>
              </div>
              <div>
                <h2 className="font-bold text-gold">Instagram</h2>
                <p>{settings.instagram}</p>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="border-t border-cream/20 px-4 py-4 text-center text-sm text-cream/80">
        Proyecto de portfolio: negocio ficticio, sin cobros ni envíos reales.
      </div>
    </footer>
  );
}