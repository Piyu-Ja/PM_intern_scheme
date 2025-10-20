import Image from "next/image";
import InternshipDashboard from "./dashboard/page"
import { redirect } from "next/navigation";

export default function Home() {
  return (
    redirect("/dashboard")
  );
}
