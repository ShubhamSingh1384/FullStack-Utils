import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;
    const handleGoogleLogin = () => {
        try {
            setIsLoading(true);
            const googleLoginUrl = `${apiUrl}/auth/google`;
            window.location.href = googleLoginUrl;
        } catch (error) {
            console.error('error login with google', error)
        } finally {
            setIsLoading(false)
        }
    }

    const userData = localStorage.getItem('user')

    useEffect(() => {
        if (userData) {
            navigate('/')
        } else {
            navigate('/login')
        }
    }, [userData])
    return (
        <div className='min-h-screen flex items-center justify-center p-4'>
            <div className='bg-white rounded-xl shadow-2xl overflow-hidden max-w-md w-full'>
                <div className='bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-center'>
                    <h1 className='text-3xl font-bold text-white'>Welcome Back!</h1>
                    <p className='text-blue-100 mt-2'>Sign in to access your account</p>
                </div>

                <div className='p-6'>

                    <div className='mt-6'>
                        <button
                            onClick={handleGoogleLogin}
                            disabled={isLoading}
                            className='w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition'
                        >

                            <div className='mr-2 flex items-center justify-center'>
                                <div className='relative h-5 w-5'>
                                    <div className='absolute inset-0 flex items-center justify-center'>
                                        <span className='flex h-full w-full items-center justify-center rounded-full bg-white'>
                                            <span className='h-3.5 w-3.5 rounded-full border-2 border-t-blue-500 border-r-red-500 border-b-yellow-500 border-l-green-500'>

                                            </span>
                                        </span>

                                    </div>

                                </div>

                            </div>
                            Sign in with Google
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login