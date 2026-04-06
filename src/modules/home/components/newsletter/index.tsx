"use client"

import { useState } from "react"
import { sdk } from "@lib/config"

const Newsletter = () => {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus("loading")

    try {
      const response = await sdk.client.fetch<{
        subscriber: { id: string; email: string }
        message: string
      }>("/store/newsletter/subscribe", {
        method: "POST",
        body: { email },
      })

      setStatus("success")
      setMessage(response.message)
      setEmail("")
    } catch (err: any) {
      setStatus("error")
      const errorMessage =
        err?.message || "Something went wrong. Please try again."
      setMessage(errorMessage)
    }
  }

  return (
    <section
      className="border-t border-ui-border-base bg-grey-5"
      aria-label="Newsletter signup"
    >
      <div className="content-container py-16 small:py-24">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-grey-40 mb-2">
            Stay in the loop
          </p>
          <h2 className="text-2xl small:text-3xl font-normal text-grey-90 mb-3">
            Get 10% Off Your First Order
          </h2>
          <p className="text-grey-50 text-sm mb-8">
            Subscribe to our newsletter for early access to new arrivals,
            exclusive offers, and style inspiration delivered to your inbox.
          </p>

          {status === "success" ? (
            <div className="bg-white border border-ui-border-base rounded-rounded p-6">
              <p className="text-grey-90 font-medium">
                Thanks for subscribing!
              </p>
              <p className="text-grey-50 text-sm mt-1">
                Check your inbox for your 10% discount code.
              </p>
            </div>
          ) : (
            <>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col small:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  disabled={status === "loading"}
                  className="flex-1 px-4 py-3 border border-ui-border-base rounded-soft bg-white text-sm text-grey-90 placeholder:text-grey-40 focus:outline-none focus:border-grey-90 transition-colors disabled:opacity-50"
                  aria-label="Email address"
                  data-testid="newsletter-email-input"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-grey-90 text-white px-6 py-3 rounded-soft hover:bg-grey-80 transition-colors text-sm font-medium tracking-wide uppercase flex-shrink-0 disabled:opacity-50"
                  data-testid="newsletter-submit-button"
                >
                  {status === "loading" ? "Subscribing..." : "Subscribe"}
                </button>
              </form>
              {status === "error" && (
                <p className="text-red-500 text-sm mt-3" data-testid="newsletter-error">
                  {message}
                </p>
              )}
            </>
          )}

          <p className="text-grey-30 text-xs mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Newsletter
