import React from 'react';
import { Scene, Tabs, Stack } from 'react-native-router-flux';
import {
  Body, Button, Card, CardItem, Icon, Left, Right, Text, Thumbnail,
} from 'native-base';

import DefaultProps from '../constants/navigation';
import AppConfig from '../constants/config';

import {
  ArticlesForm, ArticlesList, ArticlesSingle, GamesList, GamesSingle,
} from '../containers';

import AboutComponent from '../components/About';

const Index = (
  <Stack hideNavBar>
    <Scene hideNavBar>
      <Tabs
        key="tabbar"
        swipeEnabled
        type="replace"
        showLabel={false}
        {...DefaultProps.tabProps}
      >
        <Stack
          key="home"
          title={AppConfig.appName}
          icon={() => <Icon name="planet" {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene key="home" component={AboutComponent} />
        </Stack>

        <Stack
          key="gamesList"
          title="Games List"
          icon={() => <Icon name="logo-game-controller-b" {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene hideNavBar key="gamesList" component={GamesList} />
          <Scene key="gamesSingle" component={GamesSingle} />
        </Stack>
        <Stack
          key="codesList"
          title="Codes List"
          icon={() => <Icon name="ios-gift" {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene key="articlesList" component={ArticlesList} />
          <Scene key="articlesSingle" component={ArticlesSingle} />
        </Stack>
        <Stack
          key="articlesList"
          title="Articles List"
          icon={() => <Icon name="list" {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene key="articlesList" component={ArticlesList} />
          <Scene key="articlesSingle" component={ArticlesSingle} />
        </Stack>

        <Stack
          key="form"
          title="Articles Form"
          icon={() => <Icon name="contact" {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene key="form" component={ArticlesForm} />
        </Stack>
      </Tabs>
    </Scene>
  </Stack>
);

export default Index;
