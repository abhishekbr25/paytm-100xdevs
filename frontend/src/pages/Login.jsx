import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="bg-slate-700 h-screen flex justify-center ">
      <div className="flex flex-col justify-center ">
        <div className="bg-white p-2 text-center rounded-lg w-80">
          <Heading title={"Sign in"} />
          <SubHeading label={"Enter your infromation to Login to account"} />
          <InputBox
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="harkirat@gmail.com"
            label={"Email"}
          />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="123456"
            label={"Password"}
          />
          <div className="pt-4">
            <Button
              onClick={async () => {
                try {
                  const res = await axios.post(
                    "http://localhost:2002/api/v1/user/login",
                    {
                      username: email,
                      password,
                    }
                  );
                  localStorage.setItem("token", res.data.token);
                  navigate("/dashboard")
                } catch (error) {
                  alert("invalid user or password");
                }
                
              }}
              label={"Login"}
            />
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
