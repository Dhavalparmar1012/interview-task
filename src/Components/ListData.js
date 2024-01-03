import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function ListData() {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(true);
  const [showCompleted, setShowCompleted] = useState(false);
  const [showIncomplete, setShowIncomplete] = useState(false);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData')) || [];
    setUserData(storedData);
  }, []);

  const handleDelete = (index) => {
    const updatedUserData = [...userData];
    updatedUserData.splice(index, 1);
    
    setUserData(updatedUserData);
    localStorage.setItem('userData', JSON.stringify(updatedUserData));
  };

  const handleUpdate = (index) => {
    // Set the selected user index for updating
    localStorage.setItem('selectedUserIndex', JSON.stringify(index));
    navigate('/');
  };

  const filterData = () => {
    if (showAll) return userData;
    if (showCompleted) return userData.filter(user => user.filterSelect === 'completed');
    if (showIncomplete) return userData.filter(user => user.filterSelect === 'incomplete');
    return [];
  };

  return (
    <>
        <div className="d-flex flex-column bg-light justify-content-center align-items-center vh-100">
            <div className="w-75 rounded bg-white border shadow p-4">
                <div className="mt-5 mb-5 text-center fw-bold fs-3">User Data</div>  
                <div className="filter-options mb-3">
            <label>
              <input
                type="checkbox"
                checked={showAll}
                onChange={() => setShowAll(!showAll)}
              />
              Show All
            </label>
            <label>
              <input
                type="checkbox"
                checked={showCompleted}
                onChange={() => setShowCompleted(!showCompleted)}
              />
              Show Completed
            </label>
            <label>
              <input
                type="checkbox"
                checked={showIncomplete}
                onChange={() => setShowIncomplete(!showIncomplete)}
              />
              Show Incomplete
            </label>
          </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Contact No</th>
                            <th scope="col">Language</th>
                            <th scope="col">Framework</th>
                            <th scope="col">Show</th>
                        </tr>
                    </thead>
                    <tbody>
                      {filterData().map((user, index) => (
                        <tr key={index}>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.phone}</td>
                          <td>{user.fav_language}</td>
                          <td>{user.frameworks.join(', ')}</td>
                          <td>{user.filterSelect}</td>
                          <td>
                            <button
                              onClick={() => handleDelete(index)}
                              className="btn btn-danger"
                            >
                              Delete
                            </button>
                          </td>
                          <td>
                            <button
                              onClick={() => handleUpdate(index)}
                              className="btn btn-warning"
                            >
                              Update
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                </table>
            </div >
        </div >
    </>
  )
}

export default ListData