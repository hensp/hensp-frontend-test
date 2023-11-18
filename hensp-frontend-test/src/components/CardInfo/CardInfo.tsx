interface CardInfoProps {
  text: string
  classNameSection: string
  classNameP: string
}
export const CardInfo = ({ text, classNameSection, classNameP }: CardInfoProps): JSX.Element => {
  return (
    <section className={classNameSection}>
        <p className={classNameP}>{text}</p>
    </section>
  )
}
