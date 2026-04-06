import { Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <div className="h-[75vh] w-full border-b border-ui-border-base relative bg-grey-90 overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-black-front.png"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      >
        <source src="/promotional-bg-store.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center px-6 small:p-32 gap-6">
        <span className="text-xs font-medium tracking-[0.3em] uppercase text-grey-30">
          Spring / Summer 2026
        </span>
        <Heading
          level="h1"
          className="text-4xl small:text-5xl leading-tight text-white font-normal max-w-2xl"
        >
          New Season, New Essentials
        </Heading>
        <p className="text-grey-30 text-base max-w-lg">
          Timeless pieces crafted for everyday living. Discover our latest
          collection of sustainably made wardrobe staples.
        </p>
        <div className="flex gap-4 mt-2">
          <LocalizedClientLink href="/store">
            <button type="button" className="bg-white text-grey-90 px-8 py-3 rounded-soft hover:bg-grey-10 transition-colors text-sm font-medium tracking-wide uppercase">
              Shop Now
            </button>
          </LocalizedClientLink>
          <LocalizedClientLink href="/store">
            <button type="button" className="border border-white text-white px-8 py-3 rounded-soft hover:bg-white hover:text-grey-90 transition-colors text-sm font-medium tracking-wide uppercase">
              Browse Categories
            </button>
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}

export default Hero
