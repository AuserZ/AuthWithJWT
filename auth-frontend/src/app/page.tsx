import { LoginPage } from "@/component/pages/login";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <LoginPage />
    </div>
  );
}
