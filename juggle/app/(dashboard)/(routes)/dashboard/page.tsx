import { UserButton } from "@clerk/nextjs"

const dashboardpage =()=>{
    return(
        <div>
        <p>Dashboard page (Otherized)</p>
        <UserButton afterSignOutUrl="/" />
        </div>
    )
}

export default dashboardpage;