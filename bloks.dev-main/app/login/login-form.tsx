import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden border-2 border-black rounded-none shadow-none relative group">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold font-mono uppercase tracking-tight mb-2 relative inline-block">
                  Welcome back
                  <div className="absolute -left-2 -bottom-2 w-full h-3 bg-yellow-400 z-0"></div>
                </h1>
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="email"
                  className="font-mono uppercase tracking-wide font-bold"
                >
                  Email
                </Label>
                <div className="relative">
                  <div className="absolute top-1 left-1 right-1 bottom-1 bg-black opacity-10"></div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    className="font-mono border-2 border-black rounded-none bg-white relative z-10"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label
                    htmlFor="password"
                    className="font-mono uppercase tracking-wide font-bold"
                  >
                    Password
                  </Label>
                </div>
                <div className="relative">
                  <div className="absolute top-1 left-1 right-1 bottom-1 bg-black opacity-10"></div>
                  <Input
                    id="password"
                    type="password"
                    required
                    placeholder="***********************"
                    className="font-mono border-2 border-black rounded-none bg-white relative z-10"
                  />
                </div>
              </div>
              <div className="relative w-full group">
                <div className="absolute top-1 left-1 w-full h-full bg-black transition-all group-hover:top-0.5 group-hover:left-0.5"></div>
                <Button
                  type="submit"
                  className="w-full font-mono uppercase tracking-wider relative z-10 bg-blue-500 hover:bg-blue-600 text-white border-2 border-black rounded-none"
                >
                  Login
                </Button>
              </div>
              <div className="relative text-center text-sm font-mono uppercase tracking-wide after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t-2 after:border-black">
                <span className="relative z-10 bg-background px-2 text-black">
                  WISDOM
                </span>
              </div>

              <div className="relative border-2 border-black p-4 min-h-[160px] group">
                {/* Geometric shapes - brutalist style */}
                <div className="absolute -left-1 -top-1 w-8 h-8 bg-yellow-400 z-0"></div>
                <div className="absolute -right-1 -bottom-1 w-8 h-8 bg-blue-500 z-0"></div>

                {/* Quote container with brutalist styling */}
                <div className="relative z-10 h-full flex flex-col justify-center">
                  <p className="font-mono text-center mb-2 font-bold">
                    <span className="bg-black text-white px-2 py-1 inline-block mb-1">
                      BHAGAVAD GITA
                    </span>
                  </p>
                  <blockquote className="font-mono text-sm tracking-wide text-center relative">
                    <p className="mb-3">
                      &ldquo;कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।&rdquo;
                    </p>
                    <p className="text-xs mb-3 italic">
                      &ldquo;You have a right to perform your prescribed duties,
                      but you are not entitled to the fruits of your
                      actions.&rdquo;
                    </p>
                    <p className="text-xs uppercase font-bold">
                      — Chapter 2, Verse 47
                    </p>
                    <div className="absolute top-0 left-0 w-1 h-full bg-black opacity-10"></div>
                    <div className="absolute top-0 right-0 w-1 h-full bg-black opacity-10"></div>
                  </blockquote>
                </div>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-black md:block border-l-2 border-black overflow-hidden">
            {/* Brutalist Fingerprint Login Illustration */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 731 626"
                className="w-full h-full"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Grid Background - Brutalist Style */}
                <rect x="0" y="0" width="731" height="626" fill="black" />
                <pattern
                  id="grid-pattern"
                  width="24"
                  height="24"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 24 0 L 0 0 0 24"
                    fill="none"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="1"
                  />
                </pattern>
                <rect
                  x="0"
                  y="0"
                  width="731"
                  height="626"
                  fill="url(#grid-pattern)"
                />

                {/* Geometric Shapes - Brutalist Style */}
                <rect
                  x="50"
                  y="50"
                  width="200"
                  height="200"
                  fill="#3b82f6"
                  className="rotate-12 transform origin-center"
                />
                <rect
                  x="500"
                  y="400"
                  width="180"
                  height="180"
                  fill="#facc15"
                  className="-rotate-6 transform origin-center"
                />

                {/* Simplified Fingerprint Circle */}
                <circle
                  cx="360"
                  cy="230"
                  r="85"
                  fill="#6c63ff"
                  stroke="black"
                  strokeWidth="4"
                />

                {/* Stylized Fingerprint Lines - Geometric */}
                <g
                  fill="none"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="square"
                >
                  <path d="M320 200 Q 340 170, 370 170 Q 400 170, 420 200 Q 440 230, 420 260 Q 400 290, 370 290 Q 340 290, 320 260 Q 300 230, 320 200" />
                  <path d="M330 210 Q 345 190, 370 190 Q 395 190, 410 210 Q 425 230, 410 250 Q 395 270, 370 270 Q 345 270, 330 250 Q 315 230, 330 210" />
                  <path d="M340 220 Q 350 205, 370 205 Q 390 205, 400 220 Q 410 235, 400 250 Q 390 265, 370 265 Q 350 265, 340 250 Q 330 235, 340 220" />
                </g>

                {/* Additional Geometric Elements */}
                <rect x="260" y="70" width="50" height="120" fill="white" />
                <rect x="450" y="70" width="50" height="120" fill="white" />

                {/* User Profile Element - Geometric */}
                <circle
                  cx="360"
                  cy="130"
                  r="25"
                  fill="white"
                  stroke="black"
                  strokeWidth="3"
                />
                <rect x="330" y="160" width="60" height="10" fill="white" />

                {/* Bold Label */}
                <text
                  x="360"
                  y="340"
                  fontFamily="monospace"
                  fontSize="20"
                  fontWeight="bold"
                  fill="white"
                  textAnchor="middle"
                  className="uppercase"
                >
                  SECURE ACCESS
                </text>

                {/* Access Key Geometric Elements */}
                <rect x="320" y="360" width="10" height="40" fill="#facc15" />
                <rect x="340" y="360" width="10" height="40" fill="#facc15" />
                <rect x="360" y="360" width="10" height="40" fill="#facc15" />
                <rect x="380" y="360" width="10" height="40" fill="#facc15" />
              </svg>
            </div>

            {/* Overlay Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:24px_24px] z-10 pointer-events-none"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
