import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import React,{Fragment} from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { FaFlag, FaMoon, FaSun, FaUser } from 'react-icons/fa'
import SidebarItem from './SidebarItem'
import { BiLogOut } from 'react-icons/bi'
import { LuShare } from 'react-icons/lu'
import { AiOutlineLink } from 'react-icons/ai'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface DropdownProps{
  item1?: string;
  hrefitem1?:string;
  item2?: string;
  hrefitem2?: string;
  item3?: string;
  darkMode?: boolean;
  onClickitem2?: () => void;
  onClickitem1?: (data?: Record<string, any>, userId?: string) => void;
  toggleDarkMode?: () => void;
  darkbutton?: boolean;
  profilelogo?: boolean;
  flaglogo?: boolean;
  onClickitem3?: () => void;
  logo2?: React.ReactElement;
  logo3?: React.ReactElement;
  sharebutton?: boolean;
  copylogo?: boolean;
}

const Dropdown:React.FC<DropdownProps>=({item1,hrefitem1,item2,hrefitem2,onClickitem2,onClickitem1,darkMode,toggleDarkMode,darkbutton,profilelogo,flaglogo,item3,onClickitem3,logo2,logo3,sharebutton,copylogo})=> {
  return (
    <Menu as='div' className={`relative inline-block text-left`}>
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 ">
          {sharebutton?<LuShare className="hover:text-sky-500"/>:<BsThreeDots className="" />}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className={`absolute dark:bg-stone-950 ${sharebutton?'top-full':'bottom-full'} right-0 z-10 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-sm dark:shadow-white ring-1 ring-black ring-opacity-5 focus:outline-none`}>
        {darkbutton && <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href={hrefitem2}
                  className={classNames(
                    active ? 'bg-gray-100 dark:bg-stone-900  ' : '',
                    'block px-4 py-2 text-sm dark:text-slate-300'
                  )}
                ><div onClick={toggleDarkMode} className='flex flex-row items-center'>
                    {darkMode ? <FaSun className='active:text-white' /> : <FaMoon />}
                    
                    {darkMode ? <div className=' pl-4'>
                      Light Theme
                    </div> :
                      <div className=' pl-4'>
                        Dark Theme
                      </div>
                    }
                    
                  </div>
                </a>
              )}
            </Menu.Item>
          </div>}
          {item1 && <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href={hrefitem1}
                  className={classNames(
                    active ? 'bg-gray-100 dark:bg-stone-900 ' : '',
                    'block px-4 py-2 text-sm dark:text-slate-300'
                  )}
                >
                  <div onClick={onClickitem1} className='flex flex-row items-center'>
                    {profilelogo ?<FaUser /> :'' }
                    {flaglogo ? <FaFlag /> : ''}
                    {copylogo?<AiOutlineLink className='text-black dark:text-white'/>:''}
                    <div className=' pl-4 text-black dark:text-white'>
                      {item1}
                    </div>
                    
                  </div>
                  
                </a>
              )}
            </Menu.Item>
            
          </div>}
          
          {item2 && <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  // href={hrefitem2}
                  className={classNames(
                    active ? 'bg-gray-100 dark:bg-stone-900 ' : '',
                    'block px-4 py-2 text-sm dark:text-slate-300'
                  )}
                ><div onClick={onClickitem2} className='flex flex-row items-center'>
                {logo2}
                <div className=' pl-4 text-black dark:text-white'>
                  {item2}
                </div>
                
          </div>
                </a>
              )}
            </Menu.Item>
          </div>}
          {item3 && <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href={hrefitem2}
                  className={classNames(
                    active ? 'bg-gray-100 dark:bg-stone-900 ' : '',
                    'block px-4 py-2 text-sm dark:text-slate-300'
                  )}
                ><div onClick={onClickitem3} className='flex flex-row items-center'>
                {logo3}
                <div className=' pl-4'>
                  {item3}
                </div>
                
          </div>
                </a>
              )}
            </Menu.Item>
          </div>}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default Dropdown;