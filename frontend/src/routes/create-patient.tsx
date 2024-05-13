import { MoveLeft } from "lucide-react";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import { createPatient } from "../api/patient";

interface FormData {
  name: string;
  mobile: string;
  email: string;
  address: string;
}

const CreatePatientForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    mobile: "",
    email: "",
    address: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createPatient(formData);
      alert("New patient created successfully!");
      setFormData({
        name: "",
        mobile: "",
        email: "",
        address: "",
      });
    } catch (error) {
      console.error("Error creating patient:", error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-200 to-purple-200 h-full flex flex-col items-center justify-center p-6">
      <div className="w-full p-8 bg-white shadow-lg rounded-lg h-full max-w-md">
        <h1 className="text-3xl font-semibold mb-6 text-center">
          Create Patient
        </h1>
        <div className="bg-white shadow-md rounded-full p-3 border border-black absolute top-[60px] left-0 m-4">
          <Link
            to="/dashboard"
            className="text-gray-600 hover:text-blue-600 flex items-center"
          >
            <MoveLeft className="w-6 h-6" />
          </Link>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-8">
            <label htmlFor="name" className="block mb-2 text-gray-600">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input outline-none border-2 border-gray-300 rounded-md px-4 py-2 w-full"
              placeholder="Enter name"
            />
          </div>
          <div className="mb-8">
            <label htmlFor="mobile" className="block mb-2 text-gray-600">
              Mobile:
            </label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="input outline-none border-2 border-gray-300 rounded-md px-4 py-2 w-full"
              placeholder="Enter mobile number"
            />
          </div>
          <div className="mb-8">
            <label htmlFor="email" className="block mb-2 text-gray-600">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input outline-none border-2 border-gray-300 rounded-md px-4 py-2 w-full"
              placeholder="Enter email"
            />
          </div>
          <div className="mb-8">
            <label htmlFor="address" className="block mb-2 text-gray-600">
              Address:
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="input outline-none border-2 border-gray-300 rounded-md px-4 py-2 w-full"
              placeholder="Enter address"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-md shadow-lg hover:shadow-xl transition duration-300"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePatientForm;
