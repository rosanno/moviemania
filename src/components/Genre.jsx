import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";

const Genre = ({ genres, genre, handleGenre }) => {
  return (
    <div className="w-full max-w-sm">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "" : "text-opacity-90"}
                w-[160px] group inline-flex items-center justify-between rounded-full bg-neutral-800 py-1 px-3 sm:py-1.5 text-sm sm:text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-700 focus-visible:ring-opacity-75`}
            >
              <span className="text-gray-400">Genre</span>
              <ChevronDownIcon
                className={`${open ? "" : "text-opacity-70"}
                  ml-2 h-5 w-5 text-gray-400 transition duration-150 ease-in-out group-hover:text-opacity-80`}
                aria-hidden="true"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm md:max-w-md -translate-x-[190px] xl:-translate-x-[192px] transform px-2 sm:px-0 lg:max-w-lg">
                {({ close }) => (
                  <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="relative grid gap-1 sm:gap-2 grid-cols-2 md:grid-cols-3 bg-neutral-800 px-2 py-3">
                      {genres?.genres?.map((item) => (
                        <div key={item.id}>
                          <button
                            onClick={() => {
                              handleGenre(item.id);
                              close();
                            }}
                            className={`text-sm text-gray-400 hover:bg-slate-700 hover:text-white rounded-full py-1 px-4 transition-colors divide-gray-300 ${
                              genre.includes(item.id)
                                ? "bg-slate-700 text-white"
                                : ""
                            }`}
                          >
                            {item.name}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};

export default Genre;
