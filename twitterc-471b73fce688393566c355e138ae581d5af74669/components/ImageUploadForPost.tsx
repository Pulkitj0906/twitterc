import { fi } from "date-fns/locale";
import Image from "next/image";
import { eventNames } from "process";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
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
    }, [base64])
    
    const handledrop = useCallback((files: any) => {
        const file = files[0]
        const reader = new FileReader();

        reader.onload = (event: any) => {
            setBase64(event.target.result)
            handleChange(event.target.result)
        }

        reader.readAsDataURL(file)
    },[handleChange])


    const { getRootProps, getInputProps } = useDropzone({
        maxFiles: 1,
        onDrop: handledrop,
        disabled,
        accept: {
            'image/jpeg': [],
            'image/png': []
        }
    })

    return (
        <div
            {...getRootProps({
            className: 'color-blue'
        })}
        >
            <input {...getInputProps()} />
            {
                base64 ? (
                    <div className="flex items-center justify-center">
                        <Image
                        src={base64}
                        height='100'
                        width='100'
                        alt="Uploaded image"
                        />
                    </div>
                ) : (
                        
                        <p className="mt-4 hover:color-sky-500"><FaRegImages size={20} color='' /></p>
                )
            }
      
    </div>
  )
};

export default ImageUploadForPost;
