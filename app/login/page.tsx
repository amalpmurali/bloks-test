import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-white p-6 md:p-10 relative overflow-hidden">
      {/* Brutalist background elements */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-yellow-400 rotate-12 -translate-x-20 -translate-y-20 z-0"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-300 rotate-6 translate-x-20 translate-y-20 z-0"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-500 -rotate-12 z-0"></div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:24px_24px] z-0 opacity-30"></div>

      <div className="w-full max-w-sm md:max-w-3xl relative z-10">
        <LoginForm />
      </div>
    </div>
  );
}
