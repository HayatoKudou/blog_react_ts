import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { serverUrl } from '../../../common';
import Header from '../../parts/header';
import Breadcrumb from '../../parts/breadcrumb';
import User from '../../auth/User';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: '0 auto',
        marginTop: '20px',
        padding: '15px',
    },
    form: {
        width: '80%',
        margin: '0 auto',
    },
    form_input: {
        width: '100%',
        margin: '20px 0 0 0',
    },
    post_button: {
        width: '100%',
        margin: '20px 0 0 0',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

export default function Post(props){

    const { register, handleSubmit, errors, reset } = useForm();
    const classes = useStyles();
    const [error, set_error] = useState('');
    const [success_aleart, set_success_aleart] = useState('');

    function post(data){
        if(window.confirm("送信しますか?")){
            fetch(serverUrl + '/api/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer: ' + JSON.parse(User.getLocalStorage('user')).api_token
                },
                body: JSON.stringify(data),
            })
            .then(response => {
                if (!response.ok) {
                    set_error(response);
                } else {
                    return response.json().then(data => {
                        console.log(data);
                        if('errors' in data){
                            set_error(data.errors);
                            set_success_aleart('');
                        } else {
                            set_error('');
                            set_success_aleart(data.message);
                        }
                    });
                }
            }).catch(error => {
                set_error(error);
            })
        }
    }

    return(
        <div>
            <Header location={props}  />
            <Breadcrumb location={props} />
            <div className={classes.root}>
                <form onSubmit={handleSubmit(post)} className={classes.form}>

                    {success_aleart !== '' && (
        				<Typography component="h1" variant="h5" className={classes.aleart}>
                            <Alert severity="success">{success_aleart}</Alert>
                        </Typography>
                    )}
                    {error !== '' && (
                        <Typography color="error" component="h1" variant="h5" className={classes.aleart}>
                            {Object.keys(error).map(key => (
                                <Alert key={key} severity="error">{error[key]}</Alert>
                            ))}
                        </Typography>
                    )}

                    <div>
                    <TextField type="date" name="date" className={classes.textField}
                        error={errors.date ? true : false}
                        inputRef={register({ required: true })}
                        helperText={
                            errors.date && <span className="error_message">日付を入力してください。</span>
                        }
                    />

                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="post_type">タイプ</InputLabel>
                        <Select native inputRef={register({ required: true })} name="type"
                            error={errors.type ? true : false}
                            inputProps={{
                                name: 'age',
                                id: 'post_type',
                            }}
                            helperText={
                                errors.name && <span className="error_message">タイプを入力してください。</span>
                            }
                        >
                            <option aria-label="None" value="" />
                            <option value={'notice'}>お知らせ</option>
                            <option value={'blog'}>ブログ</option>
                            <option value={'tool'}>ツール</option>
                        </Select>
                    </FormControl>
                    </div>

                    <TextField variant="outlined" name="contents" multiline rows={5} className={classes.form_input}
                        error={errors.contents ? true : false}
                        inputRef={register({ required: true })}
                        helperText={
                            errors.contents && <span className="error_message">内容を入力してください。</span>
                        }
                        label={'投稿内容'}
                    />

                    <Button onClick={handleSubmit(post)} className={classes.post_button} variant="contained" color="primary">
                        送信する
                    </Button>
                </form>
            </div>
        </div>
    )
}