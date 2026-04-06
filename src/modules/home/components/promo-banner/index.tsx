import { sdk } from "@lib/config"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type StorePromotion = {
  id: string
  title: string
  description: string
  discount_percentage: number
  start_date: string
  end_date: string
}

async function getActivePromotions(): Promise<StorePromotion[]> {
  try {
    const response = await sdk.client.fetch<{
      promotions: StorePromotion[]
    }>("/store/promotions/active", {
      method: "GET",
      cache: "no-store",
    })
    return response.promotions
  } catch {
    return []
  }
}

export default async function PromoBanner() {
  const promotions = await getActivePromotions()

  if (!promotions || promotions.length === 0) {
    return null
  }

  // Show the highest discount promotion
  const topPromo = promotions[0]

  return (
    <section
      className="bg-grey-90 text-white"
      aria-label="Current promotion"
      data-testid="promo-banner"
    >
      <div className="content-container py-4">
        <div className="flex flex-col small:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <span
              className="bg-white text-grey-90 px-3 py-1 rounded-soft text-sm font-bold"
              data-testid="promo-discount"
            >
              Up to {topPromo.discount_percentage}% Off
            </span>
            <div>
              <p className="text-sm font-medium" data-testid="promo-title">
                {topPromo.title}
              </p>
              <p className="text-xs text-grey-30" data-testid="promo-description">
                {topPromo.description}
              </p>
            </div>
          </div>
          <LocalizedClientLink href="/store">
            <button
              type="button"
              className="border border-white text-white px-5 py-2 rounded-soft hover:bg-white hover:text-grey-90 transition-colors text-xs font-medium tracking-wide uppercase flex-shrink-0"
              data-testid="promo-cta"
            >
              Shop Now
            </button>
          </LocalizedClientLink>
        </div>
      </div>
    </section>
  )
}
