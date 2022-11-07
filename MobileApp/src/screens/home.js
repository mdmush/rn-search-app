import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RED} from '../constants';
import leaderboard from '../assets/leaderboard.json';
import {Col, Row, Grid} from 'react-native-easy-grid';
import { search, sort } from '../functions';

export default function HomeScreen() {
  const [data, setdata] = useState(null);
  const [loading, setloading] = useState(false);
  const [searchtext, setsearchtext] = useState('');

  useEffect(async () => {
    let leaderboardData = Object.values(leaderboard);
    let sortedData = await sort(leaderboardData)
    setdata(sortedData.slice(0, 10));
  }, []);

  const searchUser = async () => {
    setloading(true);
    let leaderboardData = Object.values(leaderboard);
    let sortedData = await sort(leaderboardData)
    let searchedData = await search(sortedData, searchtext);
    setdata(searchedData);
    setloading(false);
  };

  const renderLoading = () => {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={RED} />
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <View className="flex-row items-center bg-white px-4 rounded-md">
        <TextInput
          placeholder="Search"
          className="flex-1"
          onChangeText={text => setsearchtext(text)}
        />
        <TouchableOpacity
          className={`px-4 py-2 rounded-md`}
          style={{backgroundColor: RED}}
          onPress={() => searchUser()}>
          <Text className="text-white text-[12px]">Search</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1" style={{backgroundColor: RED}}>
      <View className="flex-1 p-4">
        {renderHeader()}
        <View className="flex-1 p-2 py-10">
          {loading ? (
            renderLoading()
          ) : (
            <Grid className="bg-white p-4 rounded-md">
              <Row className="border-b border-[#ccc] mb-4">
                <Col>
                  <Text className="font-bold text-black">Name</Text>
                </Col>
                <Col>
                  <Text className="font-bold text-black">Rank</Text>
                </Col>
                <Col>
                  <Text className="font-bold text-black">
                    Number of Bananas
                  </Text>
                </Col>
                <Col>
                  <Text className="font-bold text-black">isSearchedUser?</Text>
                </Col>
              </Row>
              {data &&
                data.map((usr, usrIndex) => {
                  let isSearchedUser = usr.isSearchedUser && usr.isSearchedUser === true
                  return (
                    <Row key={usr.uid}>
                      <Col className="justify-center">
                        <Text style={isSearchedUser ? {color: RED, fontWeight: '600'} : {}}>{usr.name}</Text>
                      </Col>
                      <Col className="border-l justify-center items-center border-[#ccc]">
                        <Text style={isSearchedUser ? {color: RED, fontWeight: '600'} : {}}>{usr.rank ? usr.rank + 1 : usrIndex + 1}</Text>
                      </Col>
                      <Col className="border-l justify-center items-center border-[#ccc]">
                        <Text style={isSearchedUser ? {color: RED, fontWeight: '600'} : {}}>{usr.bananas}</Text>
                      </Col>
                      <Col className="border-l justify-center items-center border-[#ccc]">
                        <Text style={isSearchedUser ? {color: RED, fontWeight: '600'} : {}}>{isSearchedUser ? 'True' : 'False'}</Text>
                      </Col>
                    </Row>
                  );
                })}
            </Grid>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
