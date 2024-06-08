// Importing necessary React hooks and axios library
import { useState, useEffect } from 'react';

function Login (){

  // JSX for the Login component
  return (
    <>
        <div class="flex flex-col h-screen">
            <header class="">  
            </header>

            <main className="flex flex-col items-center h-full bg-[url('./assets/Stadium_outside_1.png')] bg-cover bg-no-repeat">
              <div>Login
                <form>
                  <label>Name</label>
                  <input type="password"></input>
                  <br/>
                  <label>Name</label>
                  <input type="password"></input>
                  <br/>
                </form>
              </div>
            </main>

            <footer>

            </footer>
        </div>
    </>
  );
}

// Export the GameBoard component
export default Login;