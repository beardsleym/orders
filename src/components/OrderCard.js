import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  AspectRatio,
  useMantineTheme,
} from "@mantine/core";
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
  const theme = useMantineTheme();
  const imageSrc = `${unsplashBaseUrl}${text}&${Math.random()}`;

  return (
    <div className="w-full">
      <Card
        shadow="sm"
        p="lg"
        className={complete ? "bg-slate-700 opacity-30" : "bg-slate-700"}
      >
        <Card.Section>
          {complete && (
            <Badge
              className="top-4 right-4 absolute z-10"
              color="green"
              variant="light"
            >
              complete
            </Badge>
          )}
          <Image src={imageSrc} alt={type} />
        </Card.Section>
        {/* CARD CONTENT */}
        <div className="pt-4">
          <div className="flex justify-between">
            <Badge color="dark" variant="light">
              {type}
            </Badge>
            <Badge color={badgeColors[name]} variant="light">
              {name}
            </Badge>

            <Badge color="dark" variant="light">
              {momentFromNow(created)}
            </Badge>
          </div>

          <Text size="md" className="text-white mt-2 font-weight-normal">
            {text}
          </Text>
          {userName === "isaac" && (
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
