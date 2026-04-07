"use client"

import { useState } from "react"
import { addToCart } from "@lib/data/cart"

type QuickAddButtonProps = {
  variantId: string
  countryCode: string
}

const QuickAddButton = ({ variantId, countryCode }: QuickAddButtonProps) => {
  const [status, setStatus] = useState<
    "idle" | "loading" | "added" | "failed"
  >("idle")

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (status === "loading") return

    setStatus("loading")

    try {
      await addToCart({
        variantId,
        quantity: 1,
        countryCode,
      })
      setStatus("added")
      setTimeout(() => setStatus("idle"), 2000)
    } catch {
      setStatus("failed")
      setTimeout(() => setStatus("idle"), 2000)
    }
  }

  const label = {
    idle: "Add to Cart",
    loading: "Adding...",
    added: "Added!",
    failed: "Failed",
  }[status]

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      disabled={status === "loading"}
      data-testid="quick-add-button"
      className={`
        w-full py-2 text-xs font-medium tracking-wide uppercase transition-all duration-200
        ${status === "added"
          ? "bg-green-600 text-white"
          : status === "failed"
            ? "bg-red-500 text-white"
            : "bg-grey-90 text-white hover:bg-grey-80"
        }
        ${status === "loading" ? "opacity-60 cursor-wait" : ""}
        opacity-0 group-hover:opacity-100 small:opacity-0 small:group-hover:opacity-100
        max-[1023px]:opacity-100
      `}
    >
      {label}
    </button>
  )
}

export default QuickAddButton
