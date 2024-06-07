import React from 'react'
import { useHistory } from 'react-router-dom';
import Service from '../../Service/Service';

const Register = () => {

    const navigation = useHistory();
    const regUserHandler = async(e: any) =>{
        e.preventDefault()
        const {target} = e;
        navigation.push("/Login");
    }

  return (
    <></>
  )
}
export default Register;