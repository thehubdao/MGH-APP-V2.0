import { ReactNode } from "react"

interface OvalButtonProps {
  buttonFunction: Function
  label: string
  icon?: ReactNode
  backgroundColorClass?: string
}

const buyerControl = (buyer: string | undefined) => {
  if (!buyer) return 'anonymous'
  if (buyer.length > 20) {
    buyer = `${buyer.substring(0, 9)}...${buyer.substring(buyer.length - 4, buyer.length)}`
  } return buyer
}

export default function OvalButton({ buttonFunction, label, icon, backgroundColorClass }: OvalButtonProps) {
  return (
    <div
      className={`${backgroundColorClass} flex flex-row px-12 py-3 rounded-2xl nm-flat-soft duration-300 gap-2 cursor-pointer`}
      onClick={() => buttonFunction()}
    >
      {icon && icon}
      <p className="font-bold">{buyerControl(label)}</p>
    </div>
  )
}