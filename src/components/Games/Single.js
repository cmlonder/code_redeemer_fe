import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import {
  Container, Content, Card, CardItem, Body, H3, Text,
} from 'native-base';
import { Loading, Error, Spacer } from '../UI';
import { errorMessages } from '../../constants/messages';

const GamesSingle = ({
  error, loading, game, reFetch,
}) => {
  if (error) {
    return <Error content={error} tryAgain={reFetch} />;
  }

  if (loading) {
    return <Loading content={loading} />;
  }

  if (Object.keys(game).length < 1) {
    return <Error content={errorMessages.game404} />;
  }

  return (
    <Container>
      <Content padder>
        <Spacer size={15} />
        <H3 style={{ alignSelf: 'center' }}>{game.name}</H3>
        <Spacer size={15} />
        <Image
          source={{ uri: game.icon }}
          style={{
            height: 200, width: null, flex: 1, resizeMode: 'contain',
          }}
        />

        <Card>
          <CardItem header bordered style={{ alignSelf: 'center' }}>
            <Text>
              Codes shared:
            </Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>Bu bir oyun</Text>
            </Body>
          </CardItem>
        </Card>
        <Spacer size={20} />
      </Content>
    </Container>
  );
};

GamesSingle.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool,
  game: PropTypes.shape(),
  reFetch: PropTypes.func,
};

GamesSingle.defaultProps = {
  error: null,
  loading: false,
  game: {},
  reFetch: null,
};

export default GamesSingle;
