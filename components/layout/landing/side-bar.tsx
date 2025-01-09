import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type SideBarData ={
    id: number;
    label: string;
}[];

function SideBar({ sideBarData }: { sideBarData: SideBarData }) {
  return (
    <Sheet>
      <SheetTrigger>Open</SheetTrigger>
      <SheetContent side={"left"} className="p-3">
        <aside className="size-full pt-5">
          <SheetHeader>
            <SheetTitle className="sr-only">sidebar fitland</SheetTitle>
          </SheetHeader>
          
            <ScrollArea className="p-3 text-start">
              <ul className=" space-y-3">
                {sideBarData?.map((item) => (
                  <li key={item?.id}>{item?.label}</li>
                ))}
              </ul>
            </ScrollArea>
        </aside>
      </SheetContent>
    </Sheet>
  );
}

export default SideBar;
