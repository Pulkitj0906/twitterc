'use client';

import React, { useCallback, useState } from 'react'
import axios from 'axios';
import Modal from '../Modal';
import { toast } from 'react-hot-toast';
import usePosts from '@/hooks/usePosts';
import useConfirmationModal from '@/hooks/useConfirmationModal';
import Button from '../Button';
import { MdDelete } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai';

interface ConfirmModalProps {
    onClosed?: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ 
    onClosed,
}) => {
    const { isOpen, postId, OnClose, OnOpen } = useConfirmationModal();
    const { mutate: mutatatePosts } = usePosts();
  
    const onDelete = useCallback(
      async () => {
        try {
          await axios.delete(`api/posts/${postId}`);
          toast.success('Tweet Deleted!');
          mutatatePosts();
        } catch (error) {
          toast.error('Something went wrong!');
        } finally {
        }
      },
      [mutatatePosts, postId]
    );

    const buttonSubmit = () => {
        onDelete()
        OnClose()
    }
    const body = (
        <>
            <div className="flex justify-between items-center">
            <h2 className="font-semibold text-lg">Are you sure you want to delete this post?</h2>
            <AiOutlineClose onClick={OnClose} className='cursor-pointer' />
            </div>
            <br />            
            <h4>Deleted post cannot be recovered.</h4>
            <div className=" flex flex-row  justify-end">
                <button onClick={buttonSubmit} className='bg-red-500 rounded-full font-semibold hover:opacity-80 transition border-1 cursor-pointer w-fit text-white border-black text-md px-4 py-1 flex flex-row items-center gap-1'><MdDelete/>Delete</button>
            </div>
        </>
    )
  
    return (
        <>
      <Modal
          isOpen={isOpen}
          onClose={OnClose}
          onSubmit={onDelete}
          actionLabel='Confirmation'
          Avoidfooter={true}
          body={body}
          AvoidHeader={true}
          
      />
      </>
  )
}

export default ConfirmModal;