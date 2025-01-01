import React from 'react'
import Main from './Main'
import Planactivity from './Planactivity'
import Volunteernetwork from './Volunteernetwork'
import BorrowerDetails from './BorrowerDetails'
import HeaderFooterLayout from '../../Layout/Header-Footer/HeaderFooterLayout'


const Index = () => {
  return (
    <div>
       <HeaderFooterLayout>
          <Main />
          <Planactivity />
          <Volunteernetwork />
          <BorrowerDetails />
       </HeaderFooterLayout>
    </div>
  )
}

export default Index