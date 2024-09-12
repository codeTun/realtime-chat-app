import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const Page = async ({}) => {
  const session = await getServerSession(authOptions);
  return <pre className="text-black">Dashboard</pre>;
};

export default Page;
