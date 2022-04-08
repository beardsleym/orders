import { Card, Image, Text, Badge, Button } from "@mantine/core";
import { doc, updateDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";
import * as dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const unsplashBaseUrl = "https://source.unsplash.com/random/600x400/?";

const handleComplete = async (id, status) => {
  const orderRef = doc(db, "orders", id);
  await updateDoc(orderRef, {
    complete: status,
    updated: Timestamp.now(),
  });
};

const momentFromNow = (timestamp) => {
  dayjs.extend(relativeTime);
  if (timestamp) {
    return dayjs().to(timestamp.toDate());
  } else {
    return "";
  }
};

const badgeColors = {
  robyn: "red",
  matthew: "blue",
  cannelle: "yellow",
  roger: "teal",
  olivia: "pink",
  isaac: "green",
};

const OrderCard = ({
  type,
  text,
  name,
  userName,
  complete,
  id,
  created,
  updated,
}) => {
  const imageSrc = `${unsplashBaseUrl}${type}&${Math.random()}`;

  return (
    <div className="w-full relative">
      {complete && (
        <Badge
          className="top-4 right-4 absolute opacity-50 z-10"
          color="dark"
          variant="light"
        >
          completed {momentFromNow(updated)}
        </Badge>
      )}
      <Card
        shadow="sm"
        p="lg"
        className={
          complete ? "bg-slate-700 opacity-30 h-full" : "bg-slate-700 h-full"
        }
      >
        <Card.Section>
          <Image src={imageSrc} alt={type} />
        </Card.Section>
        {/* CARD CONTENT */}
        <div className="pt-4">
          <div className="flex flex-wrap justify-between gap-2">
            <Badge color="dark" variant="light">
              {type}
            </Badge>
            <Badge color={badgeColors[name]} variant="light">
              {name}
            </Badge>

            <Badge color="gray" variant="light">
              {momentFromNow(created)}
            </Badge>
          </div>

          <Text size="md" className="text-white mt-2 font-semibold">
            {text}
          </Text>
          {(userName === name || userName === "isaac") && (
            <Button
              className={
                complete
                  ? "bg-gray-400 hover:bg-gray-500 mt-4 text-white w-full"
                  : "bg-blue-400 hover:bg-blue-500 mt-4 text-white w-full"
              }
              onClick={() => {
                handleComplete(id, !complete);
              }}
            >
              {complete ? "Completed: ↩️ Undo?" : "Mark as complete"}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default OrderCard;
