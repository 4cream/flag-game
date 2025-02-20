interface RemainingFlagsProps {
  count: number
}

export default function RemainingFlags({ count }: RemainingFlagsProps) {
  return <div className="text-center">Remaining flags: {count}</div>
}

