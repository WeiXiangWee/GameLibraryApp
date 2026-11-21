// Game Library App

import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet, Text, View, SectionList, TouchableOpacity,
    Image, TextInput, Alert, ToastAndroid,
} from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';

// Games data
const games = [
    { id: 'g1', name: 'Monster Hunter Wilds', genre: 'Action', steamId: 2246340, year: 2025, rating: 5,
        desc: 'Hunt giant monsters across a living, changing world.' },
    { id: 'g2', name: 'Grand Theft Auto V', genre: 'Action', steamId: 271590, year: 2015, rating: 4,
        desc: 'Open-world crime story set in the city of Los Santos.' },
    { id: 'g3', name: 'Elden Ring', genre: 'Action', steamId: 1245620, year: 2022, rating: 5,
        desc: 'Challenging open-world adventure in the Lands Between.' },

    { id: 'g4', name: 'The Witcher 3', genre: 'RPG', steamId: 292030, year: 2015, rating: 5,
        desc: 'Monster slayer Geralt searches for his adopted daughter.' },
    { id: 'g5', name: "Baldur's Gate 3", genre: 'RPG', steamId: 1086940, year: 2023, rating: 5,
        desc: 'Story-rich party RPG based on Dungeons & Dragons.' },

    { id: 'g6', name: 'Stardew Valley', genre: 'Casual', steamId: 413150, year: 2016, rating: 4,
        desc: 'Relaxing farm life sim - grow crops and befriend the town.' },
    { id: 'g7', name: 'Terraria', genre: 'Casual', steamId: 105600, year: 2011, rating: 4,
        desc: 'Dig, build and explore a 2D sandbox world.' },
];


//Make a variable to store all colors and icons according to the genre
const genreInfo = {
    Action: { color: '#E53935', lightColor: '#FDECEA', icon: 'gun' },
    RPG:    { color: '#8E24AA', lightColor: '#F5E6FA', icon: 'hat-wizard' },
    Casual: { color: '#43A047', lightColor: '#E8F5E9', icon: 'seedling' },
};


// Builds the cover URL. Uses image if given, otherwise the Steam pattern.
const getImageUrl = (game) =>
    game.image || 'https://cdn.cloudflare.steamstatic.com/steam/apps/' + game.steamId + '/header.jpg';



const renderItem = ({ item }) => {
    const info = genreInfo[item.genre];

    return (
        <TouchableOpacity
            style={[styles.row, { backgroundColor: info.lightColor, borderLeftColor: info.color }]}
            onPress={() => Alert.alert(item.name, item.desc)}                                 // tap
            onLongPress={() => ToastAndroid.show(item.name + ' added to wishlist!', ToastAndroid.SHORT)} // hold
        >

            <View style={styles.infoColumn}>
                <Text style={styles.gameName}>{item.name}</Text>
                <Text style={styles.gameYear}>{item.year}</Text>


                <View style={styles.starRow}>
                    {[1, 2, 3, 4, 5].map((n) => (
                        <FontAwesome6
                            key={n}
                            name="star"
                            solid={n <= item.rating}   // filled if n is within the rating
                            size={14}
                            color="#F4B400"
                        />
                    ))}
                </View>
            </View>


            <Image source={{ uri: getImageUrl(item) }} style={styles.cover} />
        </TouchableOpacity>
    );
};


// ============================================================
// SECTION HEADER - one per genre
// ============================================================
const renderSectionHeader = ({ section }) => {
    const info = genreInfo[section.title];

    return (
        <View style={[styles.header, { backgroundColor: info.color }]}>
            <FontAwesome6 name={info.icon} size={18} color="white" solid />
            <Text style={styles.headerText}>
                {section.title.toUpperCase()} ({section.data.length})
            </Text>
        </View>
    );
};



const App = () => {

    const [search, setSearch] = useState('');


    const filteredGames = games.filter((game) =>
        game.name.toLowerCase().includes(search.toLowerCase())
    );


    const genres = [...new Set(filteredGames.map((game) => game.genre))];
    const sections = genres.map((genre) => ({
        title: genre,
        data: filteredGames.filter((game) => game.genre === genre),
    }));

    return (
        <View style={styles.screen}>
            <StatusBar style="light" />


            <View style={styles.topBar}>
                <View style={styles.titleRow}>
                    <FontAwesome6 name="gamepad" size={24} color="white" solid />
                    <Text style={styles.title}>Game Library</Text>
                </View>

                <View style={styles.searchBox}>
                    <FontAwesome6 name="magnifying-glass" size={14} color="#888" solid />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search games..."
                        placeholderTextColor="#888"
                        value={search}
                        onChangeText={setSearch}
                    />
                </View>
            </View>


            <SectionList
                style={styles.list}
                sections={sections}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                keyExtractor={(item) => item.id}
                stickySectionHeadersEnabled={false}
                ListEmptyComponent={<Text style={styles.emptyText}>No games found</Text>}
            />

            {/* ---------- BOTTOM BUTTON ---------- */}
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => ToastAndroid.show('Add Game coming soon!', ToastAndroid.SHORT)}
            >
                <FontAwesome6 name="plus" size={16} color="white" solid />
                <Text style={styles.addButtonText}>Add Game</Text>
            </TouchableOpacity>
        </View>
    );
};

export default App;



const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#F4F4F8',
    },

    // Top bar
    topBar: {
        backgroundColor: '#1E1E2E',
        paddingTop: 45,
        paddingHorizontal: 16,
        paddingBottom: 14,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    title: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 14,
    },
    searchInput: {
        flex: 1,                 // takes all space after the icon
        paddingVertical: 8,
        marginLeft: 8,
        fontSize: 15,
    },

    // List
    list: {
        flex: 1,                 // fills space between top bar and button
        paddingHorizontal: 12,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 40,
        fontSize: 16,
        color: '#888',
    },

    // Section header
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginTop: 14,
        marginBottom: 4,
        borderRadius: 8,
    },
    headerText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        letterSpacing: 1,
    },

    // Game row
    row: {
        flexDirection: 'row',    // info column | cover side by side
        alignItems: 'center',
        padding: 10,
        marginVertical: 4,
        borderRadius: 10,
        borderLeftWidth: 6,      // coloured stripe (colour set per genre)
        elevation: 2,
    },
    infoColumn: {
        flex: 1,                 // takes all space left of the cover
        marginRight: 10,
    },
    gameName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#222',
    },
    gameYear: {
        fontSize: 13,
        color: '#666',
        marginVertical: 2,
    },
    starRow: {
        flexDirection: 'row',
        gap: 2,
    },
    cover: {
        width: 150,
        height: 70,              // Steam covers are wide (about 460 x 215)
        borderRadius: 6,
    },

    // Bottom button
    addButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1E1E2E',
        paddingVertical: 14,
        margin: 12,
        borderRadius: 25,
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
    },
});
