import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function Rules() {
  return (
    <Accordion type="single" collapsible className="mt-8">
      <AccordionItem value="rules">
        <AccordionTrigger>Game Rules</AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc pl-5">
            <li>Normal mode: Guess 4 flags</li>
            <li>Hard mode: Guess 6 flags within 3 minutes</li>
            <li>Scratch to reveal the flag</li>
            <li>Use hints if you're stuck</li>
            <li>Submit your answers to see your score</li>
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

