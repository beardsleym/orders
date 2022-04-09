import {useLocalStorage} from "@mantine/hooks";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import {NotificationsProvider} from "@mantine/notifications";

function App() {
  const [userName, setuserName] = useLocalStorage({
    key: "userName",
    defaultValue: "",
  });
  return (
    <div className=" h-full min-h-screen bg-slate-900 p-4">
      {/* Mantine Notifications */}
      <NotificationsProvider>
        <Navbar setName={setuserName} name={userName} />
        {/* Content */}
        <Home userName={userName} />
      </NotificationsProvider>
    </div>
  );
}

export default App;
