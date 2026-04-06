import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"
import InteractiveLink from "@modules/common/components/interactive-link"
import ProductPreview from "@modules/products/components/product-preview"

export default async function ProductSlider({
  region,
  title,
  subtitle,
}: {
  region: HttpTypes.StoreRegion
  title: string
  subtitle?: string
}) {
  const {
    response: { products },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      limit: 12,
      fields: "*variants.calculated_price",
    },
  })

  if (!products || products.length === 0) {
    return null
  }

  return (
    <section
      className="content-container py-16 small:py-24"
      aria-label={title}
      role="region"
    >
      <div className="flex flex-col items-center mb-10">
        {subtitle && (
          <Text className="text-xs font-medium tracking-[0.3em] uppercase text-grey-40 mb-2">
            {subtitle}
          </Text>
        )}
        <h2 className="text-2xl small:text-3xl font-normal text-grey-90">
          {title}
        </h2>
      </div>

      <div className="relative">
        <div
          className="flex gap-x-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="min-w-[260px] small:min-w-[300px] snap-start flex-shrink-0"
            >
              <ProductPreview product={product} region={region} isFeatured />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <InteractiveLink href="/store">View all products</InteractiveLink>
      </div>
    </section>
  )
}
