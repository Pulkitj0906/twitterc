import React, {useCallback, useEffect} from "react"
import { AiOutlineClose } from 'react-icons/ai'
import Button from "./Button"

interface ModalProps{
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
    Avoidfooter?: boolean;
    AvoidHeader?: boolean;
}


const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled,
    Avoidfooter,
    AvoidHeader
}) => {
    const handleClose = useCallback(() => {
            onClose()
    }, [onClose])
    
    const handleSumbit = useCallback(() => {
        if (disabled) {
            return;
        }
        onSubmit();
    }, [disabled, onSubmit])

    const stopClose = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
    }
    useEffect(() => {
        const bodyElement = document.body;
    
        if (isOpen) {
            // Disable scrolling when the modal is open
            bodyElement.style.overflow = "hidden";
        } else {
            // Enable scrolling when the modal is closed
            bodyElement.style.overflow = "auto";
        }
    
        return () => {
            // Cleanup: Enable scrolling when the component unmounts
            bodyElement.style.overflow = ""; // Set it back to an empty string
        };
    }, [isOpen]);
    
    if (!isOpen) {
        return null
    }
  return (
      <>
          <div className="
          justify-center
          items-center
          flex
          overflow-x-hidden
          overflow-y-auto
          fixed
          inset-0
          z-50
          outline-none
          focus: oultine-none
          bg-neutral-800
          bg-opacity-70
          backdrop-blur-sm
          "
              onClick={handleClose}
          >
              <div
                  className="
              relative
              w-full
              lg:w-3/6
              my-6
              mx-auto
              lg:max-w-3xl
              h-full
              lg:h-auto
              rounded-2xl
              transition
              ease-in-out
                duration-1000 
              bg-neutral-100
              "
                  onClick={stopClose}
              >
                  {/* {content} */}
                  <div className="
                  h-full
                  lg:h-auto
                  border-0
                  rounded-lg
                  shadow-lg
                  relative
                  flex
                  flex-col
                  w-full
                  dark:bg-black
                  outline-none
                  focus:ouline-none
                  ">
                      {/* header */}
                      {!AvoidHeader && <div
                          className="
                      flex
                      items-center
                      justify-between
                      p-10
                      pb-0
                      rounded-t">
                          <h3 className="text-3xl font-semibold dark:text-white">{title}</h3>
                          <button
                              onClick={handleClose}
                              className="
                          p-1
                          ml-auto
                          border-0
                        dark:text-white
                          hover:opacity-70
                          transition">
                              <AiOutlineClose size={20} />
                          </button>
                      </div>}
                      {/* body */}
                      <div className="relative p-10 flex-auto">
                          {body}
                      </div>
                      {/* footer */}
                      {!Avoidfooter && <div className="flex flex-col gap-2 p-10 pt-0">
                          <Button disabled={disabled} label={actionLabel} secondary fullWidth large onClick={handleSumbit} />
                          {footer}
                      </div>}
                  </div>
              </div>
              
          </div>
      </>
  )
};

export default Modal;
