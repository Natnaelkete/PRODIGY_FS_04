import { useState } from "react";
import useSignup from "../hooks/useSignup";

function Signup() {
  const [gender, setGender] = useState("");
  const { signup, isPending } = useSignup();

  function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.target);

    const formData = {
      username: form.get("username"),
      email: form.get("email"),
      password: form.get("password"),
      gender: gender,
    };
    signup(formData);
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="flex flex-col gap-3 p-5" onSubmit={handleSubmit}>
        <label htmlFor="Username">Username</label>
        <input
          className="p-4 border rounded-md mb-2"
          id="Username"
          type="text"
          placeholder="Username"
          required
          name="username"
        />
        <label htmlFor="Email">Email</label>
        <input
          className="p-4 border rounded-md mb-2"
          id="Email"
          type="text"
          placeholder="Email"
          required
          name="email"
        />
        <label htmlFor="Password">Password</label>
        <input
          className="p-4 border rounded-md"
          id="Password"
          type="password"
          placeholder="Password"
          required
          name="password"
        />
        <div className="flex items-center">
          <label id="Male" className="mr-2">
            Male
          </label>
          <input
            type="checkbox"
            id="Male"
            name="male"
            className=" mr-4 size-5"
            onChange={() => setGender("male")}
          />
          <label id="Male" className="mr-2">
            Female
          </label>
          <input
            type="checkbox"
            id="Female"
            name="female"
            className="mr-4 size-5"
            onChange={() => setGender("female")}
          />
        </div>
        <button className="btn bg-cyan-500 p-4 rounded-md mt-4">
          {isPending ? "Loading.." : "Sign up"}
        </button>
        <a href="/login" className="text-center text-blue-400">
          Already have account?
        </a>
      </form>
    </div>
  );
}

export default Signup;
