"use client";

import MultiSelect from "@components/Multiselect";
import { useState } from "react";

export default function Project() {

  type User = { id: string; name: string };

  type FieldBase = { name: string; label: string };

  type TextField = FieldBase & { type: 'text' | 'number'; value: string | number };
  type SelectField = FieldBase & { type: 'select'; value: User[] };

  type Field = TextField | SelectField;

  type FormData = {
    title: string;
    description: string;
    users: string[];
  };

  const userOptions = [
    { value: "1", label: "User 1" },
    { value: "2", label: "User 2" },
    { value: "3", label: "User 3" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const projectForm: Field[] = [
    { name: 'title', label: 'Title', type: 'text', value: '' },
    { name: 'description', label: 'Description', type: 'text', value: '' },
    { name: 'users', label: 'Users', type: 'select', value: [] },
  ];


  const [users, setUsers] = useState<string[]>([]);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    users: [],
  });

  const canSave: () => boolean = () => {
    if (formData.title.trim() === '')
      return false
    if (formData.description.trim() === '')
      return false
    return true
  }

  return (
    <div className="h-full">
      <div className="text-slate-800 text-3xl pb-5">Create Project</div>
      <div className="grid grid-cols-5 text-slate-800">
        <div className="col-start-2 col-span-3 ">
          <div className="border border-slate-300 rounded-sm bg-white p-4">

            {projectForm.map((field, i) => {
              return (
                <div key={i} className="py-2">
                  <p className="text-lg pb-2">{field.label}</p>
                  {field.type === 'select' ?
                    <MultiSelect
                      options={userOptions}
                      value={formData.users}
                      onChange={(value) => setFormData((prev) => ({ ...prev, users: value }))}
                    />
                    :
                    <input
                      onChange={handleInputChange}
                      type={field.type}
                      name={field.name}
                      id={`${field.name}-${i}`}
                      value={formData[field.name as keyof FormData] as string}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                    />
                  }
                </div>
              )
            })}
            <div>
            </div>
          </div>
          <button disabled={!canSave()} className={`${canSave() === true ? "cursor-pointer" : "opacity-50"} float-end border border-gray-300 bg-blue-500 text-white px-5  py-2 mt-2 rounded-sm`}>Save</button>

        </div>

      </div>
    </div>
  );
}