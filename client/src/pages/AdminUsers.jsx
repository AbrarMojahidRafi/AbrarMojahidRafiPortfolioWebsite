import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminUsers = () => {
  const [users, setUsers] = React.useState([]);
  const navigate = useNavigate();

  const getAllUsersData = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/admin/AbrarMojahidRafi_PortfolioWebsite/users",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();
      // console.log("All users data from backend: ", data.users);
      setUsers(data.users);
    } catch (error) {
      console.log("Error while getting all users data", error);
    }
  };

  const deleteUser = async (userId) => {
    // Show loading toast
    const toastId = toast.loading("Deleting user...");

    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/AbrarMojahidRafi_PortfolioWebsite/users/delete/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();
      // console.log("Delete user response from backend: ", data);

      // Refresh the users list after deletion
      if (response.ok) {
        // Update toast to success
        toast.update(toastId, {
          render: "User deleted successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
          closeButton: true,
        });
        getAllUsersData();
      } else {
        // Update toast to error
        toast.update(toastId, {
          render: data.message || "Failed to delete user!",
          type: "error",
          isLoading: false,
          autoClose: 3000,
          closeButton: true,
        });
      }
    } catch (error) {
      console.log("Error while deleting user", error);
      // Update toast to error
      toast.update(toastId, {
        render: "Error deleting user!",
        type: "error",
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
      });
    }
  };

  useEffect(() => {
    getAllUsersData();
  }, []);

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Admin Users Management
        </h1>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Update
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {user.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {user.contact || "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                        onClick={() => navigate(`/admin/user/edit/${user._id}`)}
                      >
                        Update
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                        onClick={() => {
                          deleteUser(user._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default AdminUsers;
