import { Edit, Eye, Trash } from 'react-feather';
import { Link } from 'react-router-dom';

export default function User({user, deleteUser,toggleModal}){
    return (
        <tr>
          <td>{user.id}</td>
          <td>{user.username}</td>
          <td>{user.gender}</td>
          <td>{user.email}</td>
          <td>{user.phone}</td>
          <td>{user.website}</td>
          <td id='actions'>
            <Trash color="red" size={15} onClick={() => deleteUser(user.id)} className='icons' />
            <Edit color="blue" size={15} onClick={() => toggleModal(user)} className='icons' />
            <Link to={`/users/${user.id}`}>
              <Eye color="purple" size={15} className='icons' />
            </Link>
          </td>
        </tr>
      );
}