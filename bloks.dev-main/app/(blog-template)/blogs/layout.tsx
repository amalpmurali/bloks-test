import { SidebarLeft } from "@/components/common/sidebar-left";
import { SidebarRight } from "@/components/common/sidebar-right";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { BackgroundPattern } from "@/components/common/background-patterns";

export default function BlogsLayoutPage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mt-[65px]">
      {" "}
      {/* Add top margin to account for fixed header */}
      <SidebarProvider>
        <SidebarLeft />
        <SidebarInset>
          <header className="sticky top-0 flex h-14 shrink-0 items-center gap-2 bg-white border-b-4 border-black">
            <div className="flex flex-1 items-center gap-2 px-3">
              <SidebarTrigger className="hover:bg-yellow-400 transition-colors" />
              <Separator orientation="vertical" className="mx-2 h-4 bg-black" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage className="font-mono font-bold uppercase text-lg">
                      Brutalist Blog & Documentation
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <SidebarTrigger className="text-right hover:bg-yellow-400 transition-colors" />
          </header>
          <div className="relative">
            <BackgroundPattern
              pattern="both"
              gridOpacity={0.03}
              noiseOpacity={0.02}
              noiseMixBlend="multiply"
            />
            <div className="flex flex-1 flex-col gap-6 p-4 relative">
              <div className="mx-auto max-w-5xl w-full">
                {/* <div className="border-4 border-black bg-white rotate-[0.5deg] mb-8 mt-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                </div> */}
                {children}
                {/* <div className="mx-auto h-24 w-full max-w-3xl rotate-[-0.5deg] border-4 border-black bg-yellow-400/20" />
                <div className="mx-auto h-[50vh] w-full max-w-3xl mt-8 rotate-[0.8deg] border-4 border-black bg-blue-400/10" /> */}
              </div>
            </div>
          </div>
        </SidebarInset>
        {/* <SidebarRight side="right" /> */}
      </SidebarProvider>
    </div>
  );
}
