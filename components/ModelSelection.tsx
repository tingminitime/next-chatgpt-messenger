'use client'
import useSWR from 'swr'
import Select from 'react-select'

function fetchModels() {
  return fetch(`/api/getEngines`).then(res => res.json())
}

function ModelSelection() {
  const { data: models, isLoading } = useSWR(`models`, fetchModels)
  const { data: model, mutate: setModel } = useSWR('model', {
    fallbackData: 'text-devinci-003',
  })

  return (
    <div>
      <Select
        className="mt-2"
        classNames={{
          control: state => `bg-my-black-light border-my-black-light`,
        }}
        isSearchable
        isLoading={isLoading}
        menuPosition="fixed"
        defaultValue={model}
        placeholder={model}
        options={models?.modelOptions}
        onChange={e => setModel(e.value)}
      ></Select>
    </div>
  )
}
export default ModelSelection
