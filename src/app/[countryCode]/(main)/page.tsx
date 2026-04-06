import { Metadata } from "next"
import { Suspense } from "react"

import Hero from "@modules/home/components/hero"
import PromoBanner from "@modules/home/components/promo-banner"
import ValueProps from "@modules/home/components/value-props"
import FeaturedCategories from "@modules/home/components/featured-categories"
import ProductSlider from "@modules/home/components/product-slider"
import Newsletter from "@modules/home/components/newsletter"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Doqaland Store — Modern Fashion & Lifestyle",
  description:
    "Discover timeless fashion essentials crafted for everyday living. Shop clothing, accessories, and more at Doqaland Store.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  return (
    <>
      <Hero />
      <Suspense fallback={null}>
        <PromoBanner />
      </Suspense>
      <ValueProps />
      <Suspense fallback={<div className="py-24" />}>
        <FeaturedCategories />
      </Suspense>
      <Suspense fallback={<div className="py-24" />}>
        <ProductSlider
          region={region}
          title="Trending Now"
          subtitle="Customer Favorites"
        />
      </Suspense>
      <Newsletter />
    </>
  )
}
