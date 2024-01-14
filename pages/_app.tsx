import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import {SessionProvider} from 'next-auth/react'

import Layout from '@/components/layout'
import LoginModal from '@/components/modals/LoginModal'
import RegisterModal from '@/components/modals/RegisterModal'
import '@/styles/globals.css'
import EditModal from '@/components/modals/EditModal'
import TweetModal from '@/components/modals/TweetModal'
import ConfirmModal from '@/components/modals/ConfirmationModal'
import ReportModal from '@/components/modals/ReportModal'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Toaster />
      <EditModal />
      <TweetModal />
      <ConfirmModal />
      <ReportModal/>
      <RegisterModal />
    <LoginModal />
    <Layout>
        <Component {...pageProps} />
    </Layout>
    </SessionProvider>
  )
}
