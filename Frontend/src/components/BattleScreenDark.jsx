function BattleScreenDark() {
  return (
        <>
            <div class="flex flex-col h-screen">
                {/* You can open the modal using document.getElementById('ID').showModal() method */}
                <button className="btn" onClick={()=>document.getElementById('my_modal_5').showModal()}>Open BattleScreen Dark</button>
                <dialog id="my_modal_5" className="modal">
                    <div className="modal-box h-full min-w-full bg-black opacity-75 justify-center">
                        {/* Window bar */}
                        <div className="flex flex-row justify-between -top-py-5">
                            {/* close button */}
                            <h3 className="p-4 font-bold text-5xl ">BattleScreen</h3>
                            <form className="p-2" method="dialog">
                                <button>
                                    <div className="flex flex-col justify-center items-center w-20 h-20 hrounded-full transition-transform transform hover:scale-110">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="size-16">
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

export default BattleScreenDark;

