import React from 'react';
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from '../contexts/useAuth';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login } = useAuth();
    let history = useHistory();

    const onSubmit = async (data) => {
        try {
            await login(data.email, data.password);
            history.push('/');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="formLayout">
            <div>
                <input 
                    type="text"
                    placeholder={'email'}
                    {...register("email", { required: true })}
                />
                {errors.email && <p>email required</p>}
            </div>

            <div>
                <input 
                    type='password'
                    placeholder={'password'}
                    {...register("password", { required: true})} 
                />
                {errors.password && <p>password required</p>}
            </div>

            <div>
                <input type="submit" value={'Login'}/>
            </div>
        </form>
    );
};

export default Login;