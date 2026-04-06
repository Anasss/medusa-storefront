"use client"

import { EllipseMiniSolid } from "@medusajs/icons"
import { Label, RadioGroup, Text, clx } from "@medusajs/ui"

type PriceFilterProps = {
  minPrice?: string
  maxPrice?: string
  setQueryParams: (name: string, value: string) => void
  "data-testid"?: string
}

const priceRanges = [
  { value: "all", label: "All Prices", min: "", max: "" },
  { value: "0-50", label: "Under €50", min: "", max: "50" },
  { value: "50-75", label: "€50 - €75", min: "50", max: "75" },
  { value: "75-100", label: "€75 - €100", min: "75", max: "100" },
  { value: "100+", label: "Over €100", min: "100", max: "" },
]

const PriceFilter = ({
  minPrice,
  maxPrice,
  setQueryParams,
  "data-testid": dataTestId,
}: PriceFilterProps) => {
  const currentValue =
    priceRanges.find(
      (r) => r.min === (minPrice || "") && r.max === (maxPrice || "")
    )?.value || "all"

  const handleChange = (value: string) => {
    const range = priceRanges.find((r) => r.value === value)
    if (!range) return

    setQueryParams("minPrice", range.min)
    setQueryParams("maxPrice", range.max)
  }

  return (
    <div className="flex gap-x-3 flex-col gap-y-3">
      <Text className="txt-compact-small-plus text-ui-fg-muted">
        Price Range
      </Text>
      <RadioGroup data-testid={dataTestId} onValueChange={handleChange}>
        {priceRanges.map((item) => (
          <div
            key={item.value}
            className={clx("flex gap-x-2 items-center", {
              "ml-[-23px]": item.value === currentValue,
            })}
          >
            {item.value === currentValue && <EllipseMiniSolid />}
            <RadioGroup.Item
              checked={item.value === currentValue}
              className="hidden peer"
              id={`price-${item.value}`}
              value={item.value}
            />
            <Label
              htmlFor={`price-${item.value}`}
              className={clx(
                "!txt-compact-small !transform-none text-ui-fg-subtle hover:cursor-pointer",
                {
                  "text-ui-fg-base": item.value === currentValue,
                }
              )}
              data-testid="price-radio-label"
              data-active={item.value === currentValue}
            >
              {item.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

export default PriceFilter
