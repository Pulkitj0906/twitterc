import { FaCheck } from "react-icons/fa6";

interface ReportElementProps{
    clicked: boolean
    onReport: () => void;
    header: string;
    content: string;
}

const ReportElement:React.FC<ReportElementProps> = ({clicked,onReport,header,content}) => {
  return (
    <div className="">
        <label id='checkbox' onClick={onReport} className="inline-flex select-none justify-between w-full cursor-pointer group pr-3">
                <div className="w-3/4">
                    <p id='checkbox' className='text-lg'>{header}</p>
                  <p className="text-xs tracking-tighter text-black/70">{content}</p>
              </div>
                <div id='checkbox' className={`h-4 w-4 border border-gray-300 rounded-md ml-2 flex items-center justify-center ring-black/5 group-hover:ring-[7px] transition ${clicked?'bg-black':''} `}>
                  {clicked && <FaCheck size={10} className='text-white transition ease-in-out delay-700' />}
                </div>
        </label> 
    </div>
  )
};

export default ReportElement;
