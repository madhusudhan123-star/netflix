import React from 'react'
import {Link} from "react-router-dom"
import image from "../../utils/signup_start.png"


const Signup_start = () => {
  return (
    <div>
        <nav className="flex items-center justify-between px-8 py-4 bg-transparent">
            <div>
            <Link to="/">
                <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                alt="Netflix Logo"
                width={120}
                height={40}
                />
            </Link>
            </div>
            <div>
            <button style={{ "background-color": "red" }} className="btn btn-primary px-3 py-1 rounded-md"><Link to="/login">Sign In</Link></button>
            </div>
        </nav>
        <div className='flex flex-col justify-center items-center mt-20'>
            <div>
                <img src={image} alt="signup" />
            </div>
            <div className='flex flex-col items-center'>
                <p className='text-sm'>STEP 1 OF 4</p>
                <h1 className='text-2xl font-extrabold'>Finish setting up your account</h1>
                <p className='w-1/2'>Netflix is personalised for you. Create a password to watch on any device at any time.</p>
                <button style={{ "background-color": "red" }} className="btn py-2 px-8 text-xl text-white rounded">
                    <Link to="/home/signup">
                    Next
                    </Link>
                </button>
            </div>
        </div>
    </div>
  )
}

export default Signup_start