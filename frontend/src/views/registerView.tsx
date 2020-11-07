import React, {useState} from "react";



const RegisterView = () =>{
    const [form, setValues] = useState({
        email: "",
        password: "",
    })
const handleChange:any = (e:any)=>{
    const {name, value} = e.target;
    setValues(prevState => ({...prevState, [name]:value}));
};

    return(
        <div>
            <div>
                <input value={form.email}
                type="text"
                placeholder="email"
                onChange={handleChange}
                name="email"/>
            </div>
            <div>
                <input value={form.password}
                type="text"
                placeholder="password"
                onChange={handleChange}
                name="password"/>
                <button onClick={()=> console.log("it worked!")}>register</button>
            </div>
        </div>
    )
}
export default RegisterView