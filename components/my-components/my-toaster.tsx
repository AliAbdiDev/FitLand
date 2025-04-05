'use client'
import { toast } from "sonner";

function MyToasterSonner({msg}) {
    return ( 
        toast(msg)

     );
}

export default MyToasterSonner;