import React, { useEffect, useState } from 'react'
import OtherUserProfileCard from './OtherUserProfileCard';
import { Card, Row, Col } from 'react-bootstrap'

function OtherUserProfileMain({ userId }) {
    return (
        <div>
            <Row className='justify-content-start'>
                <OtherUserProfileCard userId={userId} />
            </Row>
        </div>
    )
}

export default OtherUserProfileMain;
