import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated
} from "react-native";
import { getImageFromApi } from "../Api/TMDBApi";
import FadeIn from "../Animations/FadeIn";

export default class FilmItem extends Component {
  _displayFavoriteImage() {
    if (this.props.isFilmFavorite) {
      // si props true, display coeur
      return (
        <Image
          style={styles.favorite_image}
          source={require("../Images/ic_favorite.png")}
        />
      );
    }
  }

  render() {
    const { film, displayDetailForFilm } = this.props;
    return (
      <FadeIn>
        <TouchableOpacity
          onPress={() => displayDetailForFilm(film.id)}
          style={styles.main_container}
        >
          <Image
            source={{ uri: getImageFromApi(film.poster_path) }}
            style={styles.image}
          />
          <View style={styles.content_container}>
            <View style={styles.header_container}>
              {this._displayFavoriteImage()}
              <Text style={styles.title_text}>{film.title}</Text>
              <Text style={styles.vote_text}>{film.vote_average}</Text>
            </View>

            <View style={styles.description_container}>
              <Text style={styles.description_text} numberOfLines={6}>
                {film.overview}
              </Text>
            </View>
            <View style={styles.date_container}>
              <Text style={styles.date_text}>Sorti le {film.release_date}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </FadeIn>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 190,
    borderWidth: 1,
    borderRadius: 4,
    marginVertical: 5,
    borderColor: "grey",
    flexDirection: "row"
  },
  image: {
    width: 120,
    height: 180,
    margin: 5,
    backgroundColor: "gray",
    borderRadius: 4
  },
  content_container: {
    flex: 2,
    padding: 2
  },
  header_container: {
    flexDirection: "row",
    marginVertical: 4,
    flex: 3
  },
  title_text: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    flexWrap: "wrap"
  },
  vote_text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#666666"
  },
  description_container: { flex: 7 },
  description_text: {
    fontStyle: "italic",
    color: "grey",
    fontWeight: "600",
    fontSize: 16
  },
  date_container: {
    flex: 1
  },
  date_text: {
    textAlign: "right",
    fontSize: 14,
    padding: 2
  },
  favorite_image: {
    width: 25,
    height: 25,
    marginRight: 5
  }
});
