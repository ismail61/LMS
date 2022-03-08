import React from 'react'
import { Card } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import CountUp from 'react-countup';
const DashboardTopCard = ({color,count,title,link}) => {
    return (
        <div className='col-xs-12 col-sm-6 col-md-6 col-lg-4'>
            <Card style={{ backgroundColor: color, cursor: 'pointer' }} >
                <Card.Body className='text-center'>
                    <Card.Title ><span className='title' /* style={{whiteSpace : 'nowrap'}} */>{title}</span></Card.Title>
                    <Card.Text className='bg-text'>
                        <span ><CountUp start={0} end={count} duration={1}/></span>
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="text-center card-footer"><NavLink to={link} className="card-footer-link"><b>More Details <i className="fas fa-arrow-right"></i></b> </NavLink></Card.Footer>
            </Card>
        </div>
    )
}

export default DashboardTopCard
