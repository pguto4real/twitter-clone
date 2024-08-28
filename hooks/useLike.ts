
import useCurrentUser from "./useCurrentUser"

import useUser from "./useUser"
import useLoginModal from "./useLoginModal"
import { useCallback, useMemo } from "react"
import toast from "react-hot-toast"
import axios from "axios"
import usePost from "./usePost"
import usePosts from "./usePosts"
import { useRouter } from "next/router"


const useLike = ({ postId, userId }: { postId: string, userId?: string }) => {
    const router = useRouter();
    const { data: currentUser,mutate:mutateCurrentUser } = useCurrentUser()
    let fetchedPost;
    let mutatePost;
    let mutatePosts;
    if (router.pathname === '/') {
        const { mutate: mutatePostings } = usePosts();
        const { data: fetchedPosting, mutate: mutatePosting } = usePost(postId as string);
        fetchedPost = fetchedPosting
        mutatePost = mutatePosting
        mutatePosts = mutatePostings
    }
    else {
        const { data: fetchedPosting, mutate: mutatePosting } = usePost(postId)
        const { mutate: mutatePostings } = usePosts(userId)
        fetchedPost = fetchedPosting
        mutatePost = mutatePosting
        mutatePosts = mutatePostings
    }



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


            toast.success('Success')
            mutatePost()
            mutatePosts()
            mutateCurrentUser()
        } catch (error) {
            toast.error("Something went wrong")
        }



    }, [currentUser, mutatePost, mutatePosts, hasLiked, postId, loginModal]);




    return { hasLiked, toggleLike }
}

export default useLike