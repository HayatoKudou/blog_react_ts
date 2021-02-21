import React, {useState, useEffect, useRef} from 'react';
import { useForm } from "react-hook-form";

export default function ReactHookForm_sample_1(){

    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => alert(JSON.stringify(data));

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input name="example" defaultValue="test" ref={register} />
            <input name="exampleRequired" ref={register({ required: true })} />
            {errors.exampleRequired && <span>This field is required</span>}
            <input type="submit" />
        </form>
    )
}