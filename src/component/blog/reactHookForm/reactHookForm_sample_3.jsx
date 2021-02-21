import React, {useState, useEffect, useRef} from 'react';
import { useForm } from "react-hook-form";

export default function ReactHookForm_sample_3(){

    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => alert(JSON.stringify(data));

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input name="exampleRequired" ref={register({ required: true, maxLength: 5 })} />
            {errors.exampleRequired?.type === "required" && <span>入力必須です。</span>}
            {errors.exampleRequired?.type === "maxLength" && <span>5文字以内で入力してください。</span>}
            <input type="submit" />
        </form>
    )
}