import {useState, useEffect} from "react";
import {Card, Image, Text, Badge, Button} from "@mantine/core";
import {doc, updateDoc, Timestamp} from "firebase/firestore";
import {db} from "../firebaseConfig";
import * as dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";
import {users} from "../constants/users";

dayjs.extend(relativeTime);

const unsplashBaseUrl =
  "https://source.unsplash.com/600x400?sig=incrementingIdentifier&";

const handleComplete = async (id, status) => {
  const orderRef = doc(db, "orders", id);
  await updateDoc(orderRef, {
    complete: status,
    updated: Timestamp.now(),
  });
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
  const imageSrc = `${unsplashBaseUrl}${type}`;

  // Relative time
  const [timeUpdated, setTimeUpdated] = useState(dayjs().to(updated.toDate()));
  const [timeCreated, setTimeCreated] = useState(dayjs().to(created.toDate()));
  // Update relative time every minute
  useEffect(() => {
    setInterval(() => {
      setTimeUpdated(dayjs().to(updated.toDate()));
      setTimeCreated(dayjs().to(created.toDate()));
    }, 60000);
  });

  useEffect(() => {
    setTimeUpdated(dayjs().to(updated.toDate()));
    setTimeCreated(dayjs().to(created.toDate()));
  }, [complete, created, updated]);

  // Badge color
  const {color} = users.find((user) => user.value === name);

  return (
    <div className="w-full relative">
      {complete && (
        <Badge
          className="top-4 right-4 absolute opacity-50 z-10"
          color="dark"
          variant="light"
        >
          completed {timeUpdated}
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
          <Image src={imageSrc} alt={type} height={200} width={600} />
        </Card.Section>
        {/* CARD CONTENT */}
        <div className="pt-4">
          <div className="flex flex-wrap justify-between gap-2">
            <Badge color="dark" variant="light">
              {type}
            </Badge>
            {/* <Badge color={badgeColors[name]} variant="light"> */}
            <Badge color={color} variant="light">
              {name}
            </Badge>

            <Badge color="gray" variant="light">
              {timeCreated}
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
