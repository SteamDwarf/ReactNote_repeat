import { useParams } from "react-router";
import React from 'react'

function UserInformation() {
    const urlParams = useParams();
    return (
        <div>
            <h1>{`Пользователь id:${urlParams.userId}`}</h1>
        </div>
    )
}

export default UserInformation
