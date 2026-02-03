import Image from "next/image";

export default function AuthLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/SmokedWizard.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 flex min-h-screen items-center justify-center">
          <Image
            src="/svg/Logo.svg"
            alt="logo"
            width={40}
            height={48}
          />
        <div className="w-full max-w-xl bg-gray-13">
          {children}
        </div>
      </div>
    </div>
  )
}