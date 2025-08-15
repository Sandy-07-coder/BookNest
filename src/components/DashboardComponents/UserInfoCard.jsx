
import React from 'react'
import { getAuth } from 'firebase/auth';

const UserInfoPopover = (props) => {

  const auth = getAuth();
  const user = auth.currentUser;


  return (
    <>
      {user && <div className=' text-white bg-gray-800 px-4 py-4 space-y-2 rounded-xl'>
        <p ><strong>Name: </strong>{user.displayName}</p>
        <p><strong>Email: </strong>{user.email}</p>
        <p><strong>Books: </strong>{props.totalBooks}</p>

      </div>}
    </>
  )
}

export default UserInfoPopover
