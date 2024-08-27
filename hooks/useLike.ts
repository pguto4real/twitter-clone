
import useCurrentUser from "./useCurrentUser"
import useUser from "./useUser"
import useLoginModal from "./useLoginModal"
import { useCallback, useMemo } from "react"
import toast from "react-hot-toast"
import axios from "axios"
import usePost from "./usePost"
import usePosts from "./usePosts"


const useLike = ({ postId, userId }: { postId: string, userId?: string }) => {

    const { data: currentUser, } = useCurrentUser()
    const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId)
    const { mutate: mutateFetchedPosts } = usePosts(userId)

    const loginModal = useLoginModal()
    const hasLiked = useMemo(() => {
        const list = fetchedPost?.likeIds || []

        return list.includes(currentUser?.id)
    }, [fetchedPost?.likeIds, currentUser?.id])

    const toggleLike = useCallback(async () => {
        if (!currentUser) {
            return loginModal.onOpen()
        }
        try {
            let request;
            if (hasLiked) {
                request = () => axios.delete('/api/like', { data: { postId, currentUser } })
            }
            else {
                request = () => axios.post('/api/like', { postId, currentUser })
            }
            await request()

            mutateFetchedPost()
            mutateFetchedPosts()
            toast.success('Success')
        } catch (error) {
            toast.error("Something went wrong")
        }



    }, [currentUser, mutateFetchedPost, mutateFetchedPosts, hasLiked, postId, loginModal]);




    return { hasLiked, toggleLike }
}

export default useLike