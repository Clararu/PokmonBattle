import "../App.css";

function PokeCard() {
  return (
    <>
    <div className="flex flex-row items-center justify-center h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
        {/* Image */}
        <div className="card w-128 bg-base-100 m-5 justify-center shadow-xl">
          <img class="absolute w-full ml-20 mb-80" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png">
          </img>
          <br/>
          <br/>
          <br/>
          <br/>
          {/* Stats */}
          <div className="card-body">
            <div className="flex flex-col my-30 items-normal">
            <br/>
            <br/>
            <br/>
                <p className="card-title pt-10 text-4xl">{'Pokemon_name'}</p>
                <br/>
                <div className="badge text-white text-xl p-5 bg-gray-800">{'Pokemon_type'}</div>
                <br/>
              <div className="flex flex-row justify-between">
                <div className="flex flex-col items-end">
                  <div className="flex flex-row ">
                    <p className="card-title text-gray-600 text-2xl font-semibold">{'HP'}&nbsp;</p>
                    <p className="card-title text-4xl pb-1 font-semibold font-mono text-green-400">{'100'}&nbsp;</p>
                  </div>
                  <div className="flex flex-row">
                    <p className="card-title text-gray-600 text-2xl font-semibold">{'Attack'}&nbsp;</p>
                    <p className="card-title text-4xl pb-1 font-semibold font-mono  text-red-400">{'100'}&nbsp;</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex flex-row">
                    <p className="card-title text-gray-600 text-2xl font-semibold">{'Defense'}&nbsp;</p>
                    <p className="card-title text-4xl pb-1 font-semibold font-mono text-blue-400">{'100'}&nbsp;</p>
                  </div>
                  <div className="flex flex-row">
                    <p className="card-title text-gray-600 text-2xl font-semibold">{'Speed'}&nbsp;</p>
                    <p className="card-title text-4xl pb-1 font-semibold font-mono  text-yellow-400">{'100'}&nbsp;</p>
                  </div>
                 </div> 
              </div>
            </div>
          </div>
        </div>
 

        <div className="card bg-base-100 m-5 p-10 justify-center border-6 border-slate-600 shadow-2xl">

          <div className="flex flex-col">
              {/* Image */}
              <div>
                <img className=" bg-slate-300 rounded-xl" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png">
                </img>
              </div>
            {/* Stats */}
            <div className=" card-body items-end">
              <div className="flex flex-col items-end">
              <br/>
                  <p className="card-title text-4xl">{'Pokemon_name'}</p>
                  <br/>
                  <div className="badge text-white text-xl p-5 bg-gray-800">{'Pokemon_type'}</div>
                  <br/>
                <div className="flex flex-row justify-between">
                  <div className="flex flex-col items-end">
                    <div className="flex flex-row ">
                      <p className="card-title text-gray-600 text-2xl font-semibold">{'HP'}&nbsp;</p>
                      <p className="card-title text-4xl pb-1 font-semibold font-mono text-green-400">{'100'}&nbsp;</p>
                    </div>
                    <div className="flex flex-row">
                      <p className="card-title text-gray-600 text-2xl font-semibold">{'Attack'}&nbsp;</p>
                      <p className="card-title text-4xl pb-1 font-semibold font-mono  text-red-400">{'100'}&nbsp;</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex flex-row">
                      <p className="card-title text-gray-600 text-2xl font-semibold">{'Defense'}&nbsp;</p>
                      <p className="card-title text-4xl pb-1 font-semibold font-mono text-blue-400">{'100'}&nbsp;</p>
                    </div>
                    <div className="flex flex-row">
                      <p className="card-title text-gray-600 text-2xl font-semibold">{'Speed'}&nbsp;</p>
                      <p className="card-title text-4xl pb-1 font-semibold font-mono  text-yellow-400">{'100'}&nbsp;</p>
                    </div>
                  </div> 
                  
                </div>
            </div>
            </div>
        </div>
      </div>


        {/* PokeBall */}
        {/* <div className="card w-96 m-5 items-end border-8 bg-red-300 border-gray-700 rounded-full shadow-2xl shadow-slate-700">
          <div className="bg-blue-100 border-8 border-gray-700 rounded-full">
            <img className="flex flex-row object-cover items-end" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"></img>
          </div>
          Stats
          <div className="card-body items-end">
            <div className="flex flex-col my-30 items-end">
                <p className="card-title text-4xl">{'Pokemon_name'}</p>
              <div className="card-actions flex flex-row justify-between">
                <div className="flex flex-row">
                  <p className="card-title text-gray-600 text-2xl font-semibold">{'Attack: '}</p>
                  <p className="card-title text-4xl pb-1 font-semibold font-mono  text-red-400">{'100'}</p>
                </div>
                <div className="flex flex-row">
                  <p className="card-title text-gray-600 text-2xl font-semibold">{'Life: '}</p>
                  <p className="card-title text-4xl pb-1 font-semibold font-mono text-green-400">{'100'}</p>
                </div>
              </div>
              <div className="badge text-white text-xl p-5 bg-black">{'Pokemon_type'}</div>
            </div>
          </div>
        </div> */}



      </div>
    </>
  );
}

export default PokeCard;
