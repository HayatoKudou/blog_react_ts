import React, {useState, useEffect, useRef} from 'react';
import { useForm } from "react-hook-form";

export default function ReactHookForm_sample_2(){

    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => alert(JSON.stringify(data));

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input name="exampleRequired" ref={register({ required: '入力必須です' })} />
            {errors.exampleRequired && <span>{errors.exampleRequired.message}</span>}
            <input type="submit" />
        </form>
    )
}