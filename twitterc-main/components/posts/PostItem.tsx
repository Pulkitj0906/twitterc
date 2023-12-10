import useCurrentUser from '@/hooks/useCurrentUser';
import useLoginModal from '@/hooks/useLoginModal';
import { formatDistance, formatDistanceToNow, formatDistanceToNowStrict } from 'date-fns';
import { useRouter } from 'next/router'
import { useMemo } from 'react';
import Avatar from '../Avatar';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage, AiOutlineRetweet } from 'react-icons/ai';
import useLike from '@/hooks/useLike';
import Image from 'next/image'
import { useCallback, useEffect, useState } from "react";

interface PostItemProps{
    data: Record<string, any>;
    userId?: string;
}

const PostItem: React.FC<PostItemProps> = ({ data, userId }) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const { data: currentUser } = useCurrentUser();
    const { hasLiked, toggleLike } = useLike({postId:data.id,userId});

    const [Postimage, SetPostimage] = useState('');

    const goToUser = useCallback((event:any) => {
        event.stopPropagation();

        router.push(`/users/${data.user.id}`)
    }, [router, data.user.id])

    useEffect(() => {
        SetPostimage(data?.image); 
       
    }, [
        data?.image,
    ])
    
    const goToPost = useCallback(() => {
        router.push(`/posts/${data.id}`);
    }, [router, data.id]);

    const onLike = useCallback((event: any) => {
        event.stopPropagation() 
        
        if (!currentUser) {
             return loginModal.OnOpen()
        }
        toggleLike()
       
    }, [loginModal, currentUser, toggleLike])
    
    const onRetweet = useCallback((event: any) => {
       event.stopPropagation() 
       loginModal.OnOpen()
    }, [loginModal])
    
    const createdAt = useMemo(() => {
        if (!data?.createdAt) {
           return null;
        } 
        return formatDistanceToNowStrict(new Date(data.createdAt))
    }, [data?.createdAt])
    
    const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart;

    return (
      <>
      <div
      onClick={goToPost}
          className='
            border-b-[1px]
            border-neutral-800
            p-5
            cursor-pointer
            hover:bg-neutral-900
            transition
          '
      >
          <div className='flex flex-row items-start gap-3'>
              <Avatar userId={data.user.id} />
              <div>
                  <div className='flex flex-row items-center gap-2'>
                      <p onClick={goToUser} className='text-white font-semibold cursor-pointer hover:underline'>{data.user.name}</p>
                      <span onClick={goToUser} className='text-neutral-500 cursor-pointer hover:underline hidden md:block'>@{data.user.username}</span>
                      <span className='text-neutral-500  text-sm'>{ createdAt}</span>
                      
                  </div>
                  <div className='text-white mt-1'>
                      {data.body}
                  </div>
                    <div className='text-white mt-1 w-full flex flex-row items-center'>
                        {data.image ? <Image alt='' width={420} height={40} src={data.image || '/images/placeholder.png'} /> : ""}

                  </div>
                  <div className='flex flex-row items-center mt-3 gap-10'>
                      <div className='flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500'>
                          <AiOutlineMessage size={20} />
                          <p>
                              {data.comments?.length || 0}
                          </p>
                      </div>
                      <div onClick={onLike} className='flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500'>
                          <LikeIcon size={20} color={hasLiked? 'red': ''} />
                          <p>
                              {data.likedIds.length || 0}
                          </p>
                      </div>
                      <div onClick={onRetweet } className='flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500'>
                          <AiOutlineRetweet size={20} />
                          <p>
                              {data.comments?.length || 0}
                          </p>
                      </div>
                  </div>
              </div>
              
      </div>
            </div>
        </>
  )
};

export default PostItem;