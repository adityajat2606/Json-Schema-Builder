"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { X, Plus } from "lucide-react"
import type { SchemaFieldData, FieldType } from "./json-schema-builder"

interface SchemaFieldProps {
  field: SchemaFieldData
  onUpdate: (id: string, field: SchemaFieldData) => void
  onRemove: (id: string) => void
  onAddNested: (parentId: string) => void
  level: number
}

export function SchemaField({ field, onUpdate, onRemove, onAddNested, level }: SchemaFieldProps) {
  const updateFieldName = (name: string) => {
    onUpdate(field.id, { ...field, name })
  }

  const updateFieldType = (type: FieldType) => {
    const updatedField: SchemaFieldData = { ...field, type }
    if (type === "nested" && !field.children) {
      updatedField.children = []
    } else if (type !== "nested") {
      delete updatedField.children
    }
    onUpdate(field.id, updatedField)
  }

  const updateFieldEnabled = (enabled: boolean) => {
    onUpdate(field.id, { ...field, enabled })
  }

  const handleAddNested = () => {
    onAddNested(field.id)
  }

  const marginLeft = level * 24

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 bg-white p-3 rounded-lg border" style={{ marginLeft: `${marginLeft}px` }}>
        {level > 0 && <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-300 rounded-l-lg" />}

        <Input
          value={field.name}
          onChange={(e) => updateFieldName(e.target.value)}
          placeholder="Field name"
          className="flex-1 min-w-0"
        />

        <Select value={field.type} onValueChange={updateFieldType}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="string">string</SelectItem>
            <SelectItem value="number">number</SelectItem>
            <SelectItem value="nested">nested</SelectItem>
            <SelectItem value="objectId">objectId</SelectItem>
            <SelectItem value="float">float</SelectItem>
            <SelectItem value="boolean">boolean</SelectItem>
          </SelectContent>
        </Select>

        <Switch checked={field.enabled} onCheckedChange={updateFieldEnabled} />

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(field.id)}
          className="p-1 h-8 w-8 text-gray-500 hover:text-red-500"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {field.children &&
        field.children.map((child) => (
          <SchemaField
            key={child.id}
            field={child}
            onUpdate={onUpdate}
            onRemove={onRemove}
            onAddNested={onAddNested}
            level={level + 1}
          />
        ))}

      {field.type === "nested" && (
        <div style={{ marginLeft: `${marginLeft + 24}px` }}>
          <Button onClick={handleAddNested} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>
      )}
    </div>
  )
}
