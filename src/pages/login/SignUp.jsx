import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import Loading from "../../shared/Loading";
import toast from "react-hot-toast";

const SignUp = () => {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, updating] = useUpdateProfile(auth);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await createUserWithEmailAndPassword(data.email, data.password);
    await updateProfile({ displayName: data.name });
  };
  console.log(user);

  if (user?.user?.accessToken) {
    toast.success("Congratulations!!! User created Successfully.");
    navigate("/products/all");
  }

  return (
    <div className="m-auto w-1/2 mt-10">
      <h1 className="font-semibold text-3xl text-center mb-4 ">Sign Up Here</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block">Name</label>
          <input
            className="input input-bordered input-info w-full max-w-xs "
            defaultValue=""
            {...register("name")}
            placeholder="your name"
          />
        </div>
        <div className="mb-4">
          <label className="block">Phone</label>
          <input
            className="input input-bordered input-info w-full max-w-xs "
            defaultValue=""
            {...register("phoneNumber")}
            placeholder="your phone number"
          />
        </div>

        <div className="mb-4">
          <label className="block">Email</label>
          <input
            className="input input-bordered input-info w-full max-w-xs"
            {...register("email", { required: true })}
            placeholder="email"
          />
        </div>
        {errors.email && (
          <span className="text-red-600">Email is required</span>
        )}

        <div>
          <label className="block">Password</label>
          <input
            className="input input-bordered input-info w-full max-w-xs"
            {...register("password", { required: true })}
            placeholder="password"
            type="password"
          />
        </div>
        {errors.password && (
          <span className="text-red-600">Password is required</span>
        )}

        {loading || updating ? (
          <Loading />
        ) : (
          <input
            className="btn btn-primary block mt-4 w-1/2 text-xl"
            type="submit"
          />
        )}

        <Link to="/login" className="text-blue-600">
          Already have an account? Login here
        </Link>

        {error && (
          <h1 className="text-red-700 text-center mt-6 text-2xl font-semibold">
            {error.message}
          </h1>
        )}
      </form>
    </div>
  );
};

export default SignUp;
