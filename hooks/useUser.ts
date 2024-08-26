import fetcher from "@/libs/fetcher"
import useSWR from "swr"


const useUser = (userId: string) => {

    const { data, error, isLoading, mutate } = useSWR(userId ? `/api/users${userId}`:null, fetcher)
    console.log('data', data)

    return { data, error, isLoading, mutate }
}

export default useUser