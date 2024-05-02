"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Heading } from "@/components/heading";
import { Download, ImageIcon } from "lucide-react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { amountOptions, formSchema, resolutionOptions } from "./constant";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fileURLToPath } from "url";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";



const ImagePage = () => {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount:"1",
      resolution:"512X512"
    }
  });

  const isLoading = form.formState.isSubmitted;






  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages([]);
      const response = await axios.post('/api/image',values);
      const urls =response.data.map(( image:{url:string})=>image.url);
      setImages(urls); 
      form.reset();
    } catch (error: any) {
      console.log(error);

    } finally {
      router.refresh();
    }
  };





  return (
    <div>
      <Heading
        title="Image Generation "
        description="Our most advanced image generation model."
        icon={ImageIcon}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8">
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
                  <FormItem className="col-span-10 lg:col-span-6">
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


              <FormField
              control={form.control}
              name="resolution"
              render={({field})=> (
                <FormItem className="col-span-12 lg:col-span-2 ">
                   <Select
                   disabled={isLoading}
                   onValueChange={ field.onChange}
                   value={field.value}
                   defaultValue={field.value}
                   >
                    <FormControl>
                       <SelectTrigger>
                        <SelectValue defaultValue={field.value}/>
                       </SelectTrigger>
                    </FormControl>
                     <SelectContent>
                      {resolutionOptions.map((option)=>(
                        <SelectItem
                        key={option.value}
                        value={option.value}
                        >
                      {option.label}

                        </SelectItem>
                      ))}
                     </SelectContent>

                   </Select>
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="amount"
              render={({field})=> (
                <FormItem className="col-span-12 lg:col-span-2 ">
                   <Select
                   disabled={isLoading}
                   onValueChange={ field.onChange}
                   value={field.value}
                   defaultValue={field.value}
                   >
                    <FormControl>
                       <SelectTrigger>
                        <SelectValue defaultValue={field.value}/>
                       </SelectTrigger>
                    </FormControl>
                     <SelectContent>
                      {amountOptions.map((option)=>(
                        <SelectItem
                        key={option.value}
                        value={option.value}
                        >
                      {option.label}

                        </SelectItem>
                      ))}
                     </SelectContent>

                   </Select>
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
            <div className="p-20">
              <Loader />
            </div>
          )}
          {images.length === 0 && !isLoading && (
            <Empty label="No images generated." />
          )}
          <div className="grid grid-col-1 md:grid-col-2 lg:grid-col-3 xl:grid-col-4 gap-4 mt-8">
              {images.map((src)=>(
                <Card 
                key={src} 
                className="rounded-lg overflow-hiddn"               
                
                >
                  <div className="relative aspect-square ">
                    <Image
                    alt="Image"
                    fill
                    src={src }
                    
                    />
                     
                  </div>
                    <CardFooter className="p-2" >
                      <Button 
                      onClick={()=>window.open(src)}
                      variant="secondary"
                       className="w-full">
                         <Download h-4 w-4 mr-2 />
                         Download

                      </Button>


                    </CardFooter>
                </Card>
              ))}


          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePage;
