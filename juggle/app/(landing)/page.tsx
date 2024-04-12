import { Button } from "@/components/ui/button";
import Link from "next/link"

const LandingPage =()=>{
    return(
            <div className="flex items-center justify-center h-full">
                <Link href="/sign-in">
                <Button className="px-10 mx-9">
                    Login
                </Button>
                </Link>
                <Link href="/sign-up">
                <Button className="px-8 mx-9">
                    Register
                </Button>
                </Link>
            </div>
    )
}

export default LandingPage;