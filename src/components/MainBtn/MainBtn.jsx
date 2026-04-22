import React from 'react'

export default function MainBtn({btn,style}) {
    return (
        <button className={`${style} py-3 rounded-full cursor-pointer bg-black border border-black hover:bg-transparent hover:text-black text-white transition-all delay-100 ease-in`}>
            {btn}
        </button>
    )
}
