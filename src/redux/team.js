import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import firebaseClient from 'firebase/client';

const initialState = {
  data: [],
  logo: [],
  isLoaded: false,
  hasErrors: false,
};

const team = createSlice({
  name: "team",
  initialState,
  reducers: {
    getData: (state) => {
    },
    getLogo: (state, action) => {
      state.logo = action.payload;
    },
    getDataSuccess: (state, action) => {
      state.data = action.payload;
    },

    getDataFailure: (state, action) => {
      state.isLoaded = true;
      state.hasErrors = true;
    },

    createDataFailure: (state) => {
      state.hasErrors = true;
    },
  }
});

export const reducer =team.reducer;

export const {
  getData, getDataSuccess, getDataFailure, createDataFailure, getLogo
} =team.actions;

export const fetchAllTeams = createAsyncThunk(
  "team/fetchAllTeams",
  async (_, thunkAPI) => {
    // Set the loading state to true
    thunkAPI.dispatch(getData());

    try {
      const data = await _fetchAllTeamsFromDb();
      thunkAPI.dispatch(getDataSuccess(data));
    } catch (error) {
      console.error('error', error)
      // Set any erros while trying to fetch
      thunkAPI.dispatch(getDataFailure(error));
    }
  }
);

export const fetchNextDocs = createAsyncThunk(
    "team/fetchAllTeams",
    async (_, thunkAPI) => {
    // Set the loading state to true
    thunkAPI.dispatch(getData());

    try {
        const data = await _nextDocs();
        thunkAPI.dispatch(getDataSuccess(data))
    } catch (error) {
        console.error('error', error)
        thunkAPI.dispatch(getDataFailure(error))
    }
})


//not functioning 16/7/2022
export const fetchLogo = createAsyncThunk(
  "team/fetchLogo",
  async (payload, thunkAPI) => {
    // Set the loading state to true
    thunkAPI.dispatch(getData());

    try {
      const data = await _fetchLogoFromDb(payload.localId, payload.visitorId);
      thunkAPI.dispatch(getLogo(data));
    } catch (error) {
      console.error('error', error)
      // Set any erros while trying to fetch
      thunkAPI.dispatch(getDataFailure(error));
    }
  }
);

const _fetchLogoFromDb = async (localId, visitorId) => {
  const snapshot = await firebaseClient.firestore().collection('teams').where('team_id', "in", [localId, visitorId]).get();

    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return data;
}

// export const createWidget = createAsyncThunk(
//   "widget/createWidget",
//   async (payload, thunkAPI) => {
//     try {
//       await _createWidget(payload.title, payload.type, payload.photo);
//     } catch (error) {
//       console.error('error', error)
//       // Set any erros while trying to fetch
//       thunkAPI.dispatch(createDataFailure());
//     }
//   }
// );

// export const savePhoto = createAsyncThunk(
//   "widget/savePhoto",
//   async (payload) => {
//     const file = payload.file;

//     try {
//       const fileName = _appendToFilename(file.name, "_" + Date.now());
//       const uploadTask = _updloadFile(fileName, file);

//       const uploadPromise = new Promise((resolve, reject) => {

//         uploadTask.on('state_changed', snapshot => {
//           const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           console.log('progress:', progress);

//         }, error => {
//           reject(error);
//         }, () => {
//           uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => resolve(downloadURL)).catch(reject);
//         });
//       });

//       const downloadURL = await uploadPromise;

//       return downloadURL;
//     } catch (error) {
//       alert('Error saving photo: ' + JSON.stringify(error));
//     }
//   }
// );

async function _getDocuments(col, limit) {
    const snapshot = await firebaseClient.firestore().collection(col).limit(limit).get();
    return snapshot.docs
}

async function _fetchAllTeamsFromDb() {
    const snapshot = await firebaseClient.firestore().collection('teams').limit(6).get();

    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return data;
}

//the function fetch the next set of doc after the first one
async function _nextDocs() {
    const snapshotDocs = await _getDocuments("teams", 6);
    const last = snapshotDocs[snapshotDocs.length-1]
    const next = await firebaseClient.firestore().collection("teams").startAfter(last).limit(6).get();
    const data = next.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    return data;
}

// async function _createWidget(title, type, photo) {
//   const doc = await firebaseClient.firestore().collection('widgets').add({ title, type, photo });

//   return doc;
// }

// // https://stackoverflow.com/a/31205878/173957
// function _appendToFilename(filename, string) {
//   var dotIndex = filename.lastIndexOf(".");
//   if (dotIndex == -1) return filename + string;
//   else return filename.substring(0, dotIndex) + string + filename.substring(dotIndex);
// }

// function _updloadFile(fileName, file) {
//   const uploadTask = firebaseClient.storage().ref(`/${fileName}`).put(file);

//   return uploadTask;
// }