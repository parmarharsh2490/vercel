import { useState } from "react";
import axios from "axios";
const App = () => {
  const [images, setImages] = useState<any>([]);
  const handleImageChange = (e: any) => {
    console.log(e);
    const fileArray = Array.from(e.target.files)
    console.log(fileArray);
    setImages(fileArray)
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    images.forEach((image, index) => {
      if (image instanceof File) {
        formData.append(`images[${index}]`, image); // Correct formData usage
      }
    });
      console.log(formData);
    // await axios.post('https://cara-backend-nine.vercel.app/api/v1/post/create',images)
    await axios.post('http://localhost:3000/api/v1/post/create', images, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
  };

  return (
    <div className="max-w-4xl mx-auto mt-2 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Testing</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
      <input
          type="file"
          onChange={handleImageChange}
          multiple
        />
        <button type="submit">Submit</button>      
      </form>
    </div>
  );
};

export default App;
