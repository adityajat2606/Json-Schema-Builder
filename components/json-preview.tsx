"use client"

import type { SchemaFieldData } from "./json-schema-builder"

interface JsonPreviewProps {
  fields: SchemaFieldData[]
}

export function JsonPreview({ fields }: JsonPreviewProps) {
  const generateJsonSchema = (fields: SchemaFieldData[]): Record<string, any> => {
    const schema: Record<string, any> = {}

    fields.forEach((field) => {
      if (!field.enabled || !field.name.trim()) return

      if (field.type === "string") {
        schema[field.name] = "STRING"
      } else if (field.type === "number") {
        schema[field.name] = "number"
      } else if (field.type === "float") {
        schema[field.name] = "float"
      } else if (field.type === "boolean") {
        schema[field.name] = "boolean"
      } else if (field.type === "objectId") {
        schema[field.name] = "objectId"
      } else if (field.type === "nested" && field.children) {
        const nestedSchema = generateJsonSchema(field.children)
        schema[field.name] = Object.keys(nestedSchema).length > 0 ? nestedSchema : {}
      }
    })

    return schema
  }

  const jsonSchema = generateJsonSchema(fields)
  const jsonString = JSON.stringify(jsonSchema, null, 2)

  return (
    <div className="bg-white p-4 rounded-lg border h-fit">
      <div className="text-gray-600 mb-2 font-mono text-sm">JSON Preview</div>
      <pre className="text-sm font-mono text-gray-800 whitespace-pre-wrap">{jsonString}</pre>
    </div>
  )
}
