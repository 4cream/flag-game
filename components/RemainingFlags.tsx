interface RemainingFlagsProps {
  count: number
}

export default function RemainingFlags({ count }: RemainingFlagsProps) {
  return <div className="text-center mb-4">Remaining flags: {count}</div>
}

