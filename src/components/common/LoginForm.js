import React from 'react';
import TextInput from '../common/TextInput';
import PasswordInput from '../common/PasswordInput';

const LoginForm = ({account, errors, logging, onLogin, onChange}) => {
    return (
        <form>
            <TextInput
                name="user"
                label="User"
                value={account.user}
                onChange={onChange}
                error={errors.user}/>

            <PasswordInput
                name="password"
                label="Password"
                value={account.password}
                onChange={onChange}
                error={errors.password}/>

            <input
                type="submit"
                disabled={logging}
                value={logging ? 'Logging....' : 'Login'}
                className="btn btn-primary"
                onClick={onLogin}/>
        </form>
    );
};

export default LoginForm;
