"use client";

import { MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

 const tools=[{
    label :"conversation",
    icon:MessageSquare,
    color:"text-violet-500",
    href:"/conversation"

 }]
const dashboardpage =()=>{
    return(
        <div>
             <div className="mb-8 space-y-4 ">
                <h2 className="text-2xl md:text-4xl font-bold text-center">Dive into the World of AI</h2>
                <p className="text-muted-foregroud font-light text-sm md:text-lg text-center  ">Chat with the smartest AI-Juggle</p>
             </div>
             <div className="px-4 md:px-20 lg:px-32 space-y-4 ">
                {tools.map((tool)=>(
                   <Card key={tool.href}
                    className="p-4 border-black/5  flex item-center justify-between hover:shadow-md transition cursor-pointer "
                     >
                        <div className="flex items-center gap-x-4 ">
                            <div className={cn( "p-2 w-fit rounded-md",tool.bgColor)}>
                                <tool.icon className={cn( " w-8 h-8",tool.color)}/>

                            </div>

                        </div>

                   </Card> 
                ))}

             </div>
        </div>
    )
}

export default dashboardpage;