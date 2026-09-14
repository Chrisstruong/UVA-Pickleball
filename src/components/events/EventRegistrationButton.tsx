import Link from "next/link";
import { Button } from "@/components/ui/button";

type EventRegistrationButtonProps = {
  isSignedIn: boolean;
  userGroup: string | null;
  requiredGroup: string | null;
  registrationOpen: boolean;
};

export default function EventRegistrationButton({
  isSignedIn,
  userGroup,
  requiredGroup,
  registrationOpen,
}: EventRegistrationButtonProps) {
  if (!registrationOpen) {
    return (
      <Button className="w-full" disabled>
        Registration Closed
      </Button>
    );
  }

  if (!isSignedIn) {
    return (
      <Button
        asChild
        className="w-full bg-orange-600 font-heading uppercase tracking-wide hover:bg-orange-700"
      >
        <Link href="/login">
          Sign In to Register
        </Link>
      </Button>
    );
  }

  if (requiredGroup && userGroup !== requiredGroup) {
    return (
      <Button className="w-full" disabled>
        {requiredGroup} Members Only
      </Button>
    );
  }

  return (
    <Button
      className="w-full bg-orange-600 font-heading uppercase tracking-wide hover:bg-orange-700"
    >
      Register
    </Button>
  );
}