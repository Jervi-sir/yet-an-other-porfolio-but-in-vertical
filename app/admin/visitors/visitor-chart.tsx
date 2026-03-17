"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, ResponsiveContainer, Tooltip } from "recharts"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from "date-fns"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function VisitorChart({ data }: { data: { date: string; views: number }[] }) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date())

  // Generate all days for the current month.
  const daysInMonth = React.useMemo(() => {
    const start = startOfMonth(currentMonth)
    const end = endOfMonth(currentMonth)
    return eachDayOfInterval({ start, end })
  }, [currentMonth])

  // Map data to the full month range.
  const chartData = React.useMemo(() => {
    return daysInMonth.map(day => {
      const dateStr = format(day, "yyyy-MM-dd")
      const match = data.find(d => d.date === dateStr)
      return {
        date: dateStr,
        views: match ? match.views : 0
      }
    })
  }, [daysInMonth, data])

  const totalViews = React.useMemo(() =>
    chartData.reduce((acc, curr) => acc + curr.views, 0),
    [chartData])

  const nextMonth = () => {
    const next = new Date(currentMonth)
    next.setMonth(next.getMonth() + 1)
    setCurrentMonth(next)
  }

  const prevMonth = () => {
    const prev = new Date(currentMonth)
    prev.setMonth(prev.getMonth() - 1)
    setCurrentMonth(prev)
  }

  return (
    <Card className="bg-neutral-900/30 border-neutral-800/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div className="space-y-1">
          <CardTitle className="text-xl font-bold italic text-neutral-100 italic font-bold tracking-tighter uppercase">Daily Analytics</CardTitle>
          <CardDescription className="text-neutral-500">
            {format(currentMonth, "MMMM yyyy")} — {totalViews} total views
          </CardDescription>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" onClick={prevMonth} className="h-8 w-8 rounded-lg border-neutral-800">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth} className="h-8 w-8 rounded-lg border-neutral-800">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-2">
        <div className="h-[250px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ left: -20, right: 10 }}>
              <CartesianGrid vertical={false} stroke="#262626" />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => format(new Date(value), "d")}
                tick={{ fontSize: 10, fill: '#737373' }}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border border-neutral-800 bg-neutral-950 p-3 shadow-xl">
                        <p className="text-xs text-neutral-500 mb-1">{label ? format(new Date(label), "MMM d, yyyy") : ''}</p>
                        <p className="text-sm font-bold text-neutral-100">{payload[0].value} views</p>
                      </div>
                    )
                  }
                  return null
                }}
                cursor={{ fill: 'rgba(255,166,0,0.05)' }}
              />
              <Bar
                dataKey="views"
                radius={[4, 4, 0, 0]}
                fill="url(#barGradient)"
              />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#d97706" stopOpacity={0.4} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
