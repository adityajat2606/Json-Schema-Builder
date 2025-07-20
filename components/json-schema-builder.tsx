"use client"

import { useState } from "react"
import { SchemaField } from "./schema-field"
import { JsonPreview } from "./json-preview"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export type FieldType = "string" | "number" | "nested" | "objectId" | "float" | "boolean"

export interface SchemaFieldData {
  id: string
  name: string
  type: FieldType
  enabled: boolean
  children?: SchemaFieldData[]
}

export function JsonSchemaBuilder() {
  const [fields, setFields] = useState<SchemaFieldData[]>([
    {
      id: "1",
      name: "name",
      type: "string",
      enabled: true,
    },
  ])

  const addField = () => {
    const newField: SchemaFieldData = {
      id: Date.now().toString(),
      name: "",
      type: "string",
      enabled: true,
    }
    setFields([...fields, newField])
  }

  const updateField = (id: string, updatedField: SchemaFieldData) => {
    const updateFieldRecursive = (fieldList: SchemaFieldData[]): SchemaFieldData[] => {
      return fieldList.map((field) => {
        if (field.id === id) {
          return updatedField
        }
        if (field.children) {
          return {
            ...field,
            children: updateFieldRecursive(field.children),
          }
        }
        return field
      })
    }
    setFields(updateFieldRecursive(fields))
  }

  const removeField = (id: string) => {
    const removeFieldRecursive = (fieldList: SchemaFieldData[]): SchemaFieldData[] => {
      return fieldList.filter((field) => {
        if (field.id === id) {
          return false
        }
        if (field.children) {
          field.children = removeFieldRecursive(field.children)
        }
        return true
      })
    }
    setFields(removeFieldRecursive(fields))
  }

  const addNestedField = (parentId: string) => {
    const newField: SchemaFieldData = {
      id: Date.now().toString(),
      name: "",
      type: "string",
      enabled: true,
    }

    const addToParent = (fieldList: SchemaFieldData[]): SchemaFieldData[] => {
      return fieldList.map((field) => {
        if (field.id === parentId) {
          return {
            ...field,
            children: [...(field.children || []), newField],
          }
        }
        if (field.children) {
          return {
            ...field,
            children: addToParent(field.children),
          }
        }
        return field
      })
    }
    setFields(addToParent(fields))
  }

  return (
    <div className="flex gap-8">
      <div className="flex-1 space-y-4">
        {fields.map((field) => (
          <SchemaField
            key={field.id}
            field={field}
            onUpdate={updateField}
            onRemove={removeField}
            onAddNested={addNestedField}
            level={0}
          />
        ))}

        <Button onClick={addField} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>

        <Button variant="outline" className="mt-8 px-6 bg-transparent">
          Submit
        </Button>
      </div>

      <div className="w-96">
        <JsonPreview fields={fields} />
      </div>
    </div>
  )
}
