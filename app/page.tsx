"use client"

import { JsonSchemaBuilder } from "@/components/json-schema-builder"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <JsonSchemaBuilder />
      </div>
    </div>
  )
}
