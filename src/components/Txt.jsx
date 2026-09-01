export default function Txt({ texto }) {
  const partes = texto.split(/\*(.+?)\*/g)
  return (
    <>
      {partes.map((parte, i) =>
        i % 2 ? (
          <span key={i} className="hl">
            {parte}
          </span>
        ) : (
          <span key={i}>{parte}</span>
        ),
      )}
    </>
  )
}
