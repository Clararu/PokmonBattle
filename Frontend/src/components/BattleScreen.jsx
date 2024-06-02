function BattleScreen() {
  return (
        <>
            <div class="flex flex-col h-screen">
                {/* You can open the modal using document.getElementById('ID').showModal() method */}
                <button className="btn" onClick={()=>document.getElementById('my_modal_4').showModal()}>open modal</button>
                <dialog id="my_modal_4" className="modal bg-gray-700">
                    <div className="modal-box h-full min-w-full justify-center opacity border-8 border-slate-900 shadow-2xl transition-transform transform hover:scale-105">
                        {/* Window bar    */}
                        <div className="flex flex-row justify-between -top-py-5">
                            {/* close button */}
                            <h3 className="p-4 font-bold text-5xl ">BattleScreen</h3>
                            <form className="p-2" method="dialog">
                                <button>
                                    <div className="flex flex-col justify-center items-center w-20 h-20 bg-white rounded-full transition-transform transform hover:scale-110">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="size-16">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                        </svg>
                                    </div>
                                </button>
                            </form>

                        </div>
                    </div>   
                </dialog>
            </div>
        </>
    );
}

export default BattleScreen;

