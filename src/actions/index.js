/* eslint-disable default-case */
import { auth, provider, storage } from "../firebase";
import db from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { SET_USER, SET_LOADING_STATUS, GET_ARTICLES } from "./actionType";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import storage from "firebase/storage";

export const setUser = (payload) => ({
  type: SET_USER,
  user: payload,
});

export const getArticles = (payload) => ({
  type: GET_ARTICLES,
  articles: payload,
});

export const setLoading = (status) => ({
  type: SET_LOADING_STATUS,
  status: status,
});

export function signInAPI() {
  return (dispatch) => {
    signInWithPopup(auth, provider)
      .then((payload) => {
        console.log(payload.user);
        dispatch(setUser(payload.user));
      })
      .catch((error) => alert(error.message));
  };
}

export function getUserAuth() {
  return (dispatch) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(setUser(user));
      }
    });
  };
}

export function signOutAPI() {
  return (dispatch) => {
    signOut(auth)
      .then(() => {
        dispatch(setUser(null));
      })
      .catch((error) => console.log(error));
  };
}

export function postArticleAPI(payload) {
  return (dispatch) => {
    dispatch(setLoading(true));

    console.log(payload);
    if (payload.image !== "") {
      const upload = ref(storage, `images/${payload.image.name}`);
      console.log(upload);

      const uploadTask = uploadBytesResumable(upload, payload.image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.log(error.code);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("File available at", downloadURL);
          const docRef = await addDoc(collection(db, "articles"), {
            actor: {
              description: payload.user.email,
              title: payload.user.displayName,
              date: payload.timestamp,
              image: payload.user.photoURL,
            },
            video: payload.video,
            sharedImage: downloadURL,
            comments: 0,
            description: payload.description,
          });
          dispatch(setLoading(false));

          console.log(docRef);
        }
      );
    } else if (payload.video) {
      console.log("here with video");
      addDoc(collection(db, "articles"), {
        actor: {
          description: payload.user.email,
          title: payload.user.displayName,
          date: payload.timestamp,
          image: payload.user.photoURL,
        },
        video: payload.video,
        sharedImage: "",
        comments: 0,
        description: payload.description,
      });

      dispatch(setLoading(false));
      // console.log(docRef);
    }
  };
}

export function getArticlesApi() {
  return async (dispatch) => {
    const querySnapshot = await getDocs(collection(db, "articles"));
    const arr = [];
    await querySnapshot.forEach((doc) => {
      arr.push(doc.data());
    });
    console.log(arr);
    dispatch(getArticles(arr));
    // return arr;
  };
}
