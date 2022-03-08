import React from 'react'
import DashboardTopCard from './DashboardTopCard'
import {cardTitles,links,colors} from './Properties'
const DashboardTop = (props) => {
    return (
        <>
        {
            cardTitles?.map((cardTitle,idx) => {
                return <DashboardTopCard count={props?.count[idx]} color={colors[idx]} key={idx} title={cardTitle} link={links[idx]}/>
            })
        }
        </>
    )
}

export default DashboardTop
