import useLogin from "../hooks/useLogin";

function Login() {
  const { login, isPending } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.target);

    const formData = {
      username: form.get("username"),
      email: form.get("email"),
      password: form.get("password"),
    };
    login(formData);
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="flex flex-col gap-3 p-5" onSubmit={handleSubmit}>
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
        <button className="btn bg-cyan-500 p-4 rounded-md mt-4">
          {isPending ? "Loading.." : "Sign in"}
        </button>
        <a href="/signup" className="text-center text-blue-400">
          Create new account
        </a>
      </form>
    </div>
  );
}

export default Login;
