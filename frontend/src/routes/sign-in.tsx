import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 pb-16">
      <SignIn path="/sign-in" />
    </div>
  );
};

export default SignInPage;
