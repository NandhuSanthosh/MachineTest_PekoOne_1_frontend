import Image from "next/image";
import Sidebar from "./components/Sidebar";
import ChatSession from "./components/ChatSession";
import MessageSession from "./components/MessageSession";
import { IsProtected } from "./components/Routing";

export default function Home() {
  return (
    <IsProtected>
      <div className="bg-gray-200 h-lvh md:p-10">
          <div className="flex flex-col md:flex-row h-full md:gap-3">
              <Sidebar />

              <ChatSession />
              <MessageSession />
          </div>
      </div>
    </IsProtected>
  );
}
