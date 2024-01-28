"use client"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export default function ToastWithTitle() {
  const { toast } = useToast()

  return (
    <Button
      variant="outline"
      onClick={(evt) => {
        //evt.target.parentNode.textContent 
        //Possible code for copying text content from container or card
        toast({
          title: "Code Copied to Clipboard",
          description: `${evt.target.textContent}`,
        })
      }}
    >
      Show Toast
    </Button>
  )
}
