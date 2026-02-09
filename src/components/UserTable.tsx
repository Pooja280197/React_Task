import type { User } from '../types/user'

interface Props {
    users: User[];
    onEdit: (user: User) => void;
    onDelete: (id: number) => void;
}

const UserTable = ({ users, onEdit, onDelete }: Props) => {


    return (
        <div>
            <table className="userTable">
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {users.length>0?
                   ( users.map((user: User,index:number) => (
                        <tr key={user.id}>
                            <td>{index+1}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>
                                <button className='EditButton' onClick={() => onEdit(user)}>Edit</button>
                                <button
                                    className="danger"
                                    onClick={() => user.id && onDelete(user.id)}
                                >
                                    Delete
                                </button>

                            </td>
                        </tr>
                    ))):(<tr><td colSpan={6} className='noUsers'>No users found.</td></tr>)}
                </tbody>
            </table>

        </div>
    )
}

export default UserTable
