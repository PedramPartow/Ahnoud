import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";

export default function AuthPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <Login />
      {/* <Register /> */}
    </div>
  );
}
