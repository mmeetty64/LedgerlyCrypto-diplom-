import React, { useContext, useEffect } from 'react'
import { Context } from '../../Context/ContextWrapper';
import Service from '../../Service/Service';
import { useHistory } from 'react-router-dom';
import { ViewOrders } from '../Components/ViewOrders/ViewOrders';


const AccountOrders = () => {

  return (
      <ViewOrders/>
  )
}
export default AccountOrders;