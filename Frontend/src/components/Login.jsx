// Importing necessary React hooks and axios library
import { useState, useEffect } from 'react';

function Login (){

  // JSX for the Login component
  return (
    <>
        <div class="flex flex-col h-screen">
            <header class="">  
            </header>

            <main className="flex flex-col justify-center items-center h-full pl-8 bg-[url('./assets/Stadium_outside_1.png')] bg-cover bg-no-repeat">
              <div className="card bg-blue-500 mt-96 px-10 min-w-80 min-h-80 ">
                  <form className="card-body flex flex-col justify-center  border-gray-900">
                    {/* <div className='flex flex-row justify-center'>
                      <div className='text-blue-200 text-2xl'>Login</div>
                    </div> */}
                      <div className='flex flex-col text-2xl'>
                        <label className='text-blue-200 pb-1 text-xl'>Name</label>
                        <input className="bg-blue-100 rounded-md"></input>
                      </div>
                      <div className='flex flex-col text-2xl'>
                        <label className="text-blue-200 pb-1 text-xl">Password</label>
                        <input className="bg-blue-100 rounded-md" type="password"></input>
                      </div>
                      <div className='flex flex-row justify-start pt-2'>
                        <button className='bg-blue-600 text-blue-100 px-2 py-1 rounded-md'>Register</button>
                      </div>
                  </form>
              </div>
            </main>

            {/* <footer className='flex flex-row absolute bottom-0 size-16 pt-2.5'>
              <div >
                <img src="./src/assets/Ash_ketchum.png"></img>
              </div>
            </footer> */}
        </div>
    </>
  );
}

// Export the GameBoard component
export default Login;