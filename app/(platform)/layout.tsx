import { ClerkProvider } from '@clerk/nextjs';
import {Toaster} from "sonner";
 
const PlatformLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <ClerkProvider>
      <div className='h-full'>
        <Toaster />
        {children}
      </div>
    </ClerkProvider>
  )
}

export default PlatformLayout;