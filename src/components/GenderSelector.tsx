import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { useState } from "react";
import { HiChevronUpDown } from "react-icons/hi2";

const genders = [
  { id: "male", name: "Male", value: "M" },
  { id: "female", name: "Female", value: "F" },
  { id: "other", name: "Other", value: "O" },
];
function GenderSelector() {
  const [selectedGender, setSelectedGender] = useState(genders[0]);
  return (
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm/6 font-medium text-gray-900">Gender</dt>
      <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
        <Listbox value={selectedGender} onChange={setSelectedGender}>
          <div className="relative">
            <ListboxButton className="relative w-32 cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm">
              <span className="block truncate">{selectedGender.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <HiChevronUpDown
                  aria-hidden="true"
                  className="h-5 w-5 text-gray-400"
                />
              </span>
            </ListboxButton>
            <ListboxOptions
              transition
              className="absolute z-10 mt-1 max-h-56 w-32 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
              {genders.map((gender) => (
                <ListboxOption
                  key={gender.id}
                  value={gender}
                  className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-primary data-[focus]:text-white"
                >
                  <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                    {gender.name}
                  </span>
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        </Listbox>
      </dd>
    </div>
  );
}

export default GenderSelector;
