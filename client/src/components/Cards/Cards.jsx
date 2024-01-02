import React from 'react'
import {
    Container,
    Form,
    Button,
    Card,
    Figure,
    
  } from "react-bootstrap";
  import { timeSince } from "../../utils/timeSince";
  import "./Cards.css"


function Cards({post}) {
  return (
    <Card className="card_class" key={post._id}>
    <Card.Body>
      <Figure className="d-flex align-items-center">
        <Figure.Image
          width={70}
          height={70}
          className="rounded-circle"
          src={post.author.profileImage}
        />
        <figcaption>{post.author.email}</figcaption>
      </Figure>

      <Card.Text className="mt-3">{post.text}</Card.Text>
      <Card.Text>
        {new Date(post.created).toLocaleDateString()} -{" "}
        {timeSince(post.created)} ago{" "}
      </Card.Text>
    </Card.Body>
  </Card>
  )
}

export default Cards