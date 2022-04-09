import {collection, orderBy, query, limit} from "firebase/firestore";
import {useCollectionData} from "react-firebase-hooks/firestore";

import {showNotification} from "@mantine/notifications";
import {LoadingOverlay} from "@mantine/core";
import {ExclamationCircleIcon} from "@heroicons/react/outline";

import OrderCard from "../components/OrderCard";

import {db} from "../services/firebaseConfig";
import {orderDataConverter} from "../services/firestoreDataConverter";

// Firestore query with converter for useCollectionData hook
const Home = ({userName}) => {
  const q = query(
    collection(db, "orders"),
    orderBy("created", "desc"),
    limit(12)
  ).withConverter(orderDataConverter);
  // Fetch data with listener from React-Firebase-Hooks
  const [values, loading, error] = useCollectionData(q);
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
        {values && (
          <>
            {values.map(
              ({id, type, name, text, created, updated, complete}) => (
                <OrderCard
                  key={id}
                  id={id}
                  userName={userName}
                  type={type}
                  name={name}
                  text={text}
                  created={created}
                  updated={updated}
                  complete={complete}
                ></OrderCard>
              )
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Home;
