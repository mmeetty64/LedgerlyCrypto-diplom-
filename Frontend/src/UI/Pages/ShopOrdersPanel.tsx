import React, { useContext, useEffect } from 'react'
import { Context } from '../../Context/ContextWrapper';
import Service from '../../Service/Service';
import { useHistory } from 'react-router-dom';
import { ShopOrders } from '../Components/ShopOrders/ShopOrders';


const ShopOrdersPanel = () => {

  return (
      <ShopOrders/>
  )
}
export default ShopOrdersPanel;