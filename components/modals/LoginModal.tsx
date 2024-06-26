import useLoginModal from "@/hooks/useLoginModal";
import {useState,useCallback} from 'react'
import Input from "../input";
import Modal from "../Modal";
import RegisterModal from "./RegisterModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import {signIn} from "next-auth/react"

const LoginModal = () => {
    const loginModal = useLoginModal();
    const RegisterModal = useRegisterModal();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onToggle = useCallback(() => {
        if (isLoading) {
            return;
        } 
        loginModal.OnClose()
        RegisterModal.OnOpen();
    },[isLoading,loginModal,RegisterModal])

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true)

            await signIn('credentials', {
                email,
                password
            })

            loginModal.OnClose()
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }, [loginModal,email,password])
    
    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input
                placeholder="Email"
                onChange={(e)=>setEmail(e.target.value)}
                value={email}
                disabled={isLoading}
            />
            <Input
                placeholder="Password"
                type="password"
                onChange={(e)=>setPassword(e.target.value)}
                value={password}
                disabled={isLoading}
            />

        </div>
    )
    const footerContent = (
        <div className=" text-center mt-4">
            <p>First time using Twitter?  
                <span
                    onClick={onToggle}
                    className="
                cursor-pointer
                hover:underline
                ">
                    Create an account
                </span>
            </p>
            
        </div>
    )

  return (
      <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Sign in"
      onClose={loginModal.OnClose}
      onSubmit={onSubmit}
          body={bodyContent}
          footer={footerContent}
      />
  )
};

export default LoginModal;
