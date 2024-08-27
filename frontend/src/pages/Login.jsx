import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";

export function Login() {
  return (
    <div className="bg-slate-700 h-screen flex justify-center ">
      <div className="flex flex-col justify-center ">
        <div className="bg-white p-2 text-center rounded-lg w-80">
          <Heading title={"Sign in"} />
          <SubHeading label={"Enter your infromation to Login to account"} />
          <InputBox placeholder="harkirat@gmail.com" label={"Email"} />
          <InputBox placeholder="123456" label={"Password"} />
          <div className="pt-4">
            <Button label={"Login"} />
          </div>
          <div>
            <BottomWarning
              label={"create New Account"}
              to={"/signup"}
              buttonText={"Signup"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
