
export default function Title({title,style}) {
    return (
        <div className={`${style}`}>
            <h1 className="lg:text-[30px] text-[24px] font-extrabold">
                {title}
            </h1>
        </div>
    )
}
