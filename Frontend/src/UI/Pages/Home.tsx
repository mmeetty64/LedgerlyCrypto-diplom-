import React, { useContext, useEffect } from 'react'
import { Context } from '../../Context/ContextWrapper';
import Service from '../../Service/Service';
import { useHistory } from 'react-router-dom';
import { Catalog } from '../Components/Catalog/Catalog';


const Home = () => {

  return (
      <Catalog/>
  )
}
export default Home;
