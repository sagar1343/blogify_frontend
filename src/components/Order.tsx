import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { FaCheck } from "react-icons/fa";
import { HiChevronUpDown } from "react-icons/hi2";
import { useBlog } from "../context/BlogContext";

enum Label {
  DEFAULT = "Default",
  LATEST = "Latest",
  TITLE = "Title",
  VIEWS = "Views",
  OLDEST = "Oldest",
}

interface OrderOption {
  label: Label;
  order: string;
}

const orderOptions: OrderOption[] = [
  { label: Label.DEFAULT, order: "" },
  { label: Label.LATEST, order: "-date" },
  { label: Label.TITLE, order: "title" },
  { label: Label.VIEWS, order: "-read_by" },
  { label: Label.OLDEST, order: "date" },
];

function Order() {
  const { filters, setFilters } = useBlog();
  const order = filters.ordering;

  const updateOrdering = (orderValue: string) => {
    setFilters((prev) => ({ ...prev, ordering: orderValue }));
  };

  const selectedLabel =
    orderOptions.find((item) => item.order === order)?.label || "Default";

  return (
    <Listbox
      value={order}
      onChange={(value) =>
        updateOrdering(
          orderOptions.find((item) => item.label === value)?.order || ""
        )
      }
    >
      <div className="relative w-32">
        <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm/6">
          <span className="flex items-center">
            <span className="ml-3 block truncate">{selectedLabel}</span>
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            <HiChevronUpDown className="h-10 w-5 text-gray-400" />
          </span>
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          {orderOptions.map((item) => (
            <ListboxOption
              key={item.order}
              value={item.label}
              className="group cursor-pointer relative select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-primary data-[focus]:text-white"
            >
              <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                {item.label}
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-prbg-primary group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                <FaCheck className="h-2 w-2" />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}

export default Order;
