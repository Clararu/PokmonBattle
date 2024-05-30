function PokemonOverview() {
    const { id } = useParams();
    const { entries } = useFetchData();
    const apiDetails = {};
    {
      entries.map((entry) => {
        if (entry.id === Number(id)) {
          apiDetails.title = entry.title;
          apiDetails.description = entry.description;
          apiDetails.url = entry.file.url;
          apiDetails.category = entry.category;
          apiDetails.popularity = entry.popularity;
          apiDetails.usage = entry.usage;
          apiDetails.author = entry.developer;
        }
      });
    }
  
    const { getEmoji, getTextColor } = useEmoji(apiDetails.popularity);
    return (
      <>
        <div className="flex mx-auto justify-center m-5">
          
          <div className="block w-4/5 bg-slate-700 border border-slate-700 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
  
            {/* Window bar */}
            <div className="flex flex-row justify-end p-3 mb-2 font-semibold text-slate-400 ">
  
             {/* Close button */}
            <div className="p-2">
            <Link to={"/"}>
              <button
                id="close-menu"
                onClick={() => setShow(!show)}
                type="button"
                data-drawer-hide="drawer-navigation"
                aria-controls="drawer-navigation"
                class="bg-slate-500 text-gray-800 hover:bg-slate-300 hover:text-slate-800 focus:bg-slate-600 rounded-lg text-sm w-8 h-8 top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
              <path
                stroke="currentColor"
                stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              </button>
              </Link>
  
            </div>
            
            </div>
            {/* Window padding */}
            <div className="p-1">
  
            {/* Window body */}
            <div>
  
            <div className="flex flex-col">
  
             {/* Headline + Icon  */}
            <div className="flex items-end p-8 pt-2 pb-3">
              <img
                className="h-20"
                src={apiDetails.url}
                alt={apiDetails.title}
              />
  
              <div>
                <h6 className="pl-2 leading-5 text-3xl pb-2 font-bold tracking-tight text-slate-300">
                    {apiDetails.title}
                </h6>
                <p className="pl-2 pb-0 font-normal text-slate-300 dark:text-gray-400 ">
                    by {apiDetails.author}
                </p>
              </div>
              {/* Category + Rating  */}  
              <div className="pl-6 -my-1">
                  <p className="font-normal text-slate-300 dark:text-gray-400">
                    Category: {apiDetails.category}
                  </p>
                  <p className="font-normal text-slate-300 dark:text-gray-400">
                    Rating: {apiDetails.popularity}
                    <img src={getEmoji()} alt="" />
                  </p>
              </div>
              </div>
  
            </div>
            <hr className="w-10rem h-0.5 mx-auto md:my-3 bg-gray-100 border-0 rounded dark:bg-gray-700" />
            <div className="px-10 py-1 pb-3">
              <div className="flex flex-col">
                <h2 className="pb-2 text-slate-200 text-xl font-semibold">Description</h2>
                <p className="pb-6 font-normal  text-md text-slate-300 dark:text-gray-400">
                  {apiDetails.description}
                </p>
                <h2 className="py-4 text-slate-200 text-xl font-semibold">Usage with Axios</h2>
                {apiDetails.usage ? (
                  <CodeMirror
                    value={apiDetails.usage}
                    extensions={[langs.jsx()]}
                    theme={darcula}
                    maxWidth="50rem"
                    minWidth="50rem"
                  />
                ) : (
                  <p className="w-3/4 p-5 font-normal text-slate-300 dark:text-gray-400 text-lg">
                    not available
                  </p>
                )}
              </div>
            </div>
            <hr className="w-10rem h-0.5 mx-auto md:my-3  bg-gray-500 border-0  rounded dark:bg-gray-700" />
            <div>
              <ApiSuggestions category={apiDetails.category} />
            </div>
            <div className="flex justify-end">
              {/* <Link to={"/"}>
                <button className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  back
                </button>
              </Link> */}
            </div>
          </div>
        </div>
        </div>
        </div>
      </>
    );
  }
  
  export default PokemonOverview;
  