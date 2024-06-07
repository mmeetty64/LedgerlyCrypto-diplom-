import React, { useContext, useEffect } from 'react'
import { Context } from '../../Context/ContextWrapper';
import Service from '../../Service/Service';
import { useHistory } from 'react-router-dom';
import { ReqShop } from '../Components/ReqShop/ReqShop';


const RequireShop = () => {

  return (
      <ReqShop/>
  )
}
export default RequireShop;