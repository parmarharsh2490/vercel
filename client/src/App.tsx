import { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [images, setImages] = useState<any>([]);

  const handleImageChange = (e: any) => {
    const fileArray = Array.from(e.target.files);
    setImages(fileArray);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    images.forEach((image: any, index: any) => {
      if (image instanceof File) {
        formData.append(`images[${index}]`, image);
      }
    });

    try {
      const response = await axios.post('https://vercel-backend-three-psi.vercel.app/api/v1/post/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // const response = await axios.post('http://localhost:3000/api/v1/post/create', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // });
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-2 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Testing</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input type="file" onChange={handleImageChange} multiple />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;