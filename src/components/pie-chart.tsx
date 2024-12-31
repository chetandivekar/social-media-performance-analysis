/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import * as React from 'react'
import { TrendingUp } from 'lucide-react'
import { Label, Pie, PieChart, Sector } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { ChartData } from '@/app/page'


interface ChartConfigItem {
  label: string;
  color?: string; // color is optional
}
const chartConfig: {
  Likes: ChartConfigItem;
  reels: ChartConfigItem;
  carousel: ChartConfigItem;
} = {
  Likes: {
    label: 'Likes',
  },
  reels: {
    label: 'Reels',
    color: 'hsl(var(--chart-1))',
  },
  carousel: {
    label: 'Carousel',
    color: 'hsl(var(--chart-2))',
  },
}satisfies ChartConfig
interface ChartPieProps {
  chartData: ChartData[];
}

export function ChartPie({chartData}:ChartPieProps ) {
 
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.numbers, 0)
  }, [])

  const [activeIndex, setActiveIndex] = React.useState<number | undefined>()

  const onPieEnter = React.useCallback(
    (_: any, index: number) => {
      setActiveIndex(index)
    },
    [setActiveIndex]
  )

  const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props
    const sin = Math.sin(-RADIAN * midAngle)
    const cos = Math.cos(-RADIAN * midAngle)
    const sx = cx + (outerRadius + 10) * cos
    const sy = cy + (outerRadius + 10) * sin
    const mx = cx + (outerRadius + 30) * cos
    const my = cy + (outerRadius + 30) * sin
    const ex = mx + (cos >= 0 ? 1 : -1) * 22
    const ey = my
    const textAnchor = cos >= 0 ? 'start' : 'end'

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={-18} textAnchor={textAnchor} fill="#333" className="text-xs font-semibold">
          {payload.browser}
        </text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={0} textAnchor={textAnchor} fill="#333" className="text-xs">
          {`${value.toLocaleString()} likes`}
        </text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999" className="text-xs">
          {`(${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    )
  }

  return (
    <Card className="flex flex-col justify-center items-center">
      <CardHeader className="items-center pb-0">
        <CardTitle>Total likes </CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 bg-red-500 pb-10">
        <ChartContainer
          config={chartConfig}
          className=" aspect-square w-full flex "
        >
          <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData.map((item) => ({
                ...item,
                fill: chartConfig[item.post_type as keyof typeof chartConfig]?.color || '#000', // Type assertion
              }))}
              dataKey="numbers"
              nameKey="post_type"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              strokeWidth={3}
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              onMouseEnter={onPieEnter}
              onClick={onPieEnter}
              onMouseLeave={() => setActiveIndex(undefined)}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 20}
                          className="fill-muted-foreground text-xs"
                        >
                          Total Likes
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      <div className="flex flex-col mt-4 space-y-2">
        <div className="flex items-center space-x-2">
          <div
            className="w-4 h-4"
            style={{ backgroundColor: chartConfig.carousel.color }}
          ></div>
          <span className="text-sm">Carousel</span>
        </div>
        <div className="flex items-center space-x-2">
          <div
            className="w-4 h-4"
            style={{ backgroundColor: chartConfig.reels.color }}
          ></div>
          <span className="text-sm">Reels</span>
        </div>
      </div>
        
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Hover or click on a slice for details
        </div>
      </CardFooter>
      
    </Card>
  )
}

