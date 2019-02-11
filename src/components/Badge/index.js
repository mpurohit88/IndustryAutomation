import React, { Component } from React;
import { Badge } from 'react-bootstrap'

export default class Badge extends Comment {
    render() {
        return (
            <Badge pill variant={getVariant(quoteDetails.status)}>{getStatus(quoteDetails.status)}</Badge>
        )
    }
}