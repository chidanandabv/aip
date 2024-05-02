"use client";

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from 'next/font/google';
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import{
Code,
ImageIcon,
LayoutDashboard,
MessageSquare,
VideoIcon,
Music,
Settings
} from "lucide-react";

const montserrat = Montserrat ({ 
  weight: '600', 
  subsets: ['latin']
 });

const routes = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    color: "text-sky-500"
  },
  {
    label: 'Q&A',
    icon: MessageSquare,
    href: '/Q&A',
    color: "text-sky-500"
  },
  
  {
    label: 'Video Generation',
    icon: VideoIcon,
    color: "text-sky-500",
    href: '/video',
  },
  {
    label: 'Music Generation',
    icon: Music,
    color: "text-sky-500",
    href: '/music',
  },
  {
    label: 'Code Generation',
    icon: Code,
    color: "text-sky-500",
    href: '/code',
  },
  {
    label: 'Image Generation',
    icon: ImageIcon,
    color: "text-sky-500",
    href: '/image'
  },
  
];


  const sidebar =()=>{
    const pathname =usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative h-8 w-8 mr-4">
            <Image fill alt="Logo" src="/logo.png" />
          </div>
          <h1 className={cn("text-2xl font-bold", montserrat.className)}>
            Juggle
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href} 
              href={route.href}
              className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",pathname === route.href ? "text-white,bg-white/10":
              "text-zinc-400")}>
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
     </div>
  );
}

export default sidebar;