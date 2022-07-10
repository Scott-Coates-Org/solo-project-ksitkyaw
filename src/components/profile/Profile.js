import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import { Grid, Box, Typography, Paper, List } from '@mui/material';
import Select from 'components/select/Select';
import Fixture from 'components/fixture/Fixture';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from 'components/user/auth';
import { useForm } from 'react-hook-form';
import { firebase } from '../../firebase/client'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { fetchAllUserr, savePhoto } from 'redux/myuser';
import Fixturev2 from 'components/fixture/Fixturev2';

export default function Profile() {
    const {user} = useAuth();
    const dispatch = useDispatch();
    const { data, isLoaded, hasErrors } = useSelector((state) => state.userr);
    const [photoEdit, setPhotoEdit] = useState(false);
    const [descEdit, setDescEdit] = useState(false)

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { ref: photoRef, ...photoRest } = register('photo', { required: true });
    const { register: register2, handleSubmit: handleSubmit2, reset: reset2, formState: { errors: errors2}} =useForm();
    const { ref: descRef, ...descRest } = register2('desc', { required: true });

    const onPhotoSubmit = data => {
        if (Object.keys(errors).length) {
          alert('Error saving widget: ' + JSON.stringify(errors));
        } else {
          dispatch(savePhoto({ file: data.photo[0] })).then(action => {
            const photoUrl = action.payload;
            if (photoUrl) {
              firebase.auth().currentUser.updateProfile({
                photoURL: photoUrl
              })
                .then(() => {
                  reset();
                  setPhotoEdit(false)
                  dispatch(fetchAllUserr());
                  console.log(user)

                });
            }
          });
        }
      };

      const onDescSubmit = async (data) => {
        if (Object.keys(errors2).length) {
          alert('Error saving widget: ' + JSON.stringify(errors2));
        } else {
          
            const doc = await firebase.firestore().collection('users').doc(user.uid);
            doc.update({
                "desc" : data.desc
                })
            .then(() => {
                reset2();
                setDescEdit(false);
                dispatch(fetchAllUserr());

            });
        }
        }

    return (
        
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {!isLoaded && 'Widgets loading…'}
        {hasErrors && 'Error Loading'}
        {isLoaded && 
        <React.Fragment key={data[0]?.id}>
        <Grid item md={6}>
            <Avatar sx={{width: 250, height: 250, objectFit: "cover"}} alt="Remy Sharp" src={user.photoURL} />
            <Button onClick={() => setPhotoEdit(!photoEdit)}>Edit Profile</Button>
            <Form onSubmit={handleSubmit(onPhotoSubmit)} className={`${photoEdit ? "d-block" : "d-none"} p-3 my-3 border border-primary photoform`}>
                <FormGroup>
                  <Label for="photo">Profile Photo</Label>
                  <Input id="photo" type="file" accept="image/*" {...photoRest} innerRef={photoRef} invalid={errors.photo} />
                </FormGroup>
                <Button type="submit" color="primary">Save Profile</Button>
              </Form>
        </Grid>
        <Grid item md={6}>
            <Paper sx={{width:"auto", p: 3, mb:5}}>
                UserName:<span style={{paddingLeft: 30}}>{user.displayName}</span>
                <p>{data[0]?.desc}</p>
                <Button onClick={() => setDescEdit(!descEdit)}>Edit description</Button>
                <Form onSubmit={handleSubmit2(onDescSubmit)} className={`${descEdit ? "d-block" : "d-none"} p-3 my-3 border border-primary`}>
                    <FormGroup>
                    <Label for="desc">Description</Label>
                    <Input id="desc" type="text" {...descRest} innerRef={descRef} invalid={errors2.desc} />
                    </FormGroup>
                    <Button type="submit" color="primary">Save Description</Button>
              </Form>
            </Paper>
        </Grid>
        <Grid item md={6}>
            <Paper sx={{maxWidth:"75%", p: 2, mb: 5}}>
                My Club:
                <ul>
                <li>{data[0]?.favourite.teams}</li>
                </ul>
            </Paper>
        </Grid>
        <Grid item md={6}>
            <Paper sx={{maxWidth:"75%", p:2}}>
                My League:
                <ul>
                <li>{data[0]?.favourite.leagues}</li>
                <li>La liga</li>
                </ul>
            </Paper>
        </Grid>
        
        <Grid item md={6}>
            <Paper sx={{maxWidth:"75%", p:2}}>
                My Players:
                <ul>
                <li>{data[0]?.favourite.players}</li>
                <li>Jack Wilshere</li>
                </ul>
            </Paper>
        </Grid>
        {/*duplicate code below */}
        <Grid item md={12} sx={{mt:2}}>
            <Box sx={{display: "flex"}}>
                <Typography variant="body1" sx={{fontWeight:600, pt: 2}}>My matches</Typography>
                <Select/>
            </Box>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <Fixturev2 width="100%" height={100} />
                <Fixturev2 width="100%" height={100}/>
            </List>
        </Grid>
        <Grid item md={12} sx={{mt:2}}>
            <Box sx={{display: "flex"}}>
                <Typography variant="body1" sx={{fontWeight:600, pt: 2}}>Matches suggestion</Typography>
                <Select/>
            </Box>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <Fixturev2 width="100%" height={100} />
                <Fixturev2 width="100%" height={100}/>
            </List>
        </Grid>
        </React.Fragment>
        }
    </Grid>
        
  )
}
