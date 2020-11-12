import React from 'react'
import { Popup, Card, Container, Image } from 'semantic-ui-react'
import {Link} from 'react-router-dom';

const RandomSkill = (props) => {
return (
  <Container centered style={{position:"absolute", minWidth: 200}}>
  <h3 style={{textAlign: "left"}}>Featured Skill: </h3>
       <Popup content='click to view details or to signup' 
         trigger={<Card style={{width: "80%", border:"1px solid pink"}} as={Link} to={`/viewprofile/${props.ranSkill.user.id}`}>
            <img style={{height: 250}} src={props.ranSkill.video_url} wrapped ui={false} />
            <Card.Content>
             <Card.Header style={{fontSize: "20px", color: "black"}}>{props.ranSkill.name}</Card.Header>
                 <Card.Meta>
                 <span className='date' style={{fontSize: "15px", color: "slategrey"}}>{props.ranSkill.category}</span>
                 </Card.Meta>
                <Card.Description style={{fontSize: "17px", color: "DARKSLATEGRAY"}}>
                  {props.ranSkill.description}
                  </Card.Description>
                 </Card.Content>
                 <Card.Content extra>
                     <Image
                         circular
                          size='mini'
                          src={`${props.ranSkill.user.image_url}`}
                          style={{marginRight: "10px", border:"1px solid pink"}}
                        />  
                           {props.ranSkill.user.username}
                   </Card.Content>
            </Card>
            } 
         />
      </Container>
     )
 }

 export default RandomSkill;