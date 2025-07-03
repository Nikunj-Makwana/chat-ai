import Login from '@/Component/Auth/Login'
import AuthLayout from '@/Component/Common/AuthLayout'
import React from 'react'

const login = () => {
    return (
        <AuthLayout>
            <Login />
        </AuthLayout>
    )
}

export default login