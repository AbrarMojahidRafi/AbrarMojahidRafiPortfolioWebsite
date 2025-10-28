import React from 'react'
import { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AdminContacts = () => {
    const [contacts, setcontacts] = React.useState([]);

    const getAllContactsData = async ()=> {
        try {
            const response = await fetch("http://localhost:3000/api/admin/AbrarMojahidRafi_PortfolioWebsite/contacts", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                },
            });

            const data = await response.json();
            // console.log("All contacts data from backend: ", data.contacts); 
            setcontacts(data.contacts);
        } catch (error) {
            console.log("Error while getting all users data", error);
        }
    };

    const deleteContact = async (contactId) => {
        // Show loading toast
        const toastId = toast.loading("Deleting contact...");
        
        try {
            const response = await fetch(`http://localhost:3000/api/admin/AbrarMojahidRafi_PortfolioWebsite/contacts/delete/${contactId}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                },
            });

            const data = await response.json();
            // console.log("Delete contact response from backend: ", data);   

            // Refresh the contacts list after deletion
            if (response.ok) {
                // Update toast to success
                toast.update(toastId, {
                    render: "Contact deleted successfully!",
                    type: "success",
                    isLoading: false,
                    autoClose: 3000,
                    closeButton: true,
                });
                getAllContactsData();
            } else {
                // Update toast to error
                toast.update(toastId, {
                    render: data.message || "Failed to delete contact!",
                    type: "error",
                    isLoading: false,
                    autoClose: 3000,
                    closeButton: true,
                });
            }
        } catch (error) {
            console.log("Error while deleting contact", error);
            // Update toast to error
            toast.update(toastId, {
                render: "Error deleting contact!",
                type: "error",
                isLoading: false,
                autoClose: 3000,
                closeButton: true,
            });
        }
    };

    useEffect( () => {
        getAllContactsData(); 
    }, []);

    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Contacts Management</h1>
                
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                        Name
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                        Email
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                        Phone
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                        Subject
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                        Message
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {contacts.map((contact, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-4">
                                            <div className="text-sm font-medium text-gray-900 whitespace-normal break-words">
                                                {contact.name}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="text-sm text-gray-500 whitespace-normal break-words">
                                                {contact.email}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="text-sm text-gray-500 whitespace-normal break-words">
                                                {contact.phone || 'N/A'}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="text-sm text-gray-500 whitespace-normal break-all">
                                                {contact.subject || 'N/A'}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="text-sm text-gray-500 whitespace-normal break-words max-w-md">
                                                {contact.message || 'N/A'}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <button 
                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                                                onClick={() => { deleteContact(contact._id) }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Empty State */}
                    {contacts.length === 0 && (
                        <div className="text-center py-8">
                            <div className="text-gray-500 text-lg">No contacts found</div>
                            <div className="text-gray-400 text-sm mt-2">There are no contact messages to display</div>
                        </div>
                    )}
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
    )
}

export default AdminContacts