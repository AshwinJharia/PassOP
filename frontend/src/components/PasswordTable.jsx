import { copyToClipboard } from '../utils/clipboard';

const PasswordTable = ({ passwords, onEdit, onDelete }) => {
    if (passwords.length === 0) {
        return <div>No credentials to show</div>;
    }

    return (
        <table className="table-auto w-full rounded-md overflow-hidden mb-10">
            <thead className="bg-green-800 text-white">
                <tr>
                    <th className="py-2">Service</th>
                    <th className="py-2">Username/Email</th>
                    <th className="py-2">Password/Key</th>
                    <th className="py-2">Actions</th>
                </tr>
            </thead>
            <tbody className="bg-green-100">
                {passwords.map((item, index) => (
                    <tr key={index}>
                        <td className="py-2 border border-white text-center">
                            <div className="flex items-center justify-center">
                                <a href={item.site} target="_blank" rel="noopener noreferrer">
                                    {item.site}
                                </a>
                                <div className="lordiconcopy size-7 cursor-pointer" onClick={() => copyToClipboard(item.site)}>
                                    <lord-icon
                                        style={{ width: "25px", height: "25px", paddingTop: "3px", paddingLeft: "3px" }}
                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                        trigger="hover"
                                    ></lord-icon>
                                </div>
                            </div>
                        </td>
                        <td className="py-2 border border-white text-center">
                            <div className="flex items-center justify-center">
                                <span>{item.username}</span>
                                <div className="lordiconcopy size-7 cursor-pointer" onClick={() => copyToClipboard(item.username)}>
                                    <lord-icon
                                        style={{ width: "25px", height: "25px", paddingTop: "3px", paddingLeft: "3px" }}
                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                        trigger="hover"
                                    ></lord-icon>
                                </div>
                            </div>
                        </td>
                        <td className="py-2 border border-white text-center">
                            <div className="flex items-center justify-center">
                                <span>{"*".repeat(item.password.length)}</span>
                                <div className="lordiconcopy size-7 cursor-pointer" onClick={() => copyToClipboard(item.password)}>
                                    <lord-icon
                                        style={{ width: "25px", height: "25px", paddingTop: "3px", paddingLeft: "3px" }}
                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                        trigger="hover"
                                    ></lord-icon>
                                </div>
                            </div>
                        </td>
                        <td className="justify-center py-2 border border-white text-center">
                            <span className="cursor-pointer mx-1" onClick={() => onEdit(item)}>
                                <lord-icon
                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                    trigger="hover"
                                    style={{ width: "25px", height: "25px" }}
                                ></lord-icon>
                            </span>
                            <span className="cursor-pointer mx-1" onClick={() => onDelete(item.id)}>
                                <lord-icon
                                    src="https://cdn.lordicon.com/skkahier.json"
                                    trigger="hover"
                                    style={{ width: "25px", height: "25px" }}
                                ></lord-icon>
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default PasswordTable;