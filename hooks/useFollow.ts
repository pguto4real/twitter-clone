 
import useCurrentUser from "./useCurrentUser"
import useUser from "./useUser"
import useLoginModal from "./useLoginModal"
import { useCallback, useMemo } from "react"
import toast from "react-hot-toast"
import axios from "axios"


const useFollow = (userId: string) => {

    const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser()
    console.log(currentUser)
    const { mutate: mutateFetchedUser } = useUser(userId)

    const loginModal = useLoginModal()
    const isFollowing = useMemo(() => {
        const list = currentUser?.followingIds || []

        return list.includes(userId)
    }, [currentUser?.followingIds, userId])

    const toggleFollow = useCallback(async() => {
        if (!currentUser) {
            return loginModal.onOpen()
        }
        try {
            let request;
            if (isFollowing) {
                request = () => axios.delete('/api/follow', { data: { userId, currentUser } })
            }
            else {
                request = () => axios.post('/api/follow', { userId, currentUser })
            }
            await request()
            toast.success('Success')
        } catch (error) {
            toast.error("Something went wrong")
        }

        mutateCurrentUser()
        mutateFetchedUser()

    }, [currentUser,mutateCurrentUser,mutateFetchedUser,isFollowing,userId,loginModal]);


    

    return { isFollowing,toggleFollow}
}

export default useFollow