"use client"

import * as React from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

interface PackageTabsProps {
  commands: {
    npm?: string
    pnpm?: string
    yarn?: string
    bun?: string
  }
  className?: string
}

export function PackageTabs({ commands, className }: PackageTabsProps) {
  const [activeTab, setActiveTab] = React.useState<string>("npm")
  const [copied, setCopied] = React.useState<Record<string, boolean>>({
    npm: false,
    pnpm: false,
    yarn: false,
    bun: false,
  })

  const copyToClipboard = (text: string, packageManager: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopied({ ...copied, [packageManager]: true })
        setTimeout(() => {
          setCopied({ ...copied, [packageManager]: false })
        }, 2000)
      },
      (err) => {
        console.error("Could not copy text: ", err)
      }
    )
  }

  const packageManagers = Object.keys(commands).filter(
    (key) => commands[key as keyof typeof commands]
  )

  if (packageManagers.length === 0) return null

  return (
    <div className={cn("my-4", className)}>
      <Tabs
        defaultValue={packageManagers[0]}
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="w-full grid grid-cols-4 mb-0">
          {packageManagers.map((packageManager) => (
            <TabsTrigger
              key={packageManager}
              value={packageManager}
              className="text-sm"
              disabled={!commands[packageManager as keyof typeof commands]}
            >
              {packageManager}
            </TabsTrigger>
          ))}
        </TabsList>
        {packageManagers.map((packageManager) => (
          <TabsContent
            key={packageManager}
            value={packageManager}
            className="p-0 mt-0"
          >
            <div className="relative">
              <pre className="rounded-md bg-muted text-sm mt-2 p-4 overflow-x-auto">
                <code>{commands[packageManager as keyof typeof commands]}</code>
              </pre>
              <button
                className="absolute right-4 top-4 p-1 rounded-md text-muted-foreground hover:bg-muted-foreground/10"
                onClick={() => 
                  copyToClipboard(
                    commands[packageManager as keyof typeof commands] || "", 
                    packageManager
                  )
                }
              >
                {copied[packageManager] ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
