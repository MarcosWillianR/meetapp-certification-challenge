import React from 'react';
import { Image } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Header,
  Meetup,
  Name,
  Date,
  Address,
  Organizer,
} from './styles';

import Background from '~/components/Background';
import Button from '~/components/Button';

export default function Dashboard() {
  return (
    <Background>
      <Container>
        <Header>31 de maio</Header>
        <Meetup>
          <Image />
          <Name>Meetup de React Native</Name>
          <Date>24 de Junho, às 20h</Date>
          <Address>Rua Guilherme Gembala, 260</Address>
          <Organizer>Organizador: Marcos Willian</Organizer>
          <Button children="Realizar inscrição" />
        </Meetup>
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
};
