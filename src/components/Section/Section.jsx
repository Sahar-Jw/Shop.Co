
export default function Section({children,style}) {
    return (
        <section className={`${style}`}>
            {children}
        </section>
    )
}
