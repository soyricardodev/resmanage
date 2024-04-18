import { DesktopMenu } from "./_components/desktop-menu";
import { MobileMenu } from "./_components/mobile-menu";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <DesktopMenu />
      <div className="flex flex-col">
        <MobileMenu />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
