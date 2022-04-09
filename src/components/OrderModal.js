import {useState} from "react";
import {addDoc, collection, Timestamp} from "firebase/firestore";

import {Modal, Button, Group, Textarea, Select} from "@mantine/core";

import {db} from "../services/firebaseConfig";
import {categories} from "../constants/categories";

function OrderModal({name}) {
  const [opened, setOpened] = useState(false);
  const [type, setType] = useState("");
  const [text, setText] = useState("");

  const addOrder = async (type, text, name) => {
    await addDoc(collection(db, "orders"), {
      type,
      text,
      name,
      complete: false,
      created: Timestamp.now(),
      updated: Timestamp.now(),
    });
  };

  const handleOrder = () => {
    addOrder(type, text, name);
    setOpened(false);
  };

  return (
    <>
      <Modal
        className="w-full"
        title="New order"
        opened={opened}
        onClose={() => setOpened(false)}
      >
        {/* Modal content */}
        <Select
          label="Category"
          placeholder="Pick one"
          value={type}
          onChange={setType}
          data={categories}
        />
        <Textarea
          label="Your order"
          value={text}
          onChange={(event) => setText(event.currentTarget.value)}
        />
        <Button className="bg-pink-500 mt-2" onClick={handleOrder}>
          ⏲️ Send to the kitchen
        </Button>
      </Modal>

      <Group position="center">
        <Button className="bg-pink-500 my-3" onClick={() => setOpened(true)}>
          😷 New Order
        </Button>
      </Group>
    </>
  );
}

export default OrderModal;
