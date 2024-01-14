import { fi } from "date-fns/locale";
import Image from "next/image";
import { eventNames } from "process";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineClose } from "react-icons/ai";
import { FaRegImages } from "react-icons/fa";

interface ImageUploadPropsForPost{
    onChange: (base64: string) => void;
    label: string;
    value?: string;
    disabled?: boolean;
}

const ImageUploadForPost: React.FC<ImageUploadPropsForPost> = ({
    onChange,
    label,  
    value,
    disabled
}) => {
    const [base64, setBase64] = useState(value);
    const handleChange = useCallback((base64: string) => {
        onChange(base64);
    }, [onChange])
    
    const handledrop = useCallback((files: any) => {
        const file = files[0]
        const reader = new FileReader();

        reader.onload = (event: any) => {
            setBase64(event.target.result)
            handleChange(event.target.result)
        }

        reader.readAsDataURL(file)
    }, [handleChange])
    const handleClearImage = () => {
        handleChange('');
      };


    const { getRootProps, getInputProps } = useDropzone({
        maxFiles: 1,
        onDrop: handledrop,
        disabled,
        accept: {
            'image/jpeg': [],
            'image/png': []
        }
    })
    useEffect(() => {
        setBase64(value);
      }, [value]);

    return (
        <div
            {...getRootProps({
            className: 'color-blue'
        })}
        >
            <input {...getInputProps()} />
            {
                base64 ? (
                    <div className="flex items-center justify-center relative">
                        <Image
                        src={base64}
                        height='100'
                        width='100'
                        alt="Uploaded image"
                        />
                        <div onClick={handleClearImage} className="hover:text-black absolute h-4 w-4 right-0 top-0">
                            <AiOutlineClose />
                        </div>
                    </div>
                ) : (
                        
                        <p className="mt-4 hover:text-sky-500"><FaRegImages size={20} color='' /></p>
                )
            }
      
    </div>
  )
};

export default ImageUploadForPost;
