import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { TodoBoard } from "@/components/TodoBoard";

export const metadata: Metadata = {
  title: "My list — Later.",
};

export default function AppPage() {
  return (
    <>
      <SiteHeader cta={false} />
      <main className="flex-1">
        <TodoBoard />
      </main>
    </>
  );
}
