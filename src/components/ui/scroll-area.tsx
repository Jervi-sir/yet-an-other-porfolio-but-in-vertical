// ScrollArea.tsx
import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"
import { cn } from "@/lib/utils"

type ScrollAreaProps = React.ComponentProps<typeof ScrollAreaPrimitive.Root> & {
  /** Ref to the internal Viewport div so parents can listen/measure */
  viewportRef?: React.RefObject<HTMLDivElement>
  /** Fires on every viewport scroll (passive) */
  onViewportScroll?: (e: Event) => void
}

function ScrollArea({
  className,
  children,
  viewportRef,
  onViewportScroll,
  ...props
}: ScrollAreaProps) {
  // Wire the scroll handler once the viewport is ready
  React.useEffect(() => {
    const el = viewportRef?.current
    if (!el || !onViewportScroll) return
    const handler = (e: Event) => onViewportScroll(e)
    el.addEventListener("scroll", handler, { passive: true })
    return () => el.removeEventListener("scroll", handler)
  }, [viewportRef, onViewportScroll])

  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn("relative", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        ref={viewportRef}
        data-slot="scroll-area-viewport"
        className="size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:outline-1 focus-visible:ring-[3px] focus-visible:ring-ring/50"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>

      {/* Persistent red scrollbars */}
      <ScrollBar orientation="vertical" />
      <ScrollBar orientation="horizontal" />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      forceMount
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        "flex select-none touch-none p-px transition-colors pr-0.5 rounded-2xl",
        orientation === "vertical" && "h-full w-2.5 bg-border/30",
        orientation === "horizontal" && "h-2.5 flex-col",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="relative flex-1 rounded-full bg-border transition-colors hover:bg-border"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}

export { ScrollArea, ScrollBar }
