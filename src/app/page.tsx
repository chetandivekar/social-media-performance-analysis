import { EngagementMetrics } from "@/components/Card";

export interface ChartData {
  post_type: string;
  numbers: number;
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <EngagementMetrics />
    </main>
  );
}
