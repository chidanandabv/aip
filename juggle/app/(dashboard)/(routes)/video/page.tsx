"use client";
import * as z from "zod";
import axios from "axios";
import { Heading } from "@/components/heading";
import { useForm } from "react-hook-form";
import { Music, VideoIcon } from "lucide-react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { formSchema } from "./constant";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Empty } from "@/components/empty";  
import {Loader}from "@/components/loader";

 
const VideoPage = () => { 
    const router = useRouter();
    const [ video , setVideo] = useState<string>();
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        prompt: ""
      }
    }); 

    const isLoading =form.formState.isSubmitted;

    const onSubmit = async(values:z.infer<typeof formSchema>)=>{
        try{
            setVideo(undefined);
            const response = await axios.post("/api/video",values);
            setVideo(response.data[0]);
            form.reset();
        }catch(error:any){
            console.log(error);
        }finally{
            router.refresh();
        }
    };
    
    return ( 
        <div>
            <Heading
            title="video Genration"
            description="Our most advanced video  model."
            icon={VideoIcon }
            iconColor="text-violet-500"
            bgColor="bg-violet-500/10"
            
            
            />
            <div className="px-4 lg:px-8">
                <div>
                <div>
          <Form {...form}>
            <form 
              onSubmit={form.handleSubmit(onSubmit)} 
              className="
                rounded-lg 
                border 
                w-full 
                p-4 
                px-3 
                md:px-6 
                focus-within:shadow-sm
                grid
                grid-cols-12
                gap-2
              "
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading} 
                        placeholder="Enter your prompt here" 
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="col-span-12 lg:col-span-2 w-full bg-[#7d2fc6] hover:bg-green-600" type="submit" disabled={isLoading} size="icon">
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
             <div className="p-8 rounded-lg- w-full flex items-center justify-center bg-muted">
               <Loader/>
             </div>
          )}
          {!video && !isLoading && ( 
             <Empty label="No video genrated,"/>

          )}
          {video && (
            <video className="w-medium flex justify-center  aspect-video mt-8 rounded-lg border bg-black controls">
                <source src={video}/>
            </video>
          )}
             
        </div>
                </div>

            </div>
        </div>


     );
}
 
export default VideoPage;