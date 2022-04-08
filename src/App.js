import {Fragment} from "react";
import {Loader, Select} from "@mantine/core";
import {useCollection} from "react-firebase-hooks/firestore";
import {db} from "./firebaseConfig";
import {collection, orderBy, query, limit} from "firebase/firestore";
import {useLocalStorage} from "@mantine/hooks";
import OrderCard from "./components/OrderCard";
import OrderModal from "./components/OrderModal";
import {Listbox, Transition} from "@headlessui/react";
import {CheckIcon, SelectorIcon} from "@heroicons/react/outline";

const people = [
    {value: "cannelle", label: "Cannelle"},
    {value: "isaac", label: "Isaac"},
    {value: "matt", label: "Matt"},
    {value: "olivia", label: "Olivia"},
    {value: "robyn", label: "Robyn"},
    {value: "roger", label: "Roger"},
];

function App() {
    const q = query(
        collection(db, "orders"),
        orderBy("created", "desc"),
        limit(12)
    );
    const [value, loading, error] = useCollection(q);
    const [name, setName] = useLocalStorage({
        key: "name",
        defaultValue: "",
    });
    return (
        <div className=" h-full min-h-screen bg-slate-900 p-4">
            <div className="flex justify-between items-center mb-4">
                {name && <OrderModal name={name} />}

                {error && (
                    <span className="text-white">
                        Error: {JSON.stringify(error)}
                    </span>
                )}
                {loading && <Loader />}
                {/* <Select
                    className="w-28 "
                    placeholder="Your name"
                    value={name}
                    onChange={setName}
                    data={[
                        {value: "cannelle", label: "Cannelle"},
                        {value: "isaac", label: "Isaac"},
                        {value: "matt", label: "Matt"},
                        {value: "olivia", label: "Olivia"},
                        {value: "robyn", label: "Robyn"},
                        {value: "roger", label: "Roger"},
                    ]}
                /> */}
                {/* Name selector */}
                <div className="w-36 z-20">
                    <Listbox value={name} onChange={setName}>
                        <div className="relative mt-1">
                            <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-slate-700 rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                                <span className="block truncate text-white text-center">
                                    {name
                                        ? name.toLocaleUpperCase()
                                        : "Select name"}
                                </span>
                                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                    <SelectorIcon
                                        className="w-5 h-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </span>
                            </Listbox.Button>
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {people.map((person, personIdx) => (
                                        <Listbox.Option
                                            key={personIdx}
                                            className={({active}) =>
                                                `cursor-default select-none relative py-2 pl-10 pr-4 ${
                                                    active
                                                        ? "text-pink-900 bg-pink-100"
                                                        : "text-slate-900"
                                                }`
                                            }
                                            value={person.value}
                                        >
                                            {({selected}) => (
                                                <>
                                                    <span
                                                        className={`block truncate ${
                                                            selected
                                                                ? "font-medium"
                                                                : "font-normal"
                                                        }`}
                                                    >
                                                        {person.label}
                                                    </span>
                                                    {selected ? (
                                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                            <CheckIcon
                                                                className="w-5 h-5"
                                                                aria-hidden="true"
                                                            />
                                                        </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </Listbox>
                </div>
            </div>
            {/* Content */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {value && (
                    <>
                        {value.docs.map((doc) => (
                            <OrderCard
                                key={doc.id}
                                id={doc.id}
                                userName={name}
                                type={doc.data().type}
                                name={doc.data().name}
                                text={doc.data().text}
                                created={doc.data().created}
                                updated={doc.data().updated}
                                complete={doc.data().complete}
                            ></OrderCard>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}

export default App;
