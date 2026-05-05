import { toggleLike } from "@/services/helper/apiFunction/like.function"
import { useAuthStore } from "@/store/useAuthStore"
import { useMutation,  useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"



export const useToggleLike = ()=>{
    const {user} = useAuthStore()
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ["toggleLike"],
        mutationFn: (post_id: string)=> toggleLike({user: user!, post_id: post_id}),
        onSuccess: (res)=>{
             queryClient.invalidateQueries({queryKey: ["getpost", user?.auth_user_id]})
             queryClient.invalidateQueries({queryKey: ["inifinitypost"]})
          
            console.log("res",res)
            if(res.is_liked){
                toast.success("You like this post")
                 
            }else{
                toast.success("You unlike this post")
                 
            }
            



        },
        onError: (error)=>{
            console.log(error)
        }
    })
}