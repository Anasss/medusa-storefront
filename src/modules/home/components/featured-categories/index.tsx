import { listCategories } from "@lib/data/categories"
import { Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const CATEGORY_IMAGES: Record<string, string> = {
  "t-shirts": "/products/crew-tee-1.jpg",
  shirts: "/products/oxford-shirt-1.jpg",
  "sweatshirts-hoodies": "/products/sweatshirt-1.jpg",
  "pants-jeans": "/products/chinos-1.jpg",
  shorts: "/products/shorts-1.jpg",
  "jackets-coats": "/products/overcoat-1.jpg",
  accessories: "/products/tote-bag-1.jpg",
  footwear: "/products/sneakers-1.jpg",
  activewear: "/products/running-tee-1.jpg",
}

export default async function FeaturedCategories() {
  const categories = await listCategories({ limit: 6 })

  const topCategories = categories
    ?.filter((c) => !c.parent_category)
    .slice(0, 6)

  if (!topCategories || topCategories.length === 0) {
    return null
  }

  return (
    <section className="content-container py-16 small:py-24" aria-label="Shop by category">
      <div className="flex flex-col items-center mb-10">
        <Text className="text-xs font-medium tracking-[0.3em] uppercase text-grey-40 mb-2">
          Explore
        </Text>
        <h2 className="text-2xl small:text-3xl font-normal text-grey-90">
          Shop by Category
        </h2>
      </div>
      <div className="grid grid-cols-2 small:grid-cols-3 gap-4 small:gap-6">
        {topCategories.map((category) => {
          const imageUrl =
            CATEGORY_IMAGES[category.handle] ||
            "https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-black-front.png"

          return (
            <LocalizedClientLink
              key={category.id}
              href={`/categories/${category.handle}`}
              className="group relative aspect-[4/5] small:aspect-[3/4] overflow-hidden rounded-rounded bg-grey-10"
            >
              <img
                src={imageUrl}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-grey-90/70 via-grey-90/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 small:p-6">
                <h3 className="text-white text-lg small:text-xl font-medium">
                  {category.name}
                </h3>
                <span className="text-grey-20 text-sm mt-1 inline-flex items-center gap-1 group-hover:underline">
                  Shop now
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-3 h-3 transition-transform group-hover:translate-x-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </span>
              </div>
            </LocalizedClientLink>
          )
        })}
      </div>
    </section>
  )
}
