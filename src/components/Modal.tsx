import React from 'react';
import ReactModal from 'react-modal';

interface Props {
  formData: {
    title: string;
    content: string;
  };
  setFormData: (formData: { title: string; content: string }) => void;
  handleSubmission: (e: React.FormEvent<HTMLFormElement>) => void;
  isAdd: boolean; // Add this to distinguish between add and update modes
  onClose: () => void;
}

const ModalComponent: React.FC<Props> = ({
  formData,
  setFormData,
  handleSubmission,
  isAdd, // Use this prop as needed inside the modal
  onClose,
}) => {
  return (
    <ReactModal
      isOpen={true}
      contentLabel='Example Modal'
      className='w-4/12 h-[70%] rounded-lg shadow-lg bg-blue-700 border-2 border-white px-4 py-2  absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 cancel-drag'
    >
      <div className=' flex justify-end mb-1'>
        <h1
          className=' cursor-pointer text-4xl text-end  font-semibold max-w-fit '
          onClick={onClose}
        >
          x
        </h1>
      </div>

      <form className='flex flex-col gap-4' onSubmit={handleSubmission}>
        <div className='flex flex-col gap-1'>
          <h1 className='text-white'>
            {isAdd ? 'Add New Entry' : 'Update Entry'}
          </h1>{' '}
          {/* Change title based on mode */}
          <input
            type='text'
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className='border border-black p-2 rounded-lg'
            placeholder='Enter title' // Optional: Placeholder to guide users
          />
        </div>
        <div className='flex flex-col gap-1'>
          <h1 className='text-white'>Content</h1>
          <textarea
            rows={5}
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            className='border border-black p-3 rounded-lg'
            placeholder='Enter content' // Optional: Placeholder to guide users
          />
        </div>
        <div className='flex justify-center items-center'>
          <button
            type='submit'
            className='text-white bg-black max-w-fit px-4 py-2 rounded-lg'
          >
            {isAdd ? 'Add' : 'Update'} {/* Change button text based on mode */}
          </button>
        </div>
      </form>
    </ReactModal>
  );
};
export default ModalComponent;
