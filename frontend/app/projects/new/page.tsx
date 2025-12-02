
type Field<T> = {
  name: string;
  label: string;
  type: 'text' | 'number' | 'select';
  value: T;
}

const projectForm: Field<string | number>[] = [
  {
    name: 'title', label: 'Title', type: 'text', value: ''
  },
  {
    name: 'description', label: 'Description', type: 'text', value: ''
  }
]

export default function Project() {
  return (
    <div className="h-full">
      <div className="text-slate-800 text-3xl pb-5">Create Project</div>
      <div className="grid grid-cols-5 text-slate-800">
        <div className="col-start-2 col-span-3 border border-slate-300 rounded-sm bg-white p-4">
          <div>
            asdasd
          </div>

        </div>

      </div>
    </div>
  );
}