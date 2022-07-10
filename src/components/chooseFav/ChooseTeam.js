import React, { useEffect } from 'react'
import { Button, ImageList, ImageListItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNextDocs, getDataSuccess } from 'redux/team';
import { useWizard } from 'react-use-wizard';
import { useAuth } from 'components/user/auth';
import firebaseClient from "firebase/client";
import { useState } from 'react';


export default function ChooseTeam() {
  const [lastDoc, setLastDoc] = useState();
  const dispatch = useDispatch();
  const { data, isLoaded, hasErrors } = useSelector((state) => state.team);
  const { handleStep } = useWizard();
  const { user } = useAuth();
  const [team, setTeam] = useState('');
  
  useEffect(() => {
    firebaseClient.firestore().collection("teams").orderBy("team_id", "asc").limit(6).get()
    .then((collections) => {
      const teams = collections.docs.map((team) => team.data());
      const lastDoc = collections.docs[collections.docs.length - 1];

      dispatch(getDataSuccess(teams));
      setLastDoc(lastDoc);
    })
  }, [])


  handleStep(async () => {
    const doc = await firebaseClient.firestore().collection('users').doc(user.uid);
    return doc.update({
      "favourite.teams": team
    })
  })

  const handleClick = (e, name) => {
    e.target.style.opacity = 0.5;
    setTeam(name);
  }

  const handleFetch = async () => {
    console.log("called")
    firebaseClient.firestore().collection("teams").orderBy("team_id", "asc").startAfter(lastDoc).limit(6).get()
    .then((collections) => {
      const teams = collections.docs.map((team) => team.data());
      const lastDoc = collections.docs[collections.docs.length - 1];

      dispatch(getDataSuccess(teams));
      console.log(data)
      setLastDoc(lastDoc);
      console.log(lastDoc)
    })
  }

  return (
    <>
      <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
        {data.length == 0 ? <p>Loading...</p> : ''}
        {data.map((team) => (
          <ImageListItem sx={{m: 1}} onClick={(e) => handleClick(e, team.name)} key={team.id}>
            <img
              src={`${team.logo}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${team.logo}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={team.name}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Button onClick={() => handleFetch()} variant="outlined">More</Button>
    </>

  );
}

// const itemData = [
//   {
//     img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
//     title: 'Breakfast',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
//     title: 'Burger',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
//     title: 'Camera',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
//     title: 'Coffee',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
//     title: 'Hats',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
//     title: 'Honey',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
//     title: 'Basketball',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
//     title: 'Fern',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
//     title: 'Mushrooms',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
//     title: 'Tomato basil',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
//     title: 'Sea star',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
//     title: 'Bike',
//   },
// ];
