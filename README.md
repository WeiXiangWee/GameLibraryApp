# 🎮 Game Library

A dark-themed React Native (Expo) list app that shows a collection of video games, grouped by genre, with live search.

Built for **C346 Mobile App Development - Week 5, Exercise 4** (FlatList & SectionList).

<p align="center">
  <img src="screenshot.png" alt="Game Library app screenshot" width="300" />
</p>

---

## ✨ Features

- **Genre sections** - games are grouped into Action, RPG and Casual using a `SectionList`
- **Colour-coded headers** - each genre has its own colour, icon and game count, e.g. `ACTION (3)`
- **Game cards** - full-width Steam cover art, name, release year, price tag and a 1-5 star rating
- **Live search** - type in the search bar to filter games by name; empty genres hide automatically
- **Tap a game** - shows an alert with a short description
- **Long-press a game** - shows a toast: *"Added to wishlist!"*
- **Add Game button** - placeholder for a future feature (shows a "coming soon" toast)
- **Empty state** - shows *"No games found"* when nothing matches the search

---

## 🛠️ Built With

| Feature | Implementation |
|---|---|
| Grouped list | `SectionList` (`sections`, `renderItem`, `renderSectionHeader`) |
| Auto-generated sections | `map` + `new Set` to find genres, `filter` to group games |
| Search | `TextInput` + `useState`, filtered with `toLowerCase().includes()` |
| Cover images | `Image` loading Steam's online header images |
| Icons & stars | `FontAwesome6` from `@expo/vector-icons` |
| Per-genre colours | `genreInfo` lookup object + style arrays |
| Feedback | `Alert` (tap) and `ToastAndroid` (long-press, Add button) |
| Layout | `StyleSheet` + Flexbox (`flex: 1`, `column-reverse`, `aspectRatio`, `position: 'absolute'`) |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/)
- [Expo Go](https://expo.dev/go) on an Android phone, **or** an Android emulator

### Installation
```bash
git clone <this-repo-url>
cd <repo-folder>
npm install
npx expo start
```
Then scan the QR code with Expo Go, or press `a` to open the Android emulator.

> **Note:** `ToastAndroid` only works on Android. An internet connection is needed to load the cover images.

---

## 🗂️ How the Data Works

All games live in one array. Each game looks like this:

```js
{ id: 'g3', name: 'Elden Ring', genre: 'Action', steamId: 1245620,
  year: 2022, rating: 5, price: 69.90,
  desc: 'Challenging open-world adventure in the Lands Between.' }
```

- `genre` decides which section the game appears in
- `steamId` builds the cover image URL:
  `https://cdn.cloudflare.steamstatic.com/steam/apps/<steamId>/header.jpg`

**To add a game**, add a new object to the `games` array. If it uses a new genre, add a matching entry (colour + icon) to `genreInfo`.

---

## 🎮 Games Included

| Genre | Games |
|---|---|
| Action | Monster Hunter Wilds, Grand Theft Auto V, Elden Ring |
| RPG | The Witcher 3, Baldur's Gate 3 |
| Casual | Stardew Valley, Terraria |

---

## 👤 Author

**wx** - Year 2, Republic Polytechnic
C346 Mobile App Development

> Game cover images belong to their respective publishers and are loaded from Steam for educational purposes only.
