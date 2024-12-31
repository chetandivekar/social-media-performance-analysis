import { EngagementMetrics } from "@/components/Card";
import { ChartPie } from "@/components/pie-chart";
import { PostTypeSelector } from "@/components/post-type-selector";

export interface ChartData {
  post_type: string;
  numbers: number;
}

export default function Home() {
  const chartData: ChartData[] = [
    { post_type: "reels", numbers: 295 },
    { post_type: "carousel", numbers: 400 },
  ];

  return (
    <main className="container mx-auto space-y-6">
      <h1 className="text-4xl font-bold">Social Media Dashboard</h1>
      <EngagementMetrics />
    </main>
  );
}
