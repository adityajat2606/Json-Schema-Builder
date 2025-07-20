"use client"
import { useForm, useFieldArray } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { SchemaField } from "./schema-field"
import { JsonPreview } from "./json-preview"

export type FieldType = "string" | "number" | "nested"

export interface SchemaFieldData {
  id: string
  name: string
  type: FieldType
  children?: SchemaFieldData[]
}

interface FormData {
  fields: SchemaFieldData[]
}

export function SchemaBuilder() {
  const { control, watch, setValue } = useForm<FormData>({
    defaultValues: {
      fields: [
        {
          id: "1",
          name: "field1",
          type: "string",
        },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "fields",
  })

  const watchedFields = watch("fields")

  const addField = () => {
    const newField: SchemaFieldData = {
      id: Date.now().toString(),
      name: `field${fields.length + 1}`,
      type: "string",
    }
    append(newField)
  }

  const updateField = (index: number, updatedField: SchemaFieldData) => {
    setValue(`fields.${index}`, updatedField)
  }

  const removeField = (index: number) => {
    remove(index)
  }

  return (
    <div className="w-full">
      <Tabs defaultValue="builder" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="builder">Schema Builder</TabsTrigger>
          <TabsTrigger value="preview">JSON Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="builder" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Schema Fields
                <Button onClick={addField} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Field
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {fields.map((field, index) => (
                <SchemaField
                  key={field.id}
                  field={field}
                  onUpdate={(updatedField) => updateField(index, updatedField)}
                  onRemove={() => removeField(index)}
                  canRemove={fields.length > 1}
                />
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview">
          <JsonPreview fields={watchedFields} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
