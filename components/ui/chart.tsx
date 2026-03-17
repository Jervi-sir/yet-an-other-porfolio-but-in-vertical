"use client"

import * as React from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const ChartConfig = {
  views: {
    label: "Page Views",
  },
}

// Simplified ChartContainer and other sub-components if needed.
// However, the user's snippet in chart.md has them already.
// I'll provide a working version of ChartContainer for this project.

export function ChartContainer({
  config,
  children,
  className,
}: {
  config: any
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --chart-1: #f59e0b;
          --chart-2: #d97706;
          --chart-3: #b45309;
          --chart-4: #92400e;
          --chart-5: #78350f;
          --color-views: var(--chart-1);
        }
      ` }} />
      {children}
    </div>
  )
}

export function ChartTooltip({ content }: { content: React.ReactNode }) {
  return <Tooltip content={content as any} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
}

export function ChartTooltipContent({
  active,
  payload,
  label,
  labelFormatter,
}: any) {
  if (!active || !payload?.length) return null

  return (
    <div className="rounded-lg border border-neutral-800 bg-neutral-950 p-2 shadow-xl">
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase text-neutral-500">
            {labelFormatter ? labelFormatter(label) : label}
          </span>
          <span className="font-bold text-neutral-100">
            {payload[0].value} views
          </span>
        </div>
      </div>
    </div>
  )
}
