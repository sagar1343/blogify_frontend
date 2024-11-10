import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { HiChevronUpDown } from "react-icons/hi2";
import { Gender } from "../types/IGender";

interface Props {
  gender: Gender[];
  selectedGender: string;
  setSelectedGender: (value: string) => void;
}

function GenderSelector({ gender, selectedGender, setSelectedGender }: Props) {
  const selectedGenderName =
    gender.find((g) => g.value === selectedGender)?.name || "Select gender";

  return (
    <div className="sm:grid sm:grid-cols-3 items-center sm:gap-4 sm:px-0">
      <dt className="text-sm font-medium text-gray-900">Gender</dt>
      <dd className="mt-1 col-span-2">
        <Listbox value={selectedGender} onChange={setSelectedGender}>
          <div className="relative">
            <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm">
              <span className="block truncate">{selectedGenderName}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <HiChevronUpDown
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </ListboxButton>
            <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {gender.map((gender) => (
                <ListboxOption
                  key={gender.id}
                  value={gender.value}
                  className="cursor-default hover:bg-primary hover:text-white select-none relative py-2 pl-3 pr-9"
                >
                  <span className="block truncate">{gender.name}</span>
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
