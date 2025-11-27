import { useContext } from "react"
import appContext from "../../Contexts/AppContext"

const Alert = () => {
const {setAlertPop,alertPop,theme,deletedBook,setDeleteApprove}=useContext(appContext)
  return (
    <>
        {
            alertPop && (
                <div className={ `${theme=="light"?"bg-gray-100  shadow-green-200  text-gray-700":"bg-gray-900 text-[#6b6b6b]"} w-96  shadow-mdrounded-xs p-5 flex flex-col gap-5`}>
        <div className="flex items-start gap-2">
            <img className="w-34 rounded-md" src="https://i.pinimg.com/736x/6b/5f/3c/6b5f3c480de6b6b8cd89c6ddeb2de330.jpg" alt="thumbnail" />
            <div>
                <p className="text-base font-semibold">Author:   <span className="text-gray-500">{deletedBook[0].author}</span></p>
                <p className="text-base font-semibold">Title :   <span className="text-gray-500">{deletedBook[0].title}</span></p>
                <p className="text-base font-semibold">Category_Id: <span className="text-gray-500">{deletedBook[0].category_id}</span></p>
                <p className="text-base font-semibold">Quantity: <span className="text-gray-500">{deletedBook[0].stock_quantity}</span></p>
            </div>
        </div>
        <p>Are you sure you want to delete?</p>
        <div className="w-full flex items-center justify-between">
            <button onClick={()=>{setAlertPop(!alertPop);setDeleteApprove(false)}} className="w-30 bg-green-600 p-1 rounded-md text-white cursor-pointer duration-500 hover:bg-green-700">No</button>
            <button onClick={()=>{setAlertPop(!alertPop);setDeleteApprove(true)}} className="w-30 bg-red-600 p-1 rounded-md text-white cursor-pointer  duration-500 hover:bg-red-700">Yes</button>
        </div>
    </div>
            )
        }
    </>
  )
}

export default Alert
