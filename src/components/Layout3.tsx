import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';

const Layout3: React.FC = () => {
  const [isAdd, setIsAdd] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    _id: '663ddf16610780436b756105',
    componentType: 'Label3',
    addCount: 0,
    updateCount: 0,
    title: '',
    content: '',
  });

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.value === 'add') {
      setFormData((prev) => {
        return {
          ...prev,
          title: '',
          content: '',
          updateCount: prev.updateCount + 1,
        };
      });
      setIsAdd(true); // To specify that it's an add operation
    } else {
      setIsAdd(false); // It's an update operation
    }
    setIsModalOpen(true);
  };

  const handleUpdateClick = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log('clicked');
    try {
      const response = await axios.post(
        'https://dynamic-layout-be.vercel.app/api/updateOrCreate',
        formData
      );
      console.log(response.data);
      setIsSuccess((prev) => !prev);
    } catch (error) {
      console.error('Error:', error.response?.data);
    }
    setIsModalOpen(false); // Close modal after submission
  };

  useEffect(() => {
    if (!isAdd) {
      // Fetch data only for update operations
      const fetchData = async () => {
        try {
          const response = await axios.get(
            'https://dynamic-layout-be.vercel.app/api/663ddf16610780436b756105'
          );
          setFormData(response?.data);
        } catch (error) {
          console.error('Error fetching data:', error?.response?.data);
        }
      };
      fetchData();
    }
  }, [isAdd, isSuccess]); // Depend on isAdd to control fetching

  return (
    <div className='bg-yellow-200 border border-yellow-700 w-full h-full p-6'>
      <div className=' flex justify-between mb-3'>
        <div className='flex gap-4 flex-wrap'>
          <button
            value='add'
            onClick={handleButtonClick}
            onMouseDown={(e) => e.stopPropagation()}
            className='bg-green-200 p-2 rounded-xl cancel-drag'
          >
            Add
          </button>
          <button
            value='update'
            onClick={handleButtonClick}
            onMouseDown={(e) => e.stopPropagation()}
            className='bg-blue-200 p-2 rounded-xl cancel-drag'
          >
            Update
          </button>
        </div>
        <div>
          <button className='bg-red-200 p-2 rounded-xl cursor-none cancel-drag'>
            Count: {formData.addCount + formData.updateCount}
          </button>
        </div>
      </div>
      <div className=' flex items-center gap-2 '>
        <h1 className=' font-semibold text-xl'>Title:</h1>
        <h2>{formData.title}</h2>
      </div>
      <div className='flex flex-col '>
        <h1 className=' font-semibold text-xl'>Content:</h1>
        <p>{formData.content}</p>
      </div>

      {isModalOpen && (
        <Modal
          formData={formData}
          setFormData={setFormData}
          handleSubmission={handleUpdateClick}
          isAdd={isAdd}
          onClose={() => {
            setIsModalOpen(false);
            setIsAdd(false);
          }}
        />
      )}
    </div>
  );
};

export default Layout3;
