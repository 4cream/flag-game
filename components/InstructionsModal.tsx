import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

interface InstructionsModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function InstructionsModal({ isOpen, onClose }: InstructionsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4">How to Play</h2>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li>Choose between Normal (4 flags) or Hard (6 flags) mode</li>
              <li>Scratch the cards to reveal the flags</li>
              <li>Type the name of the country for each flag</li>
              <li>Use hints if you're stuck (only in Normal mode)</li>
              <li>Submit your answers to see your score</li>
              <li>In Hard mode, you have 3 minutes to guess all flags</li>
              <li>Earn achievements and improve your stats!</li>
            </ul>
            <Button onClick={onClose} className="w-full">
              Got it!
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

