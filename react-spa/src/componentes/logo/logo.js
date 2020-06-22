import React from 'react'
import plantaLogo from '../../assets/Logo-planta.png'
import 'materialize-css/dist/css/materialize.min.css'

const logo = () => (
    <div>
        <img src={plantaLogo} style={{
            maxHeight: "12em"
        }} className="responsive-img" />
    </div>
)

export default logo
