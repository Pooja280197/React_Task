import { useEffect, useState } from 'react'
import UserForm from './UserForm';
import { createUser, deleteUser, getUsers, updateUser } from '../api/userFormApi';
import type { User } from '../types/user';
import UserTable from './UserTable';
import DeleteModal from './DeleteModal';

const UserList = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [users, setUsers] = useState<User[]>([]);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [userToDelete, setUserToDelete] = useState<number | null>(null);
    const [showTable, setShowTable] = useState(false);




    const fetchUsers = async () => {
        setLoading(true);
        setError("")
        try {
            const res = await getUsers()
            setUsers(res.data);
        }
        catch {
            setError("Failed to load users")
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers();
    }, [])

    const handleSubmit = async (data: User) => {
        try {
            if (editingUser?.id) {
                await updateUser(editingUser.id, data)
                setEditingUser(null)
            }
            else {
                await createUser(data)
            }
            fetchUsers()
        }

        catch {
            alert("Something went wrong")
        }
    }

    const openDeleteModal = (id: number) => {
        setUserToDelete(id);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setUserToDelete(null);
        setShowDeleteModal(false);
    };

    const confirmDelete = async () => {
        if (!userToDelete) return;

        await deleteUser(userToDelete);
        closeDeleteModal();
        fetchUsers();
    };


    return (
        <div className="container">
            <h2>User Management</h2>

            {/* Form to Create or Edit user */}
            <UserForm
                initialData={editingUser}
                onSubmit={handleSubmit}
                onCancel={() => setEditingUser(null)}

            />

            {/* We can choose to hide or show user table with this button */}
            <button
                className="show"
                onClick={() => setShowTable(prev => !prev)}
            >
            {showTable ? "Hide Users" : "View Users"}
            </button>

            {showTable && loading && <p>Loading...</p>}
            {showTable && error && <p className="error">{error}</p>}


            {/* Users table to show data */}
            {!loading && showTable &&(
                <UserTable
                    users={users}
                    onEdit={setEditingUser}
                    onDelete={openDeleteModal}
                />
            )}

            {/* Confirm delete modal */}
            <DeleteModal
                open={showDeleteModal}
                onClose={closeDeleteModal}
                onConfirm={confirmDelete}
            />

        </div>
    )
}

export default UserList
