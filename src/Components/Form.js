import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ValidationForm } from './ValidationForm'
import { setUserData } from '../store';
import { useNavigate } from 'react-router-dom';

const frameworkOptions = ["React", "Vue", "Angular"];

function Form() {
  const dispatch = useDispatch();
  const userArray = useSelector((state) => state.userData) || [];
  const navigate = useNavigate();
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData')) || [];
    dispatch(setUserData(storedData));

    const storedIndex = JSON.parse(localStorage.getItem('selectedUserIndex'));
    if (storedIndex !== null) {
      setSelectedUserIndex(storedIndex);
    }
  }, [dispatch]);

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    setFieldValue,
  } = useFormik({
    initialValues: selectedUserIndex !== null ? userArray[selectedUserIndex] : {
      name: "",
      email: "",
      phone: "",
      frameworks: [],
      filterSelect: '',
    },
    validationSchema: ValidationForm,
    onSubmit: (values) => {
      const updatedUserData = [...userArray];
      if (selectedUserIndex !== null) {
        // Update existing user data
        updatedUserData[selectedUserIndex] = values;
      } else {
        // Add new user data
        updatedUserData.push(values);
      }
      
      dispatch(setUserData(updatedUserData));

      localStorage.setItem('userData', JSON.stringify(updatedUserData));

      localStorage.removeItem('selectedUserIndex');

      navigate('/data');
    },
  });

      const [num, setNum] = useState();
      const handleChangePhone = (e) => {
        let phonevalue = e.target.value;
        if(!isNaN(phonevalue)){
          setNum("num");
          setFieldValue("phone", phonevalue); 
        }
      }
      const handleChangeFrameworks = (framework) => {
        const selectedFrameworks = values.frameworks.includes(framework)
          ? values.frameworks.filter((f) => f !== framework)
          : [...values.frameworks, framework];
    
        setFieldValue("frameworks", selectedFrameworks);
      };

  return (
    <>

      <section className="relative py-10 bg-gray-900 sm:py-16 lg:py-24">
        <div className="absolute inset-0">
          <img
            className="object-cover w-full h-full"
            src="https://cdn.rareblocks.xyz/collection/celebration/images/signup/2/woman-working-laptop.jpg"
            alt=""
          />
        </div>
        <div className="absolute inset-0 bg-gray-900/20"></div>

        <div className="relative max-w-lg px-4 mx-auto sm:px-0">
          <div className="overflow-hidden bg-white rounded-md shadow-md">
            <div className="px-4 py-6 sm:px-8 sm:py-7">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900">
                  {selectedUserIndex !== null ? 'Update User Data' : 'Create an account'}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="mt-8">
                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor=""
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      First & Last name{" "}
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="text" 
                        value={values.name} 
                        onChange={handleChange}
                        onBlur={handleBlur} 
                        name="name"
                        placeholder="Enter your full name"
                        className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                      />
                    </div>
                    {errors.name && <p className="p-2 text-red-600">{errors.name}</p>}
                  </div>

                  <div>
                    <label
                      htmlFor=""
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Email address{" "}
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="email" 
                        value={values.email} 
                        onChange={handleChange}
                        onBlur={handleBlur} 
                        name="email"
                        placeholder="Enter email to get started"
                        className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                      />
                    </div>
                    {errors.email && <p className="p-2 text-red-600">{errors.email}</p>}
                  </div>
                  <div>
                    <label
                      htmlFor=""
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Phone no:{" "}
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="text" 
                        value={values.phone} 
                        name={num === "num" ? "phone" : ''} 
                        onChange={handleChangePhone}
                        onBlur={handleBlur} 
                        placeholder="Enter your phone number"
                        className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                      />
                    </div>
                    {errors.phone && <p className="p-2 text-red-600">{errors.phone}</p>}
                  </div>
                  <div>
                    <label
                      htmlFor=""
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Favorite Language{" "}
                    </label>
                    <div className="mt-2.5">
                      <div className="flex items-center mr-4 mb-4">
                        <input
                          className="h-5 w-5"
                          type="radio"
                          name="fav_language"
                          value="HTML"
                          id="html"
                          checked={values.fav_language === "HTML"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <label
                          htmlFor="html"
                          className="flex items-center cursor-pointer ml-2 "
                        >
                          C++
                        </label>
                      </div>

                      <div className="flex items-center mr-4 mb-4">
                        <input
                          className="h-5 w-5"
                          type="radio"
                          name="fav_language"
                          value="CSS"
                          id="css"
                          checked={values.fav_language === "CSS"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <label
                          htmlFor="css"
                          className="flex items-center cursor-pointer ml-2"
                        >
                          Java
                        </label>
                      </div>

                      <div className="flex items-center mr-4 mb-4">
                        <input
                          className="h-5 w-5"
                          type="radio"
                          name="fav_language"
                          id="javascript"
                          value="JavaScript"
                          checked={values.fav_language === "JavaScript"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <label
                          htmlFor="javascript"
                          className="flex items-center cursor-pointer ml-2"
                        >
                          Python
                        </label>
                      </div>
                    </div>
                    {errors.fav_language && <p className="p-2 text-red-600">{errors.fav_language}</p>}
                  </div>
                  <div>
                    <label
                      htmlFor=""
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Favorite Framework{" "}
                    </label>
                    <div className="mt-2.5">
                      {
                        frameworkOptions.map((item,index) => (
                          <div key={index} className="flex items-center mb-4">
                            <label className="pl-2 flex items-center">
                              <input 
                                type="checkbox"
                                name="frameworks"
                                value={item}
                                checked={values.frameworks.includes(item)}
                                onChange={() => handleChangeFrameworks(item)}
                                onBlur={handleBlur}  
                                className="w-5 h-5 rounded-lg mr-2" />
                              {item}
                            </label>
                        </div>
                        ))
                      }
                    </div>
                    {errors.frameworks && <p className="p-2 text-red-600">{errors.frameworks}</p>}
                  </div>          
                  <div>
                    <label
                      htmlFor=""
                      className="text-base font-medium text-gray-900">
                      {" "} Show {" "}
                    </label>
                    <div className="mt-2.5">
                        <select
                            id="filterSelect"
                            name="filterSelect" 
                            onChange={handleChange}
                            value={values.filterSelect} 
                            className="bg-dark text-white">

                            <option value="">Choose a task</option>
                            <option value="all">All Tasks</option>
                            <option value="completed">Completed Tasks</option>
                            <option value="incomplete">Incompleted Tasks</option>
                        </select>
                    </div>
                    {errors.filterSelect && <p className="p-2 text-red-600">{errors.filterSelect}</p>}
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700">
                        {selectedUserIndex !== null ? 'Update' : 'Sign up'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Form