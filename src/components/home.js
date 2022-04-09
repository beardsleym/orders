import {useCollection} from "react-firebase-hooks/firestore";
import {db} from "../firebaseConfig";
import {collection, orderBy, query, limit} from "firebase/firestore";
import OrderCard from "./OrderCard";
import {LoadingOverlay} from "@mantine/core";
import {ExclamationCircleIcon} from "@heroicons/react/outline";
import {showNotification} from "@mantine/notifications";

const Home = ({userName}) => {
  const q = query(
    collection(db, "orders"),
    orderBy("created", "desc"),
    limit(12)
  );
  // Fetch data with listener from React-Firebase-Hooks
  const [value, loading, error] = useCollection(q);
  // Show error notication from Mantine-Notifications
  if (error) {
    showNotification({
      autoClose: 5000,
      title: error?.code,
      message: error?.message,
      color: "pink",
      icon: <ExclamationCircleIcon className="fill-pink-600 outline-0" />,
      loading: false,
    });
  }

  return (
    <>
      {/* Loading */}
      {loading && (
        <LoadingOverlay
          visible={loading}
          loaderProps={{size: "lg", color: "pink"}}
          overlayOpacity={0.3}
          overlayColor="#c5c5c5"
        />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {value && (
          <>
            {value.docs.map((doc) => (
              <OrderCard
                key={doc.id}
                id={doc.id}
                userName={userName}
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
    </>
  );
};

export default Home;
