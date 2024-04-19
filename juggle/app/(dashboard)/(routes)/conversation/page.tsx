"use client";
import * as z from "zod";
import { Heading } from "@/components/heading";
import { useForm } from "react-hook-form";
import { MessageSquare } from "lucide-react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { formSchema } from "./constant";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/loader";
const ConversationPage = () => {
    // const router = useRouter();
    // const proModal = useProModal();
    // const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        prompt: ""
      }
    }); 

    const isLoading =form.formState.isSubmitted;
    const onSubmit =async (values:z.infer<typeof formSchema>)=>{
        console.log(values)
    }
    return ( 
        <div>
            <Heading
            title="Conversation"
            description="Our most advanced conversation model."
            icon={MessageSquare}
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
                        placeholder="Enter your potm here" 
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="col-span-12 lg:col-span-2 w-full" type="submit" disabled={isLoading} size="icon">
                Generate
              </Button>
            </form>
          </Form>
        </div>
                </div>

            </div>
        </div>


     );
}
 
export default ConversationPage;