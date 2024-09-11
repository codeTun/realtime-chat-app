import { FC } from "react";
import AddFriendButton from "../../../../components/AddFriendButton";

const Page: FC = () => {
  return (
    <main className="bg-white pt-8 ml-2">
      <h1 className="font-bold text-5xl mb-8 text-black">Add a friend</h1>
      <AddFriendButton />
    </main>
  );
};

export default Page;
