import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { Button, Rating } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import {Link} from 'react-router-dom';
import {WhatsappShareButton , WhatsappIcon} from "react-share";
import { userInfo } from './services/dataStore';

export default function ProductItem(props) {
  const [like,setLike] = React.useState(false);
  const [showDialog, setShowDialog] = React.useState(false);
  const refFavoriteIcon = React.useRef(null);
  const {item} = props;

  const changeLikeButton = ()=>{
    if(!like){
      refFavoriteIcon.current.style.fill = 'red';
    }else{
      refFavoriteIcon.current.style.fill = 'gray';
    }
    setLike(!like);

  }
  const addItemToRent =async ()=>{
        try{
          const res = await fetch(`http://localhost:8080/rent`,{
              headers:{
                  'Content-Type':'application/json',
                  "Authorization": "Token " + userInfo.token
              },
              method:'POST',
              body:JSON.stringify({item})
              
          })
          console.log(res);

      }catch(err){
          console.log({'msg':err});
      }
  }

  return (
    <Card sx={{ maxWidth: 345 }} className='mb-4'>
      <CardHeader
        avatar={
          <Link to={'/profile'}>
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          </Link>
        }
        title={item.productName}
        subheader={item.category || 'Mobile'}
      />
      <CardMedia
        component="img"
        height="194"
        image={item.image}
        alt="image"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
        <Typography color="text.success">
          Price/Day: {item.pricePerDay} Rs
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={changeLikeButton}>
          <FavoriteIcon ref={refFavoriteIcon} style={{ fill: 'gray' }} />
        </IconButton>
        <IconButton aria-label="share" onClick={()=> setShowDialog(!showDialog)}>
          <ShareIcon />
        </IconButton>
          <Dialog
            open={showDialog}
            onClose={()=> setShowDialog(!showDialog)}
          > 
           <div className='w-20 flex flex-row p-2'>
              <WhatsappShareButton
                url='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnGWEwXpRS7z7rVaGrjIWWTdE8_TiYTGiYjA&s'
              >
                <WhatsappIcon/>
             </WhatsappShareButton>
            </div>

          </Dialog>
        

        <Rating value={4.5} name="half-rating-read" defaultValue={2.5} precision={0.5}  readOnly />
      
        <Button onClick={addItemToRent} variant="contained" color="primary"  disabled={item.availabilityStatus != 'available'?true:false} >
          {item.availabilityStatus == 'available' ? 'Rent': 'Unavailable'}
        </Button>

       
      </CardActions>
      
    </Card>
  );
}
