import { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

function ProgressModal({
    foundWords,
    validWords,
    inputRef
}) {
    let [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false)
    }
    
    function openModal() {
        setIsOpen(true)
    }


    return (
        <>
            <div className="mt-2">
                <button
                    type="button"
                    onClick={openModal}
                    className="text-gray-300 hover:text-gray-500"
                    onFocus={() => inputRef.current.focus()}
                >
                    Reveal Answers
                </button>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal} initialFocus={inputRef}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title
                            as="h3"
                            className="text-xl font-bold leading-6 text-gray-900 mb-2"
                        >
                            Word List
                        </Dialog.Title>
                        <div className="mt-4 grid grid-cols-4 gap-1">
                            {Array.from(validWords).map((word) => {
                                return (<p key={word} className='text-gray-700 capitalize'>
                                    {word}
                                    {foundWords.includes(word) && <span className='ml-1 font-bold text-yellow-400'>✓</span>}
                                </p>)
                            })}
                        </div>
                        </Dialog.Panel>
                    </Transition.Child>
                    </div>
                </div>
                </Dialog>
            </Transition>
        </>
    );
}

export default ProgressModal;
