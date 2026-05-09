import { userReport } from "@/services/helper/apiFunction/userReport.function"
import { useAuthStore } from "@/store/useAuthStore"
import { ReportNewDataType } from "@/typescript/type/userReport.type"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useUserReport = ()=>{
    const queryClient = useQueryClient()
    const {user} = useAuthStore()
    return useMutation({
        mutationKey: ["insert-report"],
        mutationFn: (data:ReportNewDataType)=> userReport(data),
        onSuccess: (res)=> {
            console.log("res", res)
            queryClient.resetQueries({queryKey: ["getpost", user?.auth_user_id]})
            queryClient.resetQueries({queryKey: ["inifinitypost"]})

            queryClient.invalidateQueries({queryKey: ["infinityPost"]})


        }

    })
}