import {Fragment} from "react";
import {Loader, Select} from "@mantine/core";
import {useCollection} from "react-firebase-hooks/firestore";
import {db} from "./firebaseConfig";
import {collection, orderBy, query, limit} from "firebase/firestore";
import {useLocalStorage} from "@mantine/hooks";
import OrderCard from "./components/OrderCard";
import OrderModal from "./components/OrderModal";

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
                <Select
                    className="w-28 bg-slate-700 text-white"
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
                />
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
