import { toggleLike } from "@/services/helper/apiFunction/like.function"
import { useAuthStore } from "@/store/useAuthStore"
import { useMutation,  useQueryClient } from "@tanstack/react-query"



export const useToggleLike = ()=>{
    const {user} = useAuthStore()
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ["toggleLike"],
        mutationFn: (post_id: string)=> toggleLike({user: user!, post_id: post_id}),
        onSuccess: ( _data, post_id)=>{
             queryClient.invalidateQueries({queryKey: ["getpost", user?.auth_user_id]})
             queryClient.invalidateQueries({queryKey: ["inifinitypost"]})
             queryClient.invalidateQueries({queryKey: ["getpostbyid", post_id, user?.auth_user_id]})
          
            



        },
        onError: (error)=>{
            console.log(error)
        }
    })
}