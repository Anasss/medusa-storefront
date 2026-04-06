import { Button, Container, Text } from "@medusajs/ui"
import { cookies as nextCookies } from "next/headers"

async function ProductOnboardingCta() {
  const cookies = await nextCookies()

  const isOnboarding = cookies.get("_medusa_onboarding")?.value === "true"

  if (!isOnboarding) {
    return null
  }

  return (
    <Container className="max-w-4xl h-full bg-ui-bg-subtle w-full p-8">
      <div className="flex flex-col gap-y-4 center">
        <Text className="text-ui-fg-base text-xl">
          New arrivals just dropped!
        </Text>
        <Text className="text-ui-fg-subtle text-small-regular">
          Check out our latest collection of curated essentials.
        </Text>
        <a href="/store">
          <Button className="w-full">Browse Collection</Button>
        </a>
      </div>
    </Container>
  )
}

export default ProductOnboardingCta
