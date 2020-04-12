import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FlatList, TouchableOpacity } from 'react-native';
import {
  Container,
  Header,
  Card,
  CardItem,
  Item,
  Input,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  Segment,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Error, Spacer } from '../UI';
import { errorMessages } from '../../constants/messages';

const GamesList = ({
  error, loading, listFlat, reFetch,
}) => {
  const [activeSegment, setActiveSegment] = useState(
    1,
  );

  if (error) {
    return <Error content={error} tryAgain={reFetch} />;
  }

  if (listFlat.length < 1) {
    return <Error content={errorMessages.gamesEmpty} />;
  }

  return (
    <Container style={{ padding: 10 }}>
      <Header searchBar rounded hasSegment>
        <Item>
          <Icon name="ios-search" />
          <Input placeholder="Search" />
        </Item>
        <Button transparent>
          <Text>Search</Text>
        </Button>
      </Header>

      <Segment>
        <Button first active={activeSegment === 1} onPress={() => setActiveSegment(1)}>
          <Text>Store</Text>
        </Button>
        <Button last active={activeSegment === 2} onPress={() => setActiveSegment(2)}>
          <Text>Following</Text>
        </Button>
      </Segment>

      <FlatList
        data={listFlat}
        onRefresh={() => reFetch({ forceSync: true })}
        refreshing={loading}
        renderItem={({ item }) => (

          <Card style={{ flex: 0 }}>
            <CardItem>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => Actions.gamesSingle({ id: item.id, title: item.name })}
                style={{ flex: 1 }}
              >
                <Left>
                  <Thumbnail source={{ uri: item.icon }} />
                  <Body>
                    <Text>{item.name}</Text>
                  </Body>
                </Left>
              </TouchableOpacity>
              <Right>
                <Button transparent textStyle={{ color: '#87838B' }}>
                  <Icon
                    name={activeSegment === 1 ? 'ios-add' : 'ios-remove'}
                    style={{ fontSize: 30, color: activeSegment === 1 ? 'green' : 'red' }}
                  />
                </Button>
              </Right>
            </CardItem>
          </Card>
        )}
        keyExtractor={(item) => `${item.id}-${item.name}`}
        ListFooterComponent={null}
      />
      <Spacer size={20} />
    </Container>
  );
};

GamesList.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool,
  listFlat: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
  ),
  reFetch: PropTypes.func,
};

GamesList.defaultProps = {
  listFlat: [],
  error: null,
  reFetch: null,
  loading: false,
};

export default GamesList;
