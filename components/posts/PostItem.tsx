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
import { BsThreeDots } from 'react-icons/bs';
import Dropdown from '../layout/dropdown';
import axios from 'axios'
import toast from 'react-hot-toast';
import usePosts from '@/hooks/usePosts';
import { MdDelete } from "react-icons/md";
import useConfirmationModal from '@/hooks/useConfirmationModal';
import useReportModal from '@/hooks/useReportModal';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { IoIosStats } from "react-icons/io";
import { LuShare } from "react-icons/lu";

interface PostItemProps {
    data: Record<string, any> | undefined;
    userId?: string;
    AvoidDots?: boolean;
    smallImage?: boolean;
}

const PostItem: React.FC<PostItemProps> = ({ data, userId, AvoidDots,smallImage }) => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const ConfirmModal = useConfirmationModal()
    const ReportModal = useReportModal()
    const { mutate: mutatatePosts } = usePosts();

    const { data: currentUser } = useCurrentUser();
    const { hasLiked, toggleLike } = useLike({ postId: data?.id, userId });
    const [hasBookmarked, toggleBookmark] = useState(false);

    const [Postimage, SetPostimage] = useState('');

    const goToUser = useCallback((event: any) => {
        event.stopPropagation();

        router.push(`/users/${data?.user.id}`)
    }, [router, data?.user?.id])

    useEffect(() => {
        SetPostimage(data?.image);

    }, [
        data?.image,
    ])

    const goToPost = useCallback(() => {
        router.push(`/posts/${data?.id}`);
    }, [router, data?.id]);

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

    const onDelete = useCallback(async () => {
        try {
            await axios.delete(`api/posts/${data?.id}`);
            toast.success('Tweet Deleted!')
            mutatatePosts();
        } catch (error) {
            toast.error("Something went wrong!")
        } finally {
            console.log('done lil bro');
        }
    }, [mutatatePosts,data?.id])

    const deleteButton = (currentUser?.id === data?.user?.id) || false

    const deleteLogo = (
        <div className="text-red-700">
            <MdDelete size={18} />
        </div>
    )
    const postId = data?.id
    const dataForReport = data

    const handleShare = async () => {
        try {
          if (navigator.share) {
            await navigator.share({
              title: 'Share Title',
              text: 'Share Text',
              url: `${window.location.origin}/posts/${data?.id}`,
            });
          } else {
            throw new Error('Web Share API not supported');
          }
        } catch (error) {
          console.error('Error sharing:');
        }
    };
    const handleCopy = () => {
        const postLink = `${window.location.origin}/posts/${data?.id}`;
        const textarea = document.createElement('textarea');
        textarea.value = postLink;
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand('copy');
          toast.success('Link copied to clipboard!');
        } catch (error) {
          toast.error('Copy failed. Please try again.');
        } finally {
          document.body.removeChild(textarea);
        }
    };
    const [printedGroups, setPrintedGroups] = useState<string[]>([]);

    return (
        <>
            <div
                className='
            border-b-[1px]
            dark:border-neutral-800
            px-3
            py-4
            cursor-pointer
            hover:bg-slate-100
            dark:hover:bg-neutral-900
            transition
          '
            >
                <div className='flex flex-row items-start justify-between gap-3 w-full'>
                    <div className='flex flex-row items-start gap-3 w-full' onClick={goToPost}>
                        <Avatar userId={data?.user?.id} />
                        <div className='w-full'>
                            <div className="w-full">
                                <div className='flex flex-row items-center gap-2 w-full'>
                                    <p onClick={goToUser} className='dark:text-white font-semibold cursor-pointer hover:underline'>{data?.user?.name}</p>
                                    <span onClick={goToUser} className='text-neutral-500 cursor-pointer hover:underline hidden md:block'>@{data?.user?.username}</span>
                                    <span className='text-neutral-500  text-sm'>{createdAt}</span>
                                    {!AvoidDots && <div onClick={(e)=>{e.stopPropagation()}} className='ml-auto rounded-full  hover:bg-slate-200 dark:hover:bg-neutral-950'>
                                        {deleteButton ?
                                            <Dropdown flaglogo={true} item1='Report' onClickitem1={() => ReportModal.onOpen(dataForReport)} item2='Delete' logo2={deleteLogo} onClickitem2={() => ConfirmModal.OnOpen(postId)} />
                                            :
                                            <Dropdown flaglogo={true} onClickitem1={() => ReportModal.onOpen(dataForReport)} item1='Report' />
                                        }
                                    </div>}
                                </div>
                                <div className='dark:text-white mt-1 w-full'>
                                    {data?.body}
                                </div>
                                {data?.image ?<div className={`dark:text-white mt-1  bg-black rounded-2xl ${!smallImage ? 'h-96 w-full':' w-10'} ring-[1px] ring-slate-300`}>
                                    <Image className={`object-contain ${!smallImage && 'h-full w-full'}`} alt='' width={200} height={0} src={data?.image || '/images/placeholder.png'} />
                                </div>:''}
                                <div className='flex justify-between items-stretch w-full mt-2'>
                                    <div className='flex flex-row items-center text-neutral-500 gap-2 cursor-pointer group'>
                                        <AiOutlineMessage className='group-hover:ring-[9px] ring-sky-500/10 group-hover:bg-sky-500/10 transition-all rounded-full group-hover:text-sky-500' size={20} />
                                        <p className='group-hover:text-sky-500'>
                                            {data?.comments?.length || 0}
                                        </p>
                                    </div>
                                    <div onClick={onLike} className='flex flex-row items-center text-neutral-500 gap-2 cursor-pointer group'>
                                        <LikeIcon className='group-hover:ring-[9px] ring-red-500/10 group-hover:bg-red-500/10 transition-all rounded-full group-hover:text-red-500' size={20} color={hasLiked ? 'red' : ''} />
                                        <p className='group-hover:text-red-500'>
                                            {data?.likedIds?.length || 0}
                                        </p>
                                    </div>
                                    <div onClick={onRetweet} className='flex flex-row items-center text-neutral-500 gap-2 cursor-pointer group'>
                                        <AiOutlineRetweet className='group-hover:ring-[9px] ring-sky-500/10 group-hover:bg-sky-500/10 transition-all rounded-full group-hover:text-sky-500' size={20} />
                                        <p className='group-hover:text-sky-500'>
                                            {data?.comments?.length || 0}
                                        </p>
                                    </div>
                                    <div className='flex flex-row items-center text-neutral-500 gap-2 cursor-pointer group'>
                                        <IoIosStats className='group-hover:ring-[9px] ring-sky-500/10 group-hover:bg-sky-500/10 transition-all rounded-full group-hover:text-sky-500' size={20} />
                                        <p className='group-hover:text-sky-500'>
                                            {data?.comments?.length || 0}
                                        </p>
                                    </div>
                                    <div onClick={(e)=>{e.stopPropagation()}} className='flex flex-row items-center text-neutral-500 cursor-pointer group'>
                                        {hasBookmarked ?
                                            <FaBookmark onClick={() => { toggleBookmark(!hasBookmarked) }} className='text-sky-500 hover:text-sky-500/50' size={16} />
                                            :
                                            <FaRegBookmark onClick={() => { toggleBookmark(!hasBookmarked) }} className='hover:text-sky-500' size={16} />
                                        }
                                        <Dropdown item1='Copy Link' item2='Share post via...' onClickitem2={handleShare} onClickitem1={handleCopy} copylogo={true} logo2={<LuShare className=''/>} sharebutton={true} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
};

export default PostItem;
