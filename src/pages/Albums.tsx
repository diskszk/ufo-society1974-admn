import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { RootStore, User, Album } from '../lib/types';
import { publishSongs } from '../lib/songs';

// UI
import LibraryAddOutlinedIcon from '@material-ui/icons/LibraryAddOutlined';
import { PrimalyButton } from '../components/UIKit';
import { IconButton } from '@material-ui/core';

// Components
import AlbumTable from '../components/albums/AlbumTable';

import { ROLE, URL } from '../constans';
import { albumsData } from '../components/albums/testData';
import { getAlbums } from '../lib/albums/getAlbums';
import { clearAlbumAction } from '../store/AlbumReducer';

const Albums = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector<RootStore, User>(state => state.user);
  const currentRole = currentUser.role;
  const isDisable = (currentRole !== ROLE.EDITOR);
  // const [albums, setAlbums] = useState<Album[]>([]);

  const clickPublish = () => {
    publishSongs()
      .then(() => {
        alert('編集内容をHPに公開しました。')
      }).catch(e => {
        alert(e)
      })
  }

  const clickAddAlbum = () => {
    console.log('store clear');

    dispatch(clearAlbumAction());
    dispatch(push('/albums/edit'))
  }

  // useEffect(() => {
  //   getAlbums()
  //     .then((albumList) => {
  //       setAlbums(albumList);
  //     });

  // }, [setAlbums]);

  return (
    <section className="page">
      <h1>アルバムの管理ページ</h1>
      <div className="spacing-div"></div>

      <div className="spacing-div"></div>

      <div className="album-container">

        {currentRole === ROLE.EDITOR && (
          <div className="add-icon-button">
            <span>アルバムを追加</span>
            <IconButton
              onClick={() => clickAddAlbum()}
            >
              <LibraryAddOutlinedIcon fontSize="large" />
            </IconButton>
            <div className="spacing-div"></div>
          </div>
        )}
        <AlbumTable />
      </div>

      <div className="spacing-div"></div>

      <div className="button-container-row">
        <PrimalyButton
          label="もどる"
          onClick={() => dispatch(push('/'))}
        />
        <PrimalyButton
          isDisable={isDisable}
          label="公開する"
          onClick={clickPublish}
        />
      </div>

    </section >
  );
}

export default Albums;