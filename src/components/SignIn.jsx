import { useContext } from "react";
import { AuthContext } from "../AutohProvider/AuthProvider";
import Swal from "sweetalert2";

const SignIn = () => {
    const {singInWithEmailPass} = useContext(AuthContext);
    const handleSignIn = (event) => {
        event.preventDefault();        
        const email = event.target.email.value;
        const password = event.target.password.value;
        singInWithEmailPass(email, password)
        .then(res=>{
            console.log(res)
            const lastSignInTime = res?.user?.metadata?.lastSignInTime;
            const signInInfo = {email, lastSignInTime}
            fetch('http://localhost:5000/users',{
                method:'PATCH',
                headers:{
                    'content-type' : 'application/json'
                },
                body:JSON.stringify(signInInfo)
            })
            .then(res=>res.json())
            .then(data=>{
                if(data.modifiedCount){
                }
            })
        })
        .catch(error=>{
            console.log(error)
        })

    }
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col ">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Sign In now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form className="card-body" onSubmit={handleSignIn}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" name="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" name="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignIn;