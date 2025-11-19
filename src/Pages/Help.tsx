import Sidebar from '../Components/Sidebar/Sidebar';
import Navbar from '../Components/Navbar/Navbar';

const Help = ({ embedded = false }: { embedded?: boolean }) => {
  return (
    <div className='w-full overflow-hidden h-full gap-1 flex flex-col items-center'>
      {!embedded && <Navbar />}
      <div className='w-full flex gap-5'>
        {!embedded && <Sidebar />}
        <div className="w-full flex overflow-y-auto overflow-x-hidden items-start flex-col lg:flex-nowrap flex-wrap gap-5 p-8">
          <h1 className="text-3xl font-semibold text-[#313131]">Help & Support</h1>
          <div className="w-full bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className='hover:shadow-md shadow-green-100 p-2 cursor-pointer rounded-md hover:bg-green-50 ' >
                <h3 className="font-medium">How do I add a new book?</h3>
                <p className="text-gray-600">Go to the Books page and click "Add Book" button.</p>
              </div>
              <div className='hover:shadow-md shadow-green-100 p-2 cursor-pointer rounded-md hover:bg-green-50 '>
                <h3 className="font-medium">How do I manage users?</h3>
                <p className="text-gray-600">Visit the Users page to add, edit, or remove users.</p>
              </div>
              <div className='hover:shadow-md shadow-green-100 p-2 cursor-pointer rounded-md hover:bg-green-50 '>
                <h3 className="font-medium">How to change theme?</h3>
                <p className="text-gray-600">Use the theme toggle button in the navbar or go to Settings.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;